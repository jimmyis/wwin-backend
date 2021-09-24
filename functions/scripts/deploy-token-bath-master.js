const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
const busdContractAbi = require("../abi/BUSD.json");

async function main() {
  const [wWinOwnerAddress] = await hre.ethers.getSigners();
  console.log('deployment start.');
  // Testnet
  const BATH_ADDRESS = "0x9cc3908a1b38bd966ee9c3a2fbd96e1422ea2bd6";
  const BUSD_ADDRESS = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
  const WWIN_ADDRESS = "0xf5d693ce8515024aaf496cdf11bdb18ca843acee";
  const ROUTER_ADDRESS = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
  const approveAmount = BigNumber.from("1000000000000000000000000");

  const Bath = await hre.ethers.getContractFactory("BATH");
  const bath = Bath.attach(BATH_ADDRESS);
  const busdContract = await hre.ethers.getContractFactory(
    (abi = busdContractAbi["abi"]),
    (bytecode = busdContractAbi["bytecode"]),
    (signer = wWinOwnerAddress),
);
  const busd = busdContract.attach(BUSD_ADDRESS);
  const WWIN = await hre.ethers.getContractFactory("WWINToken");
  const wWin = WWIN.attach(WWIN_ADDRESS);
  const Token = await hre.ethers.getContractFactory("BATHMaster");

  // Deploy Contract 
  console.log("------------- Start Deploy  ---------------");
  const token = await Token.deploy(BATH_ADDRESS, BUSD_ADDRESS, WWIN_ADDRESS, ROUTER_ADDRESS);
  await Promise.all([
    token.deployed()
  ]);
  console.log("BATHMaster:", token.address);
  console.log("------------- Deployed  ---------------");

  // Verify
  await hre.run(
    "verify:verify", {
      address: token.address,
      constructorArguments: [
        BATH_ADDRESS,
        BUSD_ADDRESS,
        WWIN_ADDRESS,
        ROUTER_ADDRESS
      ],
    }
  );
  await busd.approve(token.address, approveAmount);
  await bath.approve(token.address, approveAmount);
  await wWin.approve(token.address, approveAmount);
  console.log('Deployment done.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
