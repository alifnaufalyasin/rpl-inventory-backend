const Sequelize = require('sequelize')
require('dotenv').config()
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host : process.env.DB_HOST,
    dialect : 'mysql',
    dialectOptions: {
      useUTC: false //for reading from database
    },
    timezone: "+07:00" //for writing to database
  }
)

module.exports = db