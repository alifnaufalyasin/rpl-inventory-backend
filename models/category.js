const Sequelize = require('sequelize')
const db = require('../config/database')

const Category = db.define(
    'category',
    {
      id_kategori: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama : {
        type : Sequelize.STRING,
        allowNull : false
      },
  },
  { timestamps: false }
)

module.exports = Category