const User =  require('../models/users')


async function addUser (req,res) {
  let payload = req.body
  const admin = new User(payload)
  await admin.save()
  response(res,true, admin,'Users berhasil dibuat',201)
}



module.exports = {
  addUser
}