const mailsRouter = require('./mails');
const usersRouter = require('./users');
const authRouter = require('./auth');

const setupRoutes = (app) => {
  app.use('/access', mailsRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
};

module.exports = {
  setupRoutes,
};
