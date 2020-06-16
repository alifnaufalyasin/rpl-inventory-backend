const QRCode = require('qrcode')
const { fbstorage } = require('./firebase')
const Jimp = require("jimp")
const { opacity } = require('jimp')
const { uploadImage } = require('./upload')
const { promisify } = require('util')
const fs = require('fs')
const unlinkAsync = promisify(fs.unlink)


function generateQR(nama, value){
  QRCode.toFile(nama,value,{
    color: {
      light: '#0000'
    }
  }, function (err) {
    if (err )throw err
    console.log('QRCode finish')
  })
}

// async function upload(location,name) {
//  await fbstorage
//   .upload(location, {
//     destination: name,
//     resumable: false,
//     gzip: true,
//     metadata: {
//       metadata: {
//         contentType: 'image/png'
//       }
//     }
//   })
//   .then(() => {
//     console.log("Terupload!!!")
//   })
//   .catch(err => {
//     console.error(err)
//   });
// }


async function QRMaker(value,url){
  const fileLocation = "images/"+value+".png"
  const background = 'images/blank.png'
  await generateQR(fileLocation,value)
  const result = value+".png"
  const qrJadi = "images/"+result
  console.log('siniii')
  var hasil
  
  const bg = await Jimp.read(background)
  const qr = await Jimp.read(fileLocation)
    await qr.resize(120, 120)
    await bg.composite(qr, 150, 35) //samping, atas
  const logo = await Jimp.read({
        url: url, // Required!
        headers: {},
      })
    await logo.resize(110,110)
    await bg.composite(logo,20,35)
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    await bg.print(font,125,150,value)
    await bg.write(qrJadi)

  console.log('barcode')

  hasil = await uploadImage(qrJadi,value,'png')
  await unlinkAsync(qrJadi)
  return hasil
}

module.exports ={
  QRMaker
}