/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const contractService = require("../service/contract");
// const data = require("./wwinCreature.json");
const data = require("./wwinCreatureMainnet.json");

const hre = require("hardhat");

async function main() {
  const contractAddress = await contractService.verifyWwinCreature(data);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
