const bcrypt = require('bcrypt');
const organisasi = require('./organisasi');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority"

function addBarang(req,res) {
  const payload = req.body;
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const collection = db.db("inventory").collection("Barang");
    var data = await collection.findOne({ _id: "id_barang" })
   
    const idBarang = Number(data.last) + 1
    
    await collection.updateOne({ _id: "id_barang" }, {$set: {last: idBarang}}, function(err, res) {
      if (err) throw err
    })

    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()

    const dateNow = dd +"-"+ mm +"-"+ yyyy

    const myobj = { 
      id_barang: idBarang,
      nama: payload.nama, 
      id_organisasi: Number(payload.id_organisasi),
      id_kategori: Number(payload.id_kategori),
      tgl_masuk: dateNow,
      tgl_produksi: payload.tgl_produksi,
      tgl_cek: dateNow,
      barcode: payload.barcode,
      deskripsi: payload.deskripsi,
      value: payload.value
    };

    collection.insertOne(myobj, function(err, result) {
      if (err) throw err;
      res.json({ status: 200, message:"Sukses menambahkan barang", data: myobj });
      db.close()
    })
  })
}

function getBarang(req,res) {
  const id_organisasi = Number(req.params.id_org)
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const collection = db.db("inventory").collection("Barang");
    const total = await collection.countDocuments()
    if (total != 0){
      const barang = await collection.find({ id_organisasi: id_organisasi }).toArray()
      if (barang.length === 0){
        res.json({ status: 200, message: "Barang kosong", data: null });
      }else res.json({ status: 200, message: "sukses", data: barang  });
    }else{
      res.json({ status: 200, message: "Barang kosong", data: null  });
    }
  })
}

function updateBarang(req,res) {
  const idBarang = Number(req.params.id)
  const payload = req.body;
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const collection = db.db("inventory").collection("Barang");
    const data = await collection.findOne({ id_barang: idBarang })
    if (!data) {
      res.json({status: 200, message: "barang tidak terdaftar", data: null})    
    }else{
      collection.updateOne({ id_barang: idBarang }, {$set: payload}, function(err, result) {
        if (err) throw err
        res.json({status: 200, message: "Sukses"})    
        db.close();
      })
    }
    db.close();
  })
}

function deleteBarang(req,res) {
  const idBarang = Number(req.params.id)
  const payload = req.body;
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const obj = {id_barang: idBarang}
    const collection = db.db("inventory").collection("Barang");
    collection.deleteOne(obj,function(err, obj) {
      if (err) throw err;
      res.json({status: 200, message: "sukses delete barang"})    
      db.close();
    });

  })
}

module.exports ={
  addBarang,
  getBarang,
  updateBarang,
  deleteBarang
}