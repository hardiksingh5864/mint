require('@nomiclabs/hardhat-ethers');
const fs = require('fs'); // Corrected require statement

const privateKey = fs.readFileSync('.secret').toString().trim(); // Corrected toString() method

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337, // Default Chain ID for Hardhat
    },
    localhost: {
      url: "http://127.0.0.1:8545", // URL for local Hardhat network
    },
    // Add additional network configurations if needed
    // e.g., Rinkeby or Mainnet
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
    //   accounts: [privateKey],
    // },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
    //   accounts: [privateKey],
    // },
  },
};
