/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require("express").Router();
const userService = require("../service/user");
const util = require("../util/util");
const {bufferToHex} = require("ethereumjs-util");
const {recoverPersonalSignature} = require("eth-sig-util");
const functions = require("firebase-functions");

const db = util.db;
// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/initialApplication/api/init/metaMask
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/initialApplication/api/init/metaMask
router.post("/init/metaMask", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const publicAddress = req.body.publicAddress;
  const signature = req.body.signature;
  const user = await userService.findOne(publicAddress);
  console.log("USER OBJECT : ", user);
  functions.logger.log(" PATH : /init/metaMask ");
  functions.logger.log("USER OBJECT : ", user);
  if (user == false) {
    res.status(404).send({
      message: "not found in database",
    });
  } else {
    functions.logger.log(" USER FOUND ");
    const secret = await util.secretGenerator(user.id, publicAddress);
    const msg = `I am signing my one-time nonce: ${user.nonce}`;
    const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));
    let address;
    try {
      msgBufferHex;
      address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });
    } catch (err) {
      res.status(400).send({message: "invalid signature length"});
    }

    console.log(address.toLowerCase(), publicAddress.toLowerCase());
    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      const killInstance = process.exit.bind(process, 16);
      functions.logger.log("killInstance", killInstance);
      await userService.updateNonce(publicAddress);
      functions.logger.log("FINISH");
      const obj = {
        publicAddress: publicAddress,
        nonce: user.nonce,
        username: user.user_name,
        token: secret,
      };

      res.status(200).send(obj);
    } else {
      res.status(401).send({
        message: "Signature verification failed",
      });
      return null;
    }
  }
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/initialApplication/api/init/get/nonce/:publcAddress
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/initialApplication/init/get/nonce/:publcAddress
router.get("/init/get/nonce/:publcAddress", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  const id = req.params.publcAddress;
  console.log(method, " : handleCollection");
  const collectors = db.collection("users").doc(id);
  const doc = await collectors.get();
  if (!doc.exists) {
    console.log("no existing user");
    const newUser = await userService.create(id, req.headers);
    const nonce = await userService.updateNonce(id);
    res.status(200).send({publcAddress: newUser.id, nonce: nonce});
  } else {
    console.log("existing user");
    const data = doc.data();
    res.status(200).send({publcAddress: id, nonce: data.nonce});
  }
});

module.exports = router;
