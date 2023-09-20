const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2/promise');



const createNewConnection = async () => {
  return db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
}


module.exports = {
  createNewConnection
}
