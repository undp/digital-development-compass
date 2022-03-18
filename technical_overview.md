**1/ Important Folders and Files**

<img width="301" alt="image" src="https://user-images.githubusercontent.com/109564/159045994-0dcfdaf3-dfd3-492d-b462-c874b553bb2f.png">

-   All the folders in the score folder are important as they contain
    all the calculations and Python codes.

<img width="360" alt="image" src="https://user-images.githubusercontent.com/109564/159046033-ff390465-fb4f-4648-914b-b8c101193e25.png">

-   Inside the **notebooks** folder are all the jupyter files that
    contain all the Python scripts. The **Data_Cleaning\_\[Pillar
    Name\]** files contain the codes for each pillar that produce each
    individual pillar/sub-pillar/indicator score. The *Path 1* and *Path
    2* files contain the codes that normalize countries' names and
    combine all the pillar scores to produce one single, completed file
    to be use for the dashboard.

-   Path 1 is used for initial steps which include normalizing
    countries\' names and then combine the files together by pillar
    while Path 2 is to match the file produced in path 1 to the country
    name list so that we can have the final product which is the
    **scores** file. The Non-Index Indicator Calculation file plays the
    same role to that of Path 1 and 2 but applies to non-index
    indicators only.

-   The final product (**scores** file) of Path 1 and 2 is directed to
    the score/country_scores and the dashboard folders. The final
    product of Non-Index Indicator Calculation is directed to only
    score/country_scores though the file has script to produce file to
    dashboard to (though inactive at the moment pending final decision
    whether to incorporate non-index indicators into the dashboard).

<img width="301" alt="image" src="https://user-images.githubusercontent.com/109564/159046060-d05afea7-6212-49c8-84a6-8266bf08d6d1.png">

-   The indicator_scores, pillar_scores, subpillar_scores contain csv
    sheets of calculated scores for the pillar/sub-pillar/indicator
    levels.

<img width="432" alt="image" src="https://user-images.githubusercontent.com/109564/159046073-0d529910-9e89-4a21-bb3b-ef01321eda1a.png">

-   In the country_scores folder, the most important file is **scores**
    (contain all the calculations with normalized countries' names).

    -   **All** is for matching the normalized list of countries with
        all the pillars and sub pillars to create a master list (One
        country will have all the rows for pillars and sub pillars).

    -   **Product** is the calculated pillar scores for each country.

    -   **Total_Scores_V2** is the calculated pillar + sub pillar scores
        for each country, this is the foundational file to be used for
        combining with the official name list to create the final
        product, **scores.**

**2/ Updating Data Best Practices**

<img width="343" alt="image" src="https://user-images.githubusercontent.com/109564/159046206-89db0c09-5263-4de8-9d03-a3fb815a5949.png">

-   In the Filename Matching V7 file, in column AE, there is a record of
    how long the dataset has been. The red highlight indicates that the
    dataset has not been updated by the end of its update cycle (usually
    about one year). In this case go back to the source to find if there
    are new datasets.

<img width="468" alt="image" src="https://user-images.githubusercontent.com/109564/159046492-ea514431-af82-4fd5-85f1-4721f70d32f7.png">

-   Data sources can be found in the Data Link column. Always download
    csv or xlsx files. If data cannot be found in these two formats than
    it must be moved to csv file (copying and pasting).

-   It is recommended to check the data update status every three months
    to ensure that data is the most up-to-date.

**3/ Quintile Calculation**

<img width="297" alt="image" src="https://user-images.githubusercontent.com/109564/159046227-20b71557-34c9-4a4c-ba6d-89d93b6d4b17.png">

-   Created formulas to convert old value to new value. Create five of
    them, each for one quintile. For example: quintile I of a data range
    will be converted to a new range of 1 to 1.99

<img width="485" alt="image" src="https://user-images.githubusercontent.com/109564/159046265-45f6ea22-f084-4cc7-a564-d48cded4cbd2.png">

-   Segmented a data range into quintiles using "quintile" command.
    Assign each quintile a separate name (in this case, first to fifth).

df.loc\[df\[\'data_col\'\] \<= first, \'new_rank_score\'\] =
df\[\'data_col\'\].apply(lambda row: convert_rank_I(row,
old_min=min_rank,old_max=first))

df.loc\[(df\[\'data_col\'\] \> first) & (df\[\'data_col\'\] \<= second),
\'new_rank_score\'\] = df\[\'data_col\'\].apply(lambda row:
convert_rank_II(row, old_min=first,old_max=second))

df.loc\[(df\[\'data_col\'\] \> second) & (df\[\'data_col\'\] \<= third),
\'new_rank_score\'\] = df\[\'data_col\'\].apply(lambda row:
convert_rank_III(row, old_min=second,old_max=third))

df.loc\[(df\[\'data_col\'\] \> third) & (df\[\'data_col\'\] \<= fourth),
\'new_rank_score\'\] = df\[\'data_col\'\].apply(lambda row:
convert_rank_IV(row, old_min=third,old_max=fourth))

df.loc\[df\[\'data_col\'\] \> fourth, \'new_rank_score\'\] =
df\[\'data_col\'\].apply(lambda row: convert_rank_V(row,
old_min=fourth,old_max=max_rank))

df

-   With each quintile assigned, use df.loc to create conditions for the
    data_col column so that any values in the data_col column less than
    or equal to the value of the first quintile will be converted into a
    range of 1-1.99.

-   Repeat this step for the other four quintiles, changing the
    conditions for the data_col column each time to reflect the new
    quintile.

-   **Example:** Using the example of E-waste generated per kilogram

<img width="324" alt="image" src="https://user-images.githubusercontent.com/109564/159046301-b2c56d63-beb1-4b5f-b94c-683b9207d0a8.png">

-   Using purely min-max creates an uneven spread of scores as the
    values from 5 to 5.99 are too dominant.

<img width="358" alt="image" src="https://user-images.githubusercontent.com/109564/159046329-74a1865c-e2da-44be-a2a6-7be01830fef3.png">

-   Using purely quintile creates an arbitrary bucket that makes
    countries in the same quintile have the same score regardless of any
    nuances and discrepancies in raw score.

<img width="337" alt="image" src="https://user-images.githubusercontent.com/109564/159046345-078c9738-a10f-46ec-8367-95f7e71500dd.png">

<img width="246" alt="image" src="https://user-images.githubusercontent.com/109564/159046363-8dbe4045-4d1a-4c05-b480-822d2bf071d1.png">

-   Using the above method which combines both min-max and quintile
    resolves the issues of both. The result is a dataset much more
    evenly spread but also able to reflect the nuances and discrepancies
    each raw score has.
