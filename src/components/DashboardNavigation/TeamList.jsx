import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { CheckCircleIcon } from "@heroicons/react/outline";

export default function TeamList() {
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const { Web3API } = useMoralisWeb3Api();

  const [selected, setSelected] = useState();
  const [gotTeams, setGotTeams] = useState(false);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  const [isOwned, setIsOwned] = useState();
  const [ownedTokens, setOwnedTokens] = useState(new Map());

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
    const fetchNFTs = async () => {
      const testnetNFTs = await Web3API.account.getNFTs({
        chain: "cronos testnet",
      });
      let _players = new Map();
      testnetNFTs.result.forEach(async (nft) => {
        if (nft.token_address == "0x396fb51aefcdef80e4b2514cba310787f3ffa74d") {
          _players[nft.token_id] = true;
        }
      });
      setOwnedTokens(_players);
      console.log(_players);
    };
    fetchNFTs();
  }, []);

  useEffect(() => {
    const Team = Moralis.Object.extend("Team");
    const query = new Moralis.Query(Team);
    query.ascending("name");
    query.find().then((results) => {
      let r = [];
      results.forEach((result) => {
        r.push({
          id: result.id,
          Name: result.get("name"),
        });
      });
      setTeams(r);
      setGotTeams(true);
      setSelected(r[0].id);
    });
    console.log(teams);
  }, []);

  useEffect(() => {
    if (gotTeams) {
      const Player = Moralis.Object.extend("Player");
      const Team = Moralis.Object.extend("Team");
      const team = new Team();
      team.id = selected;
      const query = new Moralis.Query(Player);
      query.equalTo("team", team);
      query.include("team");
      query.ascending("position");
      query.find().then((results) => {
        let p = [];
        results.forEach((result) => {
          p.push(result);
        });
        setPlayers(p);
        setGotTeams(true);
      });
    }
  }, [selected]);

  function change() {
    alert(selected);
  }
  const handleChange = (event) => {
    setSelected(event.target.value);
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
  return (
    <div>
      {selected?.Name}
      <select
        id="country"
        value={selected}
        onChange={handleChange}
        name="country"
        autoComplete="country-name"
        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
      >
        {teams.map((team, index) => (
          <option value={team.id}>{team.Name}</option>
        ))}
      </select>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {players.map((card, cardIdx) => (
            <div
              key={cardIdx}
              className="group relative ring-gray-500 ring-1 rounded-lg pb-2"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden lg:h-80 lg:aspect-none">
                <img
                  src={card.get("image")}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 pb-1 border-b-2 flex justify-between mx-2">
                <div>
                  <div className="text-md text-gray-700">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {card.get("name")}
                    </div>
                    <div className="flex space-x-8 flex-row w-full items-center justify-center">
                      <div className="font-bold">
                        {card.get("team").get("name")}
                      </div>
                      <div className="text-xs">
                        [{playerPosition(card.get("position"))}]
                      </div>
                    </div>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <div className="text-md font-medium cursor-pointer text-gray-900">
                  {card.get("number")}
                </div>
              </div>
              <div className="flex items-center justify-around  mt-2">
                <div
                  className={`inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                    card.get("type") == "legendary"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {card.get("type").toUpperCase()}
                </div>
                {ownedTokens[card.get("nftId")] && (
                  <CheckCircleIcon className="h-5 text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
