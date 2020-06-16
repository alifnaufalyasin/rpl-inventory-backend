const Sequelize = require('sequelize')
const db = require('../config/database')

const Item = db.define(
    'item',
    {
      id_barang: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER//
      },
      nama : {
        type : Sequelize.STRING,//
        allowNull : false
      },
      tgl_masuk : {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,//
        allowNull : false
      },
      tgl_produksi : {
        type : Sequelize.DATE,//
        allowNull : false
      },
      tgl_cek : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW,//
        allowNull : false
      },
      barcode : {
        type : Sequelize.STRING,//
        allowNull : true
      },
      kode_barcode : {
        type : Sequelize.STRING,//
        allowNull : true
      },
      deskripsi : {
        type : Sequelize.STRING,//
        allowNull : false
      },
      value : {
        type : Sequelize.STRING,//
        allowNull : false
      },
      id_kategori : {
        type : Sequelize.INTEGER,//
        allowNull : true
      },
      id_organisasi : {
        type : Sequelize.INTEGER,
        allowNull : true
      }
  },
  {
    paranoid: true,
  }
)

module.exports = Item