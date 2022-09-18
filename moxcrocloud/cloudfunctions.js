function playerPosition(pos)
{
	 switch(pos){
		 
		 case 0: return("Goalkeeper");
		 break;
		 
		 case 1: return("Defender");
		 break;
		  case 2: return("Midfielder");
		 break;
		 
		 case 3: return("Forward");
		 break;
	 }
}

async function randomPlayer(pType)
{
    const Player = Moralis.Object.extend("Player");
	const playerQuery = new Moralis.Query(Player);
	if(pType >= 0)
	   playerQuery.equalTo("position",pType);
    const count  = await playerQuery.count();
	playerQuery.limit(count);
    const results = await playerQuery.find({useMasterKey:true});
	
	let x = Math.floor((Math.random() * count));
	return results[x].id;
   
}
	
Moralis.Cloud.afterSave("PlayerCreated", async function(request) {
  const playerId = request.object.get("playerId");
  const nftId = request.object.get("nftId"); 
  const Player =  Moralis.Object.extend("Player");
  const query = new Moralis.Query(Player)
  query.equalTo("objectId",playerId);
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  
  if(request.object.get("confirmed") !=true)
   {  
      logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
  
      const result =  await query.first({useMasterKey:true});
      result.set("nftId",parseInt(nftId));
      result.save(null,{useMasterKey:true});
   }
 });
 
 
 Moralis.Cloud.define("Metadata", async(request) => {
   
  const tokenId = request.params.tokenId;
  
  const Player =  Moralis.Object.extend("Player");
  const query = new Moralis.Query(Player)
  query.equalTo("nftId",parseInt(tokenId));
  query.include("team");
  query.include("team.tournament");
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  const result =  await query.first({useMasterKey:true});
  
  if(result) 
   return {
  "description": "Wild Card Fantasy Football Player", 
  "image": result.get("image"), 
  "name":  result.get("name"),
  "tokenId":tokenId,
    "playerId":result.id,

  "attributes": [{
  "trait_type": "Number", 
  "value": result.get("number")},
  {"trait_type": "Position", 
  "value": playerPosition(result.get("position"))},
  { "trait_type": "Team", 
  "value": result.get("team").get("name")},
  { "trait_type": "Tournament", 
  "value": result.get("team").get("tournament").get("name")},
  { "trait_type": "Type", 
  "value": result.get("type")}
    ]
}; else
	return {};

  
});



 
 
 Moralis.Cloud.define("getPoints",async(request) => {
	  const _User =  Moralis.Object.extend("_User");
      const _user = new _User();
      const Leaderboard = Moralis.Object.extend("Leaderboard");
      const query3 = new Moralis.Query(Leaderboard);
      _user.id = 'YHW7FB0J7ZTbIfXwIws9IV9i';
     // query3.include('user')
      query3.equalTo("user",_user);
  const  result = await query3.find({useMasterKey:true});
  return result;
 });
 
 
 Moralis.Cloud.afterSave("TokenListed", async function(request) {
  const contractAddress = request.object.get("contractAddress");
  const seller = request.object.get("seller");
  const tokenId = request.object.get("tokenId");
  const amount = request.object.get("amount");
  const pricePerToken = request.object.get("pricePerToken");
  const listingId = request.object.get("listingId");


  
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  
  if(request.object.get("confirmed") !=true)
   {  
      const Player = Moralis.Object.extend("Player");
	  const player  = new Moralis.Query(Player);
	  
	  player.equalTo("nftId",parseInt(tokenId));
	  const _player = await player.first({useMasterKey:true});
	  if(_player)
	  {	  
	     const MarketPlace =  Moralis.Object.extend("MarketPlace");
         const listing = new MarketPlace();
	  
         listing.set("contractAddress",contractAddress);
         listing.set("seller",seller);
         listing.set("tokenId",tokenId);
         listing.set("amount",parseInt(amount));
         listing.set("pricePerToken",pricePerToken);
         listing.set("listingId",listingId);
         listing.set("player",_player); 
   	     listing.save();
      }
   }
 });
 
  Moralis.Cloud.afterSave("TokenSold", async function(request) {
 
   const amount = request.object.get("amount");
   const listingId = request.object.get("listingId");
   

  
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  
  if(request.object.get("confirmed") !=true)
   { 
      
 
      const MarketPlace =  Moralis.Object.extend("MarketPlace");
      const query  = new Moralis.Query(MarketPlace);
	  query.equalTo("listingId",listingId); 
	  const result = await query.first({useMasterKey:true});
	  if(result){
		  result.set("amount",result.get("amount")- parseInt(amount)); 
		  result.save();
      }
   
   }
 });
 
 Moralis.Cloud.define("getCard", async(request) => {
	 let players = [];
    const player1 = await randomPlayer(0);  //Each Pack has 1 Goalkeeper

    //Each Pack has 2 Defenders
	const player2 = await randomPlayer(1);
    const player3 = await randomPlayer(1);
	
	//Each Pack has 2 Midfielders
    const player4 = await randomPlayer(2);
	const player5 = await randomPlayer(2);
	
	//Each Pack has 1 Forward
	const player6 = await randomPlayer(3);

	
	
	players.push(player1);
	players.push(player2);
	players.push(player3)
	players.push(player4);
	players.push(player5);
	players.push(player6);





	return players;
 });	 
 