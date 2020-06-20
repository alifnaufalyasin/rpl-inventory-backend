const express = require('express')
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const cors = require('cors')
require('dotenv').config()

const { regisOrganisasi, getOrganisasi } = require('./controller/organisasi');
const { addBarang, getBarang, updateBarang, deleteBarang } = require('./controller/barang');
const { scanQR, getScanLog } = require('./controller/scan')
const { authenticateToken } = require('./helper/auth')
const relation = require('./config/relation');
const db = require('./config/database');
const { response } = require('./helper/wrapper')

const app = express()
const router = express.Router()

//Local Environtment Setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(useragent.express())
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 3000

//route source
const adminRoute = require('./routes/admin')
const organisasiRoute = require('./routes/organisasi');
const barangRoute = require('./routes/barang');
const scanQRRoute = require('./routes/scan')
const lineBot = require('./routes/lineBot')

const { deleteFoto } = require('./validator/validator');

//---Route test
router.get('/', (req,res) => res.send("Welcome : " + req.useragent.source))

//lineBot
app.use('/api/lineBot', lineBot)

//user
app.use('/api/admin' , adminRoute)

//organisasi
app.use('/api/organisasi', organisasiRoute)

//barang
app.use('/api/barang', barangRoute)

// Scan QR
app.use('/api/scanQR', scanQRRoute)
// router.post('/scanQR', authenticateToken, scanQR)
// router.get('/getScanLog/:idBarang', authenticateToken, getScanLog)

//organisasi route
router.post('/regisOrganisasi', regisOrganisasi)
router.post('/getOrganisasi',getOrganisasi)

//barang route
router.post('/addBarang', authenticateToken, addBarang)
router.post('/getBarang', authenticateToken, getBarang)
router.post('/removeBarang')
router.post('/updateBarang')

// error handling
app.use((req,res,next) => {
  let err = new Error('Route not found')
  err.status = 404
  next(err)
})

app.use(async (err,req,res,next) => {
  await deleteFoto(req)
  const {message} = err
  const status = err.status || 500
  console.log(err)
  response(res,false,null,message,status)
})


app.listen(port, () => {
  db.sync({  })
    .then(() => console.log(`app is running on port ${port}`))
    .catch(err => console.log(err.message))
})