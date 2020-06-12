const mongoose = require('mongoose')

const userSchema = new Schema({
  id_user: {type: Number, required: true},
  nama: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  no_telp: {type: String, required: true},

}, {collection: 'User'})

const User = mongoose.model('User',userSchema);

module.exports = {
  User
}