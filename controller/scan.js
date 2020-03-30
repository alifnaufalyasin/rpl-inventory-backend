const { QRMaker, upload } = require('../module/qrMaker')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority"

function scanQR(req,res){
  const kode = req.body.kode
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const colBarang = db.db("inventory").collection("Barang");
    const colLogScan = db.db("inventory").collection("Log_Scan");
    const barang = await colBarang.findOne({ kode_barcode: kode })
    const id = await colLogScan.countDocuments()

    const date = new Date()
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    dd = String(dd).padStart(2, "0")
    mm = String(mm).padStart(2, "0")
    
    const dateNow = dd +"-"+ mm +"-"+ yyyy
    console.log(barang)
    const myObj = {
      id_scan: id + 1,
      id_barang: barang.id_barang,
      tgl_cek: dateNow
    }

    colLogScan.insertOne(myObj, function(err, result) {
      if (err) throw err;
      colBarang.updateOne({ id_barang: barang.id_barang}, {$set: {tgl_cek: dateNow}}, function(err, result) {
        if (err) throw err
        res.status(200).json({ message: "Sukses" })    
        db.close();
      })
    })

  })
}

function getScanLog(req,res) {
  const idBarang = Number(req.params.idBarang)
  console.log(idBarang)
  MongoClient.connect(uri, async function (err,db) {
    if (err) throw err;
    const collection = db.db("inventory").collection("Log_Scan");
    collection.find({id_barang: idBarang}).toArray(function(err, result) {
      if (err) throw err;
      res.status(200).json({ message: "Sukses", data : result })
      db.close()
    })
  })
}

module.exports ={
  scanQR,
  getScanLog
}