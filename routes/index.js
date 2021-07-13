const annonceRouter = require('./annonce');
const mailsRouters = require('./mails');
const usersRouter = require('./users');
const favoritesRouter = require('./favorites');
const authRouter = require('./auth');
const contactsRouter = require('./contacts');

const setupRoutes = (app) => {
  app.use('/access', mailsRouters);
  app.use('/annonce', annonceRouter);
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
  app.use('/contacts', contactsRouter);
  app.use('/favorites', favoritesRouter);
};

module.exports = {
  setupRoutes,
};
