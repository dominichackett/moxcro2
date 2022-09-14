import { useState } from "react";
import Insights from "./Insights";
import Pointcategory from "./Pointcategory";

const tabs = [
  { name: "Insights", current: true },
  { name: "Pointcategory", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedTab, setSelectedTab] = useState("Insights");

  return (
    <div>
      <div className="pt-16">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <nav
          id="tabs"
          name="tabs"
          className="block sr-only w-full fixed top-24 rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
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
        </nav>
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
          <div hidden={selectedTab != "Insights"}>
            <Insights />
          </div>
          <div hidden={selectedTab != "Pointcategory"}>
            <Pointcategory />
          </div>
        </main>
      </div>
    </div>
  );
}
