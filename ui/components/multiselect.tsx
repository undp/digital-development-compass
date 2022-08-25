import { Popover } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";

interface MultiselectOption {
  id: string;
  label: string;
  description?: string;
}

interface MultiSelectProps {
  label: React.ReactNode;
  trigger: React.ReactNode;
  options: MultiselectOption[];
  value: string[];
  onChange: (newValue: string[]) => void;
}

interface CheckboxProps {
  label: string;
  id: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  description?: string;
}

function Checkbox(props: CheckboxProps) {
  const { label, id, value, onChange, description } = props;
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={value}
          id={id}
          aria-describedby={`${id}-description`}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
          {description && (
            <span id={`${id}-description`} className="text-gray-500 ml-2">
              {description}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}

export function MultiSelect(props: MultiSelectProps) {
  const { label, trigger, options, value, onChange } = props;

  const handleChange = (id: string, checked: boolean) => {
    const newValue = checked
      ? [...value, id]
      : value.filter((item) => item !== id);
    onChange(newValue);
  };

  return (
    <Popover className="relative w-full">
      <p className="text-xs uppercase tracking-wide font-medium text-gray-600 block mb-2">
        {label}
      </p>
      <Popover.Button className="focus:ring disabled:cursor-not-allowed disabled:opacity-75 focus:ring-brand-blue relative w-full py-2 pl-4 text-left bg-white border cursor-pointer shadow-sm focus:outline-none sm:text-sm">
        {trigger}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </Popover.Button>
      <Popover.Panel className="absolute w-auto left-0 right-0 py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-48 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
        <ul>
          {options.map((option) => (
            <li
              key={option.id}
              className="cursor-default select-none relative py-2 pl-4 pr-2 flex items-center"
            >
              <Checkbox
                onChange={(checked) => {
                  handleChange(option.id, checked);
                }}
                value={value.includes(option.id)}
                label={option.label}
                id={option.id}
                description={option.description}
              />
            </li>
          ))}
        </ul>
      </Popover.Panel>
    </Popover>
  );
}
