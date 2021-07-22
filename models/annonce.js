const { db } = require('../conf');

const getAll = () => {
  const sql =
    'SELECT district, address, city, furnished, rent, surface, animals, title, ges, property, energyClass, rooms, description, idUser FROM accomodations';
  return db.query(sql);
};

const getOne = (id) => {
  const sqlValues = [id];
  const sql =
    'SELECT district, address, city, furnished, rent, surface, animals, title, ges, property, energyClass, rooms, description, idUser FROM accomodations WHERE id = ?';
  return db.query(sql, sqlValues);
};

const getOneLandlord = (id) => {
  const sqlValues = [id];
  const sql =
    'SELECT district, address, city, furnished, rent, surface, animals, title, ges, property, energyClass, rooms, description, idUser FROM accomodations WHERE idUser = ?';
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

const update = (id, newAttributes) => {
  const sql = 'UPDATE accomodations SET ? WHERE id=?';
  return db.query(sql, [newAttributes, id]);
};

const destroy = (id) => {
  const sql = 'DELETE FROM accomodations WHERE id = ?';
  return db.query(sql, [id]);
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  destroy,
  getOneLandlord,
};
