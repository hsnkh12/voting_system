const Sequelize = require("sequelize");
require("dotenv").config();
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

const db = new Sequelize(DB_NAME, "root", DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
});

module.exports = db;