const jwt = require('jsonwebtoken')
require('dotenv').config()

function signUser(user) {
  return jwt.sign(user, process.env.tokenSecret, { expiresIn: 60*10})
}

function authToken(req,res,next) {
  
}

module.exports = {
  signUser,
  authToken
}