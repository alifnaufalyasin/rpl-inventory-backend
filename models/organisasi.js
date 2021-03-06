const Sequelize = require('sequelize')
const db = require('../config/database')

const Organizations = db.define(
    'organizations',
    {
      id_organisasi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama : {
        type : Sequelize.STRING,
        allowNull : false
      },
      logo : {
        type : Sequelize.STRING,
        allowNull : false
      },
      alamat : {
        type : Sequelize.STRING,
        allowNull : false
      },
      password: {
        type : Sequelize.STRING,
        allowNull : false
      }
  }
)

module.exports = Organizations