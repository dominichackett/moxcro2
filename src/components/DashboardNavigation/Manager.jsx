import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Listbox from "../Manager/Listbox";

export default function Manager() {
  const [player, setPlayer] = useState([]);
  const { Web3API } = useMoralisWeb3Api();
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();

  function confirmTeam() {
    // confirm Team Selection via Smart Contract
  }

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
        }
      });
      setPlayer(_players);
      console.log(_players);
    };
    fetchNFTs();
  }, []);

  return (
    <form className="flex flex-col items-center  w-full ">
      <div className="flex flex-col items-center justify-center  p-12 w-full bg-[url('/wildc-soccer-field.png')]">
        <div className="py-4 w-2/12 z-50">
          <Listbox player={player} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-11/12 z-40">
          <div className="py-2 w-2/12">
            <Listbox player={player} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox player={player} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox player={player} />
          </div>
        </div>
        <div className="py-2 w-2/12 z-30">
          <Listbox player={player} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-full z-20">
          <div className="py-2 w-2/12">
            <Listbox player={player} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox player={player} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox player={player} />
          </div>
        </div>
        <div className="py-2 w-2/12 z-10">
          <Listbox player={player} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-8/12">
          <div className="py-2 w-3/12">
            <Listbox player={player} />
          </div>
          <div className="py-2 w-3/12">
            <Listbox player={player} />
          </div>
        </div>
      </div>
      <button
        onClick={confirmTeam}
        className=" w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Team
      </button>
    </form>
  );
}
