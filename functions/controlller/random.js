/* eslint-disable new-cap */
const util = require("../util/util");
const router = require("express").Router();
const randomService = require("../service/random");
const db = util.db;

router.get("/random/getAll", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  console.log(method, " : handleCollections");
  const items = db.collection("random");
  const item = await items.get();
  const itemList = [];
  item.forEach((doc) => {
    if (doc.id != "krud") {
      itemList.push(doc.data());
    }
  });
  res.send(itemList);
});

router.post("/random/creat/pool", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  console.log(method, " : handleCollections");
  const data = req.body.data;
  const obj = {numbersPool: data};
  const random = db.collection("random").doc("krud");
  await random.set(obj, {merge: true});
  res.send(req.body);
});

// router.post("/random/get/random", async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   const address = req.body.address;
//   let preset = Array.from({length: 3000}, (_, i) => i + 1);
//   const items = db.collection("random").where("isClaim", "==", true);
//   const item = await items.get();
//   const itemList = [];
//   item.forEach((doc) => {
//     itemList.push(parseInt(doc.data().number));
//   });
//   preset = preset.filter((val) => !itemList.includes(val));
//   const random = preset[Math.floor(Math.random() * preset.length)];
//   const date = new Date(Date.now());
//   const obj = {
//     address: address,
//     number: random,
//     reserve_date: date,
//     isClaim: true,
//   };
//   const addQ = db.collection("random").doc(`${address}-${random}`);
//   await addQ.set(obj);
//   const result = {address: address, number: random, reserve_date: date};
//   res.send(result);
// });

router.post("/random/get/random", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const address = req.body.address;
  const items = db.collection("random").doc("krud");
  const item = await items.get();
  if (item.data().numbersPool.length > 0) {
    const random = await randomService.randomNumber(item.data());
    const date = new Date(Date.now());
    const obj = {address: address, number: random, reserve_date: date};
    const addQ = db.collection("random").doc(`${address}-${random}`);
    await addQ.set(obj);
    res.send({address: address, number: random});
  } else {
    res.send({status: "pool is empty"});
  }
});

router.post("/random/:address", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const randomDocs = await db
      .collection("random")
      .where("address", "==", req.params.address)
      .get();
  const randoms = [];
  randomDocs.forEach((doc) => {
    randoms.push(doc.data());
    console.log("data: ", doc.data());
  });
  res.send({randoms: randoms});
});

module.exports = router;
