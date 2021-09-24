/* eslint-disable new-cap */
const router = require("express").Router();
const util = require("../util/util");

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/uploadFileToIPFS/api/upload
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/api/uploadFileToIPFS/api/upload
router.post("/upload", util.uploadIPFS);

module.exports = router;
