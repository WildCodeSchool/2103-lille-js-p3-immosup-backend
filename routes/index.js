const annonceRouter = require('./annonce');
const mailsRouters = require('./mails');
const usersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/api/annonce', annonceRouter);
  app.use('/access', mailsRouters);
  app.use('/users', usersRouter);
};

module.exports = {
  setupRoutes,
};
