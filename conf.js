require('dotenv').config();
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages!');
  }
});

module.exports = {
  db,
  mailer: transporter,
};
