import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const people = [
  { id: 1, grade: "1st Grade" },
  { id: 2, grade: "2nd Grade" },
  { id: 3, grade: "3rd Grade" },
  { id: 4, grade: "4th Grade" },
  { id: 5, grade: "5th Grade" },
  { id: 6, grade: "6th Grade" },
  { id: 7, grade: "7th Grade" },
  { id: 8, grade: "8th Grade" },
  { id: 9, grade: "Algebra 1" },
  { id: 10, grade: "Geometry" },
  { id: 11, grade: "Algebra 2" },
  { id: 12, grade: "Pre-Calculus" },
  { id: 13, grade: "Calculus" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface SelectProps {
  selected: any;
  setSelected: any;
}
export default function Select({ selected, setSelected }: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-white">
            Grade Level
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm">
              <span className="block truncate">{selected.grade}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-red-600" : "text-slate-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {person.grade}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-red-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
