const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const connection = require('./db-config');
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5002;

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected as id ${connection.threadId}`);
  }
});

app.use(express.json());
app.use(cors());

app.post('/annonce', (req, res) => {
  const {
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
  } = req.body;
  const db = connection.promise();
  let validationErrors = null;
  db.query(
    'INSERT INTO accomodations (district, address, city, furnished, rent, surface, animals, title, idUser, rooms, ges, energyClass, accomodations.type, accomodations.describe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    [
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
    ]
  )
    .then(([result]) => {
      if (result[0]) return Promise.reject(new Error('Something went wrong'));
      validationErrors = Joi.object({
        district: Joi.string().max(32).required(),
        adress: Joi.string().max(64).required(),
        city: Joi.string().max(32).required(),
        furnished: Joi.boolean().default(false),
        rent: Joi.number().integer().min(1).max(11),
        animals: Joi.boolean().default(false),
        title: Joi.string().max(45).required(),
        rooms: Joi.number().integer().min(1).max(11),
        energyClass: Joi.string().max(1).required(),
        description: Joi.string().max(1000).required(),
        property: Joi.string().max(45).required(),
        idUser: Joi.number().integer.min(1).max(11),
        ges: Joi.string().max(1),
        surface: Joi.number().min(1).max(11),
      }).validate(req.body, { abortEarly: false }).error;
      if (validationErrors)
        return Promise.reject(new Error('Something went wrong'));
      return db.query(
        'INSERT INTO accomodations (district, address, city, furnished, rent, surface, animals, title, idUser, rooms, ges, energyClass, property, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [
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
        ]
      );
    })
    .then(([{ insertId }]) => {
      res.status(201).json({
        id: insertId,
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
      });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'Error') res.status(409).json({ message: 'Invalid data' });
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors });
      else res.status(500).send('Invalid data');
    });
});

app.get('/annonce/:id', (req, res) => {
  const annId = req.params.id;
  connection.query(
    'SELECT * FROM accomodations WHERE id = ?',
    [annId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving annonce from database');
      } else if (results.length) {
        console.log(results);
        res.json(results[0]);
      } else res.status(404).send('Annonce not found');
    }
  );
});

app.put('/annonce/:id', (req, res) => {
  const annId = req.params.id;

  connection.query(
    'SELECT * FROM accomodations WHERE id =?',
    [annId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating annonce');
      } else {
        const annFromDb = selectResults[0];
        if (annFromDb) {
          const annPropToUpdate = req.body;
          connection.query(
            'UPDATE accomodations SET ? WHERE id=?',
            [annPropToUpdate, annId],
            (error) => {
              if (error) {
                console.log(error);
                res.status(500).send('error updating the annonce');
              } else {
                const updated = { ...annFromDb, ...annPropToUpdate };
                res.status(200).json(updated);
              }
            }
          );
        } else {
          res.status(404).send(`Movie with id ${annId} not found`);
        }
      }
    }
  );
});

app.delete('/annonce/:id', (req, res) => {
  const annId = req.params.id;
  connection.query(
    'DELETE FROM accomodations WHERE id = ?',
    [annId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an annonce');
      } else if (result.affectedRows) res.status(200).send('Annonce deleted!');
      else res.status(404).send('Annonce not found');
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
