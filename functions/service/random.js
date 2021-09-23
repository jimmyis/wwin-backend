const util = require("../util/util");
const db = util.db;

const randomNumber = async (itemList) => {
  const arr = itemList.numbersPool;
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const num = arr[randomIndex];
  const updateObj = [];
  for (const each of arr) {
    if (each != num) {
      updateObj.push(each);
    }
  }
  const update = {numbersPool: updateObj};
  const random = db.collection("random").doc("krud");
  await random.set(update, {merge: true});
  return num;
};

module.exports = {randomNumber};
