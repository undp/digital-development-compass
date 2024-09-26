import cc from "classcat";
import { Pillar, ancillary } from "database/ancillary";

interface RadioProps {
  value: string;
  label: string;
  onChange: (value: Pillar) => void;
  checked?: boolean;
}

function Radio(props: RadioProps) {
  const { value, label, onChange, checked } = props;
  const activeColor = (ancillary.pillarColorMap as any)[value].base;

  return (
    <label
      className={cc([
        "p-4 font-bold cursor-pointer flex items-center rounded-md overflow-hidden transition-all relative text-sm group border",
      ])}
      style={{
        borderColor: checked ? activeColor : "",
      }}
    >
      <div
        className={cc([
          "absolute w-full h-full inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity flex-shrink-0",
          {
            "!opacity-10": checked,
          },
        ])}
        style={{ backgroundColor: activeColor }}
      ></div>

      <div
        className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
        style={{ backgroundColor: activeColor }}
      ></div>
      <input
        type="radio"
        onChange={(e) => onChange(e.target.value as Pillar)}
        name="pillar-radio"
        value={value}
        className="sr-only"
        aria-labelledby={value}
      />
      <p
        style={{
          color: checked ? activeColor : "",
          fontWeight: checked ? 600 : 600,
        }}
        id={value}
      >
        {label}
      </p>
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
      <h6 className="text-[16px] [line-height:18px] tracking-normal font-bold text-[#333333] block uppercase pb-3">
        Filter by pillar
      </h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
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
