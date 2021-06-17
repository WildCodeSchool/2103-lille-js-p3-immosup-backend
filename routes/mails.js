const mailsRouters = require('express').Router();
const { mailer } = require('../conf');

mailsRouters.post('/', (req, res) => {
  const { email, message } = req.body;
  const content = `email: ${email} \n message: ${message} `;

  const mail = {
    from: 'mrtine@gmail.com',
    to: email,
    message,
    text: content,
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
