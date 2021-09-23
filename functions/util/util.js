/* eslint-disable new-cap */

const ipfsClient = require("ipfs-http-client");
const Busboy = require("busboy");
const busboy = require("connect-busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");

admin.initializeApp();
const db = admin.firestore();

const ipfs = ipfsClient.create("https://ipfs.infura.io:5001/api/v0");

const checkPOSTMethod = async (method, res) => {
  if (method !== "POST") {
    return false;
  } else {
    return true;
  }
};

const addFile = async (fileName, filePath) => {
  const file = await fs.readFileSync(filePath);
  try {
    const fileAdded = await ipfs.add({
      path: fileName.toString(),
      content: file,
    });
    const fileHash = fileAdded.cid;
    const fileUrl = `https://ipfs.io/ipfs/${fileHash}?filename=$${fileAdded.path}`;
    console.log("SERVICE URL : ", fileUrl);
    return {url: fileUrl};
  } catch (err) {
    console.log(err);
  }
};

const addFileWithNoUrl = async (fileName, filePath) => {
  const file = await fs.readFileSync(filePath);
  try {
    const fileAdded = await ipfs.add({
      path: fileName.toString(),
      content: file,
    });
    return {url: fileAdded.cid.toString()};
  } catch (err) {
    console.log(err);
  }
};

const uploadIPFS = async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  console.log(method, " : uploadFileToIPFS");
  const isPost = await checkPOSTMethod(method);
  if (isPost == true) {
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
    const fields = {};

    busboy.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });
    let tempPath = "";
    let fileField = "";
    busboy.on("file", async (fieldname, file, filename) => {
      const filepath = path.join(tmpdir, filename);
      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);
      tempPath = filepath;
      fileField = fieldname;
    });

    busboy.on("finish", async () => {
      const url = await addFile(fileField, tempPath);
      fs.unlinkSync(tempPath);
      res.send(url);
    });
    busboy.end(req.rawBody);
  } else {
    busboy.end(req.rawBody);
  }
};

const iPFSGenerator = async (req, res) => {
  const method = req.method;
  let result;
  console.log(method, " : uploadFileToIPFS");
  const isPost = await checkPOSTMethod(method);
  if (isPost == true) {
    const busboy = new Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
    const fields = {};

    busboy.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });
    let tempPath = "";
    let fileField = "";

    busboy.on("file", async (fieldname, file, filename) => {
      const filepath = path.join(tmpdir, filename);
      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);
      tempPath = filepath;
      fileField = fieldname;
    });
    busboy.on("finish", async () => {
      const url = await addFileWithNoUrl(fileField, tempPath);
      fs.unlinkSync(tempPath);
      result = {mt: url, data: JSON.parse(fields.data)};
      // result = JSON.parse(fields.data);
      res.send(result);
    });
    return req.pipe(busboy);
  }
};

const nonceGenerator = async () => {
  const nonce = Math.floor(Math.random() * 10000);
  return nonce;
};

const secretGenerator = async (id, publicAddress) => {
  const secret = await jsonwebtoken.sign(
      {payload: {id: id, publicAddress}},
      config.config.secret,
      {algorithm: config.config.algorithms[0]},
      {expiresIn: "2h"},
  );
  return secret;
};

const paginate = async (array, pageSize, index) => {
  // transform values
  index = Math.abs(parseInt(index));
  index = index > 0 ? index - 1 : index;
  pageSize = parseInt(pageSize);
  pageSize = pageSize < 1 ? 1 : pageSize;

  // filter
  return [
    ...array.filter((value, n) => {
      return n >= index * pageSize && n < (index + 1) * pageSize;
    }),
  ];
};

module.exports = {
  uploadIPFS,
  checkPOSTMethod,
  addFile,
  iPFSGenerator,
  db,
  nonceGenerator,
  secretGenerator,
  addFileWithNoUrl,
  paginate,
};
