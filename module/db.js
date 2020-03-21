require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);
// client.connect(err => {
//   const collection = client.db("inventory");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = {
  client,
  assert
}