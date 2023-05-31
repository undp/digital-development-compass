import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

total_indicator_map = {}
total_sub_pillar_map = {}
pillar_count = 0
weights = pd.DataFrame()


def load_weights():
    global weights
    weights = pd.read_csv("Weights.csv")
    weights["Indicator"] = weights["Indicator"].astype(str)

def get_weight(pillar, sub_pillar, indicator):
    global weights
    #print(pillar, sub_pillar, indicator)
    val = weights.loc[(weights["Pillar"] == pillar) & (weights["Sub-Pillar"] == sub_pillar) & (weights[
        "Indicator"] == indicator), "Weight"].values[0]
    return val


def get_range_info_df():
    sources_df = pd.read_csv("Sources.csv")
    sources_df = sources_df[["Pillar", "Sub-Pillar", "Indicator", "Raw/Index", "min", "max"]] \
        .dropna(subset=["Pillar", "Sub-Pillar", "Indicator"])

    sources_df["Pillar"] = sources_df["Pillar"].astype(str)
    sources_df["Sub-Pillar"] = sources_df["Sub-Pillar"].astype(str)
    sources_df["Indicator"] = sources_df["Indicator"].astype(str)

    return sources_df


def process_df(better_df, min_val, max_val):
    sources_df = get_range_info_df()
    # print(sources_df.columns)

    #print(sources_df.loc[ (sources_df["Pillar"] == "Infrastructure") & (sources_df["Sub-Pillar"] == "Connectivity Technology") & (sources_df["Indicator"] == "Broadband Density")].head(1))

    pillar_sub_group = better_df.groupby(["Pillar", "Sub-Pillar", "Indicator"])
    # print(pillar_sub_group.groups.keys())
    # print(pillar_sub_group["data_col"].count())
    # print(pillar_sub_group["data_col"].sum())

    # process each group
    score_map = {}
    for name, group in pillar_sub_group:
        # print(name, len(group["data_col"]))
        is_percentile = False
        scaler = MinMaxScaler((min_val, max_val))
        raw_data = group[["data_col"]]
        idx = raw_data.index

        source_info = sources_df.loc[(sources_df["Pillar"] == name[0]) & (sources_df["Sub-Pillar"] == name[1]) & (
                sources_df["Indicator"] == name[2])]

        if len(source_info.index) > 0:
            source_info = source_info.head(1)
            #print(source_info["Indicator"].values[0], source_info["Raw/Index"].values[0])
            ind_type = source_info["Raw/Index"].values[0]

            if ind_type == "Index":
                #range_info = source_info["Data Range"].values[0].split("|")

                if source_info["min"].values[0] != "" and source_info["max"].values[0] != "":
                    range_min = source_info["min"].values[0]
                    range_max = source_info["max"].values[0]
                    #print("range min max", source_info["Indicator"].values[0], range_min, range_max)
                    vals = raw_data.values
                    vals = np.append(vals, [[int(range_min)], [int(range_max)]], axis=0)
                    scaler.fit(vals)
                else:
                    ##########print("Index type has invalid range data.")
                    # scaler.fit(raw_data.values)
                    is_percentile = True
            elif ind_type == "Raw":
                # scaler.fit(raw_data.values)
                #print("raw:", source_info["Indicator"].values[0])
                is_percentile = True
            else:
                ####################print("Index type unknown for index:", source_info["Indicator"].values[0])
                is_percentile = True
        else:
            # scaler.fit(raw_data.values)
            is_percentile = True

        # perform percentile calculations and scale data
        if is_percentile:
            # prepare 5 scalers
            scaler1 = MinMaxScaler((1, 1.99))
            scaler2 = MinMaxScaler((2, 2.99))
            scaler3 = MinMaxScaler((3, 3.99))
            scaler4 = MinMaxScaler((4, 4.99))
            scaler5 = MinMaxScaler((5, 5.99))

            # calculate percentile max values
            val1 = group["data_col"].quantile(0.2)
            val2 = group["data_col"].quantile(0.4)
            val3 = group["data_col"].quantile(0.6)
            val4 = group["data_col"].quantile(0.8)
            val5 = group["data_col"].quantile(1.0)

            # data of each quantile
            raw_data1 = group.loc[group["data_col"] < val1, "data_col"]
            raw_data2 = group.loc[(group["data_col"] >= val1) & (group["data_col"] < val2), "data_col"]
            raw_data3 = group.loc[(group["data_col"] >= val2) & (group["data_col"] < val3), "data_col"]
            raw_data4 = group.loc[(group["data_col"] >= val3) & (group["data_col"] < val4), "data_col"]
            raw_data5 = group.loc[(group["data_col"] >= val4), "data_col"]

            scaled_data1 = []
            scaled_data2 = []
            scaled_data3 = []
            scaled_data4 = []
            scaled_data5 = []

            # fit scalers and set scaled values
            if raw_data1.values.size != 0:
                scaler1.fit(raw_data1.values.reshape(-1, 1))
                scaled_data1 = scaler1.transform(raw_data1.values.reshape(-1, 1)).flatten()

            if raw_data2.values.size != 0:
                scaler2.fit(raw_data2.values.reshape(-1, 1))
                scaled_data2 = scaler2.transform(raw_data2.values.reshape(-1, 1)).flatten()

            if raw_data3.values.size != 0:
                values = list(raw_data3.values.reshape(-1, 1))
                values.sort()
                mins = []
                if len(values) > 0:
                    mn = values[0]
                    mx = values[-1]
                    if mn == mx:
                        mins.append(mx - 1)
                scaler3.fit(values + mins)
                scaled_data3 = scaler3.transform(raw_data3.values.reshape(-1, 1)).flatten()

            if raw_data4.values.size != 0:
                values = list(raw_data4.values.reshape(-1, 1))
                values.sort()
                mins = []
                if len(values) > 0:
                    mn = values[0]
                    mx = values[-1]
                    if mn == mx:
                        mins.append(mx - 1)
                scaler4.fit(values + mins)
                scaled_data4 = scaler4.transform(raw_data4.values.reshape(-1, 1)).flatten()

            if raw_data5.values.size != 0:
                values = list(raw_data5.values.reshape(-1, 1))
                values.sort()
                mins = []
                if len(values) > 0:
                    mn = values[0]
                    mx = values[-1]
                    if mn == mx:
                        mins.append(mx - 1)
                scaler5.fit(values + mins)
                scaled_data5 = scaler5.transform(raw_data5.values.reshape(-1, 1)).flatten()

            # add data to score_map
            indexes = list(raw_data1.index) + list(raw_data2.index) + list(raw_data3.index) + list(raw_data4.index) + list(raw_data5.index)
            values = list(scaled_data1) + list(scaled_data2) + list(scaled_data3) + list(scaled_data4) + list(scaled_data5)

            score_map[name] = (indexes, values)

        else:
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
    global weights
    pillar_sub_group = df.groupby(["Country Name", "Pillar", "Sub-Pillar"])
    score_map = {}
    for name, group in pillar_sub_group:
        # print(name, group["Indicator"])
        indicator_scores = group["indicator_score"]
        idx = indicator_scores.index

        pillar = name[1]
        sub_pillar = name[2]

        weighted_sum = 0
        total_weight = 0

        # print(name[0])
        for indicator, in_score in zip(group["Indicator"], group["indicator_score"]):
            # print(pillar, sub_pillar, indicator, in_score)
            weight = get_weight(pillar, sub_pillar, indicator)
            weighted_sum += (in_score * weight)
            total_weight += weight

        score = weighted_sum / total_weight

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


    pillar_df = df[["Country Name", "Pillar", "Sub-Pillar", "country_sub_pillar_score", "country_sub_pillar_rank",'UN Member States']] \
        .drop_duplicates(["Country Name", "Pillar", "Sub-Pillar"], keep="first")

    ######################################################################################
    un_filter = pillar_df["UN Member States"].isin(['x'])
    pillar_df = pillar_df.where(un_filter)

    pillar_df["country_sub_pillar_score"] = pillar_df["country_sub_pillar_score"].astype(float)

    pillar_df["country_sub_pillar_rank"] = pillar_df.groupby(["Pillar", "Sub-Pillar"])["country_sub_pillar_score"] \
        .rank(method="min", ascending=False)

    pillar_df["country_sub_pillar_rank"] = pillar_df["country_sub_pillar_rank"].astype("Int64")
    #.astype(int)

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

        pillar = name[1]

        weighted_sum = 0
        total_weight = 0

        # print(name[0])
        for sub_pillar, in_score in zip(country_pillars["Sub-Pillar"], country_sub_scores_uni):
            # print(pillar, sub_pillar, indicator, in_score)
            weight = get_weight(pillar, sub_pillar, "nan")
            weighted_sum += (in_score * weight)
            total_weight += weight

        score = weighted_sum / total_weight

        # add data availability
        key = (name[1])
        total_inds = total_sub_pillar_map[key]
        data_avail = (len(group.drop_duplicates("Indicator").drop_duplicates("Sub-Pillar").index) / total_inds) * 100
        #print(key, len(group.drop_duplicates("Indicator").drop_duplicates("Sub-Pillar").index), total_inds, data_avail)

        # score = country_sub_scores_uni.sum() / len(country_sub_scores_uni.index)

        score_map[name] = (idx, [score for _ in range(0, len(idx))], [data_avail for _ in range(0, len(idx))])

    for key, val_tup in score_map.items():
        df.loc[val_tup[0], "country_pillar_score"] = val_tup[1]
        df.loc[val_tup[0], "country_pillar_availability"] = val_tup[2]

    return df


def add_country_pillar_rank(df):
    pillar_df = df[["Country Name", "Pillar", "country_pillar_score", "country_pillar_rank",'UN Member States']] \
        .drop_duplicates(["Country Name", "Pillar"], keep="first")

    ##################################################################################
    un_filter = pillar_df["UN Member States"].isin(['x'])
    pillar_df = pillar_df.where(un_filter)

    # print(pillar_df[["Country Name"]].drop_duplicates(["Country Name"], keep="first").values.flatten().tolist())

    pillar_df["country_pillar_rank"] = pillar_df.groupby(["Pillar"])["country_pillar_score"] \
        .rank(method="min", ascending=False)

    pillar_df["country_pillar_rank"] = pillar_df["country_pillar_rank"].astype("Int64")
        #.astype(int)

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

def prep_total_sub_pillar_map(df):
    pillar_sub_group = df.groupby(["Pillar"])
    for name, group in pillar_sub_group:
        country_pillars = group.drop_duplicates("Indicator").drop_duplicates("Sub-Pillar")
        total_sub_inds = len(country_pillars.index)

        total_sub_pillar_map[name] = total_sub_inds

    # print(total_sub_pillar_map)

def prep_pillar_count(df):
    global pillar_count
    pillar_count = len(df["Pillar"].unique())

    # print(pillars)

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


def get_country_rank(pillar_df: pd.DataFrame):
    country_df = pillar_df.copy(deep=True)
    #############################################
    un_filter = pillar_df["UN Member States"].isin(['x','y'])
    country_df = pillar_df.where(un_filter)
    #country_df = country_df.drop(['UN Member States'], axis=1)

    country_group = pillar_df.groupby(["Country Name"])

    for name, group in country_group:
        n_pillars = len(group[["Pillar"]].index)
        score_sum = group[["new_rank_score"]].sum()

        score = float(score_sum / n_pillars)

        country_df.loc[country_df["Country Name"] == name, "new_rank_score"] = score
        country_df.loc[country_df["Country Name"] == name, "data_availability"] = (n_pillars/pillar_count)*100

        #print(name, (n_pillars/pillar_count)*100)


    country_df = country_df.drop_duplicates(["Country Name"], keep="first")
    country_df["Pillar"] = ""

    #country_df["data_availability"] = ""
    un_filter = country_df["UN Member States"].isin(['x'])
    country_df1 = country_df.where(un_filter)
    country_df1["rank"] = country_df1["new_rank_score"].rank(method="min", ascending=False)

    country_df = country_df.drop(['UN Member States'], axis=1)

    country_df1 = country_df1[["Country Name", "rank"]]
    c = country_df.columns.difference(["rank"])
    country_df = country_df[c].merge(country_df1, on=["Country Name"], how="left").reindex(columns=country_df.columns)
    
    return country_df


def save_roll_csv(df):
    columns = ["Country Name", "Pillar", "Sub-Pillar", "Indicator", "data_col", "higher_is_better", "data_availability",
               "Data Source", "Data Link", "Year"]
    columns_order = ["Country Name", "Pillar", "Sub-Pillar", "Indicator", "data_col", "higher_is_better",
                     "new_rank_score", "rank", "data_availability", "Data Source", "Data Link", "Year"]
    indicator_df = df[columns + ["indicator_score"]]
    indicator_df["rank"] = ""
    indicator_df["data_availability"] = ""
    indicator_df = indicator_df.rename(columns={"indicator_score": "new_rank_score"})

    sub_pillar_df = df[columns + ["country_sub_pillar_score"]]
    sub_pillar_df["rank"] = df[["country_sub_pillar_rank"]]
    sub_pillar_df = sub_pillar_df.dropna(subset=["country_sub_pillar_score"])
    sub_pillar_df = sub_pillar_df.drop_duplicates(["Country Name", "Pillar", "Sub-Pillar"], keep="first")
    sub_pillar_df["Indicator"] = ""
    sub_pillar_df["data_col"] = ""
    sub_pillar_df["higher_is_better"] = ""
    sub_pillar_df["Data Source"] = ""
    sub_pillar_df["Data Link"] = ""
    sub_pillar_df["Year"] = ""
    sub_pillar_df = sub_pillar_df.rename(columns={"country_sub_pillar_score": "new_rank_score"})

    pillar_df = df[columns + ["country_pillar_score", "UN Member States"]]
    pillar_df["rank"] = df[["country_pillar_rank"]]
    pillar_df = pillar_df.dropna(subset=["country_pillar_score"])
    pillar_df = pillar_df.drop_duplicates(["Country Name", "Pillar"], keep="first")
    pillar_df["Indicator"] = ""
    pillar_df["Sub-Pillar"] = ""
    pillar_df["data_col"] = ""
    pillar_df["higher_is_better"] = ""
    pillar_df["Data Source"] = ""
    pillar_df["Data Link"] = ""
    pillar_df["Year"] = ""
    pillar_df["data_availability"] = df["country_pillar_availability"]
    pillar_df = pillar_df.rename(columns={"country_pillar_score": "new_rank_score"})

    country_df = get_country_rank(pillar_df)

    roll_df = pd.concat([country_df, pillar_df, sub_pillar_df, indicator_df], axis=0)
    roll_df = roll_df.reset_index(drop=True)

    roll_df = roll_df[columns_order]

    roll_df.to_csv("Processed/Full Data/full_output_rolling.csv", index=False)
    # Copying this file to the UI directory so that the dashboard re-builds/deploys with the new data.
    #roll_df.to_csv("../ui/database/raw/scores.csv", index=False)


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

    load_weights()
    prep_total_indicator_map(full_df)
    prep_total_sub_pillar_map(full_df)
    prep_pillar_count(full_df)

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

    full_df1 = full_df.drop(['UN Member States'], axis=1)

    full_df1.to_csv("Processed/Full Data/full_data.csv", index=False)
    # print(full_df.head(170).to_string())

    save_roll_csv(full_df)


if __name__ == "__main__":
    process_aggregated(
        ["Country Name", "Year", "Indicator", "data_col", "new_rank_score", "higher_is_better", "Pillar", "Sub-Pillar", 'UN Member States'],
        "Processed/Full Data/output.csv"
    )
