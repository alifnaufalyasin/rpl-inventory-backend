const Sequelize = require('sequelize')
const db = require('../config/database')

const Peminjaman = db.define(
    'peminjaman',
    {
      id_peminjaman: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_barang : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      id_admin : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      id_user : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      tgl_peminjaman : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull : true
      },
      tgl_kembali : {
        type : Sequelize.DATE,
        allowNull : true
      },
      jaminan : {
        type : Sequelize.STRING,
        allowNull : false
      },
      tgl_request : {
        type : Sequelize.STRING,
        defaultValue: Sequelize.NOW,
        allowNull : false
      },
      status : {
        type : Sequelize.STRING,
        allowNull : false
      }
  },
  {
    paranoid: true,
  }
)

module.exports = Peminjaman