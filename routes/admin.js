const router = require('express-promise-router')()
const { authenticateToken } = require('../helper/auth')
const { loginAdmin, detailAdmin, regisAdmin } = require('../controller/admin');
const { validateBody, validateEmail } = require('../validator/validator');
const schema = require('../schema/userSchema')


router.route('/')
  .get(authenticateToken,
        detailAdmin)

router.route('/login')
  .post(
    validateBody(schema.loginAdmin),
    loginAdmin)
  
router.route('/registrasi')
  .post(
    validateBody(schema.registerAdmin),
    validateEmail(),
    regisAdmin)

// router.get('/user', authenticateToken, detailUser)


module.exports = router