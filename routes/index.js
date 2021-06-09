const usersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/api/users', usersRouter);
};

module.exports = {
  setupRoutes,
};
