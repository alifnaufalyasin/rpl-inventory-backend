const Item = require('../models/items')
const Logs = require('../models/log')
const { response } = require('../helper/wrapper')
require('dotenv').config()


async function scanQR(req,res){
  const kode_barcode = req.body.kode

  const item = await Item.findOne({ where: {kode_barcode}, include: [Logs] })
  if (!item) return response(res,false,null,'Barang tidak ditemukan',401)

  const scanlog = await Logs.create()
  item.tgl_cek = scanlog.tgl_cek

  await scanlog.save()
  await item.save()

  await scanlog.setItem(item)
  return response(res,true, item,'Scan barang berhasil',200)
}


async function getScanLog(req,res) {
  const id_barang = req.params.id
  
  const item = await Item.findByPk(id_barang, { include: [Logs] })
  if (!item) return response(res,false,null,'Barang tidak ditemukan',401)
  return response(res,true, item,'Scan barang berhasil',200)  
}

module.exports ={
  scanQR,
  getScanLog,
}