require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = +(process.env.DB_PORT || 3306);
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTIONS = process.env.DB_CONNECTIONS || 5;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PORT,
    DB_PASSWORD,
    DB_CONNECTIONS
};
