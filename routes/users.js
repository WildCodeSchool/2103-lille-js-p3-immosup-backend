const usersRouter = require('express').Router();
const { Router } = require('express');
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
    const [[user]] = await User.getOne(req.params.id);

    if (!user) {
      res.status(404).send(`User ${req.params.id} not found`);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send('Error retrieving users from database');
  }
});

usersRouter.post('/', async (req, res) => {
  const error = User.validateCreation(req.body);
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
      res.status(500).send(err);
    }
  }
});

usersRouter.put('/:id', async (req, res) => {
  const error = User.validateUpdate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    try {
      const [[existingUser]] = await User.getOne(req.params.id);
      if (!existingUser) {
        return res.status(404).send(`User ${req.params.id} doesn't exist`);
      }
      const [result] = await User.update(req.params.id, req.body);

      res.json({ ...existingUser, ...req.body });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const [result] = await User.destroy(req.params.id);

    res.send('Deleted');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = usersRouter;
