const annonceRouter = require('./annonce');
const mailsRouters = require('./mails');
const usersRouter = require('./users');
const authRouter = require('./auth');

const setupRoutes = (app) => {
  app.use('/access', mailsRouters);
  app.use('/annonce', annonceRouter);
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
};

module.exports = {
  setupRoutes,
};
