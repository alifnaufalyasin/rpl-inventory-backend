const router = require('express-promise-router')()
const { authenticateToken } = require('../helper/auth')
const { validateBody, validateDate } = require('../validator/validator');
const schema = require('../schema/userSchema');
const { addBarang, getBarang, updateBarang, deleteBarang, restoreBarang } = require('../controller/barang');


  
router.route('/add')
  .post(
    authenticateToken,
    validateDate(),
    validateBody(schema.addBarang),
    addBarang
    )

router.route('/:id_org')
  .get(authenticateToken,
    getBarang
  )

router.route('/:id')
  .put(
    authenticateToken,
    validateDate(),
    updateBarang
    )

router.route('/:id')
  .delete(
    authenticateToken,
    deleteBarang
  )

router.route('/:id')
  .post(
    authenticateToken,
    restoreBarang
    )

module.exports = router