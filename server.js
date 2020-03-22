const express = require('express')
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const { regisUser, loginUser, detailUser } = require('./controller/user');
const { addBarang, getBarang } = require('./controller/barang');
const { getOrganisasi, regisOrganisasi } = require('./controller/organisasi');
require('dotenv').config()

const app = express()
const router = express.Router()

//---Local Environtment Setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(useragent.express())
app.use(bodyParser.json())

app.use('/api', router)

// //---Route List
router.get('/', (req,res) => res.send("Welcome : " + req.useragent.source))

router.get('/user/:id', detailUser)
router.post('/regisUser', regisUser)
router.post('/login', loginUser)

router.post('/regisOrganisasi', regisOrganisasi)
router.post('/getOrganisasi',getOrganisasi)

router.post('/addBarang', addBarang)
router.post('/getBarang', getBarang)
router.post('/removeBarang')
router.post('/updateBarang')


app.listen(process.env.PORT, () => console.log(`Server running in port: ${process.env.PORT}`))