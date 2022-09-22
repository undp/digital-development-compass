import { Listbox } from "@headlessui/react";
import React from "react";
import { HiSelector } from "react-icons/hi";

interface SelectProps<T> {
  value: T;
  options: T[];
  disabled?: boolean;
  onChange: (value: T) => void;
  itemRenderer: (value: T) => React.ReactNode;
  trigger: React.ReactNode;
  label: React.ReactNode;
}

export function Select<T extends string>(props: SelectProps<T>) {
  const { value, disabled, onChange, trigger, label, options, itemRenderer } =
    props;

  return (
    <Listbox disabled={disabled} value={value} onChange={onChange}>
      <div className="relative w-full">
        <Listbox.Label className="text-xs uppercase tracking-wide font-medium text-gray-600 block mb-2">
          {label}
        </Listbox.Label>
        <Listbox.Button className="focus:ring disabled:cursor-not-allowed disabled:opacity-75 focus:ring-brand-blue relative w-full py-2 pl-4 text-left bg-white border cursor-pointer shadow-sm focus:outline-none sm:text-sm">
          {trigger}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute w-auto left-0 right-0 py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
          {options.map((option) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `cursor-default select-none relative py-2 pl-4 pr-2 flex items-center ${active && !selected ? "bg-brand-blue/20" : ""
                } ${selected ? "text-white bg-brand-blue hover:bg-brand:blue" : ""
                }`
              }
              key={option}
              value={option}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                      }`}
                  >
                    {itemRenderer(option)}
                  </span>
                  {selected ? (
                    <span className={`flex-1 text-right`}>✓</span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
