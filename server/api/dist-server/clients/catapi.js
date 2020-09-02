"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCats = getAllCats;
exports.getCatByName = getCatByName;
exports.getCatImages = getCatImages;
exports.ax = void 0;

var _axios = _interopRequireDefault(require("axios"));

const ax = _axios.default.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "152c9ff9-228c-43b9-9c70-d35256c5409e"
  }
}); // Get Info of all breeds


exports.ax = ax;

function getAllCats() {
  return ax.get("/breeds");
} // Get detailed breed info by breed name


function getCatByName(categoryName) {
  return ax.get(`/breeds/search?q=${categoryName}`);
} // Get certain amount of images by breedId


function getCatImages(breedId, numOfImages, size) {
  return ax.get(`/images/search?limit=${numOfImages}&size=${size}&breed_id=${breedId}`);
}