const { db } = require('../conf');

const getAll = async () => {
  const sql = `
  SELECT 
    district, address, city, furnished, rent, surface, animals, title, ges, property, energyClass, rooms, description, accomodations.idUser, 
    group_concat(url) as photos
  FROM 
    accomodations
    LEFT JOIN photos ON idAccomodation=accomodations.id
  GROUP BY accomodations.id`;
  const annonces = await db.query(sql);
  return annonces;
};

const getOne = (id) => {
  const sqlValues = [id];
  const sql = `
  SELECT 
    district, address, city, furnished, rent, surface, animals, title, ges, property, energyClass, rooms, description, accomodations.idUser, 
    group_concat(url) as photos
  FROM 
    accomodations
    LEFT JOIN photos ON idAccomodation=accomodations.id
  WHERE accomodations.id=?
  GROUP BY accomodations.id`;
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
};
