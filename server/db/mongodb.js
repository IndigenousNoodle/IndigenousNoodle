var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost/localhosts';
MongoClient.connect(url, function(err, db) {
  module.exports.instance = db;
  assert.equal(null, err);
  console.log("Connected correctly to server.");
});

