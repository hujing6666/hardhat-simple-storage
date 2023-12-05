require("hardhat-gas-reporter")
require("dotenv").config()
require("solidity-coverage")
require("@nomiclabs/hardhat-waffle")
require("@nomicfoundation/hardhat-ethers")
require("./tasks/block-number")
require("solidity-coverage")

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "7b62b3d9a6435ae2c1de22f3c149090ebebb483d2d2390fc0db3724ffcef2aa3"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
   defaultNetwork: "hardhat",
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token:"MATIC"
  },
};
