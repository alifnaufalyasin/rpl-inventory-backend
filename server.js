const express = require('express')
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const cors = require('cors')
require('dotenv').config()

const { loginUser, detailUser, regisUser } = require('./controller/user');
const { regisOrganisasi, getOrganisasi } = require('./controller/organisasi');
const { addBarang, getBarang, updateBarang, deleteBarang } = require('./controller/barang');
const { scanQR, getScanLog } = require('./controller/scan')
const { authenticateToken } = require('./module/auth')

const app = express()
const router = express.Router()

//---Local Environtment Setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(useragent.express())
app.use(bodyParser.json())
app.use(cors())
app.set('port', process.env.PORT || 3000)
const port = app.get('port')
app.use('/api', router)

//---Route List
router.get('/', (req,res) => res.send("Welcome : " + req.useragent.source))

//user
router.post('/login', loginUser)
router.post('/regisUser', regisUser)
router.get('/user', authenticateToken, detailUser)

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

//organisasi route
router.post('/regisOrganisasi', regisOrganisasi)
router.post('/getOrganisasi',getOrganisasi)

//barang route
router.post('/addBarang', authenticateToken, addBarang)
router.post('/getBarang', authenticateToken, getBarang)
router.post('/removeBarang')
router.post('/updateBarang')


app.listen(port, () => console.log(`Server running in port: ${port}`))