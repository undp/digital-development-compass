**GITHUB PROCESS DOCUMENTATION**

**1/ Important Folders and Files**

![Graphical user interface, text, application Description automatically
generated](media/image1.png){width="4.192631233595801in"
height="2.3335728346456692in"}

-   All the folders in the score folder are important as they contain
    all the calculations and Python codes.

![Graphical user interface, text, application Description automatically
generated](media/image2.png){width="5.0050656167979in"
height="2.9373370516185475in"}

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

![Graphical user interface, text, application Description automatically
generated](media/image1.png){width="4.192631233595801in"
height="2.3335728346456692in"}

-   The indicator_scores, pillar_scores, subpillar_scores contain csv
    sheets of calculated scores for the pillar/sub-pillar/indicator
    levels.

![](media/image3.png){width="5.989615048118985in"
height="1.703089457567804in"}

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

![Graphical user interface, application Description automatically
generated with medium
confidence](media/image4.png){width="4.763888888888889in"
height="3.0833333333333335in"}

-   In the Filename Matching V7 file, in column AE, there is a record of
    how long the dataset has been. The red highlight indicates that the
    dataset has not been updated by the end of its update cycle (usually
    about one year). In this case go back to the source to find if there
    are new datasets.

![Graphical user interface, text, application Description automatically
generated](media/image5.png){width="6.510574146981627in"
height="2.7014129483814524in"}

-   Data sources can be found in the Data Link column. Always download
    csv or xlsx files. If data cannot be found in these two formats than
    it must be moved to csv file (copying and pasting).

-   It is recommended to check the data update status every three months
    to ensure that data is the most up-to-date.

**3/ Quintile Calculation**

![Graphical user interface, text, application Description automatically
generated](media/image6.png){width="4.132438757655293in"
height="3.0943153980752407in"}

-   Created formulas to convert old value to new value. Create five of
    them, each for one quintile. For example: quintile I of a data range
    will be converted to a new range of 1 to 1.99

![Graphical user interface, application Description automatically
generated](media/image7.png){width="6.752983377077865in"
height="1.7950109361329833in"}

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

![](media/image8.png){width="4.502958223972003in"
height="3.6041666666666665in"}

-   Using purely min-max creates an uneven spread of scores as the
    values from 5 to 5.99 are too dominant.

![](media/image9.png){width="4.973826552930884in"
height="3.3854604111986in"}

-   Using purely quintile creates an arbitrary bucket that makes
    countries in the same quintile have the same score regardless of any
    nuances and discrepancies in raw score.

![](media/image10.png){width="4.683987314085739in"
height="4.1875328083989505in"}

![](media/image11.png){width="3.4072769028871392in"
height="3.7500284339457566in"}

-   Using the above method which combines both min-max and quintile
    resolves the issues of both. The result is a dataset much more
    evenly spread but also able to reflect the nuances and discrepancies
    each raw score has.
