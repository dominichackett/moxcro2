import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useMoralis } from "react-moralis";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
  { name: "Christiano Ronaldo" },
];

export default function Example() {
  const { Moralis } = useMoralis();
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [player, setPlayer] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(new Map());

  useEffect(() => {
    const Player = Moralis.Object.extend("Player");
    const query = new Moralis.Query(Player);
    query.find().then((results) => {
      let r = [];
      let rmap = new Map();
      results.forEach((result) => {
        r.push({ id: result.id, Name: result.get("name") });
        rmap[result.get("Player")] = result.id;
      });
      setPlayer(r);
      setSelectedPlayerId(rmap);
      console.log(player);
    });
  }, []);

  return (
    <div className="">
      <Listbox value={selectedPlayer} onChange={setSelectedPlayer}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
            <span className="block truncate">
              {selectedPlayer ? selectedPlayer : "Choose Player"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {player.map((person, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-green-100 text-green-900" : "text-gray-900"
                    }`
                  }
                  value={person.Name}
                >
                  {({ selectedPlayer }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selectedPlayer ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.Name}
                      </span>
                      {selectedPlayer ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
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
      </Listbox>
    </div>
  );
}
