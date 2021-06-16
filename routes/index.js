const accomodationsRouter = require('./accomodations');

const setupRoutes = (app) => {
  app.use('/api/accomodations', accomodationsRouter);
};

module.exports = {
  setupRoutes,
};
