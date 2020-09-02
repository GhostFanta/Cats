"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllDogs = getAllDogs;
exports.getDogByName = getDogByName;
exports.getDogImages = getDogImages;
exports.ax = void 0;

var _axios = _interopRequireDefault(require("axios"));

const ax = _axios.default.create({
  baseURL: "https://api.thedogapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "ab9feeeb-3c59-4c34-90e5-526dafbe5296"
  }
}); // Get Info of all breeds


exports.ax = ax;

function getAllDogs() {
  return ax.get("/breeds");
} // Get detailed breed info by breed name


function getDogByName(categoryName) {
  return ax.get(`/breeds/search?q=${categoryName}`);
} // Get certain amount of images by breedId


function getDogImages(breedId, numOfImages, size) {
  return ax.get(`/images/search?limit=${numOfImages}&size=${size}&breed_id=${breedId}`);
}