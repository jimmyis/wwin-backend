/* eslint-disable max-len */
/* eslint-disable new-cap */

/* eslint-disable max-len */
/* eslint-disable new-cap */

const util = require("../util/util");
const router = require("express").Router();
const contarctService = require("../service/contract");

const db = util.db;

router.get("/transaction/get/user/transactions/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const ownerAddress = req.query.ownerAddress;
  console.log(ownerAddress);
  const itemList = [];
  const items = db
      .collection("transactions")
      .where("ownerAddress", "==", `${ownerAddress}`);
  const item = await items.get();
  item.forEach(async (data) => {
    itemList.push(data.data());
  });
  res.send(itemList);
});

router.post("/transaction/save/address", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const data = req.body;
  const postId = data.postId;
  const nftAddress = data.nftAddress;
  const account = data.account;
  const mode = data.mode;
  console.log(nftAddress, parseInt(postId), mode);
  const metadata = await contarctService.getTransctions(
      account,
      nftAddress,
      parseInt(postId),
      mode,
  );
  res.send({status: true, saved: metadata});
});

router.get("/transaction/get/address", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const postId = req.query.postId;
  const address = req.query.address;
  const metadata = await contarctService.getTransctions(address, postId);
  res.send(metadata);
});

module.exports = router;
