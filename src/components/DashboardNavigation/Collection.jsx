import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import SellModal from "../Modals/SellModal";

export default function Collection() {
  const { Web3API } = useMoralisWeb3Api();

  const { Moralis, enableWeb3, isWeb3Enabled } = useMoralis();
  const [player, setPlayer] = useState([]);

  const [openSale, setOpenSale] = useState(false);

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
    const fetchNFTs = async () => {
      const testnetNFTs = await Web3API.account.getNFTs({
        chain: "cronos testnet",
      });
      let _players = [];
      testnetNFTs.result.forEach(async (nft) => {
        if (nft.token_address == "0x396fb51aefcdef80e4b2514cba310787f3ffa74d") {
          const tokenIdMetadata = await Moralis.Cloud.run("Metadata", {
            tokenId: nft.token_id,
          });
          _players.push(tokenIdMetadata);
          console.log(_players);
        }
      });
      setPlayer(_players);
      console.log(player);
    };
    fetchNFTs();
  }, []);

  // useEffect(() => {
  //   const Player = Moralis.Object.extend("Player");
  //   const query = new Moralis.Query(Player);
  //   query.find().then((results) => {
  //     let r = [];
  //     results.forEach((result) => {
  //       r.push({
  //         id: result.id,
  //         Name: result.get("name"),
  //         Position: result.get("position"),
  //         NftId: result.get("nftId"),
  //         Number: result.get("number"),
  //         Image: result.get("image"),
  //         Team: result.get("team"),
  //         Type: result.get("type"),
  //       });
  //     });
  //     setPlayer(r);
  //   });
  // }, []);

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
                  src={card.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 pb-1 border-b-2 flex justify-between mx-2">
                <div>
                  <div className="text-md text-gray-700">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {card.name}
                    </div>
                    <div className="flex space-x-8 flex-row w-full items-center justify-center">
                      <div className="font-bold">
                        {card.attributes[2].value}
                      </div>
                      <div className="text-xs">
                        [{card.attributes[1].value}]
                      </div>
                    </div>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <div className="text-md font-medium cursor-pointer text-gray-900">
                  {card.attributes[0].value}
                </div>
              </div>
              <div className="flex items-center justify-around  mt-2">
                <div
                  className={`inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                    card.attributes[4].value == "legendary"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {card.attributes[4].value}
                </div>
                <button
                  onClick={sellPlayer}
                  className="inline-flex z-30 items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
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
