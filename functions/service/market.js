/* eslint-disable max-len */

const util = require("../util/util");
const collectionService = require("../service/collection");
const collectionListService = require("../service/collection_list");

const db = util.db;

const filter = async (filter) => {
  let collections;
  const resultC = [];
  const resultCat = [];
  const resulStat = [];
  const resultS = [];
  const serachResult = [];
  const collectionArray = [];
  const categoryArray = [];
  let finalCollections = [];
  let onSaleIn;
  let chains;
  // const mergeResults = [];

  if (filter.search && filter.page && filter.limit) {
    const searchName = await collectionService.findByName(filter.search);
    const searchNFT = await collectionListService.findByName(filter.search);
    resultS.push(searchName, searchNFT);
    for (const a of resultS) {
      if (a) {
        for (const b of a) {
          serachResult.push(b);
        }
      }
    }
    return serachResult
        .sort(function(x, y) {
          return x.create_date - y.create_date;
        })
        .reverse();
  }
  if (filter.collection && filter.page && filter.limit) {
    if (Array.isArray(filter.collection)) {
      for (const eachC of filter.collection) {
        collections = await collectionService.findByName(eachC);
        collectionArray.push(collections);
      }
      for (const a of collectionArray) {
        for (const b of a) {
          resultC.push(b);
        }
      }
      finalCollections = resultC
          .sort(function(x, y) {
            return x.create_date - y.create_date;
          })
          .reverse();
    } else {
      collections = await collectionService.findByName(filter.collection);
      finalCollections = collections
          .sort(function(x, y) {
            return x.create_date - y.create_date;
          })
          .reverse();
    }
    const collectionResult = finalCollections.filter((data) => {
      let finalResult;
      let chains;
      let onSaleIn;
      if (!filter.status && filter.categories) {
        if (Array.isArray(filter.categories)) {
          for (const eachCat of filter.categories) {
            if (eachCat == data.categories) {
              const finalStatus = collectionListService.filterWithCurrency(
                  data,
                  filter.onSaleIn,
                  filter.chains,
              );
              finalResult = finalStatus;
            }
          }
        } else {
          if (filter.categories == data.categories) {
            const finalCat = collectionListService.filterWithCurrency(
                data,
                filter.onSaleIn,
                filter.chains,
            );
            finalResult = finalCat;
          } else {
            return;
          }
        }
      }
      if (filter.status && !filter.categories) {
        if (Array.isArray(filter.status)) {
          for (const eachStat of filter.status) {
            if (eachStat == data.status) {
              const finalStatus = collectionListService.filterWithCurrency(
                  data,
                  filter.onSaleIn,
                  filter.chains,
              );
              finalResult = finalStatus;
            }
          }
        } else {
          if (data.status == filter.status) {
            const finalStatus = collectionListService.filterWithCurrency(
                data,
                filter.onSaleIn,
                filter.chains,
            );
            finalResult = finalStatus;
          } else {
            return;
          }
        }
      }
      let fs;
      if (filter.status || filter.catagories) {
        const pusher = [];
        if (Array.isArray(filter.categories)) {
          for (const eachCat of filter.categories) {
            if (eachCat == data.categories) {
              const finalStatus = collectionListService.filterWithCurrency(
                  data,
                  filter.onSaleIn,
                  filter.chains,
              );
              fs = finalStatus;
              pusher.push(fs);
            }
          }
          finalResult = pusher.filter((data) => {
            if (data.status == filter.status) {
              return data;
            }
          });
        } else {
          if (filter.categories == data.categories) {
            const finalCat = collectionListService.filterWithCurrency(
                data,
                filter.onSaleIn,
                filter.chains,
            );
            fs = finalCat;
            if (fs.status == filter.status) {
              finalResult = data;
            }
          } else {
            return;
          }
        }
      }
      if (
        !filter.chains &&
        !filter.onSaleIn &&
        !filter.status &&
        !filter.status &&
        !filter.categories
      ) {
        finalResult = data;
      }
      if (filter.chains && !filter.onSaleIn && !filter.status) {
        if (data.currency == filter.chains) {
          chains = data;
          finalResult = chains;
        }
      }
      if (filter.onSaleIn && !filter.chains && !filter.status) {
        if (data.currency == filter.onSaleIn) {
          onSaleIn = data;
          finalResult = onSaleIn;
        }
      }
      if (filter.chains && filter.onSaleIn && !filter.status) {
        let os;
        let ch;
        if (data.currency == filter.chains) {
          ch = data;
        }
        if (data.currency == filter.onSaleIn) {
          os = data;
        }
        const merge = [].concat(os, ch);
        finalResult = merge;
      }
      return finalResult;
    });
    return collectionResult.filter((data) => {
      if (filter.sortBy == "fromMax") {
        if (data.price <= filter.maxPrice && data.price >= filter.minPrice) {
          return data;
        }
      } else if (filter.sortBy == "fromMin") {
        if (data.price >= filter.maxPrice && data.price <= filter.minPrice) {
          return data;
        }
      }
    });
  }
  let itemsCat;
  if (filter.categories && filter.page && filter.limit) {
    if (Array.isArray(filter.categories)) {
      for (const eachCat of filter.categories) {
        itemsCat = await collectionListService.findByCategories(eachCat);
        categoryArray.push(itemsCat);
      }
      for (const a of categoryArray) {
        for (const b of a) {
          resultCat.push(b);
        }
      }
      return resultCat
          .sort(function(x, y) {
            return x.create_date - y.create_date;
          })
          .reverse();
    } else {
      itemsCat = await collectionListService.findByCategories(
          filter.categories,
      );

      itemsCat = itemsCat
          .sort(function(x, y) {
            return x.create_date - y.create_date;
          })
          .reverse();
      return itemsCat;
    }
  }
  let itemStatus;
  if (filter.status && filter.page && filter.limit) {
    if (Array.isArray(filter.status)) {
      for (const eachStat of filter.status) {
        itemStatus = await collectionListService.findByStatus(eachStat);
        categoryArray.push(itemStatus);
      }
      for (const a of categoryArray) {
        for (const b of a) {
          resulStat.push(b);
        }
      }
      return resulStat
          .sort(function(x, y) {
            return x.create_date - y.create_date;
          })
          .reverse();
    } else {
      itemStatus = await collectionListService.findByStatus(filter.status);
      return itemStatus
          .sort(function(x, y) {
            return x.create_date - y.create_date;
          })
          .reverse();
    }
  }
  if (filter.onSaleIn && filter.page && filter.limit) {
    onSaleIn = await collectionListService.findByChain(filter.onSaleIn);
    return onSaleIn;
  }
  if (filter.chains) {
    chains = await collectionListService.findByChain(filter.chains);
    return chains;
  }
  if (
    filter.sortBy == "fromMax" ||
    filter.sortBy == "fromMin" ||
    filter.maxPrice ||
    filter.minPrice
  ) {
    const price = await collectionListService.filterPrice(
        filter.maxPrice,
        filter.minPrice,
        filter.sortBy,
    );
    return price
        .sort(function(x, y) {
          return x.create_date - y.create_date;
        })
        .reverse();
  }
  if (
    !filter.status &&
    !filter.collection &&
    !filter.catagories &&
    !filter.maxPrice &&
    !filter.minPrice &&
    !filter.sortBy &&
    !filter.chains &&
    !filter.onSaleIn &&
    filter.page &&
    filter.limit
  ) {
    // const items = db.collection("collection_list");
    // const result = await items.orderBy("create_date").get();
    // const itemList = [];
    // result.forEach((doc) => {
    //   const date = new Date(doc.data().create_date);
    //   const data = {
    //     id: doc.id,
    //     name: doc.data().name,
    //     currency: doc.data().currency,
    //     image: doc.data().image,
    //     price: doc.data().price,
    //     owner: doc.data().owner,
    //     status: doc.data().status,
    //     create_date: date,
    //     categories: doc.data().categories,
    //   };
    //   itemList.push(data);
    // });
    // return itemList.reverse();
    const items = db.collection("collections");
    const result = await items.get();
    const itemList = [];
    result.forEach((doc) => {
      const data = {
        id: doc.id,
        name: doc.data().name,
        owner: doc.data().owner,
        description: doc.data().description,
      };
      itemList.push(data);
    });
    const collections = [];
    for (const each of itemList) {
      const nftsArray = [];
      const itemNft = db.collection("collection_list");
      const nfts = await itemNft.where("tokenAddress", "==", each.id).get();
      nfts.forEach((doc) => {
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
          tonkenId: doc.data().tonkenId,
          tokenAddress: doc.data().tokenAddress,
        };
        nftsArray.push(data);
      });
      if (nftsArray.length == 0) {
        console.log("nothing left");
      } else {
        console.log(nftsArray.length);
        const collectionData = {
          id: each.id,
          name: each.name,
          owner: each.owner,
          price: nftsArray[0].price,
          image: nftsArray[0].image,
          currency: nftsArray[0].currency,
          create_date: nftsArray[0].create_date,
        };
        // const count = 0;
        collections.push(collectionData);
      }
    }
    // console.log(nftsArray);

    // for(const eachC of )
    return collections
        .sort(function(x, y) {
          return x.create_date - y.create_date;
        })
        .reverse();
  }
  // return mergeResults.concat(onSaleIn, chains, finalCollections);
};

const status = async (key, value) => {
  const items = db.collection("collection_list");
  const item = await items.where(`${key}`, "==", value);
  const result = await item.orderBy("create_date").get();
  const itemList = [];
  result.forEach((doc) => {
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
  return itemList.reverse();
};

const all = async (page, limit) => {
  const items = db.collection("collection_list");
  const item = await items.limit(limit).orderBy("create_date", "desc").get();
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
    };
    itemList.push(data);
  });
  const nftsArray = [];
  for (const each of itemList) {
    const itemNft = db.collection("collection_list");
    const nfts = await itemNft.where("tokenAddress", "==", each.id).get();
    nfts.forEach((doc) => {
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
      nftsArray.push(data);
    });
  }
  const collectionData = {
    id: itemList.id,
    name: itemList.data().name,
    owner: itemList.data().owner,
    description: itemList.data().description,
    cover: itemList.data().cover,
    logo: itemList.data().logo,
    item: nftsArray
        .sort(function(x, y) {
          return x.create_date - y.create_date;
        })
        .reverse(),
  };
  return collectionData;
};

module.exports = {status, all, filter};
