import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase";

interface NewSlotSignupModalProps {
  open: boolean;
  setOpen: any;
  slotID: string;
}
export default function NewSlotSignupModal({
  open,
  setOpen,
  slotID,
}: NewSlotSignupModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const resultsRef = await addDoc(
        collection(db, "thanksgiving", slotID, "slotSignups"),
        {
          firstName,
          lastName,
          email,
        }
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-bottom transition-all transform bg-slate-800 shadow-xl rounded-2xl">
                <div className="mt-6">
                  <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600">
                    <label
                      htmlFor="first_name"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-slate-800 text-xs font-medium text-slate-200"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="block w-full border-0 p-0 text-white placeholder-slate-400 focus:ring-0 sm:text-sm bg-slate-800"
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600">
                    <label
                      htmlFor="last_name"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-slate-800 text-xs font-medium text-slate-200"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="block w-full border-0 p-0 text-white placeholder-slate-400 focus:ring-0 sm:text-sm bg-slate-800"
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600">
                    <label
                      htmlFor="email"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-slate-800 text-xs font-medium text-slate-200"
                    >
                      Email
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full border-0 p-0 text-white placeholder-slate-400 focus:ring-0 sm:text-sm bg-slate-800"
                      placeholder="janesmith@smt.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <p
                    className="mt-2 text-xs text-gray-300"
                    id="email-description"
                  >
                    We&apos;ll only use this to send the meeting link or
                    location.
                  </p>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                    onClick={handleClick}
                  >
                    Sign up
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
