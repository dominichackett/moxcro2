import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Listbox2 from "../Manager/Listbox2";
import Notification from "../Notification/Notification";

export default function Manager() {
  const [player, setPlayer] = useState([]);
  const { Web3API } = useMoralisWeb3Api();
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const [myTeam, setMyTeam] = useState([]);

  // Function to fetch PLAYER ID FROM LISTBOX2
  const addPlayer = async (playerId) => {
    let t = myTeam;
    t.push(playerId);
    setMyTeam(t);
  };

  const confirmTeam = async () => {
    if (myTeam.length != 11) {
      setDialogType(2); //Failed
      setNotificationTitle("Confirmation failed");
      setNotificationDescription("please select 11 players");
      setShow(true);
    } else {
      setDialogType(1); //Success
      setNotificationTitle("Team Confirmed");
      setNotificationDescription(`Your team selection has been confirmed`);
      setShow(true);
    }
  };

  //  NOTIFICATION STATES & FUNCTIONS
  const [show, setShow] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState();
  const [notificationDescription, setNotificationDescription] = useState();
  const [dialogType, setDialogType] = useState(1);
  const close = async () => {
    setShow(false);
  };

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
  //  bg-[url('/soccerfield3.jpeg')] bg for 1st div instead of bg-green-800
  return (
    <div className="flex flex-col pb-8 items-center  w-full ">
      <div className="flex flex-col items-center justify-center  p-12 w-full rounded-xl bg-green-800  ">
        <div className="py-4 w-2/12 z-50">
          <Listbox2 player={player} addPlayer={addPlayer} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-11/12 z-40">
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
        </div>
        <div className="py-2 w-2/12 z-30">
          <Listbox2 player={player} addPlayer={addPlayer} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-full z-20">
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
        </div>
        <div className="py-2 w-2/12 z-10">
          <Listbox2 player={player} addPlayer={addPlayer} />
        </div>
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-8/12">
          <div className="py-2 w-3/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
          <div className="py-2 w-3/12">
            <Listbox2 player={player} addPlayer={addPlayer} />
          </div>
        </div>
      </div>
      <button
        onClick={confirmTeam}
        className=" w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Team
      </button>
      <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
    </div>
  );
}
