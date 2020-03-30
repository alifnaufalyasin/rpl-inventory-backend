const { QRMaker, upload } = require('../module/qrMaker')
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
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    //kebutuhan kode barcode
    const idOrg = String(payload.id_organisasi).padStart(3, "0") 
    const strDate = String(dd).padStart(2, "0") + String(mm).padStart(2, "0") + String(yyyy)
    const idBrg = String(idBarang).padStart(4, "0")
    const kode = idOrg +'.'+ strDate +'.'+ idBrg
    // proses pembuatan barcode dan upload firebase
    await QRMaker(kode)
    const fbLocation = kode+".png"
    dd = String(dd).padStart(2, "0")
    mm = String(mm).padStart(2, "0")
    
    const linkBarcode =`https://firebasestorage.googleapis.com/v0/b/rpl-inventory.appspot.com/o/qrCode%2F${fbLocation}?alt=media`

    const dateNow = dd +"-"+ mm +"-"+ yyyy
    const myobj = { 
      id_barang: idBarang,
      nama: payload.nama, 
      id_organisasi: Number(payload.id_organisasi),
      id_kategori: Number(payload.id_kategori),
      tgl_masuk: dateNow,
      tgl_produksi: payload.tgl_produksi,
      tgl_cek: dateNow,
      barcode: linkBarcode,
      kode_barcode: kode,
      deskripsi: payload.deskripsi,
      value: payload.value
    };

    const colLogScan = db.db("inventory").collection("Log_Scan");
    const id = await colLogScan.countDocuments()

    const logScan = {
      id_scan: id + 1,
      id_barang: idBarang,
      tgl_cek: dateNow
    }

    collection.insertOne(myobj, function(err, result) {
      if (err) throw err;
      colLogScan.insertOne(logScan, function(err, result) {
        if (err) throw err;
        res.status(200).json({ message:"Sukses menambahkan barang", data: myobj });
        db.close()
      })
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
        res.status(200).json({ message: "Barang kosong", data: null });
      }else res.status(200).json({ message: "sukses", data: barang  });
    }else{
      res.status(200).json({ message: "Barang kosong", data: null });
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
      res.status(200).json({ message: "barang tidak terdaftar", data: null})    
    }else{
      collection.updateOne({ id_barang: idBarang }, {$set: payload}, function(err, result) {
        if (err) throw err
        res.status(200).json({ message: "Sukses"})    
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
      res.status(200).json({ message: "sukses delete barang"})    
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