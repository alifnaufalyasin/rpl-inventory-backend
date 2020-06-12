const mongoose = require('mongoose')

const organisasiSchema = new Schema({
  id_organisasi: {type: Number, required: true},
  nama: {type: String, required: true},
  logo: {type: String, required: true},
  alamat: {type: String, required: true}
}, {collection: 'Organisasi'})

const Organisasi = mongoose.model('Organisasi',organisasiSchema);

module.exports = {
  Organisasi
}