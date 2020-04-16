let http = require("http"),
  methods = require("methods"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  errorhandler = require("errorhandler"),
  mongoose = require("mongoose");

// const esConnection = require('./connection');

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let server = app.listen(process.env.PORT || 3001, function () {
  console.log("Listening on port " + server.address().port);
});
