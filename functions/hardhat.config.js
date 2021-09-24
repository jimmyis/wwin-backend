require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "bsc_mainnet",
  // defaultNetwork: "bsc_testnet",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
    overrides: {
      "contracts/WyvernProxyRegistry.sol": {
        version: "0.4.23",
        settings: {},
      },
      "contracts/token/WWINToken.sol": {
        version: "0.5.16",
        settings: {},
      },
      "contracts/token/BATHMaster.sol": {
        version: "0.6.12",
        settings: {},
      },
      "contracts/token/BATH.sol": {
        version: "0.6.12",
        settings: {},
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
      allowUnlimitedContractSize: true,
      accounts: [
        "8dfb5ede9e87cdf1d051cd355474106ea3e0e0294e4944f0ecc675a7b0b756dd",
      ],
    },
    bsc_mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      allowUnlimitedContractSize: true,
      accounts: [
        "80d38bba18db73bf9f0a8cc8814ce41dc6405c1b9483132cb93e5492ea9139d1",
      ],
    },
  },
  etherscan: {
    // Your API key for Etherscans
    // Obtain one at https://bscscan.com/
    apiKey: "PPSEVHETR6WQR6Y6M7J1718S9XSX27MBHC",
  },
};
