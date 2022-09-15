import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {format} from 'date-fns';

const people = [
  {
    title: "Match 27.10.2022",
  },
  {
    title: "Match 28.10.2022",
  },
  {
    title: "Match 29.10.2022",
  },
  {
    title: "Match 30.10.2022",
  },

  {
    title: "Match",
  },
  {
    title: "Match",
  },
  {
    title: "Match",
  },
  {
    title: "Match",
  },
  {
    title: "Match",
  },
  {
    title: "Match",
  },
  // More people...
];

export default function Example() {
const [matches,setMatches] = useState([]);
const { Moralis } = useMoralis();

useEffect(()=>{
  const Fixture =  Moralis.Object.extend("Fixture");
  const query = new Moralis.Query(Fixture);
  query.ascending("date");
  query.include("team1");
  query.include("team2");
  query.include("stage");

  query.find().then((results)=>{
    let _matches =  [];  
    console.log(results)
    results.forEach((result)=>{
        _matches.push(result);
     })
     setMatches(_matches);
  });
},[]);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {matches.map((match) => (
        <li
          key={match.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-center space-x-6 p-6">
            <p className="mt-1 truncate text-sm text-gray-500">
{format(match.get("date"),'MMMM dd hh:mm a')
 // match.get("date").toString()
}            </p>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <span className="ml-3">{match.get("team1").get("name")}</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <span className="ml-3">{match.get("team2").get("name")}</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
