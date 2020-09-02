"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

console.log(process.env.NODE_ENV);
let isProd = process.env.NODE_ENV === "production";
let app = (0, _express.default)();

if (isProd) {
  _mongoose.default.connect("mongodb://cat_mongo/cats");
} else {
  _mongoose.default.connect("mongodb://localhost/cats");

  _mongoose.default.set("debug", true);
}

require("./models/RecenetSearch");

app.use((0, _cors.default)());
app.use(require("morgan")("dev"));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(require("./routes"));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
var _default = app;
exports.default = _default;