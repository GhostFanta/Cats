"use strict";

let mongoose = require('mongoose');

let RecentSearch = new mongoose.Schema({
  search: String
}, {
  timestamps: true
});

RecentSearch.methods.toJson = function () {
  return {
    id: this._id,
    search: this.search,
    createdAt: this.createdAt
  };
};

mongoose.model('RecentSearch', RecentSearch);