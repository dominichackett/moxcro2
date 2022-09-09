import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  MarketplaceAddress,
  MarketplaceABI,
} from "../../Contracts/MarketplaceContract";

export default function OpenMarket() {
  const { Moralis, web3, enableWeb3, isWeb3Enabled } = useMoralis();
  const [marketplaceListings, setMarketplaceListings] = useState([]);

  useEffect(() => {
    const MarketPlace = Moralis.Object.extend("MarketPlace");
    const query = new Moralis.Query(MarketPlace);
    query.include("player");
    query.include("player.team");
    query.find().then((results) => {
      let r = [];
      results.forEach((result) => {
        r.push({
          ObjectId: result.id,
          Price: result.get("pricePerToken"),
          Amount: result.get("amount"),
          TokenId: result.get("tokenId"),
          ListingId: result.get("listingId"),
          Seller: result.get("seller"),
          Contract: result.get("contractAddress"),
          Name: result.get("player").get("name"),
          Team: result.get("player").get("team").get("name"),
          Type: result.get("player").get("type"),
          Position: playerPosition(result.get("player").get("position")),
          Image: result.get("player").get("image"),
          Number: result.get("player").get("number"),
        });
      });
      setMarketplaceListings(r);
      console.log(r);
    });
  }, []);

  const purchasePlayer = async () => {
    if (!isWeb3Enabled) enableWeb3();
    const purchaseContract = new ethers.Contract(
      MarketplaceAddress,
      MarketplaceABI,
      web3.getSigner()
    );
    let transaction = await purchaseContract.purchaseToken(
      marketplaceListings.ListingId,
      marketplaceListings.Amount
    );
    await transaction.wait().then(() => {
      alert("successful");
    });
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
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Marketplace
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {marketplaceListings.map((card, cardIdx) => (
            <div
              key={cardIdx}
              className="group relative ring-gray-500 ring-1 rounded-lg pb-2"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden lg:h-80 lg:aspect-none">
                <img
                  src={card.Image}
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
                    <div className="flex space-x-8 flex-row w-full items-center justify-center">
                      <div className="font-bold">{card.Team}</div>
                      <div className="text-xs">[{card.Position}]</div>
                    </div>
                  </div>
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
                  onClick={() => {
                    purchasePlayer(card.TokenId);
                  }}
                  className="inline-flex z-50 items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {card.Price} CRO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
