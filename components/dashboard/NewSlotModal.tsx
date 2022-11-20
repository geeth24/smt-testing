import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";

interface NewSlotModalProps {
  open: boolean;
  setOpen: any;
  getResults: any;
}

export default function NewSlotModal({
  open,
  setOpen,
  getResults,
}: NewSlotModalProps) {
  const [title, setTitle] = useState("");

  const [selectedGrades, setSelectedGrades] = useState([] as any);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [slotsFilled, setSlotsFilled] = useState(0);
  const [slotsTotal, setSlotsTotal] = useState(0);
  const [location, setLocation] = useState("");
  const [meetingURL, setMeetingURL] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    //format the date to be in the format of MM/DD/YYYY
    const formattedDate = date.split("-").reverse().join("/");
    setDate(formattedDate);
    setMeetingURL("https://whereby.com/" + meetingURL);
    console.log("Grades: " + selectedGrades);
    try {
      const resultsRef = await addDoc(collection(db, "thanksgiving"), {
        title,
        grades: selectedGrades,
        time,
        date,
        status,
        slotsFilled,
        slotsTotal,
        location,
        meetingURL,
      });
      await updateDoc(doc(db, "thanksgiving", resultsRef.id), {
        id: resultsRef.id,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
    setOpen(false);
    getResults();

    setTitle("");
    setSelectedGrades([]);
    setTime("");
    setDate("");
    setStatus("");
    setSlotsFilled(0);
    setSlotsTotal(0);
    setLocation("");
    setMeetingURL("");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen justify-center p-4 text-center items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="mt-3 text-left sm:mt-5 ">
                  <div className="flex flex-row items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      New Slot
                    </Dialog.Title>
                    <div className="mt-2">
                      <XMarkIcon
                        className="h-10 w-10 text-red-400 hover:text-red-200 cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Math"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="Grades"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Grades
                    </label>
                    <div className="mt-1">
                      <fieldset className="space-y-5">
                        <div className="grid grid-rows-5 grid-flow-col gap-4">
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-1"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 1]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 1
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-1"
                                className="font-medium text-gray-700"
                              >
                                1st Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-2"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 2]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 2
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-2"
                                className="font-medium text-gray-700"
                              >
                                2nd Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-3"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 3]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 3
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-3"
                                className="font-medium text-gray-700"
                              >
                                3rd Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-4"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 4]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 4
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-4"
                                className="font-medium text-gray-700"
                              >
                                4th Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-5"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 5]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 5
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-5"
                                className="font-medium text-gray-700"
                              >
                                5th Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-6"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 6]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 6
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-6"
                                className="font-medium text-gray-700"
                              >
                                6th Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-7"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 7]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 7
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-7"
                                className="font-medium text-gray-700"
                              >
                                7th Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="grade-8"
                                name="grade"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 8]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 8
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="grade-8"
                                className="font-medium text-gray-700"
                              >
                                8th Grade
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="algebra1"
                                name="algebra1"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 9]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 9
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="algebra1"
                                className="font-medium text-gray-700"
                              >
                                Algebra 1
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="geometry"
                                name="geometry"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 10]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 10
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="geometry"
                                className="font-medium text-gray-700"
                              >
                                Geometry
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="algebra2"
                                name="algebra2"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 11]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 11
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="algebra2"
                                className="font-medium text-gray-700"
                              >
                                Algebra 2
                              </label>
                            </div>
                          </div>

                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="precalculus"
                                name="precalculus"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 12]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 12
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="precalculus"
                                className="font-medium text-gray-700"
                              >
                                Precalculus
                              </label>
                            </div>
                          </div>

                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="calculus"
                                name="calculus"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedGrades([...selectedGrades, 13]);
                                  } else {
                                    setSelectedGrades(
                                      selectedGrades.filter(
                                        (grade: any) => grade !== 13
                                      )
                                    );
                                  }
                                  console.log(selectedGrades);
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="calculus"
                                className="font-medium text-gray-700"
                              >
                                Calculus
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="Time"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Time
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="10:00 AM - 11:00 AM"
                        onChange={(e) => {
                          setTime(e.target.value);
                        }}
                        value={time}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="Date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="11/11/2021"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        value={date}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="Status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Open"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        value={status}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="Slots Filled"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Slots Filled
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="0"
                        onChange={(e) => {
                          //make string into number
                          setSlotsFilled(parseInt(e.target.value));
                        }}
                        value={slotsFilled}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="Slots Total"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Slots Total
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="10"
                        onChange={(e) => {
                          //make string into number
                          setSlotsTotal(parseInt(e.target.value));
                        }}
                        value={slotsTotal}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="Location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Online / Library"
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        value={location}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="Meeting Link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meeting Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      https://whereby.com/
                    </span>
                    <input
                      type="text"
                      name="company-website"
                      id="company-website"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      placeholder="smt1"
                      onChange={(e) => {
                        setMeetingURL(e.target.value);
                      }}
                      value={meetingURL}
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                    onClick={handleClick}
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
