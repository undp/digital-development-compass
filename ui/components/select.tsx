import { Listbox } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import chevronRight from "../public/chevron-down.svg";

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
  const { value, disabled, onChange, trigger, options, itemRenderer } = props;
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  return (
    <Listbox
      ref={selectRef}
      disabled={disabled}
      value={value}
      onChange={onChange}
      as="div"
      className="relative w-full"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Listbox.Button
        className={`focus:ring disabled:cursor-not-allowed disabled:opacity-75 focus:ring-brand-blue relative w-full h-[53.3px] pl-4 text-left bg-white border-black font- border-2 ${isOpen ? 'border-b-0' : ''} cursor-pointer shadow-sm focus:outline-none sm:text-sm`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Image
            src={chevronRight}
            alt="Chevron Right"
            width={20}
            height={13}
            className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </span>
      </Listbox.Button>
      <Listbox.Options className="absolute w-auto left-0 right-0 py-1 mt-0 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20 border-black border-2 border-t-0">
        {options.map((option) => (
          <Listbox.Option
            className={({ active }) =>
              `cursor-default select-none relative py-4 pr-3 ml-4 flex justify-between border-b border-b-[#d4d6d8] border-gray-300 ${
                active ? 'text-black bg-[#fafafa]' : 'text-black'
              }`
            }
            key={option}
            value={option}
            onClick={() => setIsOpen(!isOpen)}
          >
            {({ selected }) => (
              <> 
                <span className={`block ${selected ? 'font-normal' : 'font-normal'}`}>
                  {itemRenderer(option)}
                </span>
                <span className="flex items-center">
                  <span
                    className={`h-4 w-4 border-2 rounded-sm flex items-center justify-center ${
                      selected ? 'border-[#d12800]' : 'border-[#d12800] bg-white'
                    }`}
                  >
                    {selected && (
                      <svg
                        className="w-3 h-3 text-[#d12800]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </span>
                </span>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
