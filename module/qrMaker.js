const QRCode = require('qrcode');
const { fbstorage } = require('./firebase');
const Jimp = require("jimp");
const { opacity } = require('jimp');


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

async function upload(location,name) {
 await fbstorage
  .upload(location, {
    destination: name,
    resumable: false,
    gzip: true,
    metadata: {
      metadata: {
        contentType: 'image/png'
      }
    }
  })
  .then(() => {
    console.log("Terupload!!!")
  })
  .catch(err => {
    console.error(err);
  });
}


async function QRMaker(value){
  const fileLocation = "images/"+value+".png"
  const background = 'images/blank.png'
  await generateQR(fileLocation,value)
  const result = value+".png"
  const qrJadi = "images/"+result
  const fbLocation = "qrCode/"+value+".png"
  
  Jimp.read(background, (err, bg) => {
    if (err) throw err;
    Jimp.read(fileLocation, (err, qr) => {
      qr.resize(120, 120)
      if (err) throw err;
      bg.composite(qr, 150, 35) //samping, atas
      Jimp.read('images/logo.png', (err, logo) => {
        logo.resize(110,110)
        bg.composite(logo,20,35)
        if (err) throw err;
        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
        .then(async (font) => {
          bg.print(font,125,150,value)
          bg.write(qrJadi)
          await upload(qrJadi, fbLocation)
        })    
      })
    })
  });
  
}

module.exports ={
  QRMaker
}