/* eslint-disable max-len */
/* eslint-disable new-cap */

const routerCollection = require("express").Router();
const util = require("../util/util");
const Busboy = require("busboy");
const os = require("os");
const {ethers} = require("ethers");
const fs = require("fs");
const path = require("path");
const contractService = require("../service/contract");
const collectionListService = require("../service/collection_list");

const db = util.db;

routerCollection.get("/collection/get/ownerNFT", async (req, res) => {
  const ownerAddress = req.query.ownerAddress;
  const NFTAddress = req.query.NFTAddress;
  const tokenId = req.query.tokenId;
  const list = [];
  console.log(tokenId);
  const items = db.collection("collection_list");
  const item = await items
      .where("collection_id", "==", NFTAddress)
      .where("owner", "==", ownerAddress)
      .where("tonkenId", "==", parseInt(tokenId))
      .get();
  // console.log(item.data());
  item.forEach((data) => {
    console.log(data.data());
    list.push(data.data());
  });

  res.send(list[0]);
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollections/api/collection/findOne/:collection_id
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollections/api/collection/findOne/:collection_id
routerCollection.get("/collection/findOne/:collection_id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.mthod;
  console.log(req.params.collection_id);
  console.log(method, " : handleCollections");
  const collectionId = req.params.collection_id;
  const itemList = [];
  const items = db.collection("collection_list");
  const item = await items
      .where("tokenAddress", "==", collectionId)
      .where("excludes", "==", false)
      .where("onSell", "==", true)
      .get();
  const collections = db.collection("collections").doc(collectionId);
  const collection = await collections.get();
  console.log(collection.data());
  const itemListVacan = [];
  const sellListVacan = [];

  if (collection.data()) {
    console.log(collection.data().name);
    item.forEach((doc) => {
      const date = new Date(doc.data().create_date);
      const data = {
        id: doc.id,
        collection_id: doc.data().collection_id,
        name: doc.data().name,
        currency: doc.data().currency,
        image: doc.data().image,
        description: doc.data().description.toString(),
        price: parseFloat(doc.data().price),
        owner: doc.data().owner,
        status: doc.data().status,
        create_date: date,
        categories: doc.data().categories,
        properties: doc.data().properties,
        isClaim: doc.data().isClaim,
        tonkenId: doc.data().tonkenId,
      };
      if (doc.data().isClaim == false) {
        itemListVacan.push(data);
        sellListVacan.push(data.tonkenId);
      }
      itemList.push(data);
    });
    console.log(itemList);
    const collectionData = {
      id: collectionId,
      name: collection.data().name,
      owner: collection.data().owner,
      description: collection.data().description,
      image: itemList[0].image,
      totalSupply: itemList.length,
      available: itemListVacan.length,
      properties: itemList[0].properties,
      currency: itemList[0].currency,
      price: itemList[0].price,
      tokenIds: sellListVacan,
    };
    res.send(collectionData);
  } else {
    res.status(404).send("not found" + req.params.collection_id);
  }
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollections/api/collection/findOne/item/:itemId
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollections/api/collection/findOne/item/:itemId
routerCollection.get("/collection/findOne/item/:itemId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  console.log(
      method,
      " : handleCollections",
      "PATH : ",
      "/collection/findOne/item/:itemId",
  );
  const itemId = req.params.itemId;
  const items = db.collection("collection_list").doc(`${itemId}`);
  const item = await items.get();
  console.log(item.exists);
  const date = new Date(item.data().create_date);
  const data = {
    id: item.id,
    name: item.data().name,
    description: item.data().description,
    collection_id: item.data().collection_id,
    image: item.data().image,
    totalSupply: item.data().totalSupply,
    owner: item.data().owner,
    properties: item.data().properties,
    currency: item.data().currency,
    create_date: date,
    price: item.data().price,
    viewers: item.data().viewers,
    priceHistory: item.data().priceHistory,
    listing: item.data().listing,
    offer: item.data().offer,
    trading_history: item.data().trading_history,
    tonkenId: item.data().tonkenId,
    qrURL: item.data().qrURL,
    tokenAddress: item.data().address,
    categories: item.data().categories,
  };
  res.send(data);
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollections/api/collections/findAll/:ownerId
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollections/api/collections/findAll/:ownerId
routerCollection.get("/collections/findAll/:ownerId", async (req, res) => {
  // [START firestore_collection_query]
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  console.log(method, " : handleCollections");

  const ownerId = req.params.ownerId;
  const collectionsList = [];
  const collectionsArray = [];
  //   const collectionItems = [];

  const collections = db.collection("collections");
  const collection = await collections
      .where("owner", "==", ownerId.toString())
      .get();

  if (collection.empty) {
    console.log("No matching documents.");
    return;
  }
  collection.forEach((doc) => {
    const data = {
      id: doc.id,
      name: doc.data().name,
      owner: doc.data().owner,
      description: doc.data().description,
      cover: doc.data().cover,
      logo: doc.data().logo,
    };
    collectionsList.push(data);
  });
  for (const each of collectionsList) {
    const data = {
      id: each.id,
      name: each.name,
      owner: each.owner,
      description: each.description,
      cover: each.cover,
      logo: each.logo,
      items: [],
    };
    const itemArray = db
        .collection("collection_list")
        .where("collection_id", "==", each.id)
        .where("owner", "==", ownerId);
    const item = await itemArray.get();
    const pusher = [];
    item.forEach((doc) => {
      const date = new Date(doc.data().create_date);
      const data = {
        id: doc.id,
        collection_id: each.id,
        name: doc.data().name,
        currency: doc.data().currency,
        image: doc.data().image,
        price: doc.data().price,
        owner: doc.data().owner,
        status: doc.data().status,
        create_date: date,
        categories: doc.data().categories,
        properties: doc.data().properties,
      };
      if (data.collection_id == each.id) {
        pusher.push(data);
      }
    });
    // collectionItems.push(pusher);
    data.items = pusher;

    collectionsArray.push(data);
  }

  res.send(collectionsArray);
  // [END firestore_collection_query]
});

routerCollection.get("/collections/get/list", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  const collectionsList = [];
  console.log(method, " : handleCollections");
  const ownerId = req.query.ownerId;
  const collections = db.collection("collections");
  const collection = await collections
      .where("owner", "==", ownerId.toString())
      .get();
  collection.forEach((doc) => {
    const data = {
      id: doc.id,
      name: doc.data().name,
      logo: doc.data().logo,
    };
    collectionsList.push(data);
  });
  res.send(collectionsList);
});

routerCollection.get("/collection/:tokenAddress/:tokenId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(" : create NFT", req.body);

  const result = await contractService.getTokenIdInfo(
      req.params.tokenAddress,
      req.params.tokenId,
  );
  res.send(result);
});

routerCollection.get("/collection/:tokenAddress/:tokenId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const result = await contractService.getTokenIdInfo(
      req.params.tokenAddress,
      req.params.tokenId,
  );
  res.send(result);
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollections/api/collection/create/item
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollections/collection/create/item
// routerCollection.post("/collection/create/item", async (req, res) => {
//   const busboy = new Busboy({headers: req.headers});
//   const tmpdir = os.tmpdir();
//   const fields = {};

//   busboy.on("field", (fieldname, val) => {
//     fields[fieldname] = val;
//   });
//   let tempPath = "";
//   let fileField = "";

//   busboy.on("file", async (fieldname, file, filename) => {
//     const filepath = path.join(tmpdir, filename);
//     const writeStream = fs.createWriteStream(filepath);
//     file.pipe(writeStream);
//     tempPath = filepath;
//     fileField = fieldname;
//   });
//   busboy.on("finish", async () => {
//     // const url = await util.addFileWithNoUrl(fileField, tempPath);
//     // fs.unlinkSync(tempPath);
//     const result = {data: fields};
//     // result = JSON.parse(fields.data);
//     res.send(result);
//   });
//   return req.pipe(busboy);
// });

routerCollection.post("/collection/create/item", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const form = new Busboy({headers: req.headers});
  const formData = {};
  form.on(
      "field",
      (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        formData[fieldname] = val;
      },
  );
  const tmpdir = os.tmpdir();
  let tempPath = "";
  let fileField = "";
  form.on("file", async (fieldname, file, filename) => {
    const filepath = path.join(tmpdir, filename);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);
    tempPath = filepath;
    fileField = fieldname;
  });
  form.on("finish", async () => {
    console.log(tempPath, fileField);
    const url = await util.addFile(fileField, tempPath);
    fs.unlinkSync(tempPath);
    const data = JSON.parse(formData.data);

    const createObj = {
      name: data.name,
      collection_id: data.collection_id,
      description: data.description,
      viewers: [],
      priceHistory: [],
      listing: [],
      offer: [],
      trading_history: [],
      currency: data.currency,
      image: url.url,
      price: data.price,
      owner: data.owner,
      status: data.status,
      totalSupply: data.totalSupply,
      properties: data.properties,
      categories: data.categories,
      create_date: Date.now(),
      qrURL: data.qrURL,
      excludes: data.excludes,
    };
    console.log(createObj);
    const contract = await contractService.createCollection(createObj);
    console.log("FINAL RESULT = ", contract);
    const final = {
      contractToken: contract.contractAddress,
    };
    res.send(final);
  });
  form.end(req.rawBody);
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollections/api/collection/create
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollections/api/collection/create
routerCollection.post("/collection/create", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const form = new Busboy({headers: req.headers});
  const formData = {};
  form.on(
      "field",
      (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        formData[fieldname] = val;
      },
  );
  // eslint-disable-next-line no-unused-vars
  let tempPath = "";
  // eslint-disable-next-line no-unused-vars
  let fileField = "";
  const urls = [];
  const tmpdir = os.tmpdir();
  const files = []; // create an empty array to hold the processed files
  const buffers = {}; // create an empty object to contain the buffers
  const fileInfo = [];
  form.on("file", async (field, file, filename, enc, mime, fieldname) => {
    buffers[field] = []; // add a new key to the buffers object
    file.on("data", (data) => {
      buffers[field].push(data);
    });
    const filepath = path.join(tmpdir, filename);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);
    tempPath = filepath;
    fileField = filename;
    const paths = {
      tempPath: filepath,
      fileField: filename,
    };
    fileInfo.push(paths);
    file.on("end", async () => {
      files.push({
        fileBuffer: Buffer.concat(buffers[field]),
        fileType: mime,
        fileName: filename,
        fileEnc: enc,
      });
    });
  });
  form.on("finish", async () => {
    for (const info of fileInfo) {
      const url = await util.addFile(info.fileField, info.tempPath);
      urls.push(url);
      fs.unlinkSync(info.tempPath);
    }
    const createObj = {
      name: formData.name,
      cover: urls[0].url,
      logo: urls[1].url,
      description: formData.description,
      owner: formData.owner,
      collectionAddress: formData.collectionAddress,
    };
    console.log(createObj);
    const collectors = db
        .collection("collections")
        .doc(formData.collectionAddress);
    const result = await collectors.set(createObj);
    console.log("RESULT ", result);
    const obj = {
      id: formData.collectionAddress,
      name: formData.name,
      cover: urls[1].url,
      logo: urls[0].url,
      description: formData.description,
      owner: formData.owner,
      collectionToken: formData.collectionToken,
    };
    res.send({status: true, owner: formData.owner, data: obj});
  });
  form.end(req.rawBody);
});

routerCollection.post("/collection/item/reserve", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const walletAddress = req.body.wallet_address;
  const itemId = req.body.item;

  const items = db.collection("collection_list").doc(`${itemId}`);
  const item = await items.get();
  const offer = item.data().offer;
  const currentPrice = item.data().price;
  const limit = item.data().limit;

  if (limit - offer.length === 0) {
    return res.status(500).send({
      success: false,
      message: "item not enough",
    });
  }

  const updateOffer = offer.concat({
    from: walletAddress,
    price: currentPrice,
    created_at: Date.now(),
  });

  await items.update({
    current_owner: walletAddress,
    offer: updateOffer,
  });

  res.send({
    success: true,
    message: "Asset reserved",
  });
});

// dummy
routerCollection.post("/collection/test/approve", async (req, res) => {
  const obj = [
    {
      NFTAddress: "0x76c4167615E8692066A5f50464dE2e1D39547073",
      tokenId: 1,
      tokenAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
      price: "70000000000000000",
      ownerAddress: "0xc847a776197F2f45D84FF83F1ADDb82AC07FD63d",
    },
  ];
  console.log(obj);
  const approve = await contractService.sellNFT(obj);
  console.log(approve);
  res.send({status: "approved"});
});

routerCollection.put("/collections/update/onsell", async (req, res) => {
  const address = req.body.address;
  const onsell = req.body.onsell;
  const tokenAddress = req.body.tokenAddress;
  const price = req.body.price;

  console.log(onsell);
  const items = db
      .collection("collection_list")
      .where("tokenAddress", "==", address);
  const item = await items.get();
  const itemList = [];
  item.forEach((doc) => {
    const data = {
      id: doc.id,
      tonkenId: doc.data(),
    };
    itemList.push(data);
  });

  for (const each of itemList) {
    if (onsell.includes(parseInt(each.tonkenId.tonkenId))) {
      // console.log("EACH NFT", each.tonkenId);
      console.log(price);
      const priceNFT = ethers.utils.parseUnits(price.toString(), 18).toString();
      const obj = {
        onSell: true,
        isClaim: false,
        excludes: false,
        price: priceNFT,
        tokenAddress: tokenAddress,
        collection_id: address,
        tonkenId: each.tonkenId.tonkenId,
      };
      await contractService.sellNFTFromApi(obj);
    }
  }
  res.send({status: true});
});

routerCollection.get("/collections/get/sell/list/", async (req, res) => {
  const address = req.query.address;
  const list = await collectionListService.getSellList(address);
  console.log(list);
  let length = 0;
  if (list == null) {
    length = 0;
  } else {
    length = list.length;
  }
  res.send({length: length, data: list});
});

module.exports = routerCollection;
