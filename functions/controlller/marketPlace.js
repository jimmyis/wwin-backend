/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable new-cap */

// const onCase = require("../serachCase/case");
const router = require("express").Router();
const marketService = require("../service/market");
const util = require("../util/util");
const {google} = require("googleapis");

const spreadsheetId = "1-xjSU_-zXyJUkBFdBhWDn6ZAhp1MODnXubCa1k8ooEs";

router.get("/market_place/get/filter", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const status = req.query.status;
  const collection = req.query.collection;
  const categories = req.query.categories;
  const page = req.query.page;
  const limit = req.query.limit;
  const search = req.query.search;
  const maxPrice = req.query.maxPrice;
  const minPrice = req.query.minPrice;
  const sortBy = req.query.sortBy;
  const chains = req.query.chains;
  const onSaleIn = req.query.onSaleIn;
  const inputs = {
    status: status,
    collection: collection,
    categories: categories,
    page: page,
    limit: limit,
    search: search,
    maxPrice: maxPrice,
    minPrice: minPrice,
    sortBy: sortBy,
    chains: chains,
    onSaleIn: onSaleIn,
  };
  const filter = await marketService.filter(inputs);

  const paginate = await util.paginate(
      filter,
      parseInt(inputs.limit),
      parseInt(inputs.page),
  );
  const totalPage = Math.ceil(filter.length / inputs.limit);
  const totalItems = filter.length;
  res.send({
    currentPage: parseInt(inputs.page),
    totalPage: totalPage,
    totalItems: totalItems,
    data: paginate,
  });
});

router.post("/landing/email-listing", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  const body = req.body;
  const auth = new google.auth.GoogleAuth({
    keyFile: "gcApi.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // create client
  const client = await auth.getClient();
  // create instance api
  const googleSheets = google.sheets({version: "v4", auth: client});
  // write to row A1
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[`${body.email}`]],
    },
  });
  res.send({status: true, email: body.email});
});

router.get("/market_place/get/landing/:page/:limit", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const method = req.method;
  const page = req.params.page;
  const limit = req.params.limit;
  console.log(method, " : handleMarket");
  const result = await marketService.all(parseInt(page), parseInt(limit));
  res.send(result);
});
module.exports = router;
