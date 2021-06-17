const db = require('../conf');

const getFav = (idUser) => {
  const sql = `
  select accomodations.*, (
		select url from photos where idAccomodation=accomodations.id limit 1
	) as url
from 
	favorites
    join accomodations on favorites.idAccomodation=accomodations.id
    join photos on photos.idAccomodation=accomodations.id
where
	favorites.idUser= ?
group by id

  `;

  return db.query(sql, [idUser]);
};

module.exports = {
  getFav,
};
