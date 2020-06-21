const router = require('express-promise-router')()
const { authenticateToken } = require('../helper/auth')
const { validateBody, validateNama } = require('../validator/validator');
const schema = require('../schema/userSchema');
const { regisOrganisasi, getOrganisasi, setOrganisasi, getOneOrganisasi } = require('../controller/organisasi');
const {upload} = require('../helper/upload');


router.route('/')
  .get(
    authenticateToken,
    getOrganisasi
    )

router.route('/')
  .post(
    authenticateToken,
    validateBody(schema.setOrganisasi),
    setOrganisasi
    )
  
router.route('/registrasi')
  .post(
    authenticateToken,
    upload.single('logo'),
    validateBody(schema.registerOrganisasi),
    validateNama(),
    regisOrganisasi
    )

router.route('/:id')
  .get(
    authenticateToken,
    getOneOrganisasi
    )

module.exports = router