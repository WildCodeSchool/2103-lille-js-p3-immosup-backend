const mailsRouters = require('./mails');
const usersRouter = require('./users');
const favoritesRouter = require('./favorites');

const setupRoutes = (app) => {
  app.use('/access', mailsRouters);
  app.use('/users', usersRouter);
  app.use('/api/favorites', favoritesRouter);
};

module.exports = {
  setupRoutes,
};
