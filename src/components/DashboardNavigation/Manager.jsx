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
      setNotificationTitle("Confirmation Failed");
      setNotificationDescription("Please select 11 players");
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
  const [formations,setFormations] = useState([]);
  const [defenders,setDefenders] = useState([]);
  const [midfielders,setMidfielders] = useState([]);
  const [forwards,setForwards] = useState([]);
  const [selectedFormation,setSelectedFormation] = useState();
  const [dialogType, setDialogType] = useState(1);
  const close = async () => {
    setShow(false);
  };

 

  const handleChange = (event) => {
    setSelectedFormation(event.target.value);
    const _formation = formations.find((item)=> item.id == event.target.value

    ); //Find the selected formation
    let _defenders = [];
    let _midfielders = [];
    let _forwards = [];
    
    // Fill each array with zeros based on the number of players in that part of the formation  
    for(let x = 0 ; x <_formation.defense; x++)   
       _defenders.push(0);
    for(let x = 0 ; x <_formation.midfield; x++)   
       _midfielders.push(0);
    for(let x = 0 ; x <_formation.forwards; x++)   
       _forwards.push(0);
    
    //set the number of each positions to display for the formation
    setDefenders(_defenders);
    setMidfielders(_midfielders);
    setForwards(_forwards);
   
  };

  useEffect(()=>{
    const Formation = Moralis.Object.extend("Formation");
    const query = new Moralis.Query(Formation);
    query.descending("name");
    query.find().then((results)=>{
      let f = [];
      results.forEach((result)=>{
        f.push({id:result.id,name:result.get("name"),defense:result.get("defense"),midfield:result.get("midfield"),forwards:result.get("forwards")})
      })  
      setFormations(f);
    })
  },[])
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
      <select
        id="formation"
        value={selectedFormation}
        onChange={handleChange}
        name="formation"
        autoComplete="formation-name"
        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
      >
        <option value="-1" disabled selected>Please Select a Formation</option>
        {formations.map((formation) => (
          <option value={formation.id}>{formation.name}</option>
        ))}
      </select>
     </div>
        <div className="py-4 w-2/12 z-50">
          <Listbox2 player={player} addPlayer={addPlayer} position={"Goalkeeper"}/>
        </div>
        
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-11/12 z-40">
        {defenders.map((element) => (
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} position={"Defender"}/>
          </div>))}
          </div>

       
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-full z-20">
        {midfielders.map((element) => (
       
          <div className="py-2 w-2/12">
            <Listbox2 player={player} addPlayer={addPlayer} position={"Midfielder"}/>
          </div>))}
          </div>


       
        <div className="flex p-12 flex-row space-x-8 items-center justify-evenly w-8/12">
        {forwards.map((element) => (
       
          <div className="py-2 w-3/12">
            <Listbox2 player={player} addPlayer={addPlayer} position={"Forward"}/>
          </div>
       
        ))}
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
