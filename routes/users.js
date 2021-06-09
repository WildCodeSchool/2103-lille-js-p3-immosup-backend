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

usersRouter.get('/:id', async (req, res) => {
  try {
    const [user] = await User.getOne(req.params.id);

    if (user.length > 0) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = usersRouter;
