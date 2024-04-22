require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database_1: process.env.DB_DATABASE_1,
        database_2: process.env.DB_DATABASE_2,
        port: process.env.DB_PORT,
        dialect: process.env.DIALECT,
        logging: false
    }
}