import http from "http";
import methods from "methods";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import errorhandler from "errorhandler";
import cors from "cors";

console.log(process.env.NODE_ENV);

let isProd = process.env.NODE_ENV === "production";

let app = express();

if (isProd) {
  mongoose.connect("mongodb://cat_mongo/cats");
} else {
  mongoose.connect("mongodb://localhost/cats");
  mongoose.set("debug", true);
}

require("./models/RecenetSearch");

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export default app;
