export const MarketplaceAddress = "0x3024287B7f2365cdE374265Aa6040f4237f19786";
export const MarketplaceABI = [
  "function listToken(address contractAddress, uint256 tokenId, uint256 amount, uint256 price)",
  "function purchaseToken(uint256 listingId, uint256 amount) public payable",
  "function viewAllListings() public view returns (Listing[] memory)",
  "function viewListingById(uint256 _id) public view returns(Listing memory)",
  "function viewStats() public view returns(Stats memory)",
  "function withdrawFees() public onlyOwner nonReentrant",
];
