const mongoose = require('mongoose')

const organisasiUserSchema = new Schema({
  id_organisasi_user: {type: Number, required: true},
  organisasi: {type: Schema.Types.ObjectId, ref: 'Organisasi'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: 'Organisasi_User'})

const Organisasi_User = mongoose.model('Organisasi_User',organisasiUserSchema);

module.exports = {
  Organisasi_User
}