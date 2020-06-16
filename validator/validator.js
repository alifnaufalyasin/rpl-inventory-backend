const Joi = require('joi')
const {response, customError} = require('../helper/wrapper')
const cloudinary = require('../config/cloudinary')
const Admin = require('../models/Admin')
const Organizations = require('../models/organisasi')

const validateBody = schema => {
  return async (req,res,next) => {
    const result = Joi.validate(req.body,schema,{abortEarly : false})
    if (result.error) {
      let errorData = []
      result.error.details.map(item => {
        let error = {
          path : item.path[0],
          message : item.message
        }
        errorData.push(error)
      })
      await deleteFoto(req)
      return response(res,false,errorData,'Validasi gagal',406)
    }
    next()
  }
}

const validateDate = () => {
  return async (req,res,next) => {
    if(req.body.tgl_produksi){
      let myDate = req.body.tgl_produksi;
      myDate = myDate.split("-");
      myDate[0] = Number(myDate[0]) + 1
      const newDate = myDate[1]+"/"+myDate[0]+"/"+myDate[2];
      const date = new Date(newDate).getTime()
      req.body.tgl_produksi = date
      next()
    }else{
      next()
    }
  }
}

const deleteFoto = async req => {
  console.log('hapus');
  if (req.file) {
    console.log(req.file);
    await cloudinary.uploader.destroy(req.file.public_id)
  }else{
  }
}

const validateEmail = () => {
  return async (req,res,next) => {
    const {email} = req.body
    const admin = await Admin.findOne({where : {email}})
    if (admin) {
      return next(customError('Email sudah digunakan', 400))
    }
    next()
  }
}

const validateNama = () => {
  return async (req,res,next) => {
    const {nama} = req.body
    const organisasi = await Organizations.findOne({where : {nama}})
    if (organisasi) {
      await deleteFoto(req)
      return next(customError('Nama organisasi sudah digunakan', 400))
    }
    next()
  }
}

module.exports = {
    validateBody,
    validateDate,
    deleteFoto,
    validateEmail,
    validateNama
}