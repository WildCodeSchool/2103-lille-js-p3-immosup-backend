const mailsRouters = require('express').Router();
const { mailer } = require('../conf');

mailsRouters.post('/', (req, res) => {
  const { email, message } = req.body;

  const mail = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Contact ImmoSup',
    text: message,
  };

  mailer.sendMail(mail, (err) => {
    if (err) {
      res.json({
        status: err,
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
});

module.exports = mailsRouters;
