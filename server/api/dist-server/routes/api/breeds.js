"use strict";

var _catapi = require("../../clients/catapi");

var _dogapi = require("../../clients/dogapi");

let router = require("express").Router();

router.get("/", async function (req, res, next) {
  try {
    const cats = await (0, _catapi.getAllCats)();
    const dogs = await (0, _dogapi.getAllDogs)();
    const feed = [...cats.data, ...dogs.data];
    return res.json(feed);
  } catch (e) {
    console.log(e);
  }
});
router.get("/search", async function (req, res, next) {
  const query = req.query.q;

  try {
    const catSearch = await (0, _catapi.getCatByName)(query);
    const dogSearch = await (0, _dogapi.getDogByName)(query);
    const feed = [...catSearch.data, ...dogSearch.data];
    return res.json(feed);
  } catch (e) {
    console.log(e);
  }
});
router.get("/images", async function (req, res, next) {
  const limit = req.query.limit;
  const size = req.query.size;
  const breed_id = req.query.breed_id;

  try {
    const catImage = await (0, _catapi.getCatImages)(breed_id, limit, size);
    const dogImage = await (0, _dogapi.getDogImages)(breed_id, limit, size);
    const feed = [...catImage.data, ...dogImage.data];
    return res.json(feed);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;