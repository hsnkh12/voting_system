const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config")

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
});

module.exports = db;