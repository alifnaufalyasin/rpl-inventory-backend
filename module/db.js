require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true })

module.exports = {
  client
}