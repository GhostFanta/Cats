let router = require("express").Router();

router.use("/messages", require("./recentSearch"));

router.get("/ping", function(req, res, next) {
  return res.json({ msg: "pong" });
});

module.exports = router;
