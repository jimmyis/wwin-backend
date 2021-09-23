/* eslint-disable require-jsdoc */
const hre = require("hardhat");
const {URLSearchParams} = require("url");

async function main() {
  console.log("deployment start.");

  global.URLSearchParams = URLSearchParams;
  //   // Init Contract Token
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");

  // Deploy Contract
  console.log("------------- Start Deployed  ---------------");
  const marketPlace = await MarketPlace.deploy();
  console.log("marketPlace: ", marketPlace.address);
  console.log("------------- Deployed  ---------------");

  await Promise.all([marketPlace.deployed()]);

  // Verify Subscription Contract
  await hre.run("verify:verify", {
    address: marketPlace.address,
  });
  console.log("Deployment done.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
