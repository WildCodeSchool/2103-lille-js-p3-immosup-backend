const usersRouter = require('express').Router();
const User = require('../models/users');

usersRouter.get('/', async (req, res) => {
  try {
    const [results] = await User.getAll();
    res.status(200).json(results);
  } catch {
    res.status(400).send('error');
  }
});

module.exports = usersRouter;
