export const MarketplaceAddress = "0x14936EaA491B769fDC7f5bfbF961Faa88A791C78";
export const MarketplaceABI = [
  "function listToken(address contractAddress, uint256 tokenId, uint256 amount, uint256 price)",
  "function purchaseToken(uint256 listingId, uint256 amount) public payable",
  // "function viewAllListings() public view returns (Listing[] memory)",
  // "function viewListingById(uint256 _id) public view returns (Listing memory)",
  // "function viewStats() public view returns (Stats memory)",
  "function withdrawFees() public",
];
