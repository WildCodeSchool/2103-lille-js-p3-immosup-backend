const mailsRouters = require('express').Router();
const { mailer } = require('../conf');

mailsRouters.post('/', (req, res) => {
  const { email, message } = req.body;

  const mail = {
    from: 'wild.test@outlook.fr' /* email de l expediteur */,
    to: email /* email du recepteur */,
    subject: '',
    text: message,
  };

  console.log(mailer);

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
