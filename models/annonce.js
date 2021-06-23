const db = require('../conf');

const getAll = () => {
  const sql = 'SELECT * FROM accomodations';
  return db.query(sql);
};

const getOneId = (id) => {
  return db.query('SELECT * FROM accomodations WHERE id = ?', [id]);
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

const update = (id, newAttributes) => {
  const sql = 'UPDATE accomodations SET ? WHERE id=?';
  return db.query(sql, [newAttributes, id]);
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  getOneId,
};
