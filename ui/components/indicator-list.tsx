import { Pillar } from "database/ancillary";
import { Score } from "database/processed/db";
import { roundNumber } from "lib";
import { FaLink } from "react-icons/fa";
import useSWR from "swr";

interface IndicatorListProps {
  country: string;
  pillar: Pillar;
  subpillar: string;
  isShowingRawScores: boolean;
  showIndicators: boolean;
  showMissingIndicators: boolean;
  showSources: boolean;
}

const fetchIndicators = async (
  _: string,
  country: string,
  pillar: string,
  subpillar: string
) => {
  let url = `/api/indicators`;
  let params = { country, pillar, subpillar };
  let stringifiedParams = new URLSearchParams(params).toString();
  // @ts-ignore
  const res = await fetch(`${url}?${stringifiedParams}`);
  return await res.json();
};

export function IndicatorList(props: IndicatorListProps) {
  const {
    country,
    pillar,
    subpillar,
    isShowingRawScores,
    showIndicators,
    showMissingIndicators,
    showSources,
  } = props;
  const { data } = useSWR(
    ["indicators", country, pillar, subpillar],
    fetchIndicators
  );
  if (!data)
    return <p className="text-sm text-gray-600">Loading indicator data...</p>;

  if (!showIndicators)
    return (
      <p className="font-medium text-sm mb-2">
        based on {data.length} indicator
        {data.length === 0 ? "s" : data.length > 1 ? "s" : ""}
      </p>
    );

  return (
    <div>
      <ul className="space-y-2">
        {!showMissingIndicators && data.map((indicator: any) => (
          <Indicator
            key={indicator.Indicator}
            indicator={indicator}
            showSources={showSources}
            isShowingRawScores={isShowingRawScores}
          />
        ))}
        {!showMissingIndicators && (
          <MissingIndicators
            filledIndicators={data}
            country={country}
            pillar={pillar}
            subpillar={subpillar}
            showSources={showSources}
            isShowingRawScores={isShowingRawScores}
          />
        )}
        {showMissingIndicators && (
          <ImIndicators
            country={country}
            pillar={pillar}
            subpillar={subpillar}
            showSources={showSources}
            isShowingRawScores={isShowingRawScores}
          />
        )}
      </ul>
    </div>
  );
}

const fetchIndicatorsForSubpillar = async (
  _: string,
  country: string,
  pillar: string,
  subpillar: string
) => {
  let url = `/api/indicators-for-subpillar`;
  let params = { country, pillar, subpillar };
  let stringifiedParams = new URLSearchParams(params).toString();
  // @ts-ignore
  const res = await fetch(`${url}?${stringifiedParams}`);
  return await res.json();
};
const MissingIndicators = ({
  filledIndicators,
  country,
  pillar,
  subpillar,
  showSources,
  isShowingRawScores,
}: {
  filledIndicators: Score[];
  country: string;
  pillar: Pillar;
  subpillar: string;
  showSources: boolean;
  isShowingRawScores: boolean;
}) => {
  const { data: allIndicators } = useSWR(
    ["indicators", country, pillar, subpillar, true],
    fetchIndicatorsForSubpillar
  );

  if (!allIndicators)
    return (
      <p className="text-sm text-gray-600">Loading missing indicators...</p>
    );

  const missingIndicators = allIndicators
    .filter(
      (indicator: Score) =>
        !filledIndicators.find(
          ({ Indicator }: Score) => Indicator === indicator["Indicator"]
        )
    )
    .map((indicator: Score) => ({
      ...indicator,
      new_rank_score: null,
      data_col: null,
    }));

  return (
    <>
      {missingIndicators.map((indicator: any) => (
        <Indicator
          key={indicator.Indicator}
          indicator={indicator}
          showSources={showSources}
          isShowingRawScores={isShowingRawScores}
        />
      ))}
    </>
  );
};

const fetchimputedIndicators = async (
  _: string,
  country: string,
  pillar: string,
  subpillar: string
) => {
  let url = `/api/indicators-imputed-data`;
  let params = { country, pillar, subpillar};
  let stringifiedParams = new URLSearchParams(params).toString();
  // @ts-ignore
  const res = await fetch(`${url}?${stringifiedParams}`);
  return await res.json();
};
const ImIndicators = ({ 
  country,
  pillar,
  subpillar,
  showSources,
  isShowingRawScores,
}: {
  country: string;
  pillar: Pillar;
  subpillar: string;
  showSources: boolean;
  isShowingRawScores: boolean;
}) => {
  const { data: imputedindicators } = useSWR(
    ["indicators", country, pillar, subpillar],
    fetchimputedIndicators
  );
  console.log('im indicators');
  console.log(imputedindicators);
  if (!imputedindicators)
    return (
      <p className="text-sm text-gray-600">Loading missing indicators...</p>
    );

  const imindicators = imputedindicators
  console.log('imIndicators');
  console.log(imindicators);
  return (
    <>
      {imindicators.map((indicator: any) => (
        <Indicator
          key={indicator.Indicator}
          indicator={indicator}
          showSources={showSources}
          isShowingRawScores={isShowingRawScores}
        />
      ))}
    </>
  );
};
const Indicator = ({
  indicator,
  showSources,
  isShowingRawScores,
}: {
  indicator: Score & { sources: Score[] };
  showSources: boolean;
  isShowingRawScores: boolean;
}) => {
  const hasNoData = indicator.data_col === null;
  // we want to get the source name from the list of sources,
  // but if empty, we need to fall back to the indicator's "Data Source"
  const sources = (indicator.sources || [indicator]).map(indicator => ({
    link: indicator["Data Link"],
    source: indicator["Data Source"],
    year: indicator["Year"]
  })).filter(indicator => indicator.source && indicator.link)
  const value = +(isShowingRawScores
    ? indicator.data_col
    : indicator.new_rank_score);

  return (
    <li className={hasNoData ? "text-slate-500" : ""}>
      <div className="flex items-center justify-between">
        <span className="text-sm">{indicator.Indicator}</span>
        <span className="font-mono text-xs ml-4 flex-shrink-0">
          {hasNoData ? "Data unavailable" : roundNumber(value, 2)}
        </span>
      </div>
      {showSources && sources.length === 0 && (
        <p className="text-xs text-gray-600">Source Data Unavailable</p>
      )}
      {showSources && sources.length > 0 && (
        <ul className="mt-1 mb-2 divide-y-1">
          {sources.map((source, i: number) => {
            return (
              <li className="text-slate-600 underline text-xs mb-3" key={i}>
                <a
                  className="group flex items-center"
                  target="_blank"
                  href={source.link}
                >
                  <FaLink className="group-hover:no-underline mr-1 flex-none" />
                  <span className="group-hover:underline">
                    {source.source}
                  </span> &nbsp; 
                  <span className="group-hover:no-underline">
                    -<em>&nbsp;{source.year}</em>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};