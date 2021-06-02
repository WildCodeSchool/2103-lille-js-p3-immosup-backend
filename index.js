const express = require('express');
const connection = require('./db-config');
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.post('/annonce', (req, res) => {
  const {
    id,
    district,
    adress,
    city,
    furnished,
    rent,
    surface,
    animals,
    title,
    category,
    type,
    energyClass,
    rooms,
    describe,
    idUser,
  } = req.body;
  connection.query(
    'INSERT INTO users (id, district, adress, city, furnished, rent, surface, animals, title, category, type, energyClass,rooms, describe,id_user) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?,?)',
    [
      id,
      district,
      adress,
      city,
      furnished,
      rent,
      surface,
      animals,
      title,
      category,
      type,
      energyClass,
      rooms,
      describe,
      idUser,
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected as id ${connection.threadId}`);
  }
});

app.get('/annonce/:id', (req, res) => {
  const annId = req.params.id;
  connection.query(
    'SELECT * FROM annonce WHERE id = ?',
    [annId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving annonce from database');
      } else if (results.length) res.json(results[0]);
      else res.status(404).send('Annonce not found');
    }
  );
});

app.put('/annonce/:id', (req, res) => {
  const annId = req.params.id;

  connection.query(
    'SELECT * FROM annonce WHERE id =?',
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
            'UPDATE annonce SET ? WHERE id=?',
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
