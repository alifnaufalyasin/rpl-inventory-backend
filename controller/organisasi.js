const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority"

function regisOrganisasi(req,res) {
  const payload = req.body;
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const collection = db.db("inventory").collection("Organisasi");
    const id = await collection.countDocuments()
    const myobj = { 
      id_organisasi: id+1, 
      nama: payload.nama, 
      logo: payload.logo, 
      alamat: payload.alamat 
    };
    collection.insertOne(myobj, function(err, result) {
      if (err) throw err;
      res.status(200).json({ message:"Sukses melakukan registrasi organisasi", data: myobj });
      db.close()
    })
  })
}

function getOrganisasi(req,res) {
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const collection = db.db("inventory").collection("Organisasi");
    collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.status(200).send(result)
      db.close()
    })
  })
}

module.exports = {
  regisOrganisasi,
  getOrganisasi
}