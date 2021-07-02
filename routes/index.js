const mailsRouters = require('./mails');
const usersRouter = require('./users');
const annonceRouter = require('./annonce');

const setupRoutes = (app) => {
  app.use('/access', mailsRouters);
  app.use('/users', usersRouter);
  app.use('/api/annonce', annonceRouter);
};

module.exports = {
  setupRoutes,
};
