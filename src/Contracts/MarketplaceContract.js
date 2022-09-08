export const MarketplaceAddress = "0x9b24900d7F601CB19090079BD0c34A2417C8C8C4";
export const MarketplaceABI = [
  "function listToken(address contractAddress, uint256 tokenId, uint256 amount, uint256 price)",
  "function purchaseToken(uint256 listingId, uint256 amount) public payable",
  // "function viewAllListings() public view returns (Listing[] memory)",
  // "function viewListingById(uint256 _id) public view returns (Listing memory)",
  // "function viewStats() public view returns (Stats memory)",
  "function withdrawFees() public",
];
