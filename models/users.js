const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define(
    'users',
    {
      id_user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama : {
        type : Sequelize.STRING,
        allowNull : false
      },
      idcard_number : {
        type : Sequelize.STRING,
        allowNull : false
      },
      no_telp : {
        type : Sequelize.STRING,
        allowNull : false
      }
  }
)

module.exports = User