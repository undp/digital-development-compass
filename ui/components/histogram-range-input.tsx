import { bin, extent, max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import { getTrackBackground, Range } from "react-range";

interface Props {
  data: number[];
  label: string;
  onChange: (values?: number[]) => void;
  value?: number[];
}

export function HistogramRangeInput(props: Props) {
  const { data, label, onChange, value } = props;

  const chartBin = useMemo(() => bin(), []);
  const bins = chartBin(data);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(bins, (d) => d.length)] as number[])
        .range([0, 100]),
    [data]
  );

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(data) as number[])
        .range([0, 100]),
    []
  );
  const rangeValues = value ? [xScale(value[0]), xScale(value[1])] : [0, 100];

  const MIN = 0;
  const MAX = 100;

  const xMin = xScale.invert(rangeValues[0]);
  const xMax = xScale.invert(rangeValues[1]);

  return (
    <div className="max-w-[140px]">
      <div className="mb-2 flex flex-col">
        <label
          className="select-none font-medium text-sm inline-block text-gray-600"
          htmlFor="overall"
        >
          {label}
        </label>
        <span className="text-xs">
          {xMin.toFixed(1)} – {xMax.toFixed(1)}
        </span>
      </div>
      <div className="flex bg-gradient-to-t from-blue-50 h-14 items-end justify-start space-x-[1px]">
        {bins.map((bin, index) => {
          if (!bin) return null;
          const height = yScale(bin.length);
          const [min, max] = extent(bin);

          const isActive = (min as number) >= xMin && (max as number) <= xMax;

          return (
            <div
              className="flex flex-1 items-end justify-center h-full"
              key={index}
            >
              <div
                className={`w-[4px] rounded-full transition-colors ${isActive ? "bg-blue-500" : "bg-blue-100"
                  }`}
                style={{ height: `${height}%` }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <Range
          draggableTrack
          onChange={(newRange) => {
            if (newRange[0] === 0 && newRange[1] === 100) {
              onChange(undefined);
              return;
            }
            const x0 = xScale.invert(newRange[0]);
            const x1 = xScale.invert(newRange[1]);
            onChange([x0, x1]);
          }}
          values={rangeValues}
          min={MIN}
          max={MAX}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "12px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: rangeValues,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-[16px] h-[16px] bg-white shadow rounded-full focus:ring inline-flex items-center justify-center"
            >
              <span className="w-[6px] h-[6px] rounded-full bg-blue-600"></span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
