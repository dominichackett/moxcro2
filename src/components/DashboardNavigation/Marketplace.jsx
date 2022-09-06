import { useState } from "react";
import Stickerpack from "./Stickerpack";
import OpenMarket from "./OpenMarket";

const tabs = [
  { name: "Stickerpacks", current: true },
  { name: "OpenMarket", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedTab, setSelectedTab] = useState("Stickerpacks");

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
          defaultValue={"Stickerpacks"}
        >
          {tabs.map((tab) => (
            <a
              key={tab.name}
              onClick={() => {
                setSelectedTab(tab.name);
              }}
            >
              {tab.name}
            </a>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex items-center justify-around"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab.name);
                }}
                className={classNames(
                  selectedTab == tab.name
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 cursor-pointer py-4 px-1 text-center border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
        <main className="flex-1 pb-8">
          <div hidden={selectedTab != "Stickerpacks"}>
            <Stickerpack />
          </div>
          <div hidden={selectedTab != "OpenMarket"}>
            <OpenMarket />
          </div>
        </main>
      </div>
    </div>
  );
}
