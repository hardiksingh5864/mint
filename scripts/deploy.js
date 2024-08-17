const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");

  // Deploy the contract
  const nftMarketplace = await NFTMarketplace.deploy();

  // Wait for the deployment to finish
  await nftMarketplace.deployed();

  console.log("NFTMarketplace deployed to:", nftMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
