// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WildCard is ERC1155 ,Ownable {
     string public name = "Wild Card Fantasy Football";
     string public symbol ="WILD"; 
     string _uri;
     uint256 fee;
     using Counters for Counters.Counter;
     Counters.Counter private _tokenIdCounter;

     address USDC_ADDRESS = address(0x946C98a8A4D3f2636563635003603072E337Ffa8); //Test USDC
     IERC20 internal usdcToken; 
     struct Player {
        bool isValue;
        uint256 nftId;
     }


  
     mapping (string => Player) players;
     event PlayerCreated(string playerId,uint256 nftId,uint256 dateCreated);   

    constructor(string memory metadataURI,uint256 _fee)  ERC1155("") {
    
         _uri = metadataURI;
         fee = _fee*10**6;
         usdcToken = IERC20(USDC_ADDRESS);

    }


    /**
   * @dev Function allows users to mint a pack of six players
    * @param card  - string array of the six players to mint
   
   **/

    function mintCard(string[] calldata card) public {
      require(card.length == 6,"Not enough players in pack.");
      require(usdcToken.balanceOf(msg.sender) >= fee ,"Not enough balance.");
      uint256 nftId;
     for(uint8 loop = 0; loop <= card.length;loop++)
     {
         if(players[card[loop]].isValue) //If player has been minted previously
         {
           nftId=players[card[loop]].nftId;
           _mint(msg.sender,nftId,1,"");
         }
         else
         {
            _tokenIdCounter.increment();
            nftId = _tokenIdCounter.current();
           _mint(msg.sender,nftId,1,"");
           players[card[loop]].isValue = true;
           players[card[loop]].nftId = nftId;
           emit PlayerCreated(card[loop],nftId,block.timestamp);    
             

         }
     }

      usdcToken.transferFrom(msg.sender, address(this), fee);


    }

    function uri(uint256 tokenId) public override view returns (string memory){
      return string.concat(_uri,Strings.toString(tokenId));
    }


 /**
   * @dev Function withdraw funds from contract 
    
   **/
    function withDraw() public onlyOwner
    {
         usdcToken.transferFrom(address(this),msg.sender, usdcToken.balanceOf(address(this)));
    
    }   

}