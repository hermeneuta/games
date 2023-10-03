require("dotenv").config({ path: "../.env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const options = {};
const client = new MongoClient(uri, options);

module.exports = client;
