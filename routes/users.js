const usersRouter = require('express').Router();
const User = require('../models/users');
const { CustomError } = require('../utilities');

usersRouter.get('/', async (req, res) => {
  try {
    const [users] = await User.getAll();

    if (!users.length) throw new CustomError('Users not found', 'ER_NO_USERS');
    res.status(200).json(users);
  } catch (err) {
    if (err.code === 'ER_NO_USERS') {
      res.status(404).send(err.message);
    } else {
      res.status(500).send('Error retrieving user(s) from database');
    }
  }
});

usersRouter.get('/id/:id', async (req, res) => {
  try {
    const [[user]] = await User.getOneId(req.params.id);

    if (!user) throw new CustomError('User not found', 'ER_NO_USER');
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 'ER_NO_USER') {
      res.status(404).send(err.message);
    } else {
      res.status(500).send('Error retrieving user from database');
    }
  }
});

usersRouter.get('/email/:email', async (req, res) => {
  try {
    const [[user]] = await User.getOneEmail(req.params.email);

    if (!user) throw new CustomError('User not found', 'ER_NO_USER');
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 'ER_NO_USER') {
      res.status(404).send(err.message);
    } else {
      res.status(500).send('Error retrieving user from database');
    }
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const [result] = await User.create(req.body);
    res.status(201).send({
      id: result.insertId,
      ...req.body,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send('This user already exists');
    } else if (err.code === 'ER_BAD_NULL_ERROR') {
      res.status(422).send('Please fill all fields');
    } else if (err.code === 'ER_BAD_FIELD_ERROR') {
      res.status(422).send(err.sqlMessage);
    } else {
      res.status(500).send('Error creating user from database');
    }
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const [[existingUser]] = await User.getOneId(req.params.id);
    if (!existingUser) {
      res.status(404).send('User not found');
    } else {
      await User.update(req.params.id, req.body);
      res.status(200).send({
        ...existingUser,
        ...req.body,
      });
    }
  } catch (err) {
    if (
      err.code === 'ER_BAD_FIELD_ERROR' ||
      err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
    ) {
      res.status(422).send(err.sqlMessage);
    } else {
      res.status(500).send('Error updating user from database');
    }
  }
});

module.exports = usersRouter;
