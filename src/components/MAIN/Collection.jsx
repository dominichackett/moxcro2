import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChartPieIcon,
  ClipboardIcon,
  ClockIcon,
  CreditCardIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
  HomeIcon,
  MenuAlt1Icon,
  ScaleIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import Image from "next/image";
import Collection from "../DashboardNavigation/Collection";
import { useChain, useMoralis } from "react-moralis";

const navigation = [
  { name: "Account", href: "/", icon: HomeIcon, current: true },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: CreditCardIcon,
    current: false,
  },
  { name: "Collection", href: "/collection", icon: ScaleIcon, current: false },
  { name: "Manager", href: "/manager", icon: ClockIcon, current: false },
  { name: "Insights", href: "/insights", icon: ChartPieIcon, current: false },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: ClipboardIcon,
    current: false,
  },
  { name: "Matches", href: "/matches", icon: GlobeAltIcon, current: false },
  { name: "Teams", href: "/teams", icon: UserGroupIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { user, logout } = useMoralis();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Collection");

  const [cronos, setCronos] = useState(true);

  return (
    <>
      <div className="min-h-full w-full">
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
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
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
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-10 w-auto"
                      src="/wildcardlogo.png"
                      alt="Easywire logo"
                    />
                  </div>
                  <nav
                    className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1">
                      {navigation.map((tab) => (
                        <a
                          key={tab.name}
                          onClick={() => {
                            setSelectedTab(tab.name);
                          }}
                          href={tab.href}
                          className={classNames(
                            selectedTab == tab.name
                              ? "bg-cyan-800 text-white"
                              : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          aria-current={tab.current ? "page" : undefined}
                        >
                          <tab.icon
                            className={classNames(
                              selectedTab == tab.name
                                ? "text-white group-hover:text-white"
                                : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {tab.name}
                        </a>
                      ))}
                    </div>
                    {/* <div className="mt-6 pt-6">
                      <div className="px-2 space-y-1">
                        {secondaryNavigation.map((tab) => (
                          <a
                            key={tab.name}
                            href={item.href}
                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                          >
                            <tab.icon
                              className={classNames(
                                selectedTab == tab.name
                                  ? "text-indigo-500 group-hover:text-indigo-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {tab.name}
                          </a>
                        ))}
                      </div>
                    </div> */}
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-10 w-auto"
                src="/wildcardlogo.png"
                alt="Easywire logo"
              />
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((tab) => (
                  <a
                    key={tab.name}
                    onClick={() => {
                      setSelectedTab(tab.name);
                    }}
                    href={tab.href}
                    className={classNames(
                      selectedTab == tab.name
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group cursor-pointer flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <tab.icon
                      className={classNames(
                        selectedTab == tab.name
                          ? "text-white group-hover:text-white"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {tab.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="absolute w-full top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-end sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="ml-4 flex items-center sticky right-2 justify-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 z-50 rounded-full text-gray-400 hover:text-gray-500 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-500 ring-1 focus:ring-cyan-500"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  {cronos ? (
                    <Image
                      src="/cronoslogo.jpeg"
                      width={20}
                      height={20}
                      className="ring-black"
                    />
                  ) : (
                    <div onClick={setNetwork}>
                      <ExclamationCircleIcon
                        width={20}
                        className="text-red-500"
                      />
                    </div>
                  )}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      <img
                        className="h-6 w-auto rounded-full"
                        src="/wildcardround.png"
                        alt=""
                      />
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>

                        {user.get("ethAddress").slice(0, 4).concat("...") +
                          user.get("ethAddress").slice(38, 42)}
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
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
                    <Menu.Items className="origin-top-right cursor-pointer absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 pb-8">
            {/* THIS WHOLE MAIN SECTION HAS BEEN put into DashboardNavigation/ACCOUNT - */}

            <div hidden={selectedTab != "Account"}>
              <Account />
            </div>
            <div hidden={selectedTab != "Marketplace"}>
              <Marketplace />
            </div>
            <div hidden={selectedTab != "Collection"}>
              <Collection />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
