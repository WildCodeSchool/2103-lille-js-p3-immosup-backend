const usersRouter = require('express').Router();
const User = require('../models/users');

usersRouter.get('/', async (req, res) => {
  try {
    const [user] = await User.getAll();
    res.status(200).json(user);
  } catch {
    res.status(500).send('Error retrieving users from database');
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const [user] = await User.getOne(req.params.id);

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).send(`User ${req.params.id} not found`);
    }
  } catch (err) {
    res.status(500).send('Error retrieving users from database');
  }
});

usersRouter.post('/', async (req, res) => {
  const error = User.validate(req.body, true);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    try {
      const [result] = await User.create(req.body);
      res.status(201).json({
        id: result.insertId,
        ...req.body,
      });
    } catch (err) {
      res.status(500).send('Error saving the user');
    }
  }
});

module.exports = usersRouter;
