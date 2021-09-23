/* eslint-disable max-len */
const util = require("../util/util");
const functions = require("firebase-functions");

const db = util.db;

const create = async (publicAddress) => {
  const nonce = await util.nonceGenerator();
  const createObj = {
    name: "",
    nonce: nonce,
    role: "user",
  };
  const collectors = db.collection("users").doc(publicAddress);
  await collectors.set(createObj);
  const obj = {status: true, id: publicAddress, data: createObj};
  return obj;
};

const isOwnerAdmin = async (publicAddress) => {
  const collectors = db.collection("users").doc(publicAddress);
  const doc = await collectors.get();
  let result = true;
  if (doc.data().role != "owner" && doc.data().role != "admin") {
    console.log("No such document!");
    result = false;
    return result;
  } else {
    result = true;
    return result;
  }
};

const findOne = async (publicAddress) => {
  const id = publicAddress;
  functions.logger.log("TYPE OF DOC   : ", typeof publicAddress);
  const collectors = db.collection("users").doc(id);
  const doc = await collectors.get();
  let result = true;
  if (!doc.exists) {
    console.log("No such document!");
    result = false;
    return result;
  } else {
    result = {
      id: doc.id,
      name: doc.data().name,
      nonce: doc.data().nonce,
    };
    return result;
  }
};

const updateNonce = async (publicAddress) => {
  const nonce = await util.nonceGenerator();
  const dataUpdate = {nonce: nonce};
  const user = db.collection("users").doc(publicAddress);
  await user.set(dataUpdate, {merge: true});
  return nonce;
};

const singIn = async (nonce, publicAddress) => {
  try {
    console.log(nonce, publicAddress);
    const users = db.collection("users").doc(publicAddress);
    const doc = await users.get();
    console.log(doc.data());
    return doc;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {findOne, create, singIn, updateNonce, isOwnerAdmin};
