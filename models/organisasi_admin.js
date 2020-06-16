const Sequelize = require('sequelize')
const db = require('../config/database')

const Organizations_Admin = db.define(
  'organisation_admin',
  {
  }
)

module.exports = Organizations_Admin