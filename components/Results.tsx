import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NewSlotSignupModal from "./dashboard/NewSlotSignupModal";

interface TestingSlotsProps {
  id: string;
  title: string;
  grades: number[];
  status: string;
  slotsFilled: number;
  slotsTotal: number;
  location: string;
  meetingUrl: string;
  time: string;
  date: string;
}

interface ResultsProps {
  testingSlots: TestingSlotsProps[];
}

export default function Results(props: ResultsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div id="results" className=" max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Available Testing Dates and Times
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300">
          Please select a date and time to schedule your testing session.
        </p>
      </div>

      <div className="overflow-hidden bg-slate-800 shadow rounded-md">
        <ul role="list" className="divide-y divide-slate-200">
          {props.testingSlots.map((slot) => (
            <li key={slot.id}>
              <div className="block hover:bg-slate-700 cursor-pointer">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between mb-5">
                    <p className="truncate text-sm font-medium text-red-300">
                      {slot.title}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      {slot.status === "Open" ? (
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {slot.status}
                        </p>
                      ) : (
                        <p className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          {slot.status}
                        </p>
                      )}
                      <p className="ml-2 inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-slate-800">
                        {slot.slotsFilled}/{slot.slotsTotal} Filled
                      </p>
                      <button
                        onClick={() => setOpen(true)}
                        className="ml-2 inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between sm:max-w-2xl">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-red-100">
                        <UsersIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                          aria-hidden="true"
                        />
                        For Students in Grades{" "}
                        {slot.grades?.map((grade) => grade + ", ")}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-red-100 sm:mt-0 sm:ml-6">
                        <MapPinIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                          aria-hidden="true"
                        />
                        {slot.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-red-100 sm:mt-0">
                      <CalendarIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                      <p>
                        <time dateTime={slot.date}>{slot.date}</time>
                      </p>
                    </div>

                    <div className="mt-2 flex items-center text-sm text-red-100 sm:mt-0">
                      <ClockIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                      <p>
                        <time dateTime={slot.time}>{slot.time}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <NewSlotSignupModal
                open={open}
                setOpen={setOpen}
                slotID={slot.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
