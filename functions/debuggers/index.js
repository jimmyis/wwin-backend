/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// const { ethers } = require("ethers");

const hre = require("hardhat");
const creatureContract = require("../abi/WWINCreature.json");

const NFTsymbol = "WWIN-NFT";
const contracts = {
  "MARKETPLACE": {
    address: "0x84cad6549B3B97748DB6802F4AA0c6F41Dd4d408"
  }
}

const sampleNFTdata = {
  name: "Poramesuan Garuda “Prosperity” White Gold Model",
  description: `Fire Element | Part of the WWIN Element Collection
  Blessed by Luang Por Wara Punyawaro, Head Monk of Wat Pho Thong Video Link of https://www.youtube.com/watch?v=z_rVlasNjTs 
  Full Version https://youtu.be/sxDUqaLAtfs
  
  It’s said that the God Garuda is the bone of the Sun.
  
  
  
  Garuda got his power by fulfilling his destiny by bringing Amrit Water (Elixir of Life) to help his mother atone. After a long and tiresome battle, Vishnu was impressed with Garuda’s selfless act and that he did not drink Amrit water to become invincible. Vishnu blessed him with immortality and Garuda becomes undefeatable and invincible.
  
  Garuda represents the act of being respectful to parents.
  Garuda’s Virtue of the Buddha includes
  * Protection and Abundance
  * Wealth
  * Getting Promoted to higher rank
  * Ward off Danger`,
  collection_id: "11",
  maxSupply: 1500,
  image: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3685_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d"
};

const sampleSerial = [
  // 5_01, 5_02, 5_03, 5_04, 5_05, 5_06, 5_07, 5_08, 5_09, 5_10,
  // 5_11, 5_12, 5_13, 5_14, 5_15, 5_16, 5_17, 5_18, 5_19, 5_20,
  // 5_21, 5_22, 5_23, 5_24, 5_25, 5_26, 5_27, 5_28, 5_29, 5_30,
  // 5_31, 5_32, 5_33, 5_34, 5_35, 5_36, 5_37, 5_38, 5_39, 5_40,
  // 5_41, 5_42, 5_43, 5_44, 5_45, 5_46, 5_47, 5_48, 5_49, 5_50,
  // 5_51, 5_52, 5_53, 5_54, 5_55, 5_56, 5_57, 5_58, 5_59, 5_60,
  // 5_61, 5_62, 5_63, 5_64, 5_65, 5_66, 5_67, 5_68, 5_69, 5_70,
  // 5_71, 5_72, 5_73, 5_74, 5_75, 5_76, 5_77, 5_78, 5_79, 5_80,
  // 5_81, 5_82, 5_83, 5_84, 5_85, 5_86, 5_87, 5_88, 5_89, 5_90,
  // 5_91, 5_92, 5_93, 5_94, 5_95, 5_96, 5_97, 5_98, 5_99, 6_00,

  // 6_01, 6_02, 6_03, 6_04, 6_05, 6_06, 6_07, 6_08, 6_09, 6_10,
  // 6_11, 6_12, 6_13, 6_14, 6_15, 6_16, 6_17, 6_18, 6_19, 6_20,
  // 6_21, 6_22, 6_23, 6_24, 6_25, 6_26, 6_27, 6_28, 6_29, 6_30,
  // 6_31, 6_32, 6_33, 6_34, 6_35, 6_36, 6_37, 6_38, 6_39, 6_40,
  // 6_41, 6_42, 6_43, 6_44, 6_45, 6_46, 6_47, 6_48, 6_49, 6_50,
  // 6_51, 6_52, 6_53, 6_54, 6_55, 6_56, 6_57, 6_58, 6_59, 6_60,
  // 6_61, 6_62, 6_63, 6_64, 6_65, 6_66, 6_67, 6_68, 6_69, 6_70,
  // 6_71, 6_72, 6_73, 6_74, 6_75, 6_76, 6_77, 6_78, 6_79, 6_80,
  // 6_81, 6_82, 6_83, 6_84, 6_85, 6_86, 6_87, 6_88, 6_89, 6_90,
  // 6_91, 6_92, 6_93, 6_94, 6_95, 6_96, 6_97, 6_98, 6_99, 7_00,

  // 7_01, 7_02, 7_03, 7_04, 7_05, 7_06, 7_07, 7_08, 7_09, 7_10,
  // 7_11, 7_12, 7_13, 7_14, 7_15, 7_16, 7_17, 7_18, 7_19, 7_20,
  // 7_21, 7_22, 7_23, 7_24, 7_25, 7_26, 7_27, 7_28, 7_29, 7_30,
  // 7_31, 7_32, 7_33, 7_34, 7_35, 7_36, 7_37, 7_38, 7_39, 7_40,
  // 7_41, 7_42, 7_43, 7_44, 7_45, 7_46, 7_47, 7_48, 7_49, 7_50,
  // 7_51, 7_52, 7_53, 7_54, 7_55, 7_56, 7_57, 7_58, 7_59, 7_60,
  // 7_61, 7_62, 7_63, 7_64, 7_65, 7_66, 7_67, 7_68, 7_69, 7_70,
  // 7_71, 7_72, 7_73, 7_74, 7_75, 7_76, 7_77, 7_78, 7_79, 7_80,
  // 7_81, 7_82, 7_83, 7_84, 7_85, 7_86, 7_87, 7_88, 7_89, 7_90,
  // 7_91, 7_92, 7_93, 7_94, 7_95, 7_96, 7_97, 7_98, 7_99, 8_00,

  // 8_01, 8_02, 8_03, 8_04, 8_05, 8_06, 8_07, 8_08, 8_09, 8_10,
  // 8_11, 8_12, 8_13, 8_14, 8_15, 8_16, 8_17, 8_18, 8_19, 8_20,
  // 8_21, 8_22, 8_23, 8_24, 8_25, 8_26, 8_27, 8_28, 8_29, 8_30,
  // 8_31, 8_32, 8_33, 8_34, 8_35, 8_36, 8_37, 8_38, 8_39, 8_40,
  // 8_41, 8_42, 8_43, 8_44, 8_45, 8_46, 8_47, 8_48, 8_49, 8_50,
  // 8_51, 8_52, 8_53, 8_54, 8_55, 8_56, 8_57, 8_58, 8_59, 8_60,
  // 8_61, 8_62, 8_63, 8_64, 8_65, 8_66, 8_67, 8_68, 8_69, 8_70,
  // 8_71, 8_72, 8_73, 8_74, 8_75, 8_76, 8_77, 8_78, 8_79, 8_80,
  // 8_81, 8_82, 8_83, 8_84, 8_85, 8_86, 8_87, 8_88, 8_89, 8_90,
  // 8_91, 8_92, 8_93, 8_94, 8_95, 8_96, 8_97, 8_98, 8_99, 9_00,

  // 9_01, 9_02, 9_03, 9_04, 9_05, 9_06, 9_07, 9_08, 9_09, 9_10,
  // 9_11, 9_12, 9_13, 9_14, 9_15, 9_16, 9_17, 9_18, 9_19, 9_20,
  // 9_21, 9_22, 9_23, 9_24, 9_25, 9_26, 9_27, 9_28, 9_29, 9_30,
  // 9_31, 9_32, 9_33, 9_34, 9_35, 9_36, 9_37, 9_38, 9_39, 9_40,
  // 9_41, 9_42, 9_43, 9_44, 9_45, 9_46, 9_47, 9_48, 9_49, 9_50,
  // 9_51, 9_52, 9_53, 9_54, 9_55, 9_56, 9_57, 9_58, 9_59, 9_60,
  // 9_61, 9_62, 9_63, 9_64, 9_65, 9_66, 9_67, 9_68, 9_69, 9_70,
  // 9_71, 9_72, 9_73, 9_74, 9_75, 9_76, 9_77, 9_78, 9_79, 9_80,
  // 9_81, 9_82, 9_83, 9_84, 9_85, 9_86, 9_87, 9_88, 9_89, 9_90,
  // 9_91, 9_92, 9_93, 9_94, 9_95, 9_96, 9_97, 9_98, 9_99, 10_00,

  // 10_01, 10_02, 10_03, 10_04, 10_05, 10_06, 10_07, 10_08, 10_09, 10_10,
  // 10_11, 10_12, 10_13, 10_14, 10_15, 10_16, 10_17, 10_18, 10_19, 10_20,
  // 10_21, 10_22, 10_23, 10_24, 10_25, 10_26, 10_27, 10_28, 10_29, 10_30,
  // 10_31, 10_32, 10_33, 10_34, 10_35, 10_36, 10_37, 10_38, 10_39, 10_40,
  // 10_41, 10_42, 10_43, 10_44, 10_45, 10_46, 10_47, 10_48, 10_49, 10_50,
  // 10_51, 10_52, 10_53, 10_54, 10_55, 10_56, 10_57, 10_58, 10_59, 10_60,
  // 10_61, 10_62, 10_63, 10_64, 10_65, 10_66, 10_67, 10_68, 10_69, 10_70,
  // 10_71, 10_72, 10_73, 10_74, 10_75, 10_76, 10_77, 10_78, 10_79, 10_80,
  // 10_81, 10_82, 10_83, 10_84, 10_85, 10_86, 10_87, 10_88, 10_89, 10_90,
  // 10_91, 10_92, 10_93, 10_94, 10_95, 10_96, 10_97, 10_98, 10_99, 11_00,
  
  // 11_01, 11_02, 11_03, 11_04, 11_05, 11_06, 11_07, 11_08, 11_09, 11_10,
  // 11_11, 11_12, 11_13, 11_14, 11_15, 11_16, 11_17, 11_18, 11_19, 11_20,
  // 11_21, 11_22, 11_23, 11_24, 11_25, 11_26, 11_27, 11_28, 11_29, 11_30,
  // 11_31, 11_32, 11_33, 11_34, 11_35, 11_36, 11_37, 11_38, 11_39, 11_40,
  // 11_41, 11_42, 11_43, 11_44, 11_45, 11_46, 11_47, 11_48, 11_49, 11_50,
  // 11_51, 11_52, 11_53, 11_54, 11_55, 11_56, 11_57, 11_58, 11_59, 11_60,
  // 11_61, 11_62, 11_63, 11_64, 11_65, 11_66, 11_67, 11_68, 11_69, 11_70,
  // 11_71, 11_72, 11_73, 11_74, 11_75, 11_76, 11_77, 11_78, 11_79, 11_80,
  // 11_81, 11_82, 11_83, 11_84, 11_85, 11_86, 11_87, 11_88, 11_89, 11_90,
  // 11_91, 11_92, 11_93, 11_94, 11_95, 11_96, 11_97, 11_98, 11_99, 12_00,
  
  // 12_01, 12_02, 12_03, 12_04, 12_05, 12_06, 12_07, 12_08, 12_09, 12_10,
  // 12_11, 12_12, 12_13, 12_14, 12_15, 12_16, 12_17, 12_18, 12_19, 12_20,
  // 12_21, 12_22, 12_23, 12_24, 12_25, 12_26, 12_27, 12_28, 12_29, 12_30,
  // 12_31, 12_32, 12_33, 12_34, 12_35, 12_36, 12_37, 12_38, 12_39, 12_40,
  // 12_41, 12_42, 12_43, 12_44, 12_45, 12_46, 12_47, 12_48, 12_49, 12_50,
  // 12_51, 12_52, 12_53, 12_54, 12_55, 12_56, 12_57, 12_58, 12_59, 12_60,
  // 12_61, 12_62, 12_63, 12_64, 12_65, 12_66, 12_67, 12_68, 12_69, 12_70,
  // 12_71, 12_72, 12_73, 12_74, 12_75, 12_76, 12_77, 12_78, 12_79, 12_80,
  // 12_81, 12_82, 12_83, 12_84, 12_85, 12_86, 12_87, 12_88, 12_89, 12_90,
  // 12_91, 12_92, 12_93, 12_94, 12_95, 12_96, 12_97, 12_98, 12_99, 13_00,
  
  // 13_01, 13_02, 13_03, 13_04, 13_05, 13_06, 13_07, 13_08, 13_09, 13_10,
  // 13_11, 13_12, 13_13, 13_14, 13_15, 13_16, 13_17, 13_18, 13_19, 13_20,
  // 13_21, 13_22, 13_23, 13_24, 13_25, 13_26, 13_27, 13_28, 13_29, 13_30,
  // 13_31, 13_32, 13_33, 13_34, 13_35, 13_36, 13_37, 13_38, 13_39, 13_40,
  // 13_41, 13_42, 13_43, 13_44, 13_45, 13_46, 13_47, 13_48, 13_49, 13_50,
  // 13_51, 13_52, 13_53, 13_54, 13_55, 13_56, 13_57, 13_58, 13_59, 13_60,
  // 13_61, 13_62, 13_63, 13_64, 13_65, 13_66, 13_67, 13_68, 13_69, 13_70,
  // 13_71, 13_72, 13_73, 13_74, 13_75, 13_76, 13_77, 13_78, 13_79, 13_80,
  // 13_81, 13_82, 13_83, 13_84, 13_85, 13_86, 13_87, 13_88, 13_89, 13_90,
  // 13_91, 13_92, 13_93, 13_94, 13_95, 13_96, 13_97, 13_98, 13_99, 14_00,

  14_01, 14_02, 14_03, 14_04, 14_05, 14_06, 14_07, 14_08, 14_09, 14_10,
  14_11, 14_12, 14_14, 14_14, 14_15, 14_16, 14_17, 14_18, 14_19, 14_20,
  14_21, 14_22, 14_23, 14_24, 14_25, 14_26, 14_27, 14_28, 14_29, 14_30,
  14_31, 14_32, 14_33, 14_34, 14_35, 14_36, 14_37, 14_38, 14_39, 14_40,
  14_41, 14_42, 14_43, 14_44, 14_45, 14_46, 14_47, 14_48, 14_49, 14_50,
  14_51, 14_52, 14_53, 14_54, 14_55, 14_56, 14_57, 14_58, 14_59, 14_60,
  14_61, 14_62, 14_63, 14_64, 14_65, 14_66, 14_67, 14_68, 14_69, 14_70,
  14_71, 14_72, 14_73, 14_74, 14_75, 14_76, 14_77, 14_78, 14_79, 14_80,
  14_81, 14_82, 14_83, 14_84, 14_85, 14_86, 14_87, 14_88, 14_89, 14_90,
  14_91, 14_92, 14_93, 14_94, 14_95, 14_96, 14_97, 14_98, 14_99, 15_00,

];

(async (data, serialList) => {
  try {
    const [ owner ] = await getAccounts();
    // const contract = {
    //   address: "0x113a58A5891ddA57488703558F2e60095479D1Aa"
    // }

    // const { contract } = await deployNFTCollectionContract(owner, data);
    // await verifyNFTCollectionContract(contract, data);

    const contractFactory = await hre.ethers.getContractFactory(
      creatureContract["abi"],
      creatureContract["bytecode"],
      owner, // Signer
    );

    // Testnet
    // const NFTcontractAddress = "0xbaC7E7A39Ba9ba1ce20755561F48A65bC8c8D42C";
    // const NFTcontractAddress = "0x5F3C1d01362aA5D16bC28C9250dD49C4A7AE48c0";

    // Mainnet
    const NFTcontractAddress = "0xD1A21D267c5AE768Ef9f75F38b16e03490C49e4e";
    const contract = await contractFactory.attach(NFTcontractAddress);

    let count = 1;
    for await (let serialNo of serialList) {
      console.log(serialNo, count);
      await setupNFTCollectionContract(contract, data, owner, serialNo);
      count += 1;
    }

    // let iterator = 0;
    // let prevNonce = 0;
    // let prevRound = -1;
      
    // const interval = setInterval(async () => {
    //   const nonce = await owner.getTransactionCount();
    //   console.log(nonce, iterator)
    //   if (iterator >= serialList.length - 1) {
    //     clearInterval(interval)
    //   }
    //   if (nonce > prevNonce && iterator > prevRound) {
    //     console.log("DO", iterator + 1)
    //     await setupNFTCollectionContract(contract, data, owner, serialList[iterator])
    //     // .then(() => {
    //     //   // await setupContractToDB()
    //     // })
    //     // .catch(() => {})
    //     // .finally(() => {
    //     prevRound = iterator;
    //     iterator += 1;
    //     prevNonce = nonce;
    //   } else {
    //     console.log("DONT", iterator + 1)
    //   }
    // }, 3000);
    
    logger("PROCESS", "DONE")
  } catch (error) {

  }
})(sampleNFTdata, sampleSerial)

async function getAccounts() {
  try { 
    return await hre.ethers.getSigners();
  } catch (error) {
    console.log(error)
  }
}

const logger = (event, stage, payload) => {
  console.log(event, stage, payload)
}

async function deployNFTCollectionContract(account, data) {
  try {
    if (!data) { throw { message: "Invalid Input Data" } };
    if (!account || !account._isSigner) { throw { message: "Invalid signer account" } };

    const {
      name: NFTname,
      description: NFTdescription,
      // collection_id: NFTcollectionID,
      maxSupply: NFTmaxSupply,
      // image: NFTimageURI
    } = data;
    logger("DEPLOY_NFT_COLLECTION_CONTRACT", "BEGIN", { data });
    
    const contractFactory = await hre.ethers.getContractFactory(
      creatureContract["abi"], // ABI
      creatureContract["bytecode"], // ByteCode
      account, // Signer
    );
    logger("DEPLOY_NFT_COLLECTION_CONTRACT", "SET_CONTRACT_FACTORY");
  
    // const contractAddress = "0x7d7593f5CB0f67a3Fa14Daf063E93d3D4aB3076e";
    // const contract = creatureFactory.attach(contractAddress);
    const contract = await contractFactory.deploy(
        NFTname,
        NFTsymbol,
        NFTdescription,
        // NFTcollectionID,
        NFTmaxSupply
        // NFTimageURI,
    );

    const result = await Promise.all([contract.deployed()]);
    logger("DEPLOY_NFT_COLLECTION_CONTRACT", "RESULT", { contract: contract.address,/*  result */ });
    return { contract, result }

  } catch (error) {
    logger("DEPLOY_NFT_COLLECTION_CONTRACT", "ERROR", { error });
    throw error
  }
}

async function verifyNFTCollectionContract(contract, data) {
  logger("VERIFY_NFT_COLLECTION_CONTRACT", "BEGIN");
  try {
    const { address } = contract;
    logger("VERIFY_NFT_COLLECTION_CONTRACT", "CHECK_INPUT", { contract: contract.address, data });
    const result = await hre.run("verify:verify", {
      address,
      constructorArguments: [
        data.name,
        NFTsymbol,
        data.description,
        // data.collection_id,
        data.maxSupply
      ],
    });
    logger("VERIFY_NFT_COLLECTION_CONTRACT", "END", { result });
  } catch (error) {
    logger("VERIFY_NFT_COLLECTION_CONTRACT", "ERROR", { error });
  }
}

async function setupNFTCollectionContract(contract, data, owner, serialNo) {
  logger("Setting up for serial no", contract.address, serialNo);

  // Mint Contract to Owner Address
  await mintNFTto(contract, owner, serialNo);

  // // ???
  // const tonkenId = index + 1;
  // let NFTPass;
  // let approve;
  // const princeString = data.price;
  // const price = ethers.utils.parseUnits(princeString.toString(), 18);

  // // Approve Owner to Marketplace Contract
  // await approveOwnerToMarketplaceContract(contract, owner, serialNo);

  // // Approve Contract NFT
  // await approveNFTContract(contract, owner, serialNo);

  // /// ???
  // let QRlink;
  // if (!data.qrURL) {
  //   QRlink = "";
  // } else {
  //   QRlink = data.qrURL[index];
  // }
  
  // if (NFTPass == true) {
  //   // Set Excludes Token ID to DB
  //   if (data.excludes.includes(tonkenId)) {
  //     setExcludeNFT(data);
  //   } else {
  //     setIncludeNFT(data)
  //   }
  // }

  // // ???
  // const payload = {
  //   NFTAddress: contractAddress,
  //   tokenId: tonkenId,
  //   tokenAddress: tokenAddress,
  //   price: price.toString(),
  //   ownerAddress: wWinOwnerAddress.address,
  // };

  // // ???
  // setNFTSell(payload)
  // // console.log(" - INSIDE OF OBJECT", inside);
  // // console.log(" - BEFORE  SELL SLEEP");
  // // await sleep(10000);
  // // console.log(" - AFTER SELL SLEEP");
  // console.log(" - NFT CONTRACT : ", contractAddress);
}

async function mintNFTto(contract, minter, serialNo) {
  try {
    logger("MINT_NFT_TO_MINTER", "BEGIN", `@ ${new Date()}`);
    const tx = await contract.mintTo(minter.address);
    // const result = await tx.wait();
    logger("MINT_NFT_TO_MINTER", "END", { tx: tx.hash, contract: contract.address, minter: minter.address/* result */ });
  } catch (error) {
    logger("MINT_NFT_TO_MINTER", "ERROR", { error });
  }
}

async function approveOwnerToMarketplaceContract(contract, owner, serialNo) {
  logger("APPROVE_OWNER_TO_MARKETPLACE_CONTRACT", "BEGIN", { contract: contract.address, serialNo, owner: owner.address });
  try {
    // const tx = await approveOwner(contract.address, serialNo);
    // const result = await tx.wait();

    const contractFactory = await hre.ethers.getContractFactory(
        creatureContract["abi"],
        creatureContract["bytecode"],
        owner, // Signer
    );

    const options = {
      gasLimit: 400000,
    };

    const _contract = await contractFactory.attach(contract.address);
    const tx = await _contract.approve(
        contracts["MARKETPLACE"].address,
        serialNo,
        options,
    );

    // const result = await tx.wait();
    logger("APPROVE_OWNER_TO_MARKETPLACE_CONTRACT", "END", { tx: tx.hash, /* result */ });

    return true;
  } catch (error) {
    logger("APPROVE_OWNER_TO_MARKETPLACE_CONTRACT", "ERROR", { error });
  }
}

async function approveNFTContract(contract, minter, serialNo) {
  logger("APPROVE_FOR_ALL", "BEGIN");
  try {
    const creatureFactory = await hre.ethers.getContractFactory(
      creatureContract["abi"],
      creatureContract["bytecode"],
      minter,
    );
    const options = {
      gasLimit: 400000,
    };
    const _contract = await creatureFactory.attach(contract.address);
    const tx = await _contract.setApprovalForAll(
      contracts["MARKETPLACE"].address,
      true,
      options,
    );
    await tx.wait();
    logger("APPROVE_FOR_ALL", "END", { tx: tx.hash });
    return true;
  } catch (error) {
    logger("APPROVE_FOR_ALL", "ERROR", { error });
  }
}

async function setExcludeNFT () {
  console.log(
      "EXCLUDES",
      tonkenId,
      data.excludes,
      data.excludes.includes(tonkenId),
  );
  await collections.doc(`${contractAddress}-${tonkenId}`).set({
    name: data.name,
    description: data.description,
    collection_id: contractAddress,
    image: data.image,
    totalSupply: data.totalSupply,
    owner: wWinOwnerAddress.address,
    properties: data.properties,
    currency: data.currency,
    create_date: Date.now(),
    price: data.price,
    viewers: [],
    priceHistory: [],
    listing: [],
    offer: [],
    trading_history: [],
    tonkenId: tonkenId,
    qrURL: QRlink,
    tokenAddress: contractAddress,
    isClaim: false,
    excludes: true,
    onSell: false,
  });
}

async function setIncludeNFT(data) {
  console.log(
      "EXCLUDES",
      tonkenId,
      data.excludes,
      data.excludes.includes(tonkenId),
  );
  await collections.doc(`${contractAddress}-${tonkenId}`).set({
    name: data.name,
    description: data.description,
    collection_id: contractAddress,
    image: data.image,
    totalSupply: data.totalSupply,
    owner: wWinOwnerAddress.address,
    properties: data.properties,
    currency: data.currency,
    create_date: Date.now(),
    price: data.price,
    viewers: [],
    priceHistory: [],
    listing: [],
    offer: [],
    trading_history: [],
    tonkenId: tonkenId,
    qrURL: QRlink,
    tokenAddress: contractAddress,
    isClaim: false,
    excludes: false,
    onSell: true,
  });
}



async function setNFTSell(payload) {
  try {
    NFTSell = await sellNFT(inside);
  } catch (err) {
    console.log(err);
    console.log("- NFT sell error");
  }
}

async function setupContractToDB() {
  await collection.doc(`${contractAddress}`).set({
    name: data.name,
    image: data.image,
    description: data.description,
    price: data.price,
    properties: data.properties,
    collectionAddress: contractAddress,
    owner: wWinOwnerAddress.address,
  });
}

// const util = require("../util/util");

// const wwinCreatureContract = require("../abi/WWINCreature.json");
// const WWINCreature = require("../scripts/wwinCreatureMainnet.json");
// const WWinMarketPlace = require("../abi/MarketPlace.json");
// const NFTsymbol = "WWIN-NFT";
// const db = util.db;
// const collections = db.collection("collection_list");
// const collection = db.collection("collections");
// const transaction = db.collection("transactions");


// // for TEST NET >>>>>
// const baseQrURL = WWINCreature.baseQrURL;
// const baseTokenURI = WWINCreature.baseTokenURI;
// // >>>>>



const createCollection = async (data) => {
  try {
    const { contract } = await deployNFTCollectionContract(data)
    verifyNFTCollectionContract(data).then().catch()

    const contractAddress = contract.address;

    await setupContractToDB();

    // Mint with total supply

    const beginIndex = 0;
    console.log(wWinOwnerAddress.address);
    await contract.setBaseTokenURI(`${baseTokenURI}${contractAddress}/`);
    console.log(`- Minted NFT item: ${data.totalSupply}`);

    const totalSupply = data.totalSupply;
    let tokenAddress = "";

    // TEST-NET
    // if (data.currency == "busd") {
    //   tokenAddress = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
    // } else if (data.currency == "bath") {
    //   tokenAddress = "0x9cc3908a1b38bd966ee9c3a2fbd96e1422ea2bd6";
    // } else if (data.currency == "wwin") {
    //   tokenAddress = "0xf5d693ce8515024aaf496cdf11bdb18ca843acee";
    // } else if (data.currency == "bnb") {
    //   tokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    // }

    // MAIN_NET
    if (data.currency == "busd") {
      tokenAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
    } else if (data.currency == "bath") {
      tokenAddress = "";
    } else if (data.currency == "wwin") {
      tokenAddress = "0x1FC2C1C218B079F21b6FdD52b07e4fd256c0A17f";
    } else if (data.currency == "bnb") {
      tokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    }

    for (index = beginIndex; index < totalSupply; index++) {
      
    }
  
    console.log("- begin create collection to DB");
    const obj = {contractAddress: contractAddress};
    return obj;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

const sleep = async (milliseconds) => {
  const start = Date.now();
  while (Date.now() - start < milliseconds);
};

const getTokenIdInfo = async (tokenAddress, tokenId) => {
  try {
    console.log("Get Token Id Info ...");
    console.log("- tokenAddress: ", tokenAddress);
    console.log("- tokenId: ", tokenId);
    const doc = await collections.doc(`${tokenAddress}-${tokenId}`).get();
    const result = {
      properties: doc.data().properties,
      description: doc.data().description,
      image: doc.data().image,
      name: `${doc.data().name}`,
    };
    return result;
  } catch (err) {
    console.log("Error: ", err);
    return {errorMsg: "Can't get token id info!"};
  }
};

const createWwinCreature = async (data) => {
  try {
    const [wWinOwnerAddress] = await hre.ethers.getSigners();
    const mintToAddress = wWinOwnerAddress.address;
    console.log("Winwinwin minting...");
    console.log("- name: ", data.name);
    console.log("- description: ", data.description);
    console.log("- baseQrURL: ", data.baseQrURL);
    console.log("- baseTokenURI: ", baseQrURL);
    console.log("- maxSupply: ", data.totalSupply);
    const start = Date.now();
    const creatureFactory = await hre.ethers.getContractFactory(
        (abi = wwinCreatureContract["abi"]),
        (bytecode = wwinCreatureContract["bytecode"]),
        (signer = wWinOwnerAddress),
    );

    const contractAddress = "0x8351057B11d48a02D138637C9386a7bCE72b0966";
    const contract = creatureFactory.attach(contractAddress);
    // const contract = await creatureFactory.deploy(
    //     data.name,
    //     NFTsymbol,
    //     data.description,
    //     data.maxSupply
    // );
    // await Promise.all([contract.deployed()]);
    // const contractAddress = contract.address;
    // console.log(`- Deployed contract address: ${contractAddress}`);
    // try {
    //   await hre.run("verify:verify", {
    //     address: contractAddress,
    //     constructorArguments: [
    //       data.name,
    //       NFTsymbol,
    //       data.description,
    //       data.maxSupply
    //     ],
    //   });
    // } catch (error) {
    //   console.log("Verify error!!");
    // }
    // console.log("- Verified contract");

    // await contract.setBaseTokenURI(`${data.baseTokenURI}${contractAddress}/`);
    // await contract.setBaseQrURL(`${data.baseQrURL}`);
    for (index = 183; index < data.maxSupply; index++) {
      await contract.mintTo(mintToAddress);
      const tokenId = index + 1;
      console.log("Mint tokenId: ", tokenId);
      const fileUrl = `https://ipfs.io/ipfs/${data.image}`;
      await collections.doc(`${contractAddress}-${tokenId}`).set({
        name: data.name,
        description: data.descriptionHTML,
        image: fileUrl,
        totalSupply: data.maxSupply,
        owner: wWinOwnerAddress.address,
        properties: data.properties,
        currency: data.currency,
        create_date: Date.now(),
        price: data.price,
        viewers: [],
        priceHistory: [],
        listing: [],
        offer: [],
        trading_history: [],
        tonkenId: tokenId,
        tokenAddress: contractAddress,
      });
    }
    const end = Date.now();
    const spentTime = Math.abs(start - end) / 1000;
    console.log(`- spent time: ${spentTime} seconds`);
    const obj = {contractAddress: contractAddress};
    return obj;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

const verifyWwinCreature = async (data) => {
  try {
    const [wWinOwnerAddress] = await hre.ethers.getSigners();
    const creatureFactory = await hre.ethers.getContractFactory(
        (abi = wwinCreatureContract["abi"]),
        (bytecode = wwinCreatureContract["bytecode"]),
        (signer = wWinOwnerAddress),
    );

    const contractAddress = "0x8351057B11d48a02D138637C9386a7bCE72b0966";
    const contract = creatureFactory.attach(contractAddress);

    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [
          data.name,
          NFTsymbol,
          data.description,
          data.maxSupply,
        ],
      });
    } catch (error) {
      console.log("Verify error!!");
    }
  } catch (err) {}
};

// const approveOwner = async (NFTAddress, tokenId) => {
//   console.log("- initial owner approval");
//   const [wWinOwnerAddress] = await hre.ethers.getSigners();
//   const creatureFactory = await hre.ethers.getContractFactory(
//       (abi = creatureContract["abi"]),
//       (bytecode = creatureContract["bytecode"]),
//       (signer = wWinOwnerAddress),
//   );
//   const options = {
//     gasLimit: 400000,
//   };
//   const contract = await creatureFactory.attach(NFTAddress);
//   const metadata = await contract.approve(
//       marketPlaceContractAddress,
//       tokenId,
//       options,
//   );
//   console.log("A OWNER : ", metadata);

//   metadata.wait();
//   console.log("- owner approved");
//   return true;
// };

// const approveNFT = async (NFTAddress, tokenId) => {
//   console.log("- initial NFT approval");
//   const [wWinOwnerAddress] = await hre.ethers.getSigners();
//   const creatureFactory = await hre.ethers.getContractFactory(
//       (abi = creatureContract["abi"]),
//       (bytecode = creatureContract["bytecode"]),
//       (signer = wWinOwnerAddress),
//   );
//   const options = {
//     gasLimit: 400000,
//   };
//   const contract = await creatureFactory.attach(NFTAddress);
//   const metadata = await contract.setApprovalForAll(
//       marketPlaceContractAddress,
//       true,
//       options,
//   );
//   console.log("A NFT : ", metadata);
//   metadata.wait();
//   console.log("- NFT approved");
//   return true;
// };

const sellNFT = async (obj) => {
  console.log(`- start sell on ${obj.NFTAddress}-${obj.tokenId}`);
  const [wWinOwnerAddress] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory(
      (abi = WWinMarketPlace["abi"]),
      (bytecode = WWinMarketPlace["bytecode"]),
      (signer = wWinOwnerAddress),
  );
  const options = {
    gasLimit: 400000,
  };
  const contract = await contractFactory.attach(marketPlaceContractAddress);
  const metadata = await contract.sellItem(obj, options);
  console.log("SELL DATA LOGGGING TRX :", metadata);
  console.log(`- end sell on ${obj.NFTAddress}-${obj.tokenId}`);
  metadata.wait();
  return true;
};

const sellNFTFromApi = async (obj) => {
  const [wWinOwnerAddress] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory(
      (abi = WWinMarketPlace["abi"]),
      (bytecode = WWinMarketPlace["bytecode"]),
      (signer = wWinOwnerAddress),
  );
  const options = {
    gasLimit: 400000,
  };
  const contract = await contractFactory.attach(marketPlaceContractAddress);
  const updateObj = {
    onSell: true,
    isClaim: false,
    excludes: false,
    price: obj.price,
    tokenAddress: obj.tokenAddress,
    collection_id: obj.collection_id,
    ownerAddress: wWinOwnerAddress.address,
  };
  const inside = {
    NFTAddress: obj.collection_id,
    tokenId: obj.tonkenId,
    tokenAddress: obj.tokenAddress,
    price: obj.price,
    ownerAddress: wWinOwnerAddress.address,
  };
  let NFTPass;
  let approve;
  const princeString = data.price;
  const price = ethers.utils.parseUnits(princeString.toString(), 18);
  try {
    approve = await approveOwner(obj.collection_id, obj.tonkenId);
  } catch (err) {
    console.log(err);
    console.log("- approve error");
  }
  try {
    NFTPass = await approveNFT(obj.collection_id, obj.tonkenId);
  } catch (err) {
    console.log(err);
    console.log("- NFT approve error");
  }
  if (NFTPass == true && approve == true) {
    try {
      console.log("INSIDE : ", inside);
      console.log("start sell at : ", `${obj.collection_id}-${obj.tonkenId}`);

      const metadata = await contract.sellItem(inside, options);
      metadata.wait();
      const collectors = db
          .collection("collection_list")
          .doc(obj.collection_id.toString());
      await collectors.set(updateObj, {merge: true});
      return true;
    } catch (err) {
      console.log(err);
    }
  }
};

const getTransctions = async (ownerAddress, nftAddress, postId, mode) => {
  const itemList = [];
  const items = db
      .collection("collection_list")
      .where("tokenAddress", "==", nftAddress);
  const item = await items.get();
  item.forEach((data) => {
    const info = data.data();
    const list = {
      image: info.image,
      name: info.name,
    };
    itemList.push(list);
  });
  // get NFT
  const getNFT = await collections.doc(`${nftAddress}-${postId}`).get();
  const dataNFT = getNFT.data();
  // update
  await collections.doc(`${nftAddress}-${postId}`).set(
      {
        owner: ownerAddress,
        collection_id: nftAddress,
        isClaim: true,
        excludes: true,
        onSell: false,
      },
      {merge: true},
  );
  const date = new Date(Date.now());
  const objCreate = {
    ownerAddress: ownerAddress,
    tokenAddress: dataNFT.currency,
    NFTAddress: nftAddress,
    tokenId: postId,
    price: dataNFT.price,
    create_at: date,
    mode: mode,
    nftData: {image: dataNFT.image, name: dataNFT.name},
  };
  await db.collection("transactions").add(objCreate);
  return objCreate;
};

// module.exports = {
//   approveNFT,
//   approveOwner,
//   getTransctions,
//   createCollection,
//   createWwinCreature,
//   getTokenIdInfo,
//   verifyWwinCreature,
//   sellNFT,
//   sellNFTFromApi,
// };
