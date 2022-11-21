import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Fragment } from "react";
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Programs", href: "/" },
  { name: "Contact", href: "/" },
];

function Navbar() {
  return (
    <Popover as="header" className="relative">
      <div className="bg-slate-900 pt-6">
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-7 py-2"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="sr-only">Smart Math Tutoring</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="/smtlogo.png"
                      alt=""
                    />
                  </div>
                  <h1 className="text-red-500 text-xl font-bold mt-1">
                    {" "}
                    Testing
                  </h1>
                </div>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-8 md:ml-10 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-white hover:text-slate-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/admin/signin"
              className="inline-flex items-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
            >
              Admin Login
            </Link>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="sr-only">Smart Math Tutoring</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/smtlogo.png"
                    alt=""
                  />
                </div>
                <h1 className="text-red-500 text-xl font-bold mt-1">
                  {" "}
                  Testing
                </h1>
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pt-5 pb-6">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 px-5">
                <Link
                  href="/admin/signin"
                  className="block w-full rounded-md bg-red-600 py-3 px-4 text-center font-medium text-white shadow hover:bg-red-700"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Navbar;
