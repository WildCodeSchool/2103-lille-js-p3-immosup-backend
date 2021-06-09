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

module.exports = {
  getAll,
  getOne,
};
