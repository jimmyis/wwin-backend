/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {ethers} = require("ethers");
const hre = require("hardhat");
const util = require("../util/util");

const creatureContract = require("../abi/Creature.json");
const wwinCreatureContract = require("../abi/WWINCreature.json");
const WWINCreature = require("../scripts/wwinCreatureMainnet.json");
const WWinMarketPlace = require("../abi/MarketPlace.json");
const nftSymbol = "WWIN-NFT";
const db = util.db;
const collections = db.collection("collection_list");
const collection = db.collection("collections");
const transaction = db.collection("transactions");


// TEST - MAIN;
const marketPlaceContractAddress = "0x84cad6549B3B97748DB6802F4AA0c6F41Dd4d408";
// TEST-NET;
// const marketPlaceContractAddress = "0x8efB2A4C9Da79bC17e7bc47F382Fe538e5b5202A";

const baseQrURL = WWINCreature.baseQrURL;
const baseTokenURI = WWINCreature.baseTokenURI;


const createCollection = async (data) => {
  try {
    console.log("Start createCollection ...");
    console.log("- data: ", JSON.stringify(data));
    const [wWinOwnerAddress] = await hre.ethers.getSigners();
    const mintToAddress = wWinOwnerAddress.address;
    // mintToAddress = "";
    console.log("- Initial Contract");
    const creatureFactory = await hre.ethers.getContractFactory(
        (abi = creatureContract["abi"]),
        (bytecode = creatureContract["bytecode"]),
        (signer = wWinOwnerAddress),
    );

    // const contractAddress = "0x7d7593f5CB0f67a3Fa14Daf063E93d3D4aB3076e";
    // const contract = creatureFactory.attach(contractAddress);
    console.log(" - Inital Deploy");
    const contract = await creatureFactory.deploy(
        data.name,
        nftSymbol,
        data.description,
        data.collection_id,
        data.image,
    );
    await Promise.all([contract.deployed()]);
    console.log(" - Deployed");
      ],
    });
    console.log("- Verified contract successful");
  } catch (error) {
    console.log("Verify error!!");
  }
}

const mintNFTto = async (data) => {

}


const createCollection = async (data) => {
  try {
    const { contract } = await deployNFTCollectionContract(data)
    verifyNFTCollectionContract(data).then().catch()
    const contractAddress = contract.address;
    console.log(`- Deployed contract address: ${contractAddress}`);
    await collection.doc(`${contractAddress}`).set({
      name: data.name,
      image: data.image,
      description: data.description,
      price: data.price,
      properties: data.properties,
      collectionAddress: contractAddress,
      owner: wWinOwnerAddress.address,
    });
    console.log("- finished create collection to DB");

    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [
          data.name,
          nftSymbol,
          data.description,
          data.collection_id,
          data.image,
        ],
      });
      console.log("- Verified contract successful");
    } catch (error) {
      console.log("Verify error!!");
    }

    console.log("- Verified contract");

    // Mint with total supply

    const beginIndex = 0;
    console.log(wWinOwnerAddress.address);
    await contract.setBaseTokenURI(`${baseTokenURI}${contractAddress}/`);
    console.log(`- Minted NFT item: ${data.totalSupply}`);

    const totalSupply = data.totalSupply;
    let tokenAddress = "";
    // TEST-NET;
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
      console.log("INDEX ", index);
      await contract.mintTo(mintToAddress);
      const tonkenId = index + 1;
      let NFTPass;
      let approve;
      const princeString = data.price;
      const price = ethers.utils.parseUnits(princeString.toString(), 18);
      try {
        approve = await approveOwner(contractAddress, tonkenId);
      } catch (err) {
        console.log(err);
        console.log("- approve error");
      }
      try {
        NFTPass = await approveNFT(contractAddress, tonkenId);
      } catch (err) {
        console.log(err);
        console.log("- NFT approve error");
      }
      let QRlink;
      if (!data.qrURL) {
        QRlink = "";
      } else {
        QRlink = data.qrURL[index];
      }
      console.log(contractAddress);
      // if (ownerPass == true) {
      if (NFTPass == true) {
        if (data.excludes.includes(tonkenId)) {
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
        } else {
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
      }
      const inside = {
        NFTAddress: contractAddress,
        tokenId: tonkenId,
        tokenAddress: tokenAddress,
        price: price.toString(),
        ownerAddress: wWinOwnerAddress.address,
      };
      console.log(" - INSIDE OF OBJECT", inside);
      console.log(" - BEFORE  SELL SLEEP");
      await sleep(10000);
      console.log(" - AFTER SELL SLEEP");

      try {
        NFTSell = await sellNFT(inside);
      } catch (err) {
        console.log(err);
        console.log("- NFT sell error");
      }
      console.log(" - NFT CONTRACT : ", contractAddress);
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
    //     nftSymbol,
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
    //       nftSymbol,
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
          nftSymbol,
          data.description,
          data.maxSupply,
        ],
      });
    } catch (error) {
      console.log("Verify error!!");
    }
  } catch (err) {}
};

const approveOwner = async (NFTAddress, tokenId) => {
  console.log("- initial owner approval");
  const [wWinOwnerAddress] = await hre.ethers.getSigners();
  const creatureFactory = await hre.ethers.getContractFactory(
      (abi = creatureContract["abi"]),
      (bytecode = creatureContract["bytecode"]),
      (signer = wWinOwnerAddress),
  );
  const options = {
    gasLimit: 400000,
  };
  const contract = await creatureFactory.attach(NFTAddress);
  const metadata = await contract.approve(
      marketPlaceContractAddress,
      tokenId,
      options,
  );
  console.log("A OWNER : ", metadata);

  metadata.wait();
  console.log("- owner approved");
  return true;
};

const approveNFT = async (NFTAddress, tokenId) => {
  console.log("- initial NFT approval");
  const [wWinOwnerAddress] = await hre.ethers.getSigners();
  const creatureFactory = await hre.ethers.getContractFactory(
      (abi = creatureContract["abi"]),
      (bytecode = creatureContract["bytecode"]),
      (signer = wWinOwnerAddress),
  );
  const options = {
    gasLimit: 400000,
  };
  const contract = await creatureFactory.attach(NFTAddress);
  const metadata = await contract.setApprovalForAll(
      marketPlaceContractAddress,
      true,
      options,
  );
  console.log("A NFT : ", metadata);
  metadata.wait();
  console.log("- NFT approved");
  return true;
};

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
  const princeString = obj.price;
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
      console.log("META DATA : ", metadata);
      const collectors = db
          .collection("collection_list")
          .doc(`${obj.collection_id.toString()}-${obj.tonkenId}`);
      await collectors.set(updateObj, {merge: true});
      return true;
    } catch (err) {
      console.log(err);
    }
  } else {
    return false;
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
        excludes: false,
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

module.exports = {
  approveNFT,
  approveOwner,
  getTransctions,
  createCollection,
  createWwinCreature,
  getTokenIdInfo,
  verifyWwinCreature,
  sellNFT,
  sellNFTFromApi,
};
