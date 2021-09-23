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
        // "079cb8c1a65af6cb7cfcc2f6b7013aa778b23b58f3ed6743ad0da1a34a934abe",
        "d7fab702f410bc1de9fed17c43a0537b4309a7d639e6da00f6a0255ae451a8ea",
      ],
    },
    bsc_mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      allowUnlimitedContractSize: true,
      accounts: [
        "d7fab702f410bc1de9fed17c43a0537b4309a7d639e6da00f6a0255ae451a8ea",
      ],
    },
  },
  etherscan: {
    // Your API key for Etherscans
    // Obtain one at https://bscscan.com/
    apiKey: "TD9BM1XTMF93GWWZFNMYBB42VGVNA57YRT",
  },
};
