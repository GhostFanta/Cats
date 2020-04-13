let router = require("express").Router();
let mongoose = require("mongoose");
let RecentSearch = mongoose.model("RecentSearch");

router.post("/", function (req, res, next) {
  let recentSearch = new RecentSearch({search: req.body.search});
  return recentSearch.save().then(function () {
    return res.json({ recentSearches: recentSearch.toJson() });
  });
});

router.get("/", function (req, res, next) {
  Promise.all([RecentSearch.find({}).sort({ createAt: "desc" })]).then(function (
    results
  ) {
    return res.json({
      recentSearches: results[0].map(function (message) {
        return message.toJson();
      }),
    });
  });
});

module.exports = router;
