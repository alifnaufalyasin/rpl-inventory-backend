const { QRMaker, upload } = require('../helper/qrMaker')
const Organizations = require('../models/organisasi')
const Item = require('../models/items')
const Category = require('../models/category')
const { response } = require('../helper/wrapper')

const Logs = require('../models/log')

const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const uri = "mongodb+srv://admin:"+process.env.passDB+"@alive-t50rd.mongodb.net/test?retryWrites=true&w=majority"

async function addBarang(req,res) {
  const payload = req.body
  const organisasi = await Organizations.findByPk(payload.id_organisasi)
  const kategori = await Category.findByPk(payload.id_kategori)
  if(!organisasi) return response(res,false,null,'Organisasi tidak ditemukan!',401)
  if(!kategori) return response(res,false,null,'Kategori tidak ditemukan!',401)
  let data = {}
  data.nama = payload.nama
  data.tgl_produksi = payload.tgl_produksi
  data.deskripsi = payload.deskripsi
  data.value = payload.value
  console.log('teas');
  let item = await Item.create(data)
  console.log('asdsdf');

  //buat kode barcode
  const idOrg = String(payload.id_organisasi).padStart(3, "0") 
  const date = new Date()
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()
  const strDate = String(dd).padStart(2, "0") + String(mm).padStart(2, "0") + String(yyyy)
  const idBrg = String(item.id_barang).padStart(4, "0")
  const kode = idOrg +'.'+ strDate +'.'+ idBrg
  item.kode_barcode = kode
  const url = await QRMaker(kode,organisasi.logo)
  console.log('barang')
  console.log(url);
  item.barcode = url.secure_url
  item.kode_barcode = kode
  await item.save()

  const scanlog = await Logs.create()
  await scanlog.save();

  await scanlog.setItem(item)
  await item.setCategory(kategori)
  await item.setOrganization(organisasi)
  return response(res,true, item,'Barang sukses didaftarkan',200)
}

async function getBarang(req,res) {
  const id_organisasi = Number(req.params.id_org)
  const barang = await Item.findAll({ where: {id_organisasi}, include: [Category, Logs]})
  if(!barang) return response(res,false,null,'Barang tidak ditemukan',401)
  return response(res,true, barang,'Berikut daftar barang',200)
}

async function updateBarang(req,res) {
  const idBarang = req.params.id
  const payload = req.body;
  const barang = await Item.findByPk(idBarang)  
  if (!barang) return response(res,false,null,'Barang tidak ditemukan',401)
  if (payload.nama) barang.nama = payload.nama
  if (payload.id_kategori) {
    const kategori = await Category.findByPk(payload.id_kategori)
    if(!kategori) return response(res,false,null,'Kategori tidak ditemukan!',401)
    await kategori.setItems(barang) 
    barang.id_kategori = Number(payload.id_kategori)   
  }
  if (payload.tgl_produksi) barang.tgl_produksi = payload.tgl_produksi
  if (payload.deskripsi) barang.deskripsi = payload.deskripsi
  if (payload.value) barang.value = payload.value

  await barang.save()
  return response(res,true, barang,'Barang sukses diupdate',200)
}

async function deleteBarang(req,res) {
  const idBarang = Number(req.params.id)
  const barang = await Item.findByPk(idBarang)
  if(!barang) return response(res,false,null,'Barang tidak ditemukan',401)
  await barang.destroy()
  return response(res,true, null,'Barang berhasil dihapus',200)
}

async function restoreBarang(req,res) {
  const idBarang = Number(req.params.id)
  const barang = await Item.findByPk(idBarang, { paranoid: false })
  if(!barang) return response(res,false,null,'Barang tidak ditemukan',401)
  await barang.restore()
  return response(res,true, barang,'Barang berhasil direstore',200)
}

module.exports ={
  addBarang,
  getBarang,
  updateBarang,
  deleteBarang,
  restoreBarang
}