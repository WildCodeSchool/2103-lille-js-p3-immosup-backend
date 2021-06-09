const db = require('../conf');

const getAll = () => {
  const sql = 'SELECT * FROM users';
  return db.query(sql);
};

module.exports = {
  getAll,
};
