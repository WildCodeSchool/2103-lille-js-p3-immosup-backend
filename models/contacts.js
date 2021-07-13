/* const { db } = require('../conf');

const message = () => {
  const sql =
    'select messages.*,	src.lastname srcname, src.firstname srcfirstname,  dst.lastname dstName, dst.firstname dstFirstname from 	messages join users as src on messages.id_sender=src.id join users as dst on messages.id_receiver=dst.id where id_receiver=1 OR id_sender=1';
  return db.query(sql);
};

const other = () => {
  const sql =
    'select photo.url  UrlPic, photoacc.url AccPic, title from accomodations join photos as photo on photo.IdAccomodation=accomodations.id join photos as photoacc on photoacc.IdAccomodation=accomodations.id';
  return db.query(sql);
};

module.exports = {
  message,
  other,
};
 */
