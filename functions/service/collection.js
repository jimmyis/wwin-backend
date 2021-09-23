const util = require("../util/util");

const db = util.db;

const findByName = async (name) => {
  const itemList = [];
  const collections = db.collection("collections");
  const collection = await collections.where("name", "==", name).get();
  let collectionId;
  collection.forEach((doc) => {
    console.log(doc.id);
    collectionId = doc.id;
  });
  if (collectionId) {
    const items = db.collection("collection_list");
    const item = await items.where("collection_id", "==", collectionId).get();
    item.forEach((doc) => {
      const date = new Date(doc.data().create_date);
      const data = {
        id: doc.id,
        name: doc.data().name,
        currency: doc.data().currency,
        image: doc.data().image,
        price: doc.data().price,
        owner: doc.data().owner,
        status: doc.data().status,
        create_date: date,
        categories: doc.data().categories,
      };
      itemList.push(data);
    });
    return itemList;
  }
};

const createProperties = async (image, name, value) => {
  util.addFile();
};

module.exports = {
  findByName,
  createProperties,
};
