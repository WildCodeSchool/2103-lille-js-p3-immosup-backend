const accomodationsRouter = require('./accomodations');
const mailsRouters = require('./mails');

const setupRoutes = (app) => {
  app.use('/api/accomodations', accomodationsRouter);
  app.use('/access', mailsRouters);
};

module.exports = {
  setupRoutes,
};
