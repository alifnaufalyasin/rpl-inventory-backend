const router = require('express-promise-router')()
const { authenticateToken } = require('../helper/auth')
const { loginAdmin, detailAdmin, regisAdmin } = require('../controller/admin');
const { validateBody, validateEmail } = require('../validator/validator');
const schema = require('../schema/userSchema');
const { scanQR, getScanLog } = require('../controller/scan');


router.route('/')
  .post(
    authenticateToken,
    scanQR
    )

router.route('/:id')
  .get(
    authenticateToken,
    getScanLog
    )
  


module.exports = router