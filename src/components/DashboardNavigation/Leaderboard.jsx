import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
  {
    address: "0xfe5056..76523",
    rank: "1",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Leaderboard() {
  const { Moralis, user } = useMoralis();

  const [points, setPoints] = useState();

  useEffect(() => {
    // LIMIT TO TOP 10 USERS!

    const _User = new Moralis.Object.extend("_User");
    const _user = new _User();
    const LeaderBoard = Moralis.Object.extend("LeaderBoard");
    const query = new Moralis.Query(LeaderBoard);
    _user.id = user.id;
    // query.equalTo("user", _user);
    query.first().then((results) => {
      if (results) setPoints(results.get("points"));
    });
  }, []);

  return (
    <div className="px-4 mx-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center fixed top-24 bg-white">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">LEADERBOARD</h1>
          <p className="mt-2 text-sm text-gray-700">
            A ranking of all players participating in the wildcard manager
            tournament.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col overflow-hidden">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Address
                    </th>

                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Ranking
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {people.map((person, personIdx) => (
                    <tr key={person.rank}>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        {person.address}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                        )}
                      >
                        # {person.rank}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
