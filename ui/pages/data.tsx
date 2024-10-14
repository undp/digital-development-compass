// import cc from "classcat";
import { SideMenuFilterBadge } from "components/filter-badge";
import { HistogramRangeInput } from "components/histogram-range-input";
import Layout from "components/Layout";
import { ProgressPill } from "components/progress-pill";
import { TableSettingsDialog } from "components/table-settings-dialog";
import { scaleLinear } from "d3-scale";
import { db } from "database";
import { ancillary } from "database/ancillary";
import { isMemberState } from "lib";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import partition from "lodash/partition";
import uniq from "lodash/uniq";
import { matchSorter } from "match-sorter";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DataGrid, { Column, FormatterProps } from "react-data-grid";
import { OverflowList } from "react-overflow-list";
// import chevronDown from "../public/chevron-down.svg";
import { Select } from "components/select";

type SortDirection = "ASC" | "DESC";

interface SortColumn {
  columnKey: string;
  direction: SortDirection;
}
interface AppliedFilter {
  label: string;
  value: string;
  onReset: () => void;
}

function filterPillarByRange(datum: any, pillar: string, range?: number[]) {
  if (!range) return true;
  return (
    datum.scores[pillar].score >= range[0] &&
    datum.scores[pillar].score <= range[1]
  );
}

function NoRows() {
  return (
    <div className="p-4 text-sm text-gray-600 w-full">
      No countries matched your query.
    </div>
  );
}

export default function Data(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = props;
  let layoutCountries = useMemo(() => {
    return data.map((c) => {
      return {
        name: c.name,
        alpha2: c.alpha2,
        alpha3: c.alpha3,
      };
    });
  }, []);

  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    showHeatmap: true,
    showConfidence: true,
  });

  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [columnSettings, setColumnSettings] = useState<ColumnSetting[]>([
    { name: "Income", key: "income", visible: true },
    { name: "Region", key: "region", visible: true },
    { name: "Sub-region", key: "subregion", visible: true },
    ...ancillary.pillarNames
      .filter((p) => p !== "Overall")
      .map((pillar) => ({
        name: pillar,
        key: `scores.${pillar}.score`,
        width: 100,
        visible: true
      })),
      ...(process.env.SITE_CONFIG === "dev"
      ? ancillary.digitalRightPillarName.map((pillar) => ({
          name: pillar,
          key: `scores.${pillar}.score`,
          width: 100,
          visible: true,
        }))
      : []),
    {
      name: "Small Island Developing States (SIDS)",
      key: "sids",
      visible: true,
    },
    {
      name: "Land Locked Developing Countries (LLDC)",
      key: "lldc",
      visible: true,
    },
    { name: "Least Developed Countries (LDC)", key: "ldc", visible: true },
  ]);

  // Filters
  const [countryFilter, setCountryFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("*");
  const [subregionFilter, setSubregionFilter] = useState("*");

  // const [scoreFilter, setScoreFilter] = useState<
  //   Record<string, number[] | undefined>
  // >({
  //   Economy: undefined,
  //   Government: undefined,
  //   "Digital Public Infrastructure": undefined,
  //   Connectivity: undefined,
  //   People: undefined,
  //   Regulation: undefined,
  //  });

  const pillarNamesLists = db.pillarNames.filter(
    (pillar) => pillar !== "Overall"
  );
  const initialScoreFilterState = pillarNamesLists.reduce(
    (acc: any, pillar) => {
      acc[pillar] = undefined;
      return acc;
    },
    {}
  );

  const [scoreFilter, setScoreFilter] = useState<
    Record<string, number[] | undefined>
  >(initialScoreFilterState);

  const columns: Column<(typeof data)[0]>[] = useMemo(() => {
    return [
      {
        key: "name",
        name: "Name",
        width: 240,
        frozen: true,
        formatter(props) {
          return (
            <div className="h-full flex items-center px-2">
              <span
                className={`flex-shrink-0 fp ${props?.row?.alpha2?.toLowerCase()}`}
              ></span>
              <span className="ml-2 truncate">
                <Link href={`/country/${props.row.alpha3}`}>
                  <a className="hover:underline">{props.row.name}</a>
                </Link>
              </span>
            </div>
          );
        },
      },
      {
        key: "income",
        name: "Income",
        width: 200,
      },
      {
        key: "region",
        name: "Region",
        width: 100,
      },
      {
        key: "subregion",
        name: "Sub-region",
        width: 200,
      },
      {
        key: "sids",
        name: "SIDS",
        width: 100,
        formatter: (props) => {
          return (
            <div className="pt-px">
              {props.row.sids ? (
                <span className="text-lg">☑</span>
              ) : (
                <span className="text-lg text-gray-300">☒</span>
              )}
            </div>
          );
        },
      },
      {
        key: "lldc",
        name: "LLDC",
        width: 100,
        formatter: (props) => {
          return (
            <div className="pt-px">
              {props.row.lldc ? (
                <span className="text-lg">☑</span>
              ) : (
                <span className="text-lg text-gray-300">☒</span>
              )}
            </div>
          );
        },
      },
      {
        key: "ldc",
        name: "LDC",
        width: 100,
        formatter: (props) => {
          return (
            <div className="pt-px">
              {props.row.ldc ? (
                <span className="text-lg">☑</span>
              ) : (
                <span className="text-lg text-gray-300">☒</span>
              )}
            </div>
          );
        },
      },
      ...ancillary.pillarNames
        .filter((p) => p !== "Overall")
        .map((pillar) => {
          const pillarColor = ancillary.pillarColorMap[pillar].base;

          const bgScale = scaleLinear<string>()
            .domain([0, 5])
            .range(["#fff", pillarColor]);

          return {
            width: 190,
            key: `scores.${pillar}.score`,
            name: pillar,
            cellClass: `p-0`,
            headerCellClass: "text-right",
            formatter(props: FormatterProps<(typeof data)[0]>) {
              // @ts-ignore
              let score = props.row.scores[pillar].score;
              let confidence;
              confidence =
                // @ts-ignore
                !props.row.scores[pillar].confidence
                  ? null
                  : // @ts-ignore
                    props.row.scores[pillar].confidence;

              return (
                <div className="relative px-2 h-full group z-0">
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-80"
                    style={{
                      backgroundColor: displaySettings.showHeatmap
                        ? bgScale(score || 0)
                        : "transparent",
                    }}
                  ></div>
                  <div className="flex h-full items-center justify-between z-10">
                    {!!confidence && displaySettings.showConfidence && (
                      <ProgressPill
                        bar="white"
                        background={pillarColor}
                        border={pillarColor}
                        value={confidence}
                        label={`${Math.ceil(confidence)}%`}
                      />
                    )}
                    <p className="text-right flex-1 text-[16px] leading-[137.5%] tracking-0">{score}</p>
                  </div>
                </div>
              );
            },
          };
        }),
       ...(process.env.SITE_CONFIG === "dev"
       ? ancillary.digitalRightPillarName.map((pillar) => {
        const pillarColor = ancillary.digitalRightPillarColorMap[pillar].base;

        const bgScale = scaleLinear<string>()
          .domain([0, 5])
          .range(["#fff", pillarColor]);

        return {
          width: 190,
          key: `scores.${pillar}.score`,
          name: pillar,
          cellClass: `p-0`,
          headerCellClass: "text-right",
          formatter(props: FormatterProps<(typeof data)[0]>) {
            // @ts-ignore
            let score = props.row.digitalRightScores[pillar].score;
            let confidence;
            confidence =
              // @ts-ignore
              !props.row.digitalRightScores[pillar].confidence
                ? null
                : // @ts-ignore
                  props.row.digitalRightScores[pillar].confidence;

            return (
              <div className="relative px-2 h-full group z-0">
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-80"
                  style={{
                    backgroundColor: displaySettings.showHeatmap
                      ? bgScale(score || 0)
                      : "transparent",
                  }}
                ></div>
                <div className="flex h-full items-center justify-between z-10">
                  {!!confidence && displaySettings.showConfidence && (
                    <ProgressPill
                      bar="white"
                      background={pillarColor}
                      border={pillarColor}
                      value={confidence}
                      label={`${Math.ceil(confidence)}%`}
                    />
                  )}
                  <p className="text-right flex-1 text-[16px] leading-[137.5%] tracking-0">{score}</p>
                </div>
              </div>
            );
          },
        };
        
      }):[])
    ];
  }, [displaySettings]);

  const maybeFilteredRows = useMemo(() => {
    const byName = matchSorter(data, countryFilter, { keys: ["name"] });
    return byName
      .filter((datum) => regionFilter === "*" || datum.region === regionFilter)
      .filter(
        (datum) =>
          subregionFilter === "*" || datum.subregion === subregionFilter
      )
      .filter((datum) => {
        return pillarNamesLists.every((pillar) =>
          filterPillarByRange(datum, pillar, scoreFilter[pillar])
        );
      });
  }, [countryFilter, scoreFilter, regionFilter, subregionFilter]);

  const sortedAndFiltered = useMemo(() => {
    if (sortColumns.length === 0) return maybeFilteredRows;
    return orderBy(
      maybeFilteredRows,
      (d) => {
        const value = get(d, sortColumns[0]?.columnKey);
        const customSortFunction =
          customSortFunctions[sortColumns[0]?.columnKey];
        if (customSortFunction)
          return customSortFunction(
            value,
            sortColumns[0]?.direction.toLowerCase()
          );
        return value === null
          ? Infinity *
              (sortColumns[0]?.direction.toLowerCase() === "desc" ? -1 : 1)
          : value;
      },
      // @ts-ignore
      sortColumns.map((sort) => sort.direction.toLowerCase())
    );
  }, [sortColumns, maybeFilteredRows]);

  const countries = useMemo(() => {
    return uniq(data.map((c) => c.name
  ).filter(Boolean));
  }, []);

  const regions = useMemo(() => {
    return uniq(data.map((c) => c.region).filter(Boolean));
  }, []);

  const subRegions = useMemo(() => {
    if (regionFilter === "*") return [];
    return uniq(
      data.filter((c) => c.region === regionFilter).map((c) => c.subregion)
    );
  }, [regionFilter]);

  const subregionSelectDisabled = regionFilter === "*";

  useEffect(() => {
    // @ts-ignore
    if (subregionFilter !== "*" && !subRegions.includes(subregionFilter)) {
      setSubregionFilter("*");
    }

    if (typeof window === "undefined") return;
  }, [regionFilter, subregionFilter, setSubregionFilter]);

  const personalizedColumns = useMemo(() => {
    const [unsortable, sortable] = partition(
      columns,
      (c) => !Boolean(columnSettings.find((setting) => setting.key === c.key))
    );

    const filteredAndSorted = sortable
      .filter((column) => {
        const match = columnSettings.find(
          (setting) => setting.key === column.key
        );
        if (!match) return true;
        return match.visible;
      })
      .sort((a, b) => {
        return (
          columnSettings.findIndex((s) => s.key === a.key) -
          columnSettings.findIndex((s) => s.key === b.key)
        );
      });

    return [...unsortable, ...filteredAndSorted];
  }, [columns, columnSettings]);

  const appliedFilters = useMemo(() => {
    return [
      countryFilter  !== "*"
        ? {
            label: "Country",
            value: countryFilter,
            onReset: () => setCountryFilter(""),
          }
        : false,
      regionFilter !== "*"
        ? {
            label: "Region",
            value: regionFilter,
            onReset: () => setRegionFilter("*"),
          }
        : false,
      subregionFilter !== "*"
        ? {
            label: "Sub-region",
            value: subregionFilter,
            onReset: () => setSubregionFilter("*"),
          }
        : false,
      ...Object.keys(scoreFilter).map((pillar) => {
        const value = scoreFilter[pillar];

        if (!value) return false;
        if (value[0] === 1 && value[1] === 6) return false;

        return {
          label: pillar,
          value: `${value[0].toFixed(1)} - ${value[1].toFixed(1)}`,
          onReset: () =>
            setScoreFilter((curr) => {
              return {
                ...curr,
                [pillar]: undefined,
              };
            }),
        };
      }),
    ].filter(Boolean);
  }, [
    regionFilter,
    subregionFilter,
    scoreFilter,
    countryFilter,
    setCountryFilter,
  ]) as AppliedFilter[];

  const createHistogramInputs = () => {
    return pillarNamesLists.map((pillarName) => {
      const scores = useMemo(() => {
        return data.map((datum: any) => datum.scores[pillarName]?.score || 0);
      }, [data]);

      return (
        <HistogramRangeInput
          key={pillarName}
          onChange={(value) =>
            setScoreFilter((curr) => ({
              ...curr,
              [pillarName]: value,
            }))
          }
          label={`${pillarName} Score`}
          data={scores}
          value={scoreFilter[pillarName]}
        />
      );
    });
  };

  return (
    <Layout title="Data" countries={layoutCountries}>
      <div className="sm:flex-col md:flex md:flex-row md:h-screen  md:overflow-hidden">
        <aside className="h-full w-full md:w-[300px] border-b md:border-r flex-shrink-0 md:h-full overflow-y-auto pt-[40px]">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                {/* <label
                  className="select-none font-medium text-sm mb-1 inline-block text-gray-600"
                  htmlFor="country"
                >
                  Country Name
                </label> */}
                {/* <input
                  id="country"
                  className="form-input text-sm placeholder-black placeholder-bold border-black border-2 w-full pl-4 placeholder-bold-text"
                  type="text"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  placeholder="COUNTRY NAME"
                /> */}
              </div>
              <div>
                <div className="relative">
                  <Select
                    value={countryFilter}
                    onChange={setCountryFilter}
                    label="country"
                    trigger={
                      countryFilter == "" ? (
                        <span className="text-[16px] text-black font-semibold  uppercase">
                        COUNTRY NAME
                      </span>
                      ) : (
                        <span className="text-[16px] text-black font-semibold  uppercase">
                        COUNTRY NAME (1)
                      </span>
                      )
               
                    }
                    itemRenderer={(option) => {
                      return (
                          <span className="text-[16px] font-normal">
                            {option}
                          </span>
                      );
                    }}
                    // @ts-ignore
                    options={countries}
                  ></Select>
                  <OverflowList
                    items={appliedFilters}
                    className="flex-1 ml-4 md:ml-1 pt-2 flex items-center space-x-2 flex-nowrap"
                    itemRenderer={(item) => {
                      if (item.label == "Country" && item.value !="") {
                        return (
                          <div className="flex-shrink-0" key={item.label}>
                            <SideMenuFilterBadge
                              value={item.value}
                              onClick={item.onReset}
                              label={item.label}
                            />
                          </div>
                        );
                      }
                    }}
                    overflowRenderer={(items) => {
                      return (
                        <div>
                          <span className="text-sm text-gray-600">
                            + {items.length} more
                          </span>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div>
                {/* <label
                  className="select-none font-medium text-sm mb-1 inline-block text-gray-600"
                  htmlFor="country"
                >
                  Region
                </label> */}
                <div className="relative">
                  <Select
                    value={regionFilter}
                    onChange={setRegionFilter}
                    label="Region"
                    trigger={
                      regionFilter == "*" ? (
                        <span className="text-[16px] text-black font-semibold  uppercase">
                        REGION
                      </span>
                      ) : (
                        <span className="text-[16px] text-black font-semibold  uppercase">
                        REGION (1)
                      </span>
                      )
               
                    }
                    itemRenderer={(option) => {
                      return (
                        <div>
                          <span className="text-[16px] font-normal ">
                            {option}
                          </span>
                        </div>
                      );
                    }}
                    // @ts-ignore
                    options={regions}
                  ></Select>
                  <OverflowList
                    items={appliedFilters}
                    className="flex-1 ml-4 md:ml-1 pt-2 flex items-center space-x-2 flex-nowrap"
                    itemRenderer={(item) => {
                      if (item.label == "Region") {
                        return (
                          <div className="flex-shrink-0" key={item.label}>
                            <SideMenuFilterBadge
                              value={item.value}
                              onClick={item.onReset}
                              label={item.label}
                            />
                          </div>
                        );
                      }
                    }}
                    overflowRenderer={(items) => {
                      return (
                        <div>
                          <span className="text-sm text-gray-600">
                            + {items.length} more
                          </span>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div>
                <Select
                  value={subregionFilter}
                  onChange={setSubregionFilter}
                  label="Region"
                  disabled={subregionSelectDisabled}
                  trigger={
                    subregionFilter == "*" ? (
                      <span className="text-[16px] text-black font-semibold uppercase py-[2px]">
                      SUB-REGION
                    </span>
                    ) : (
                      <span className="text-[16px] text-black font-semibold uppercase py-[2px]">
                      SUB-REGION (1)
                    </span>
                    )
                  }
                  itemRenderer={(option) => {
                    return (
                        <span className="text-[16px] font-normal">
                          {option}
                        </span>
                    );
                  }}
                  // @ts-ignore
                  options={subRegions}
                ></Select>
                <OverflowList
                  items={appliedFilters}
                  className="flex-1 ml-4 md:ml-1 pt-2 flex items-center space-x-1 flex-nowrap"
                  itemRenderer={(item) => {
                    if (item.label == "Sub-region") {
                      return (
                        <div className="flex-shrink-0" key={item.label}>
                          <SideMenuFilterBadge
                            value={item.value}
                            onClick={item.onReset}
                            label={item.label}
                          />
                        </div>
                      );
                    }
                  }}
                  overflowRenderer={(items) => {
                    return (
                      <div>
                        <span className="text-sm text-gray-600">
                          + {items.length} more
                        </span>
                      </div>
                    );
                  }}
                />
              </div>
              <div className="grid grid-cols-2 items-center md:grid-cols gap-x-10">
                {createHistogramInputs()}
              </div>
            </div>
          </div>
        </aside>
        <div className="md:flex-1 md:flex md:flex-col overflow-auto">
          <div className="h-16 px-3 sm:px-3 md:px-4 lg:px-4 w-full flex flex-shrink-0 border-b bg-gray-50">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {sortedAndFiltered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{data.length} countries</span>
                </p>
              </div>
              {/* <div className="flex-shrink-0">
                <OverflowList
                  items={appliedFilters}
                  className="flex-1 ml-4 md:ml-1 flex items-center space-x-2 flex-nowrap"
                  itemRenderer={(item) => {
                    return (
                      <div className="flex-shrink-0" key={item.label}>
                        <FilterBadge
                          value={item.value}
                          onClick={item.onReset}
                          label={item.label}
                        />
                      </div>
                    );
                  }}
                  overflowRenderer={(items) => {
                    return (
                      <div>
                        <span className="text-sm text-gray-600">
                          + {items.length} more
                        </span>
                      </div>
                    );
                  }}
                />
              </div> */}
              <div className="ml-auto flex-shrink-0">
                <TableSettingsDialog
                  onColumnSettingsChange={setColumnSettings}
                  columnSettings={columnSettings}
                  displaySettings={displaySettings}
                  onDisplaySettingsChange={setDisplaySettings}
                />
              </div>
              &nbsp;
              <Link href="/disclaimer">
                <a className="ml-0 md:ml-1 select-none text-sm text-gray-900">
                  Disclaimer
                </a>
              </Link>
            </div>
          </div>
          <div
            className="hidden md:block flex-1 flex-col z-0" // Set to a positive value or 0 if no overlap is needed
          >
            <DataGrid
              defaultColumnOptions={{
                sortable: true,
                resizable: true,
              }}
              sortColumns={sortColumns}
              onSortColumnsChange={setSortColumns}
              className="h-full border-none rdg-light data-table"
              columns={personalizedColumns}
              rows={sortedAndFiltered}
              rowKeyGetter={(row) => row.name}
              components={{ noRowsFallback: <NoRows /> }}
            />
          </div>
        </div>
        <div className="md:hidden h-full border-none rdg-light mb-5 data-table">
          <DataGrid
            defaultColumnOptions={{
              sortable: true,
              resizable: true,
            }}
            sortColumns={sortColumns}
            onSortColumnsChange={setSortColumns}
            columns={personalizedColumns}
            rows={sortedAndFiltered}
            rowKeyGetter={(row) => row.name}
            components={{ noRowsFallback: <NoRows /> }}
          />
        </div>
      </div>
    </Layout>
  );
}

const incomes = [
  "High Income",
  "Upper Middle Income",
  "Lower Middle Income",
  "Low Income",
];
const customSortFunctions: Record<
  string,
  (value: any, direction: string) => any
> = {
  income: (value: any, direction: string) => {
    if (!value) return Infinity * (direction === "asc" ? 1 : -1);
    return incomes.indexOf(value);
  },
};

export const getStaticProps = async () => {
  const data = db.countries.filter(isMemberState).map((country) => {
    return {
      ...country,
      name: country["Country or Area"],
      alpha2: country["ISO-alpha2 Code"],
      alpha3: country["ISO-alpha3 Code"],
      region: country["Region Name"],
      subregion: country["Sub-region Name"],
      income: country["World Bank Income Level"],
      scores: country.scores,
    };
  });

  return {
    props: {
      data,
    },
  };
};
