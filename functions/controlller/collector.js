/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require("express").Router();
const Busboy = require("busboy");
const util = require("../util/util");
const os = require("os");
const fs = require("fs");
const path = require("path");

const db = util.db;

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollectors/api/user/findAll
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollectors/api/user/findAll
router.get("/user/findAll", async (req, res, next) => {
  // [START firestore_data_query]
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  console.log(method, " : handleCollectors");
  const collectors = db.collection("users");
  const doc = await collectors.get();
  const collectorArray = [];
  doc.forEach((doc) => {
    const collector = {
      id: doc.id,
      data: doc.data(),
    };
    collectorArray.push(collector);
  });
  res.send(collectorArray);
  // [END firestore_data_query]
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollectors/api/user/findOne/:id
// SERVER PATH :https://us-central1-wwin-testnet.cloudfunctions.net/handleCollectors/api/user/findOne/:id
router.get("/user/findOne/:id", async (req, res) => {
  // [START firestore_data_query]
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  const id = req.params.id;
  console.log(method, " : handleCollection");
  const collectors = db.collection("users").doc(id);
  const doc = await collectors.get();
  if (!doc.exists) {
    console.log("No such document!");
    res.status(404).json({error: "not found"});
  } else {
    console.log("Document data:", doc.data());
    const data = doc.data();
    if (!data.collectibles) {
      data.collectibles = 0;
    }
    if (!data.favorites) {
      data.favorites = 0;
    }
    if (!data.followers) {
      data.followers = 0;
    }
    if (!data.following) {
      data.following = 0;
    }
    const finalize = {
      user_name: data.user_name,
      name: data.name,
      profile_picture: data.profile_picture,
      bio: data.bio,
      role: data.role,
      collectibles: data.collectibles.length,
      favorites: data.favorites.length,
      followers: data.followers.length,
      following: data.following.length,
    };

    res.send(finalize);
  }
  // [END firestore_data_query]
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollectors/api/user/update/:id
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net//handleCollectors/user/update/:id
router.put("/user/update/:id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  const busboy = new Busboy({headers: req.headers});
  const formData = {};
  const tmpdir = os.tmpdir();
  busboy.on(
      "field",
      (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        formData[fieldname] = val;
      },
  );

  let tempPath = "";
  let fileField = "";
  let fileUploaded = false;
  busboy.on("file", async (fieldname, file, filename) => {
    fileUploaded = true;
    if (file) {
      const filepath = path.join(tmpdir, filename);
      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);
      tempPath = filepath;
      fileField = fieldname;
    }
  });

  busboy.on("finish", async () => {
    let file = {};
    console.log(fileUploaded);
    if (fileUploaded == false) {
      const collectors = db.collection("users").doc(id.toString());
      await collectors.set(formData, {merge: true});
      res.send({id: id, data: formData});
    } else {
      if (fileField && tempPath) {
        file = await util.addFile(fileField, tempPath);
        fs.unlinkSync(tempPath);
        formData.profile_picture = file.url;
        const collectors = db.collection("users").doc(id.toString());
        await collectors.set(formData, {merge: true});
        res.send({id: id, data: formData});
      }
    }
  });
  busboy.end(req.rawBody);
});

// LOCAL PATH : http://localhost:5000/wwin-testnet/us-central1/handleCollectors/api/user/create
// SERVER PATH : https://us-central1-wwin-testnet.cloudfunctions.net/handleCollectors/api/user/create
router.post("/user/create", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const busboy = new Busboy({headers: req.headers});
  const formData = {};
  const tmpdir = os.tmpdir();

  busboy.on(
      "field",
      (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        formData[fieldname] = val;
      },
  );

  let tempPath = "";
  let fileField = "";
  let fileUploaded = false;
  busboy.on("file", async (fieldname, file, filename) => {
    fileUploaded = true;
    const filepath = path.join(tmpdir, filename);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);
    tempPath = filepath;
    fileField = fieldname;
  });

  busboy.on("finish", async () => {
    const lowWallet =formData.wallet;
    console.log(lowWallet);
    if (fileUploaded == true) {
      const file = await util.addFile(fileField, tempPath);
      fs.unlinkSync(tempPath);
      const nonce = await util.nonceGenerator();
      const createObj = {
        bio: formData.bio,
        name: formData.name,
        user_name: formData.user_name,
        profile_picture: file.url,
        nonce: nonce,
        collectibles: [],
        favorites: [],
        followers: [],
        following: [],
      };
      const collectors = db.collection("users").doc(lowWallet);
      await collectors.set(createObj);
      res.send({status: true, id: formData.wallet, data: createObj});
    } else {
      const nonce = await util.nonceGenerator();
      const createObj = {
        bio: formData.bio,
        name: formData.name,
        user_name: formData.user_name,
        nonce: nonce,
        collectibles: [],
        favorites: [],
        followers: [],
        following: [],
      };
      const collectors = db.collection("users").doc(lowWallet);
      await collectors.set(createObj);
      res.send({status: true, id: formData.wallet, data: createObj});
    }
  });
  busboy.end(req.rawBody);
});

module.exports = router;
