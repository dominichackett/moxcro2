import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import SellModal from "../Modals/SellModal";

export default function Collection() {
  const { Moralis } = useMoralis();
  const [player, setPlayer] = useState([]);

  const [openSale, setOpenSale] = useState(false);

  useEffect(() => {
    const Player = Moralis.Object.extend("Player");
    const query = new Moralis.Query(Player);
    query.find().then((results) => {
      let r = [];
      // let rmap = new Map();
      results.forEach((result) => {
        r.push({
          id: result.id,
          Name: result.get("name"),
          Position: result.get("position"),
          NftId: result.get("nftId"),
          Number: result.get("number"),
          Image: result.get("image"),
          Team: result.get("team"),
          Type: result.get("type"),
        });
        // rmap[result.get("Player")] = result.id;
      });
      setPlayer(r);
      // setSelectedPlayerId(rmap);
      console.log(player);
    });
  }, []);
  function sellPlayer() {
    setOpenSale(true);
    if (openSale) {
      setOpenSale(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Collection
        </h2>

        {openSale && <SellModal />}

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {player.map((card, cardIdx) => (
            <div
              key={cardIdx}
              className="group relative ring-gray-500 ring-1 rounded-lg pb-2"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden lg:h-80 lg:aspect-none">
                <img
                  src={"/CR7.png"}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 pb-1 border-b-2 flex justify-between mx-2">
                <div>
                  <div className="text-md text-gray-700">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {card.Name}
                    </div>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <div className="text-md font-medium cursor-pointer text-gray-900">
                  {card.Number}
                </div>
              </div>
              <div className="flex items-center justify-around  mt-2">
                <div
                  className={`inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                    card.Type == "legendary"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {card.Type}
                </div>
                <button
                  onClick={sellPlayer}
                  className="inline-flex z-50 items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
