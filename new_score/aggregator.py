import os

import pandas as pd
import numpy as np

pillars = [
    "business",
    "foundations",
    "government",
    "infrastructure",
    "people",
    "regulation",
    "strategy"
]


def filter_un_countries(df: pd.DataFrame):
    countries_df = pd.read_csv("../data/Countries.csv")
    countries_df = countries_df[["Country or Area", "UN Member States"]]
    countries_df = countries_df.rename(columns={"Country or Area": "Country Name"})
    countryList = ['Kosovo (UNSCR 1244)']

    for country in countryList:
        countries_df.loc[len(df.index)] = [country, 'y']

    # filter UN Member States countries from countries_df
    un_filter = countries_df["UN Member States"].isin(['x', 'y'])
    countries_df = countries_df.where(un_filter)
    countries_df = countries_df.dropna()

    print("Countries from Country.csv :", len(countries_df.index))

    # df columns
    columns = df.columns
    # merge UN Member States to df
    df = df.merge(countries_df, on=["Country Name"], how="left")

    # filter data where UN Member States is NaN
    df = df[df["UN Member States"].notna()]

    print(df.head(10).to_string())

    print(len(df.index))

    names = df[["Country Name"]].drop_duplicates(keep="first")
    print("Countries in final output :", len(names.index))
    # keys = ["Country Name"]
    # i1 = countries_df.set_index(keys).index
    # i2 = names.set_index(keys).index
    # res_df = countries_df[~i1.isin(i2)]
    # print(res_df.to_string())

    return df


def parse_country_names(df: pd.DataFrame):
    df['Country Name'] = df['Country Name'].str.strip()
    df['Country Name'] = df['Country Name'].str.strip('**')
    df['Country Name'] = df['Country Name'].str.strip('*')
    df['Country Name'] = df['Country Name'].str.strip('*')
    df['Country Name'] = df['Country Name'].replace('-', np.nan, regex=False)
    df['Country Name'] = df['Country Name'].replace('0.03', np.nan, regex=False)

    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Bahamas.*$)', 'Bahamas (the)', regex=True)
    df['Country Name'] = df['Country Name'].replace('Bahrain (Kingdom of)', 'Bahrain', regex=False)
    df['Country Name'] = df['Country Name'].replace('Bolivia', 'Bolivia (Plurinational State of)', regex=False)
    df['Country Name'] = df['Country Name'].replace('Bolivia, Plurinational State of',
                                                    'Bolivia (Plurinational State of)', regex=False)
    df['Country Name'] = df['Country Name'].replace('Brunei', 'Brunei Darussalam', regex=False)
    df['Country Name'] = df['Country Name'].replace('Bulgaria (Rep.)', 'Bulgaria', regex=False)
    df['Country Name'] = df['Country Name'].replace('Central African Republic', 'Central African Republic (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace('Central African Rep.', 'Central African Republic (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace("China (People's Rep.)", 'China', regex=False)
    df['Country Name'] = df['Country Name'].replace("Comoros", 'Comoros (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Congo", 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Congo (Brazzaville)", 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Congo (Rep. of the)", 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Congo (Democratic Republic of the)",
                                                    'Democratic Republic of the Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Congo, Dem. Rep.", 'Democratic Republic of the Congo (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace("Congo, The Democratic Republic of the",
                                                    'Democratic Republic of the Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("DR Congo", 'Democratic Republic of the Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Democratic Republic of Congo",
                                                    'Democratic Republic of the Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Democratic Republic of the Congo",
                                                    'Democratic Republic of the Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Dem. Rep. of the Congo", 'Democratic Republic of the Congo (the)',
                                                    regex=False)

    df['Country Name'] = df['Country Name'].replace("Cote d'Ivoire", "Côte d'Ivoire", regex=False)
    df['Country Name'] = df['Country Name'].replace("Côte d’Ivoire", "Côte d'Ivoire", regex=False)
    df['Country Name'] = df['Country Name'].replace("Cote dIvoire", "Côte d'Ivoire", regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r"(^.*Côte d'Ivoire.*$)", "Côte d'Ivoire", regex=True)
    df['Country Name'] = df['Country Name'].replace("Cōte d'Ivoire", "Côte d'Ivoire", regex=False)
    df['Country Name'] = df['Country Name'].replace("Ivory Coast", "Côte d'Ivoire", regex=False)
    df['Country Name'] = df['Country Name'].replace("Dem. People's Rep. of Korea",
                                                    "Democratic People's Republic of Korea (the)", regex=False)
    df['Country Name'] = df['Country Name'].replace("Democratic People's Republic of Korea",
                                                    "Democratic People's Republic of Korea (the)", regex=False)
    df['Country Name'] = df['Country Name'].replace("Korea, Dem. People's Rep.",
                                                    "Democratic People's Republic of Korea (the)", regex=False)
    df['Country Name'] = df['Country Name'].replace("North Korea", "Democratic People's Republic of Korea (the)",
                                                    regex=False)

    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Czech.*$)', 'Czechia', regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Dominican Re.*$)', 'Dominican Republic (the)', regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Hong Kong.*$)',
                                                        'China, Hong Kong Special Administrative Region', regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Hongkong.*$)',
                                                        'China, Hong Kong Special Administrative Region', regex=True)
    df['Country Name'] = df['Country Name'].replace("Eswatini (Kingdom of)", 'Eswatini', regex=False)
    df['Country Name'] = df['Country Name'].replace("Swaziland", 'Eswatini', regex=False)
    df['Country Name'] = df['Country Name'].replace("Faröe Islands", 'Faroe Islands', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Gambia.*$)', 'Gambia (the)', regex=True)
    df['Country Name'] = df['Country Name'].replace("Georgia (Country)", 'Georgia', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Iran.*$)', 'Iran (Islamic Republic of)', regex=True)
    df['Country Name'] = df['Country Name'].replace("Korea", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Korea (Rep. of)", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Korea (Rep.)", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Korea (Republic of)", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Korea, Rep.*$)', 'Republic of Korea (the)', regex=True)
    df['Country Name'] = df['Country Name'].replace("Korea, South", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("South Korea", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Republic of Korea", 'Republic of Korea (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Marshall Islands", 'Marshall Islands (the)', regex=False)

    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Kyrgyz.*$)', 'Kyrgyzstan', regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Lao.*$)', "Lao People's Democratic Republic (the)",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Macao.*$)', "China, Macao Special Administrative Region",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Macau.*$)', "China, Macao Special Administrative Region",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Micronesia.*$)', "Micronesia (Federated States of)",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Moldova.*$)', "Republic of Moldova (the)", regex=True)
    df['Country Name'] = df['Country Name'].replace("Morroco", 'Morocco', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Nepal.*$)', "Nepal", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*New Ze.*$)', "New Zealand", regex=True)
    df['Country Name'] = df['Country Name'].replace("Niger", 'Niger (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Macedonia.*$)', "North Macedonia", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*New Ze.*$)', "New Zealand", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Palestin.*$)', "State of Palestine (the)", regex=True)
    df['Country Name'] = df['Country Name'].replace("West Bank and Gaza", 'State of Palestine (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Panama.*$)', "Panama", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Philippines.*$)', "Philippines (the)", regex=True)
    df['Country Name'] = df['Country Name'].replace("Republic of the Congo", 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Myanmar.*$)', "Myanmar", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Puerto Rico.*$)', "Puerto Rico", regex=True)
    df['Country Name'] = df['Country Name'].replace("Russia", 'Russian Federation (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("Russian Federation", 'Russian Federation (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Slovak.*$)', "Slovakia", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'\bSudan\b', 'Sudan (the)', regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'\bSudan (the)\b', 'Sudan (the)', regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*South Sudan.*$)', "South Sudan", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Syria.*$)', "Syrian Arab Republic (the)", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*São Tomé.*$)', "Sao Tome and Principe", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Taiwan.*$)', "Taiwan", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Taipei.*$)', "Taiwan", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Tanzania.*$)', "United Republic of Tanzania (the)",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Netherlands.*$)', "Netherlands (the)", regex=True)

    df['Country Name'] = df['Country Name'].replace("UAE", 'United Arab Emirates (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("U.A.E", 'United Arab Emirates (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace("United Arab Emirates", 'United Arab Emirates (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('United Kingdom',
                                                    'United Kingdom of Great Britain and Northern Ireland (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace('UK', 'United Kingdom of Great Britain and Northern Ireland (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace("Great Britain",
                                                    'United Kingdom of Great Britain and Northern Ireland (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace("United Kingdom of Great Britain and Northern Ireland",
                                                    'United Kingdom of Great Britain and Northern Ireland (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace('Vietnam', 'Viet Nam', regex=False)
    df['Country Name'] = df['Country Name'].replace('United States', 'United States of America (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('USA', 'United States of America (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('United States of America', 'United States of America (the)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Virgin Islands.*$)', "United States Virgin Islands",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Vatican.*$)', "Vatican", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Venezuela.*$)', "Venezuela (Bolivarian Republic of)",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Yemen.*$)', "Yemen", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Arab world.*$)', "Arab World", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*World.*$)', "World", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Kitts and Nevis.*$)', "Saint Kitts and Nevis", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Lucia.*$)', "Saint Lucia", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Martin (French Part).*$)', "Saint Martin (French Part)",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].replace('Sint Maarten', 'Saint Martin', regex=False)
    df['Country Name'] = df['Country Name'].replace('St. Martin (French part)', 'Saint Martin (French Part)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].replace('Sint Maarten (Dutch part)', 'Saint Martin (Dutch Part)',
                                                    regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Vincent and the Grenadines.*$)',
                                                        "Saint Vincent and the Grenadines", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Verde.*$)', "Cabo Verde", regex=True)
    df['Country Name'] = df['Country Name'].replace('Congo, Democratic Republic',
                                                    'Democratic Republic of the Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('Congo, Rep.', 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('Congo (Rep.)', 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Egypt.*$)', "Egypt", regex=True)

    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Korea, D.*$)',
                                                        "Democratic People's Republic of Korea (the)", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Tobago.*$)', "Trinidad and Tobago", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Timor-Leste.*$)', "Timor-Leste", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Emirates.*$)', "United Arab Emirates (the)", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Papua.*$)', "Papua New Guinea", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Bissau.*$)', "Guinea-Bissau", regex=True)
    df['Country Name'] = df['Country Name'].replace('Eq. Guinea', 'Equatorial Guinea', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Burma.*$)', "Myanmar", regex=True)
    df['Country Name'] = df['Country Name'].replace('C.A. Republic', 'Central African Republic (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('Ant.& Barb.', 'Antigua and Barbuda', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Bosnia.*$)', "Bosnia and Herzegovina", regex=True)
    df['Country Name'] = df['Country Name'].replace('Domin. Rep.', 'Dominican Republic (the)', regex=False)
    df['Country Name'] = df['Country Name'].replace('Dominica (Commonwealth of)', 'Dominica', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*European Union.*$)', "European Union", regex=True)
    df['Country Name'] = df['Country Name'].replace('R. of Congo', 'Congo (the)', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Principe.*$)', "Sao Tome and Principe", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Solomon.*$)', "Solomon Islands", regex=True)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Vincent.*$)', "Saint Vincent and the Grenadines",
                                                        regex=True)
    df['Country Name'] = df['Country Name'].replace('Curacao', 'Curaçao', regex=False)
    df['Country Name'] = df['Country Name'].replace('Reunion', 'Réunion', regex=False)
    df['Country Name'] = df['Country Name'].str.replace(r'(^.*Kosovo.*$)', "Kosovo (UNSCR 1244)", regex=True)

    return df.reset_index(drop=True).dropna()


def aggregate_files(files_dir, headers, output_file, skip_file_names):
    aggr_df = pd.DataFrame(columns=headers)
    directory = os.fsencode(files_dir)

    for file in os.listdir(directory):
        file_name = os.fsdecode(file)
        if file_name.endswith(".csv"):
            # print(file_name)
            file_pillar = file_name.split("_")[0]
            if file_pillar.strip().lower() not in pillars or file_name.strip() in skip_file_names:
                print(file_pillar, file_name)
                continue
            # print(file_name)
            file_df = pd.read_csv(files_dir + "/" + file_name)
            pill_names = [file_pillar.strip().capitalize() for i in range(0, len(file_df.index))]
            file_df["Pillar"] = pill_names
            try:
                file_df = file_df[headers]
            except Exception as ex:
                print(file_name, ":error:", ex)
                continue
            aggr_df = pd.concat([aggr_df, file_df], axis=0, join='outer', ignore_index=True)

    aggr_df = parse_country_names(aggr_df)
    aggr_df = filter_un_countries(aggr_df)

    aggr_df.to_csv(output_file, index=False)


if __name__ == "__main__":
    skip_files = [
        "people_Cyberbullying_scores.csv",
        "business_Doing Business Index_scores.csv",
        "infrastructure_Mobile Coverage Maps_scores.csv",
        "infrastructure_Internet Exchange Points (IXPs) map_scores.csv",
        "infrastructure_Software Developer Ecosystem size_scores.csv"
    ]

    aggregate_files(
        "..\score\indicator_scores",
        ["Country Name", "Year", "Indicator", "data_col", "new_rank_score", "higher_is_better", "Pillar", "Sub-Pillar"],
        "Processed/Full Data/output.csv",
        skip_files
    )
