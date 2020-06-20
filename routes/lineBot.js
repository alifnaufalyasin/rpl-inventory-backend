const { addDataLine, getDataLine } = require('../controller/lineBot')

const router = require('express-promise-router')()

router.route('/set')
  .post(
    addDataLine)
  
router.route('/')
  .get(
    getDataLine)



module.exports = router