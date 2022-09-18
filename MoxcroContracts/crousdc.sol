// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract USDC is ERC20,Ownable {
    address minter;
    constructor(address _minter) ERC20("Test USDC", "USDC") {
        minter = msg.sender;
		_mint(msg.sender,1000**10*6);

    }

      function decimals() override public pure returns (uint8) {
        return 6;
    }

    function mintUSDC(address to, uint256 amount) public {
        require(msg.sender == minter,"Unauthorized Minter");  
        _mint(to, amount);
        
    }

    function burnUSDC(address from, uint256 amount) public {
        require(msg.sender == minter,"Unauthorized Minter");  
        _burn(from, amount);
        
    }

function setMinter(address _minter) external onlyOwner{
    minter = _minter;
  }
}