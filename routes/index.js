
const accomodationsRouter = require('./accomodations');
const mailsRouters = require('./mails');
const usersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/api/accomodations', accomodationsRouter);
  app.use('/access', mailsRouters);
  app.use('/users', usersRouter);

module.exports = {
  setupRoutes,
};
