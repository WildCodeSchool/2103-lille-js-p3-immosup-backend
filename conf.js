require('dotenv').config();
const mysql = require('mysql2/promise');

const { JWT_SALTROUNDS, JWT_SECRET } = process.env;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  db,
  jwtRounds: parseInt(JWT_SALTROUNDS, 10),
  jwtSecret: JWT_SECRET,
};
