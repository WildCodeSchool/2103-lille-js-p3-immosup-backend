const Joi = require('joi');
const db = require('../conf');

const getAll = () => {
  const sql = 'SELECT * FROM accomodations';
  return db.query(sql);
};

const getOne = (id) => {
  const sqlValues = [id];
  const sql = 'SELECT * FROM accomodations WHERE id = ?';
  return db.query(sql, sqlValues);
};

const create = ({
  district,
  address,
  city,
  furnished,
  rent,
  surface,
  animals,
  title,
  ges,
  property,
  energyClass,
  rooms,
  description,
  idUser,
}) => {
  const sql =
    'INSERT INTO accomodations (district, address, city, furnished, rent, surface, animals, title, idUser, rooms, ges, energyClass, property, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return db.query(sql, [
    district,
    address,
    city,
    furnished,
    rent,
    surface,
    animals,
    title,
    idUser,
    rooms,
    ges,
    energyClass,
    property,
    description,
  ]);
};

const validateCreation = (body) => {
  return Joi.object({
    district: Joi.string().max(32).required(),
    address: Joi.string().max(64).required(),
    city: Joi.string().max(32).required(),
    furnished: Joi.boolean().default(false),
    rent: Joi.number().integer(),
    animals: Joi.boolean().default(false),
    title: Joi.string().max(45).required(),
    rooms: Joi.number().integer(),
    energyClass: Joi.string().max(1).required(),
    description: Joi.string().max(1000).required(),
    property: Joi.string().max(45).required(),
    idUser: Joi.number().integer(),
    ges: Joi.string().max(1),
    surface: Joi.number(),
  }).validate(body, { abortEarly: false }).error;
};

const update = (id, newAttributes) => {
  const sql = 'UPDATE accomodations SET ? WHERE id=?';
  return db.query(sql, [newAttributes, id]);
};

const validateUpdate = (body) => {
  return Joi.object({
    district: Joi.string().max(32),
    address: Joi.string().max(64),
    city: Joi.string().max(32),
    furnished: Joi.boolean().default(false),
    rent: Joi.number().integer(),
    animals: Joi.boolean().default(false),
    title: Joi.string().max(45),
    rooms: Joi.number().integer(),
    energyClass: Joi.string().max(1),
    description: Joi.string().max(1000),
    property: Joi.string().max(45),
    idUser: Joi.number().integer(),
    ges: Joi.string().max(1),
    surface: Joi.number(),
  }).validate(body, { abortEarly: false }).error;
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  validateCreation,
  validateUpdate,
};
