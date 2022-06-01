import cc from "classcat";
import { pillarColorMap } from "lib";
import { Pillar, ancillary } from "database/ancillary";

interface RadioProps {
  value: string;
  label: string;
  onChange: (value: Pillar) => void;
  checked?: boolean;
}

function Radio(props: RadioProps) {
  const { value, label, onChange, checked } = props;
  const activeColor = pillarColorMap[value];

  return (
    <label
      className={cc([
        "p-2 cursor-pointer flex items-center rounded-md overflow-hidden transition-all relative text-sm group",
      ])}
    >
      <div
        className={cc([
          "absolute w-full h-full inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity",
          {
            "!opacity-20": checked,
          },
        ])}
        style={{ backgroundColor: activeColor.base }}
      ></div>

      <div
        className="w-3 h-3 rounded-full mr-2"
        style={{ backgroundColor: activeColor.base }}
      ></div>
      <input
        type="radio"
        onChange={(e) => onChange(e.target.value as Pillar)}
        name="pillar-radio"
        value={value}
        className="sr-only"
        aria-labelledby={value}
      />
      <p id={value}>{label}</p>
    </label>
  );
}

interface PillarRadioGroupProps {
  value: string;
  onChange: (value: Pillar) => void;
}

export function PillarRadioGroup(props: PillarRadioGroupProps) {
  const { value, onChange } = props;

  return (
    <fieldset>
      <legend className="text-xs uppercase tracking-wide font-medium text-gray-600 block">
        Filter by pillar
      </legend>
      <div className="flex flex-wrap gap-4 mt-2">
        {ancillary.pillarNames.map((pillar) => (
          <Radio
            onChange={onChange}
            checked={pillar === value}
            key={pillar}
            value={pillar}
            label={pillar}
          />
        ))}
      </div>
    </fieldset>
  );
}
