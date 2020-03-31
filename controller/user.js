const { signUser } = require('../module/auth')
const { encryptPass, isValid } = require('../module/encrypt')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority"

async function loginUser(req,res) {
  const payload = req.body
  MongoClient.connect(uri,function (err,db) {
    if (err) throw err
    const collection = db.db("inventory").collection("User");
    collection.findOne({email: payload.email}, function(err, result) {
      if (err) throw err
      // console.log(result)
      // console.log(result)
      if(!result){
        res.status(404).json({  message: "User tidak ditemukan", data: null})
      }else{
        
        if(isValid(payload.password, result.password)) {
          const user = { email: payload.email }
          console.log(result)
          const token = signUser(result)
          res.status(200).json({ message: "Sukses login", access_token: token, token_type: "bearer", data: result})
        } else {
          res.status(401).json({ message: "Password Salah", data: null})
        }
      }
      db.close();
    })
  })
}

function regisUser(req,res) {
  const payload = req.body
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err
    const collection = db.db("inventory").collection("User");
    const id = await collection.countDocuments()
    let hash = encryptPass(payload.password)
    const myobj = { 
      id_user: id+1, 
      nama: payload.nama, 
      email: payload.email, 
      password: hash, 
      no_telp: payload.no_telp 
    };

    collection.insertOne(myobj, function(err, result) {
      if (err) throw err
      res.status(200).json({ message:"Sukses melakukan registrasi", data: myobj });
      db.close()
    })
  })
  
}

function detailUser(req,res) {
  MongoClient.connect(uri,function (err,db) {
    if (err) throw err
    const id = req.user.id_user
    const collection = db.db("inventory").collection("User");
    collection.findOne({id_user: id}, function(err, result) {
      if (err) throw err
      if (!result) {
        res.status(404).json({ message: "User tidak ditemukan", data: null })
      } else {
        res.status(200).json({ message: "success", data: result })
      }
      db.close()
    })
  })
}

module.exports = {
  loginUser,
  detailUser,
  regisUser
}