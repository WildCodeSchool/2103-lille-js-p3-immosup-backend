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

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().max(64).presence(presence),
    firstname: Joi.string().max(32).presence(presence),
    email: Joi.string().max(64).email().presence(presence),
    password: Joi.string().max(64).presence(presence),
    credits: Joi.number().integer().min(0).presence(presence),
    city: Joi.string().max(32).presence(presence),
    gender: Joi.boolean().presence(presence),
    budget: Joi.number().integer().min(0).presence(presence),
    age: Joi.number().integer().min(0).presence(presence),
    animals: Joi.boolean().presence(presence),
    aboutme: Joi.string().max(256).presence(presence),
    hobbies: Joi.string().max(256).presence(presence),
    telephone: Joi.string().max(20).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

module.exports = {
  getAll,
  getOne,
  create,
  validate,
};
