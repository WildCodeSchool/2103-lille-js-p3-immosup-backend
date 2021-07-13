const authRouter = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const { jwtRounds, jwtSecret } = require('../conf');
const { CustomError } = require('../utilities');
require('../passport-strategies');

authRouter.post('/signup', async (req, res) => {
  // Verification password have 1 or more lowercase, uppercase, special char, number & length >= 8
  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=/!@#$%^&*])(?=.{8,})'
  );
  const user = req.body;

  try {
    if (!user.password)
      throw new CustomError('No password', 'ER_BAD_NULL_ERROR');
    if (!passwordRegex.test(user.password))
      throw new CustomError('Bad password', 'ER_BAD_PASS');
    user.password = bcrypt.hashSync(user.password, jwtRounds);
    const [postResults] = await Users.create(user);
    delete user.password;
    user.id = postResults.insertId;
    const token = jwt.sign(user, jwtSecret);
    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send('This user already exists');
    } else if (err.code === 'ER_BAD_NULL_ERROR') {
      res.status(422).send('Please fill all fields');
    } else if (err.code === 'ER_BAD_FIELD_ERROR') {
      res.status(422).send(err.sqlMessage);
    } else if (err.code === 'ER_BAD_PASS') {
      res.status(422).send('Please enter a valid password');
    } else {
      res.status(500).send('Error creating user from database');
    }
  }
});

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign(req.user, jwtSecret);
  res.status(200).json({
    user: {
      ...req.user,
    },
    token,
  });
});

module.exports = authRouter;
