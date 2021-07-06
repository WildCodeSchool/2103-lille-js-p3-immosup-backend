const { db } = require('../conf');

const getOneId = (id) => {
  const sql = `SELECT id, lastname, firstname, email, credits, city, gender, budget, birthday, animals, aboutme, hobbies, phone, avatar_url
              FROM users
              WHERE id = ?`;

  return db.query(sql, [id]);
};

const getOneEmail = (email) => {
  const sql = `SELECT id, lastname, firstname, email, credits, city, gender, budget, birthday, animals, aboutme, hobbies, phone, avatar_url
              FROM users
              WHERE email = ?`;

  return db.query(sql, [email]);
};

const getAll = () => {
  const sql = `SELECT id, lastname, firstname, email, credits, city, gender, budget, birthday, animals, aboutme, hobbies, phone, avatar_url
              FROM users`;

  return db.query(sql);
};

const create = (user) => {
  const sql = `INSERT INTO users
              SET ?`;

  return db.query(sql, user);
};

const update = (id, newAttributes) => {
  const sql = `UPDATE users
              SET ?
              WHERE id = ?`;

  return db.query(sql, [newAttributes, id]);
};

module.exports = {
  getOneId,
  getOneEmail,
  getAll,
  create,
  update,
};
