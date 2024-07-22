import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

console.log(process.env.OPTIMISTIC_KEY)

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    optimismSepolia: {
      url: process.env.OPTIMISM_SEPOLIA_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
    },
  },
  etherscan: {
    apiKey: {
      optimismSepolia: process.env.OPTIMISTIC_KEY,
    },
      customChains: [{
          network: "optimismSepolia",
          chainId: 11155420,
          urls: {
              apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          },
          accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        },
      ]
    }
};

export default config;
