const usersRouter = require('./users');
const favoritesRouter = require('./favorites');

const setupRoutes = (app) => {
  app.use('/api/users', usersRouter);
  app.use('/api/favorites', favoritesRouter);
};

module.exports = {
  setupRoutes,
};