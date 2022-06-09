import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

total_indicator_map = {}


def get_range_info_df():
    sources_df = pd.read_csv("Sources.csv")
    sources_df = sources_df[["Pillar", "Sub-Pillar", "Indicator", "Raw/Index", "Data Range"]] \
        .dropna(subset=["Pillar", "Sub-Pillar", "Indicator"])

    sources_df["Pillar"] = sources_df["Pillar"].astype(str)
    sources_df["Sub-Pillar"] = sources_df["Sub-Pillar"].astype(str)
    sources_df["Indicator"] = sources_df["Indicator"].astype(str)

    return sources_df


def process_df(better_df, min_val, max_val):
    sources_df = get_range_info_df()
    # print(sources_df.columns)

    print(sources_df.loc[(sources_df["Pillar"] == "Infrastructure") & (sources_df["Sub-Pillar"] == "Connectivity Technology") & (sources_df["Indicator"] == "Broadband Density")].head(1))
    pillar_sub_group = better_df.groupby(["Pillar", "Sub-Pillar", "Indicator"])
    # print(pillar_sub_group.groups.keys())
    # print(pillar_sub_group["data_col"].count())
    # print(pillar_sub_group["data_col"].sum())

    # process each group
    score_map = {}
    for name, group in pillar_sub_group:
        # print(name, len(group["data_col"]))
        scaler = MinMaxScaler((min_val, max_val))
        raw_data = group[["data_col"]]
        idx = raw_data.index

        source_info = sources_df.loc[(sources_df["Pillar"] == name[0]) & (sources_df["Sub-Pillar"] == name[1]) & (sources_df["Indicator"] == name[2])]

        if len(source_info.index) > 0:
            source_info = source_info.head(1)
            # print(source_info["Raw/Index"].values[0])
            ind_type = source_info["Raw/Index"].values[0]

            if ind_type == "Index":
                range_info = source_info["Data Range"].values[0].split("|")

                if len(range_info) > 1:
                    range_min = range_info[0]
                    range_max = range_info[1]
                    # print(range_min, range_max)
                    scaler.fit([[int(range_min)], [int(range_max)]])
                else:
                    print("Index type has invalid range data. Range info:", range_info)
                    scaler.fit(raw_data.values)
            else:
                scaler.fit(raw_data.values)
        else:
            scaler.fit(raw_data.values)

        scaled_data = scaler.transform(raw_data.values).flatten()
        score_map[name] = (idx, list(scaled_data))

    for key, val_tup in score_map.items():
        better_df.loc[val_tup[0], "indicator_score"] = val_tup[1]

    # pillar_sub_group = better_df.groupby(["Pillar", "Sub-Pillar"])
    # sub_score_map = {}
    # for name, group in pillar_sub_group:
    #     # print(name, len(group["data_col"]))
    #     scaler = MinMaxScaler((min_val, max_val))
    #
    #     raw_data = group[["data_col"]]
    #     idx = raw_data.index
    #
    #     scaler.fit(raw_data)
    #     scaled_data = scaler.transform(raw_data).flatten()
    #     sub_score_map[name] = (idx, list(scaled_data))
    #
    # for key, val_tup in sub_score_map.items():
    #     better_df.loc[val_tup[0], "sub_pillar_score"] = val_tup[1]

    # print(better_df.head(10).to_string())

    return better_df


def handle_higher_not_better(df):
    # df.loc[df["higher_is_better"] == False, ["indicator_score", "sub_pillar_score"]] = 6.99 - df[
    #     "indicator_score"], 6.99 - df["sub_pillar_score"]

    df["indicator_score"] = np.where(df["higher_is_better"] == False, 6.99 - df["indicator_score"],
                                     df["indicator_score"])
    # df["sub_pillar_score"] = np.where(df["higher_is_better"] == False, 6.99 - df["sub_pillar_score"],
    #                                   df["sub_pillar_score"])

    return df


def add_country_sub_pillar_score(df):
    pillar_sub_group = df.groupby(["Country Name", "Pillar", "Sub-Pillar"])
    score_map = {}
    for name, group in pillar_sub_group:
        indicator_scores = group["indicator_score"]
        idx = indicator_scores.index

        score = indicator_scores.sum() / len(idx)

        # add data availability
        key = (name[1], name[2])
        total_inds = total_indicator_map[key]
        data_avail = (len(group.drop_duplicates("Indicator").index) / total_inds) * 100

        score_map[name] = (idx, [score for _ in range(0, len(idx))], [data_avail for _ in range(0, len(idx))])

    for key, val_tup in score_map.items():
        df.loc[val_tup[0], "country_sub_pillar_score"] = val_tup[1]
        df.loc[val_tup[0], "data_availability"] = val_tup[2]

    return df


def add_country_sub_pillar_rank(df):
    # df["country_sub_pillar_rank"] = df.groupby(["Pillar", "Sub-Pillar"])["country_sub_pillar_score"] \
    #     .rank(method="min", ascending=False)
    # df["country_sub_pillar_rank"] = df["country_sub_pillar_rank"].astype(int)

    pillar_df = df[["Country Name", "Pillar", "Sub-Pillar", "country_sub_pillar_score", "country_sub_pillar_rank"]] \
        .drop_duplicates(["Country Name", "Pillar", "Sub-Pillar"], keep="first")

    pillar_df["country_sub_pillar_rank"] = pillar_df.groupby(["Pillar", "Sub-Pillar"])["country_sub_pillar_score"] \
        .rank(method="min", ascending=False)

    pillar_df["country_sub_pillar_rank"] = pillar_df["country_sub_pillar_rank"].astype(int)

    c = df.columns.difference(["country_sub_pillar_rank"])
    df = df[c].merge(pillar_df[["Country Name", "Pillar", "Sub-Pillar", "country_sub_pillar_rank"]],
                     on=["Country Name", "Pillar", "Sub-Pillar"],
                     how="left").reindex(columns=df.columns)

    return df


def add_country_pillar_score(df):
    pillar_sub_group = df.groupby(["Country Name", "Pillar"])
    score_map = {}
    for name, group in pillar_sub_group:
        # print(name)
        country_sub_scores = group["country_sub_pillar_score"]
        idx = country_sub_scores.index

        country_pillars = group.drop_duplicates("Sub-Pillar")
        # print(country_pillars.to_string())

        country_sub_scores_uni = country_pillars["country_sub_pillar_score"]
        score = country_sub_scores_uni.sum() / len(country_sub_scores_uni.index)

        score_map[name] = (idx, [score for _ in range(0, len(idx))])

    for key, val_tup in score_map.items():
        df.loc[val_tup[0], "country_pillar_score"] = val_tup[1]

    return df


def add_country_pillar_rank(df):
    pillar_df = df[["Country Name", "Pillar", "country_pillar_score", "country_pillar_rank"]] \
        .drop_duplicates(["Country Name", "Pillar"], keep="first")

    # print(pillar_df[["Country Name"]].drop_duplicates(["Country Name"], keep="first").values.flatten().tolist())

    pillar_df["country_pillar_rank"] = pillar_df.groupby(["Pillar"])["country_pillar_score"] \
        .rank(method="min", ascending=False)

    pillar_df["country_pillar_rank"] = pillar_df["country_pillar_rank"].astype(int)

    c = df.columns.difference(["country_pillar_rank"])
    df = df[c].merge(pillar_df[["Country Name", "Pillar", "country_pillar_rank"]], on=["Country Name", "Pillar"],
                     how="left").reindex(columns=df.columns)

    return df


def prep_total_indicator_map(df):
    pillar_sub_group = df.groupby(["Pillar", "Sub-Pillar"])
    for name, group in pillar_sub_group:
        country_pillars = group.drop_duplicates("Indicator")
        total_sub_inds = len(country_pillars.index)

        total_indicator_map[name] = total_sub_inds

    # print(total_indicator_map)


def add_sources(df, source_file_name):
    df["Data Source"] = np.nan
    df["Data Link"] = np.nan

    sources_df = pd.read_csv(source_file_name)
    source_data_df = sources_df[["Pillar", "Sub-Pillar", "Indicator", "Data Source", "Data Link"]] \
        .dropna(subset=["Pillar", "Sub-Pillar", "Indicator"])

    # print(source_data_df.to_string())

    c = df.columns.difference(["Data Source", "Data Link"])
    df = df[c].merge(source_data_df, on=["Pillar", "Sub-Pillar", "Indicator"],
                     how="left").reindex(columns=df.columns)

    return df


def process_aggregated(headers, aggr_file):
    full_df = pd.read_csv(aggr_file)
    full_df["indicator_score"] = pd.Series(np.float64)
    # full_df["sub_pillar_score"] = pd.Series(np.float64)
    full_df["country_sub_pillar_score"] = pd.Series(np.float64)
    full_df["country_sub_pillar_rank"] = pd.Series(np.int64)

    full_df["country_pillar_score"] = pd.Series(np.float64)
    full_df["country_pillar_rank"] = pd.Series(np.int64)

    full_df["Year"] = full_df["Year"].astype(int)

    full_df["higher_is_better"] = full_df["higher_is_better"].astype(bool)

    # higher_is_better_df = full_df[(full_df["higher_is_better"] == True)]
    # higher_is_not_better_df = full_df[(full_df["higher_is_better"] == False)]

    # print(len(higher_is_better_df.index))
    # print(len(higher_is_not_better_df.index))
    # print(len(full_df.index))

    prep_total_indicator_map(full_df)

    full_df = process_df(full_df, 1, 5.99)
    # print(full_df[full_df["higher_is_better"] == True].head(10).to_string())

    full_df = handle_higher_not_better(full_df)
    # print(full_df[full_df["higher_is_better"] == True].head(10).to_string())

    full_df = add_country_sub_pillar_score(full_df)
    # print(full_df.head(10).to_string())

    full_df = add_country_sub_pillar_rank(full_df)
    # print(full_df.head(170).to_string())

    full_df = add_country_pillar_score(full_df)
    full_df = add_country_pillar_rank(full_df)

    full_df = full_df.drop("new_rank_score", axis=1)

    full_df = add_sources(full_df, "Sources.csv")

    year_df = full_df["Year"]

    full_df = full_df.drop("Year", axis=1)

    full_df["Year"] = year_df

    full_df.to_csv("Processed/Full Data/full_data.csv", index=False)
    # print(full_df.head(170).to_string())


if __name__ == "__main__":
    process_aggregated(
        ["Country Name", "Year", "Indicator", "data_col", "new_rank_score", "higher_is_better", "Pillar", "Sub-Pillar"],
        "Processed/Full Data/output.csv"
    )
