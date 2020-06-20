const Joi = require('joi')

const loginAdmin = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerAdmin = Joi.object().keys({
    nama : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    no_telp : Joi.string().min(9).required(),
    password : Joi.string().required().min(6),
})

const registerOrganisasi = Joi.object().keys({
  nama : Joi.string().min(3).required(),
  logo : Joi.any(),
  alamat : Joi.string().required(),
  password : Joi.string().required().min(6),
})

const addBarang = Joi.object().keys({
  nama : Joi.string().required(),
  id_kategori : Joi.number().integer(),
  tgl_produksi : Joi.date().required(),
  deskripsi: Joi.string().required(),
  value : Joi.string().required(),
  id_organisasi : Joi.number().integer()
})

const setOrganisasi = Joi.object().keys({
  id_organisasi : Joi.number().integer(),
  password : Joi.string().required().min(6),
})



module.exports = {
    loginAdmin,
    registerAdmin,
    registerOrganisasi,
    addBarang,
    setOrganisasi
}