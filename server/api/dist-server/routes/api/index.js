"use strict";

let router = require("express").Router();

router.use("/recent_search", require("./recentSearch"));
router.use("/search", require("./search"));
router.use("/votes", require("./votes"));
router.use("/breeds", require("./breeds"));
router.get("/ping", function (req, res, next) {
  return res.json({
    msg: "pong"
  });
});
module.exports = router;