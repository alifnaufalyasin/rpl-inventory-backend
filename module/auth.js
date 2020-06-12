const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

require('dotenv').config()

function signUser(user) {
  return jwt.sign(user, process.env.tokenSecret, { expiresIn: 60*10})
}

async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) res.sendStatus(401)

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

function initMongoose(){
  mongoose.connect(String(process.env.url_mongo), {
    useNewUrlParser: true,
    reconnectTries: 30,
    keepAlive: true,
    reconnectInterval: 500, // Reconnect every 500ms
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
  })
}

module.exports = {
  signUser,
  authenticateToken
}