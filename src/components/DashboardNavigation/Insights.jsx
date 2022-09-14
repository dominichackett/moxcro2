import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    player: "0xfe5056..76523",
    points: "1",
    description: "Goal!",
  },
  {
    player: "0xfe5056..76523",
    points: "1",
    description: "Goal!",
  },
  {
    player: "0xfe5056..76523",
    points: "1",
    description: "Goal!",
  },
  {
    player: "0xfe5056..76523",
    points: "1",
    description: "Goal!",
  },
  {
    player: "0xfe5056..76523",
    points: "1",
    description: "Goal!",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Leaderboard() {
  const { Moralis, user } = useMoralis();

  const [selected, setSelected] = useState();
  const [stage, setStage] = useState([]);
  const [stagePoints, setStagePoints] = useState();

  const [players, setPlayers] = useState([]);
  const [points, setPoints] = useState();

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    const Stage = new Moralis.Object.extend("Stage");
    const query = new Moralis.Query(Stage);
    query.ascending();
    query.find().then((results) => {
      let r = [];
      results.forEach((result) => {
        r.push({
          id: result.id,
          Name: result.get("name"),
        });
      });
      setStage(r);
      setSelected(r[0].id);

      //   SET THE STAGE POINTS
      setStagePoints(2000);
    });
  }, []);

  return (
    <div className="px-4 mt-48 mx-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center bg-white">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">INSIGHTS</h1>
          <p className="mt-2 text-sm text-gray-700">
            Breakdown of your gamescore
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {selected?.Name}
        <select
          id="country"
          value={selected}
          onChange={handleChange}
          name="country"
          autoComplete="country-name"
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          {stage.map((team, index) => (
            <option value={team.id}>{team.Name}</option>
          ))}
        </select>
        <div className="flex flex-row items-center">
          <p className="text-base tracking-wide ml-16">
            Points for this Stage:
          </p>
          <p className="text-base tracking-wide ml-4 font-bold">
            {stagePoints}
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
                      Player
                    </th>

                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Points
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Description
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
                        {person.player}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                        )}
                      >
                        {person.points}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                        )}
                      >
                        {person.description}
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
