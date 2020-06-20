const Organizations = require('../models/organisasi')
const { encryptPass, isValid } = require('../helper/encrypt')
const Admin = require('../models/Admin')
const Item = require('../models/items')
const { response } = require('../helper/wrapper')
require('dotenv').config()


async function regisOrganisasi(req,res) {
  const payload = req.body
  const admin = await Admin.findByPk(req.user.id_admin)
  const cekOrganisasi = await Organizations.findOne({where: { nama: payload.nama }})
  if (cekOrganisasi) return response(res,false,null,'Organisasi sudah ada!',401)
  else {
    payload.logo = req.file.url
    payload.password = encryptPass(payload.password)
    const organisasi = new Organizations(payload)
    await organisasi.save()
    organisasi.addAdmin(admin)
    return response(res,true, organisasi,'Registrasi organisasi telah berhasil',201)
  }
}

async function setOrganisasi(req,res) {
  const admin = await Admin.findByPk(req.user.id_admin)
  const organisasi = await Organizations.findByPk(req.body.id_organisasi)
  if (!organisasi) return response(res,false,null,'Organisasi tidak ditemukan!',401)
  if (!isValid(req.body.password, organisasi.password)) return response(res,false,null,'Password organisasi salah!',401)
  organisasi.addAdmin(admin)
  return response(res,true, null ,'Sukses bergabung dengan organisasi',201)
}

async function getOrganisasi(req,res) {
  const organisasi = await Organizations.findAll({attributes: ['id_organisasi', 'nama', 'logo', 'alamat'], include: [Item, Admin]})
  return response(res,true, organisasi,'Berikut daftar organisasi',201)
}

module.exports = {
  regisOrganisasi,
  getOrganisasi,
  setOrganisasi
}