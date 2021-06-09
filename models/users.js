const Joi = require('joi');
const db = require('../conf');

const getAll = () => {
  const sql =
    'SELECT id, name, firstname, email, credits, city, gender, budget, age, animals, aboutme, hobbies, telephone FROM users';
  return db.query(sql);
};

const getOne = (id) => {
  const sql =
    'SELECT users.id, name, firstname, email, credits, city, gender, budget, age, animals, aboutme, hobbies, telephone, photos.url FROM users JOIN photos ON photos.idUser = users.id WHERE users.id = ?';
  return db.query(sql, [id]);
};

const create = ({
  name,
  firstname,
  email,
  password,
  credits,
  city,
  gender,
  budget,
  age,
  animals,
  aboutme,
  hobbies,
  telephone,
}) => {
  const sql =
    'INSERT INTO users (name, firstname, email, password, credits, city, gender, budget, age, animals, aboutme, hobbies, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return db.query(sql, [
    name,
    firstname,
    email,
    password,
    credits,
    city,
    gender,
    budget,
    age,
    animals,
    aboutme,
    hobbies,
    telephone,
  ]);
};

const update = (id, newAttributes) => {
  const sql = 'Update users SET ? WHERE id = ?';
  return db.query(sql, [newAttributes, id]);
};

const validateCreation = (data) => {
  return Joi.object({
    name: Joi.string().max(64).required(),
    firstname: Joi.string().max(32).required(),
    email: Joi.string().max(64).email().required(),
    password: Joi.string().max(64).required(),
    credits: Joi.number().integer().min(0).required(),
    city: Joi.string().max(32).required(),
    gender: Joi.boolean().required(),
    budget: Joi.number().integer().min(0).required(),
    age: Joi.number().integer().min(0).required(),
    animals: Joi.boolean().required(),
    aboutme: Joi.string().max(256).required(),
    hobbies: Joi.string().max(256).required(),
    telephone: Joi.string().max(20),
  }).validate(data, { abortEarly: false }).error;
};

const validateUpdate = (data) => {
  return Joi.object({
    name: Joi.string().max(64),
    firstname: Joi.string().max(32),
    email: Joi.string().max(64).email(),
    password: Joi.string().max(64),
    credits: Joi.number().integer().min(0),
    city: Joi.string().max(32),
    gender: Joi.boolean(),
    budget: Joi.number().integer().min(0),
    age: Joi.number().integer().min(0),
    animals: Joi.boolean(),
    aboutme: Joi.string().max(256),
    hobbies: Joi.string().max(256),
    telephone: Joi.string().max(20),
  }).validate(data, { abortEarly: false }).error;
};

module.exports = {
  getAll,
  getOne,
  create,
  validateCreation,
  validateUpdate,
  update,
};
