const router = require('express-promise-router')()
const { authenticateToken } = require('../helper/auth')
const { validateBody, validateNama } = require('../validator/validator');
const schema = require('../schema/userSchema');
const { regisOrganisasi, getOrganisasi } = require('../controller/organisasi');
const {upload} = require('../helper/upload');


router.route('/')
  .get(authenticateToken,
    getOrganisasi
    )

  
router.route('/registrasi')
  .post(
    authenticateToken,
    upload.single('logo'),
    validateBody(schema.registerOrganisasi),
    validateNama(),
    regisOrganisasi
    )


module.exports = router