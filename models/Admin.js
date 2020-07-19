const Sequelize = require('sequelize')
const db = require('../config/database')

const Admin = db.define(
    'admin',
    {
      id_admin: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama : {
        type : Sequelize.STRING,
        allowNull : false
      },
      email : {
        type : Sequelize.STRING,
        allowNull : false
      },
      password : {
        type : Sequelize.STRING,
        allowNull : false
      }
  }
)

module.exports = Admin