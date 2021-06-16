const annonceRouter = require('./annonce');

const setupRoutes = (app) => {
  app.use('/api/annonce', annonceRouter);
};

module.exports = {
  setupRoutes,
};
