import { Switch } from "@headlessui/react";
import cc from "classcat";

interface ToggleProps {
  enabled: boolean;
  label: string;
  onChange: (enabled: boolean) => void;
  id: string;
  disabled?: boolean;
}

export function Toggle(props: ToggleProps) {
  const { enabled, onChange, label, id, disabled } = props;
  return (
    <Switch.Group>
      <div className={cc([{ "opacity-50": disabled }, `flex items-center`])}>
        <Switch
          id={id}
          checked={enabled}
          onChange={onChange}
          disabled={props.disabled}
          className={cc([
            {
              "bg-brand-blue-dark": enabled,
              "bg-gray-300": !enabled,
              "cursor-not-allowed": disabled,
            },
            `relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue focus:ring-opacity-50`,
          ])}
        >
          <span
            className={`${
              enabled ? "translate-x-5" : "translate-x-1"
            } inline-block w-2 h-2 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
        <Switch.Label
          className={cc([
            `ml-1 select-none text-sm text-gray-900`,
            {
              "cursor-not-allowed line-through": disabled,
            },
          ])}
        >
          {label}
        </Switch.Label>
      </div>
    </Switch.Group>
  );
}
