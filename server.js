const express = require('express')
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const { regisUser, regisOrganisasi, loginUser } = require('./controller/controller');
require('dotenv').config()

const app = express()
const router     = express.Router()

//---Local Environtment Setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(useragent.express())
app.use(bodyParser.json())

app.use('/api', router)

// //---Route List
router.get('/', (req,res) => res.send("Welcome : " + req.useragent.source))

router.post('/regisUser', regisUser)
router.post('/regisOrganisasi',regisOrganisasi)
router.post('/login', loginUser)


app.listen(process.env.PORT, () => console.log(`Server running in port: ${process.env.PORT}`))