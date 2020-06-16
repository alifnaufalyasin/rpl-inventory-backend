const jwt = require('jsonwebtoken')
const { customError } = require('./wrapper')
// const mongoose = require('mongoose')

require('dotenv').config()

function signUser(user) {
  return jwt.sign(user, process.env.tokenSecret, { expiresIn: 60*30}) // 60detik * 30 = 30 menit
}

async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) return next(customError('Authentication tidak ditemukan',401))

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) return next(customError('Authentication has expired',419))
    req.user = user
    next()
  })
}

// function initMongoose(){
//   mongoose.connect(String(process.env.url_mongo), {
//     useNewUrlParser: true,
//     reconnectTries: 30,
//     keepAlive: true,
//     reconnectInterval: 500, // Reconnect every 500ms
//     connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
//     socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
//   })
// }

module.exports = {
  signUser,
  authenticateToken
}