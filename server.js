const express = require('express')
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const cors = require('cors')
const { loginUser, detailUser, regisUser } = require('./controller/user');
const jwt = require('jsonwebtoken');
const { regisOrganisasi, getOrganisasi } = require('./controller/organisasi');
const { addBarang, getBarang, updateBarang, deleteBarang } = require('./controller/barang');
const { scanQR, getScanLog } = require('./controller/scan')
require('dotenv').config()

const app = express()
const router = express.Router()

//---Local Environtment Setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(useragent.express())
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

//---Route List
router.get('/', (req,res) => res.send("Welcome : " + req.useragent.source))

//user
router.post('/login', loginUser)
router.post('/regisUser', regisUser)
router.get('/user/:id', authenticateToken, detailUser)

//organisasi
router.post('/regisOrganisasi', authenticateToken, regisOrganisasi)
router.get('/getOrganisasi', authenticateToken, getOrganisasi)

//barang
router.post('/addBarang', authenticateToken, addBarang)
router.get('/getBarang/:id_org', authenticateToken, getBarang)
router.put('/updateBarang/:id', authenticateToken, updateBarang)
router.delete('/deleteBarang/:id',authenticateToken, deleteBarang)

// Scan QR
router.post('/scanQR', authenticateToken, scanQR)
router.get('/getScanLog/:idBarang', authenticateToken, getScanLog)


async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) res.sendStatus(401)

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


router.post('/regisOrganisasi', regisOrganisasi)
router.post('/getOrganisasi',getOrganisasi)

router.post('/addBarang', addBarang)
router.post('/getBarang', getBarang)
router.post('/removeBarang')
router.post('/updateBarang')


app.listen(process.env.PORT, () => console.log(`Server running in port: ${process.env.PORT}`))