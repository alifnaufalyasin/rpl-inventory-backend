const Sequelize = require('sequelize')
const db = require('../config/database')

const DataLine = db.define(
    'dataLine',
    {
      id_dataLine: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId : {
        type : Sequelize.STRING,
        allowNull : false
      },
      token : {
        type : Sequelize.STRING,
        allowNull : false
      },
  },
)

module.exports = DataLine