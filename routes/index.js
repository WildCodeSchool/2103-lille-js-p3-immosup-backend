const mailsRouters = require('./mails');
const usersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/access', mailsRouters);
  app.use('/users', usersRouter);
};

module.exports = {
  setupRoutes,
};
