import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {format} from 'date-fns';

/* This example requires Tailwind CSS v2.0+ */


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Leaderboard() {
  const { Moralis, user } = useMoralis();

  const [selected, setSelected] = useState();
  const [stage, setStage] = useState([]);
  const [stagePoints, setStagePoints] = useState();

  const [players, setPlayers] = useState([]);
  const [formation,setFormation] = useState();
  const [myPoints,setMyPoints] = useState([]);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setFormation(null)
    
  };

  function playerPosition(pos) {
    switch (pos) {
      case 0:
        return "Goalkeeper";
        break;

      case 1:
        return "Defender";
        break;
      case 2:
        return "Midfielder";
        break;

      case 3:
        return "Forward";
        break;
    }
  }

  useEffect(()=>{
     if(selected)
     {
      const Stage = Moralis.Object.extend("Stage");
      const _stage = new Stage();
      _stage.id = selected;

      const MyTeam = Moralis.Object.extend("MyTeam");
      const myTeamQuery = new Moralis.Query(MyTeam);
      myTeamQuery.equalTo("address",user.get("ethAddress"));
      myTeamQuery.equalTo("stage",_stage);
      myTeamQuery.include("player");
      myTeamQuery.include("player.team");
      myTeamQuery.include("formation");
      myTeamQuery.find().then((results)=>{
         if(results[0])
           setFormation(results[0].get("formation"));
         setPlayers(results);
      })
     }
  },[selected])
  useEffect(()=>{


   async function getPoints(){ 
    if(selected)
    {
      const Stage = Moralis.Object.extend("Stage");
      console.log(selected)
      const _stage = new Stage();
      _stage.id = selected;
      const Fixture = Moralis.Object.extend("Fixture")
      const fixtureQuery = new Moralis.Query(Fixture);
      fixtureQuery.equalTo("stage",_stage)

      const Points = Moralis.Object.extend("Points");
      const pointsQuery = new Moralis.Query(Points);
      pointsQuery.include("player");
      pointsQuery.include("player.team");
      pointsQuery.include("fixture");
      pointsQuery.include("fixture.team2");
      pointsQuery.include("fixture.team1");
      pointsQuery.include("category");
      
      const MyTeam = Moralis.Object.extend("MyTeam");

      const myTeamQuery = new Moralis.Query(MyTeam);
      myTeamQuery.equalTo("address",user.get("ethAddress"));
      pointsQuery.matchesKeyInQuery("fixture","objectId", fixtureQuery);
      pointsQuery.matchesKeyInQuery("player","player",myTeamQuery)
      
     // myTeamQuery.matchesKeyInQuery("player","player",pointsQuery)
      
      
      const results = await pointsQuery.find()
      let _points = 0;
      results.forEach(result =>{
        _points += result.get("category").get("points");    
      })
      setStagePoints(_points)
      setMyPoints(results);
    }
  }
   getPoints()
  },[selected])
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
      setStagePoints(0);
    });
  }, []);

  return (
    <div className="px-4 mt-48 mx-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center bg-white">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">INSIGHTS</h1>
          <p className="mt-2 text-sm text-gray-700">
            Breakdown of your game score
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {selected?.Name}
        <select
          id="stage"
          value={selected}
          onChange={handleChange}
          name="stage"
          autoComplete="stage-name"
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          {stage.map((_stage, index) => (
            <option value={_stage.id}>{_stage.Name}</option>
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
        <div className="flex flex-row items-center">
          <p className="text-base tracking-wide ml-16">
            Formation:
          </p>
          <p className="text-base tracking-wide ml-4 font-bold">
            {formation?.get("name")}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col overflow-hidden">
      <h1 className="text-xl mb-2 font-semibold text-gray-900">Team</h1>

      <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {players.map((person) => (
        <li
          key={person.get("player").id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-20 w-20 rounded-full m-2"
            src={person.get("player").get("image")}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">     
         {`${person.get("player").get("number") > 0 ? person.get("player").get("number") : ""} ${person.get("player").get("name")}`}
</p>
<p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">     
         {`${person.get("player").get("team").get("name")}`}
</p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{playerPosition(person.get("player").get("position"))}</p>
        </div>
      </div>

          </li>))}
          </ul>
        
      </div>

      <div className="mt-8 flex flex-col overflow-hidden">
      <h1 className="text-xl mb-2 font-semibold text-gray-900">Points</h1>

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
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Fixture
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {myPoints.map((person, personIdx) => (
                    <tr key={person.rank}>
                      <td
                        className={classNames(
                          personIdx !== myPoints.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        {`${person.get("player").get("number") > 0 ? person.get("player").get("number") : ""} ${person.get("player").get("name")}- ${playerPosition(person.get("player").get("position"))} - ${person.get("player").get("team").get("name")}`}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== myPoints.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                        )}
                      >
                        {person.get("category").get("points")}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== myPoints.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                        )}
                      >
                        {person.get("category").get("name")}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== myPoints.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                        )}
                      >
                        {`${person.get("fixture").get("team1").get("name")} vs ${person.get("fixture").get("team2").get("name")} ${format(person.get("fixture").get("date"),'MMM dd')} ` }
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
