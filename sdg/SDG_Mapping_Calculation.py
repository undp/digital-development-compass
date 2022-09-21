import numpy as np
import pandas as pd

sdgMappingdf =pd.DataFrame(pd.read_excel("Input/Digital Transformation SDG Mapping.xlsx", "SDG Mapping"))

urlCOuntries = 'https://raw.githubusercontent.com/undp/digital-development-compass/main/data/Countries.csv'
countriesdf = pd.read_csv(urlCOuntries)

urlopRolling = 'https://raw.githubusercontent.com/undp/digital-development-compass/main/new_score/Processed/Full%20Data/full_output_rolling.csv'
opRollingdf = pd.read_csv(urlopRolling)
opRollingdf = opRollingdf[opRollingdf['Indicator'].isnull()]
opRollingdf = opRollingdf[opRollingdf['Sub-Pillar'].notnull()]
opRollingdf = opRollingdf[['Country Name', 'Pillar', 'Sub-Pillar', 'new_rank_score']]

mergedRes = pd.merge(sdgMappingdf, opRollingdf, on ='Sub-Pillar')

#mergedRes.to_csv('mergedRes.csv', header=True, index=False)

countriesAtCountry = set()

for i in range(0, len(countriesdf)):
    if countriesdf.iloc[i]['UN Member States'] == 'x':
        countriesAtCountry.add(str(countriesdf.iloc[i]['Country or Area']))

dfFinal = pd.DataFrame(columns=['Country_Name','SDG #', 'SDG_Target', 'Value', 'Weighted_Value'])

SDG_Targets = set()

for country in countriesAtCountry:
    result = mergedRes.loc[mergedRes['Country Name'] == country]
    for i in range(0, len(result)):
        SDG_Targets.add(str(result.iloc[i]['SDG Target']))

    for SDG_Target in SDG_Targets:
        result2 = result.loc[result['SDG Target'] == SDG_Target]
        try:
           weightedavg = np.average(a=result2['new_rank_score'], weights=result2['Weight '])
           for i in range(0, len(result2)):
                dfFinal = dfFinal.append({'Country_Name': country ,'SDG #': result2.iloc[i]['SDG #'], 'SDG_Target': result2.iloc[i]['SDG Target'], 'Value': result2["new_rank_score"].mean(), 'Weighted_Value' : weightedavg}, ignore_index=True)
        except:
           pass

dfFinal = dfFinal.drop_duplicates()
dfFinal['SDG #'] = dfFinal['SDG #'].str.strip()

################################################################################

ReferenceTestdf = pd.DataFrame(pd.read_excel("Input/Digital Transformation SDG Mapping.xlsx", "Reference Test"))

ReferenceTestdf = ReferenceTestdf[['SDG #', 'SDG_Target']]
ReferenceTestdf['SDG #'] = ReferenceTestdf['SDG #'].str.strip()
df2 = pd.DataFrame(columns=['Country_Name', 'SDG #', 'SDG_Target'])

for country in countriesAtCountry:
    for i in range(0, len(ReferenceTestdf)):
        df2.loc[len(df2.index)] = [country, ReferenceTestdf.iloc[i]['SDG #'], ReferenceTestdf.iloc[i]['SDG_Target']]

mergedResult = pd.merge(df2, dfFinal, how="outer")

############################################################################

SDG_Mapping_Calculationdf = mergedResult[['Country_Name', 'SDG #', 'SDG_Target', 'Value', 'Weighted_Value']]

###########################################################################
SDGs = set()

for i in range(0, len(SDG_Mapping_Calculationdf)):
    SDGs.add(str(SDG_Mapping_Calculationdf.iloc[i]['SDG #']))

for country in countriesAtCountry:
    for SDG in SDGs:
        result2 = SDG_Mapping_Calculationdf.loc[(SDG_Mapping_Calculationdf['Country_Name'] == country) & (SDG_Mapping_Calculationdf['SDG #'] == SDG)]
        try:
            SDG_Mapping_Calculationdf = SDG_Mapping_Calculationdf.append({'Country_Name': country, 'SDG #': SDG, 'SDG_Target': '', 'Value': result2["Value"].mean(), 'Weighted_Value': result2["Weighted_Value"].mean()}, ignore_index=True)
        except:
            pass

SDG_Mapping_Calculationdf = SDG_Mapping_Calculationdf.round(decimals=2)

SDG_Mapping_Calculationdf.to_csv('Output/SDG_Mapping_Calculation.csv', header=True, index=False)


