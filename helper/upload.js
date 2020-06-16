const multer = require('multer')
const cloudinaryStorage = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const fileFilter = (req,file,cb) => {
  if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' ||file.mimetype === 'image/gif' || file.mimetype === 'image/png') {
    cb(null,true)
  }else {
    const err = new Error('Terdapat Extensi gambar yang tidak sesuai, silahkan cek kembali kelengkapan informasi')
    err.status = 422 
    cb(err, false)
  }
}

const storage = cloudinaryStorage({
  cloudinary : cloudinary,
  folder : (req,file,cb) => {
    let folderName = "RPL_Inventory/"
    if (file.fieldname == 'logo') folderName += "logoOrganisasi"
    cb(null,folderName) 
  },
  allowedFormats: ['jpg', 'png' , 'jpeg' , 'gif'],
  filename : (req,file,cb) => {
    console.log(file)
    const ext = file.originalname.split('.')
    let name = Date.now() +"_"+ req.body.nama +'.'+ ext[ext.length-1]
    cb(null,name)
  }
})

const upload = multer({
  storage,
  limits : {
    fileSize : 1024*1024*5
  },
  fileFilter
})



async function uploadImage(file,name,ext) {
  const url = await cloudinary.v2.uploader
    .upload(file, {public_id: 'RPL_Inventory/barcode/'+name, eager: {format: ext}});
  return url
}


module.exports = {
  upload,
  uploadImage
}