const util = require("../util/util");

const db = util.db;

const findByName = async (name) => {
  const collectionList = db.collection("collection_list");
  const item = await collectionList.where("name", "==", name).get();
  const itemList = [];
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
};

const findByCategories = async (input) => {
  const collectionList = db.collection("collection_list");
  const item = await collectionList.where("categories", "==", input).get();
  const itemList = [];
  item.forEach((doc) => {
    const date = new Date(doc.data().create_date);
    const data = {
      id: doc.id,
      name: doc.data().name,
      currency: doc.data().currency,
      image: doc.data().image,
      price: parseFloat(doc.data().price),
      owner: doc.data().owner,
      status: doc.data().status,
      create_date: date,
      categories: doc.data().categories,
    };

    itemList.push(data);
  });
  return itemList;
};

const findByStatus = async (input) => {
  console.log(input);
  const collectionList = db.collection("collection_list");
  const item = await collectionList.where("status", "==", input).get();
  const itemList = [];
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
};

const findByChain = async (input) => {
  console.log(input);
  const collectionList = db.collection("collection_list");
  const item = await collectionList.where("currency", "==", input).get();
  const itemList = [];
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
};

const filterWithCurrency = (data, onSaleInput, chainsInput) => {
  let chains;
  let onSaleIn;
  if (!chainsInput && !onSaleInput) {
    return data;
  }
  if (chainsInput && !onSaleInput) {
    if (data.currency == chainsInput) {
      chains = data;
      return chains;
    }
  }
  if (onSaleInput && !chainsInput) {
    if (data.currency == onSaleInput) {
      onSaleIn = data;
      return onSaleIn;
    }
  }
  if (chainsInput && onSaleInput) {
    if (data.currency == chainsInput) {
      onSaleIn = data;
      return onSaleIn;
    }
    if (data.currency == onSaleInput) {
      onSaleIn = data;
      return onSaleIn;
    }
    const merge = [].concat(onSaleIn, chains);
    return merge;
  }
};

const filterStatus = async (
    data,
    filterStatus,
    filterOnSaleIn,
    filterChains,
) => {
  // let result;

  if (Array.isArray(filterStatus)) {
    console.log("STATUS IS ARRAY");
    // for (const eachStat of filterStatus) {
    //   console.log("DATA STATUS", eachStat);
    //   if (eachStat == data.status) {
    //     const finalStatus = this.filterWithCurrency(
    //         data,
    //         filterOnSaleIn,
    //         filterChains,
    //     );
    //     result = finalStatus;
    //     return result;
    //   }
    // }
  } else {
    console.log("STATUS NOT ARRAY");
    if (data.status == filterStatus) {
      console.log(data, filterStatus, filterOnSaleIn, filterChains);
      const finalStatus = await this.filterWithCurrency(
          data,
          filterOnSaleIn,
          filterChains,
      );
      // result = finalStatus;
      return finalStatus;
    } else {
      return;
    }
  }
  return data;
};

const filterPrice = async (maxPrice, minPrice, sortBy) => {
  console.log(maxPrice, minPrice, sortBy);
  try {
    const items = db.collection("collection_list");
    let item;
    const itemList = [];
    if (!maxPrice && minPrice && !sortBy) {
      console.log("MIN");
      item = await items
          .where("price", "<=", minPrice)
          .orderBy("price", "desc")
          .get();
    } else if (maxPrice && !minPrice && !sortBy) {
      console.log("MAX");
      item = await items
          .where("price", "<=", maxPrice)
          .orderBy("price", "desc")
          .get();
    }
    if (maxPrice && minPrice && !sortBy) {
      const itemMiddle = await items
          .where("price", "<=", maxPrice)
          .where("price", ">=", minPrice);
      item = await itemMiddle.orderBy("price", "desc").get();
    }
    if (!maxPrice && !minPrice && sortBy == "fromMax") {
      console.log("fromMax");
      const itemMiddle = await items.orderBy("price", "desc");
      item = await itemMiddle.get();
    } else if (!maxPrice && !minPrice && sortBy == "fromMin") {
      console.log("fromMin");
      const itemMiddle = await items.orderBy("price", "asc");
      item = await itemMiddle.get();
    }
    item.forEach((doc) => {
      console.log(doc.data().price);
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
  } catch (err) {
    console.log(err);
    return {
      error: "not found",
    };
  }
};
const getSellList = async (address) => {
  const items = db.collection("collection_list");
  const item = await items
      .where("tokenAddress", "==", address)
      .where("isClaim", "==", false)
      .where("excludes", "==", false)
      .get();
  const itemList = [];
  if (item.size > 0) {
    item.forEach((doc) => {
      itemList.push(doc.data().tonkenId);
    });
    return itemList;
  } else {
    return null;
  }
};

module.exports = {
  getSellList,
  filterWithCurrency,
  findByChain,
  findByName,
  findByCategories,
  findByStatus,
  filterStatus,
  filterPrice,
};
