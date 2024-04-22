const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

const db1 = new Sequelize(config.database_1, config.username, config.password, config);

const db2 = new Sequelize(config.database_2, config.username, config.password, config);

module.exports = { db1, db2 };