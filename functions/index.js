/* eslint-disable new-cap */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const busboy = require("connect-busboy");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const collectorController = require("./controlller/collector");
const uploadIPFSController = require("./controlller/uploadIPFS");
const collectionController = require("./controlller/collection");
const initialController = require("./controlller/initial");
const marketPlaceController = require("./controlller/marketPlace");
const randomController = require("./controlller/random");
const transactionController = require("./controlller/transaction");

const uploadIPFS = express();
const collector = express();
const collection = express();
const init = express();
const market = express();
const random = express();
const transaction = express();

uploadIPFS.use(cors({origin: true}));
collector.use(cors({origin: true}));
collection.use(cors({origin: true}));
init.use(cors({origin: true}));
market.use(cors({origin: true}));
random.use(cors({origin: true}));
transaction.use(cors({origin: true}));

uploadIPFS.use(busboy());
uploadIPFS.use(fileUpload());

uploadIPFS.use("/api", uploadIPFSController);
collector.use("/api", collectorController);
collection.use("/api", collectionController);
init.use("/api", initialController);
market.use("/api", marketPlaceController);
random.use("/api", randomController);
transaction.use("/api", transactionController);

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "4GB",
};

exports.handleCollectors = functions
    .runWith(runtimeOpts)
    .https.onRequest(collector);

exports.handleTransaction = functions
    .runWith(runtimeOpts)
    .https.onRequest(transaction);

exports.handleCollections = functions
    .runWith(runtimeOpts)
    .https.onRequest(collection);

exports.uploadFileToIPFS = functions
    .runWith(runtimeOpts)
    .https.onRequest(uploadIPFS);

exports.initialApplication = functions
    .runWith(runtimeOpts)
    .https.onRequest(init);

exports.handleMarketPlace = functions
    .runWith(runtimeOpts)
    .https.onRequest(market);

exports.handleRandom = functions.runWith(runtimeOpts).https.onRequest(random);
