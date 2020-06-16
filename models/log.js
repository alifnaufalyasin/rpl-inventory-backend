const Sequelize = require('sequelize')
const db = require('../config/database')

const Logs = db.define(
    'logs',
    {
      id_scan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_barang : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      tgl_cek : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull : false
      },
  },
  { timestamps: false }
)

module.exports = Logs