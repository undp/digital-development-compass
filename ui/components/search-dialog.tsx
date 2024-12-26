import { Dialog, Transition, Combobox } from "@headlessui/react";
import cc from "classcat";
import uniq from "lodash/uniq";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useLocalStorage } from "react-use";
import { matchSorter } from "match-sorter";
//import SearchIcon from "../public/search.svg"
//import Image from "next/image";
import { prefix } from "lib/prefix";

interface SearchDialogProps {
  countries: CountryNameAndAlpha[];
  isOpen?: boolean;
}

interface SearchDialogInnerProps extends SearchDialogProps {
  hideRecent?: boolean;
  onClose: () => void;
}

export function SearchDialogInner(props: SearchDialogInnerProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<CountryNameAndAlpha>();
  const [query, setQuery] = useState("");
  const { countries, onClose, hideRecent } = props;

  const [recentlyVisited, setRecentlyVisited] = useLocalStorage<string[]>(
    "undp-recently-visited",
    []
  );

  const handleSelection = useCallback(
    (country: CountryNameAndAlpha) => {
      setSelected(country);
      
      // Update recentlyVisited array
      const updatedRecentlyVisited = [
        ...(recentlyVisited || []),
        country.alpha3
      ].slice(-8); // Keep only the last 8 elements
      
      setRecentlyVisited(updatedRecentlyVisited);
      
      onClose();
      router.push(`/country/${country.alpha3}`);
    },
    [router, recentlyVisited]
  );

  const filtered = useMemo(() => {
    return matchSorter(countries, query, {
      keys: ["name"],
    });
  }, [query, countries]);

  return (
    <>
      <div className="border-b bg-gray-50">
        <div className="p-4 relative">
          <Combobox value={selected} onChange={handleSelection}>
            <Combobox.Label className="text-xs uppercase tracking-wide font-medium text-gray-600 block mb-2">
              Search countries
            </Combobox.Label>
            <Combobox.Input
              className="form-input text-sm w-full"
              placeholder="Enter country name"
              // @ts-ignore
              displayValue={(country) => country?.name}
              onChange={(event) => setQuery(event.target.value)}
            />

            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute w-auto left-4 right-4 py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-48 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {filtered.length === 0 && query !== "" ? (
                  <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filtered.map((country) => (
                    <Combobox.Option
                      key={country.alpha3}
                      className={({ active, selected }) =>
                      `cursor-default select-none relative py-2 pl-4 pr-4 flex items-center ${active && !selected ? "bg-brand-blue/20" : ""
                    } ${selected
                      ? "text-white bg-brand-blue hover:bg-brand:blue"
                      : ""
                        }`
                      }
                      value={country}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`flex-shrink-0 mr-2 fp fp-rounded ${country?.alpha2?.toLowerCase()}`}
                          ></span>
                          <span
                             className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {country.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute right-4 inset-y-0 flex items-center text-white`}
                            >
                              ✓
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </Combobox>
        </div>
      </div>
      {!hideRecent && (
        <div className="p-4">
          <h4 className="text-xs uppercase tracking-wide font-medium text-gray-600">
            Recently Visited Countries
          </h4>
          {recentlyVisited && recentlyVisited.length > 0 ? (
            <ul className="mt-2 space-y-3">
              {uniq(recentlyVisited).map((alpha3) => {
                const match = countries.find((c) => c.alpha3 === alpha3);
                if (!match) return null;
                return (
                  <li key={alpha3}>
                    <Link href={`/country/${alpha3}`}>
                      <a className="flex items-center space-x-2 group">
                        {match.alpha2 && (
                          <span
                            className={cc([
                              "fp fp-rounded",
                              match.alpha2.toLowerCase(),
                            ])}
                          ></span>
                        )}
                        <span className="group-hover:underline text-sm">
                          {match.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              Countries will appear here after you select them from the dropdown
              above.
            </p>
          )}
        </div>
      )}
    </>
  );
}

export function SearchDialog(props: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  useHotkeys("command+k", () => {
    setOpen(true);
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`header-nav-bg-color font-semibold hover:header-nav-bg-color hover:text-white ${props.isOpen ? 'py-5' : 'py-4'} text-xs uppercase tracking-wide text-brand-blue-dark flex-shrink-0 flex items-center`}
        >
        <img src={`${prefix}/search.svg`}  width={24}
                  height={24} alt="SearchIcon" className="text-base mr-1" />
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        <div className="fixed inset-0 flex items-center md:justify-center p-4">
          <div className="flex min-h-full items-center justify-center w-full max-w-xl">
            <Dialog.Panel className="w-full bg-white rounded-md shadow-xl">
              <Dialog.Title className="sr-only">Search Countries</Dialog.Title>
              <SearchDialogInner
                onClose={() => setOpen(false)}
                countries={props.countries}
              />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
