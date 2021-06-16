const Joi = require('joi');
const db = require('../conf');

const getAll = () => {
  const sql =
    'SELECT (district, address, city, furnished, rent, surface, animals, title, idUser, rooms, ges, energyClass, property, descripton) FROM accomodations WHERE id = ?';
  return db.query(sql);
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
}) => {
  const sql =
    'INSERT INTO accomodations (district, address, city, furnished, rent, surface, animals, title, idUser, rooms, ges, energyClass, property, descripton) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return db.query(sql, [
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
  ]);
};

const update = (id, newAttributes) => {
  return db.query('Update accomodationsmodatons SET ? WHERE id = ?', [
    newAttributes,
    id,
  ]);
};

const validate = (data = true) => {
  return Joi.object({
    district: Joi.string().max(32).required(),
    adress: Joi.string().max(64).required(),
    city: Joi.string().max(32).required(),
    furnished: Joi.boolean().default(false),
    rent: Joi.number().integer().min(1).max(11),
    animals: Joi.boolean().default(false),
    title: Joi.string().max(45).required(),
    rooms: Joi.number().integer().min(1).max(11),
    energyClass: Joi.string().max(1).required(),
    description: Joi.string().max(1000).required(),
    property: Joi.string().max(45).required(),
    idaccomodations: Joi.number().integer().min(1).max(11),
    ges: Joi.string().max(1),
    surface: Joi.number().min(1).max(11),
  }).validate(data, { abortEarly: false }).error;
};

const valUpdate = (data = true) => {
  return Joi.object({
    district: Joi.string().max(32).required(),
    adress: Joi.string().max(64).required(),
    city: Joi.string().max(32).required(),
    furnished: Joi.boolean().default(false),
    rent: Joi.number().integer().min(1).max(11),
    animals: Joi.boolean().default(false),
    title: Joi.string().max(45).required(),
    rooms: Joi.number().integer().min(1).max(11),
    energyClass: Joi.string().max(1).required(),
    description: Joi.string().max(1000).required(),
    property: Joi.string().max(45).required(),
    idUser: Joi.number().integer.min(1).max(11),
    ges: Joi.string().max(1),
    surface: Joi.number().min(1).max(11),
  }).validate(data, { abortEarly: false }).error;
};

module.exports = {
  getAll,
  create,
  validate,
  valUpdate,
  update,
};
