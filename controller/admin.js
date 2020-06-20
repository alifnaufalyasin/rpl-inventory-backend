const { signUser } = require('../helper/auth')
const { encryptPass, isValid } = require('../helper/encrypt')
const Admin = require('../models/Admin')
const { response } = require('../helper/wrapper')
const Organizations = require('../models/organisasi')
require('dotenv').config()


async function loginAdmin(req,res) {
  const payload = req.body
  const admin = await Admin.findOne({where : {email: payload.email}, include : Organizations})  
  if (!admin) return response(res,false,null,'Akun tidak ditemukan!',401)
  if(isValid(payload.password, admin.password)) {
    let data = {}
    data.id_admin = admin.id_admin
    data.nama = admin.nama
    data.email = admin.email
    const token = signUser(data)
    data.token = token
    return response(res,true, data,'Sukses Login',200)
  } else return response(res,false,null,'Password salah!',401)
  
}

async function regisAdmin(req,res) {
  let payload = req.body
  payload.password = encryptPass(payload.password)
  const admin = new Admin(payload)
  await admin.save()
  response(res,true, admin,'Registrasi telah berhasil',201)
}

async function detailAdmin(req,res) {
  const id = req.user.id_admin
  const admin = await Admin.findByPk(id, {include : Organizations})
  if (!admin) return response(res,false,null,'Akun tidak ditemukan!',401)
  else {
    let data = {}
    data.id_admin = admin.id_admin
    data.nama = admin.nama
    data.email = admin.email
    data.organisasi = admin.organizations
    response(res,true, data,'Sukses Login',200)
  }
}

module.exports = {
  loginAdmin,
  detailAdmin,
  regisAdmin
}