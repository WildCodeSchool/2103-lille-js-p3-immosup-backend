const db = require('../conf');

const getOneId = (id) => {
  return db.query(
    'SELECT users.id, name, firstname, email, credits, city, gender, budget, age, animals, aboutme, hobbies, telephone, photos.url FROM users JOIN photos ON photos.idUser = users.id WHERE users.id = ?',
    [id]
  );
};

const getOneEmail = (email) => {
  return db.query(
    'SELECT users.id, name, firstname, email, credits, city, gender, budget, age, animals, aboutme, hobbies, telephone, photos.url FROM users JOIN photos ON photos.idUser = users.id WHERE users.email = ?',
    [email]
  );
};

const getAll = () => {
  return db.query(
    'SELECT users.id, name, firstname, email, credits, city, gender, budget, age, animals, aboutme, hobbies, telephone, photos.url FROM users JOIN photos ON photos.idUser = users.id'
  );
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

module.exports = {
  getOneId,
  getOneEmail,
  getAll,
  create,
  update,
};
