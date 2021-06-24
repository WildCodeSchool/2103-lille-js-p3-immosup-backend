
const annonceRouter = require('./annonce');
const usersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/api/annonce', annonceRouter);
  app.use('/users', usersRouter);
};

module.exports = {
  setupRoutes,
};
