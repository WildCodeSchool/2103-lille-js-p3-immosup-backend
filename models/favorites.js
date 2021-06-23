const { db } = require('../conf');

const getFav = () => {
  const sql = `
  select accomodations.*, (
		select url from photos where idAccomodation=accomodations.id limit 1
	) as url
from 
	favorites
    join accomodations on favorites.idAccomodation=accomodations.id
    join photos on photos.idAccomodation=accomodations.id
where
	favorites.idUser=1
group by id

  `;

  return db.query(sql);
};

module.exports = {
  getFav,
};
