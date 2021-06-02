const express = require('express');
const cors = require('cors');
const connection = require('./db-config');
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5050;

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
    type,
    energyClass,
    rooms,
    describe,
    idUser,
  } = req.body;
  connection.query(
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
      type,
      describe,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the user');
      } else {
        res.status(201).send('User successfully saved');
      }
    }
  );
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
