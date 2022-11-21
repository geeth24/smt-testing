import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import NewSlotModal from "../../components/dashboard/NewSlotModal";
import Link from "next/link";

const navigation = [{ name: "Home", href: "#", icon: HomeIcon, current: true }];
const teams = [
  { name: "Thanksgiving", href: "#", bgColorClass: "bg-orange-500" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testingSeason, setTestingSeason] = useState("");

  const [results, setResults] = useState({});
  const [resultsArray, setResultsArray] = useState([] as any);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);

  const getResults = async () => {
    // e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const cycleRef = doc(db, "testingSeason", "current");
      const cycleSnapshot = await getDoc(cycleRef);
      const cycleData = cycleSnapshot.data();

      const resultsRef = collection(db, cycleData?.currentSeason);

      const q = query(resultsRef, where("grades", "array-contains", 1));

      const resultsSnap = await getDocs(resultsRef);
      const resultsList = resultsSnap.docs.map((doc) => doc.data());
      setResults(resultsList);
      setResultsArray(resultsList);
      console.log(resultsList);
      console.log("jjjj");
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const getSeason = async () => {};

  useEffect(() => {
    getSeason();
    getResults();
    // console.log(results);
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-slate-800">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-red-200 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="/smtlogo.png"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="px-2">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-600 hover:text-slate-900 hover:bg-red-200",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-slate-500"
                                  : "text-slate-400 group-hover:text-slate-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-8">
                        <h3
                          className="px-3 text-sm font-medium text-slate-500"
                          id="mobile-teams-headline"
                        >
                          Cycle
                        </h3>
                        <div
                          className="mt-1 space-y-1"
                          role="group"
                          aria-labelledby="mobile-teams-headline"
                        >
                          {teams.map((team) => (
                            <Link
                              key={team.name}
                              href={team.href}
                              className="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-slate-600 hover:bg-slate-400 hover:text-slate-900"
                            >
                              <span
                                className={classNames(
                                  team.bgColorClass,
                                  "w-2.5 h-2.5 mr-4 rounded-full"
                                )}
                                aria-hidden="true"
                              />
                              <span className="truncate">{team.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-600 bg-slate-800 lg:pt-5 lg:pb-4">
          <div className="flex flex-shrink-0 items-center px-6">
            <Link href="/">
              <img
                className="h-10 w-auto"
                src="/smtlogo.png"
                alt="Your Company"
              />
            </Link>
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
            {/* User account dropdown */}
            <Menu as="div" className="relative inline-block px-3 text-left">
              <div>
                <Menu.Button className="group w-full rounded-md bg-slate-300 px-3.5 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-100">
                  <span className="flex w-full items-center justify-between">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <img
                        className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-300"
                        src="https://images.unsplash.com/photo-1668877334122-b60dd15bc1b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                        alt=""
                      />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-slate-900">
                          Dev Team
                        </span>
                        <span className="truncate text-sm text-slate-500">
                          @dev
                        </span>
                      </span>
                    </span>
                    <ChevronUpDownIcon
                      className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-slate-200 rounded-md focus:rounded-md bg-slate-400 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={classNames(
                          active
                            ? "bg-red-100 text-slate-900"
                            : "text-slate-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Logout
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* Sidebar Search */}
            <div className="mt-5 px-3">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  aria-hidden="true"
                >
                  <MagnifyingGlassIcon
                    className="mr-3 h-4 w-4 text-slate-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-slate-300 pl-9 focus:border-red-500 focus:ring-red-500 sm:text-sm bg-slate-600 text-slate-200"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* Navigation */}
            <nav className="mt-6 px-3">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-slate-200 text-slate-900"
                        : "text-slate-300 hover:text-slate-900 hover:bg-red-200",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-slate-500"
                          : "text-slate-500 group-hover:text-slate-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                {/* Secondary navigation */}
                <h3
                  className="px-3 text-sm font-medium text-slate-500"
                  id="desktop-teams-headline"
                >
                  Cycle
                </h3>
                <div
                  className="mt-1 space-y-1"
                  role="group"
                  aria-labelledby="desktop-teams-headline"
                >
                  {teams.map((team) => (
                    <Link
                      key={team.name}
                      href={team.href}
                      className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-400 hover:text-slate-900"
                    >
                      <span
                        className={classNames(
                          team.bgColorClass,
                          "w-2.5 h-2.5 mr-4 rounded-full"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{team.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-slate-600 bg-slate-800 lg:hidden">
            <button
              type="button"
              className="border-r border-slate-600 px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-slate-400 focus-within:text-slate-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-slate-900 placeholder-slate-500 focus:border-transparent focus:placeholder-slate-400 focus:outline-none focus:ring-0 sm:text-sm bg-slate-800"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1668877334122-b60dd15bc1b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-slate-200 rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active
                                ? "bg-red-100 text-slate-900"
                                : "text-slate-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Logout
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-slate-600 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 bg-slate-800">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-medium leading-6 text-slate-50 sm:truncate">
                  Home
                </h1>
              </div>
              <div className="mt-4 flex sm:mt-0 space-x-4 sm:space-x-6">
                <button
                  type="button"
                  className="order-0 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                >
                  New Cycle
                </button>
                <button
                  type="button"
                  className="order-0 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                  onClick={() => setOpen(true)}
                >
                  New Slot
                </button>
                <NewSlotModal
                  open={open}
                  setOpen={setOpen}
                  getResults={getResults}
                />
              </div>
            </div>

            {/* Testing Slots list (only on smallest breakpoint) */}
            <div className=" sm:hidden  bg-slate-700">
              <div className="px-4  sm:px-6 py-4">
                <h2 className="text-base font-medium text-slate-50">
                  Testing Slots
                </h2>
              </div>
              <ul
                role="list"
                className="divide-y divide-slate-400 border-t border-slate-600"
              >
                {resultsArray.map((result: any) => (
                  <li key={result.id}>
                    <Link
                      href="#"
                      className="group flex items-center justify-between px-4 py-4 bg-slate-800 hover:bg-slate-600 sm:px-6"
                    >
                      <span className="flex items-center space-x-3 truncate">
                        <span
                          className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-orange-500"
                          aria-hidden="true"
                        />
                        <span className="truncate text-sm font-medium leading-6 text-slate-50">
                          {result.title}{" "}
                          <span className="truncate font-normal text-slate-400 leading-6">
                            {result.location}
                          </span>
                        </span>
                      </span>
                      <ChevronRightIcon
                        className="ml-4 h-5 w-5 text-slate-400 group-hover:text-slate-500"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testing Slots table (small breakpoint and up) */}
            <div className=" hidden sm:block">
              <div className="inline-block min-w-full border-b border-slate-600 align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-slate-600">
                      <th
                        className="border-b border-slate-600 bg-slate-700 px-6 py-3 text-left text-sm font-semibold text-slate-500 uppercase tracking-wider"
                        scope="col"
                      >
                        <span className="lg:pl-2">Testing Slots</span>
                      </th>
                      <th
                        className="border-b border-slate-600 bg-slate-700 px-6 py-3 text-left text-sm font-semibold text-slate-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Grades
                      </th>
                      <th
                        className="hidden border-b border-slate-600 bg-slate-700 px-6 py-3 text-right text-sm font-semibold text-slate-500 uppercase tracking-wider md:table-cell"
                        scope="col"
                      >
                        Slots
                      </th>
                      <th
                        className="hidden border-b border-slate-600 bg-slate-700 px-6 py-3 text-right text-sm font-semibold text-slate-500 uppercase tracking-wider md:table-cell"
                        scope="col"
                      >
                        Status
                      </th>
                      <th
                        className="border-b border-slate-600 bg-slate-700 py-3 pr-6 text-right text-sm font-semibold text-slate-500 uppercase tracking-wider"
                        scope="col"
                      />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-400 bg-slate-800">
                    {resultsArray.map((result: any) => (
                      <tr key={result.id}>
                        <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-slate-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div
                              className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-orange-600"
                              aria-hidden="true"
                            />
                            <Link
                              href="#"
                              className="truncate hover:text-slate-600 text-slate-50"
                            >
                              <span>
                                {result.title}{" "}
                                <span className="font-normal text-slate-400">
                                  {result.location}
                                </span>
                              </span>
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-red-300">
                          <div className="flex items-center space-x-2">
                            {result.grades?.map((grade: number) => grade + " ")}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-red-300">
                          <div className="flex items-center space-x-2">
                            {result.slotsFilled} / {result.slotsTotal}
                          </div>
                        </td>
                        {result?.status === "Closed" ? (
                          <td className="hidden px-6 py-3 text-sm text-right text-slate-500 md:table-cell">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {result.status}
                            </span>
                          </td>
                        ) : (
                          <td className="hidden px-6 py-3 text-sm text-right text-slate-500 md:table-cell">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {result.status}
                            </span>
                          </td>
                        )}
                        <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                          <Link
                            href="#"
                            className="text-red-300 hover:text-red-300"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
