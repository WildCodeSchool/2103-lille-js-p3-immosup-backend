const express = require('express');
const connection = require('./db-config');
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected as id ${connection.threadId}`);
  }
});

app.get('/annonce/:id', async (req, res) => {
  const annId = req.params.id;
  await connection.query(
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

app.put('/annonce/:id', async (req, res) => {
  const annId = req.params.id;

  await connection.query(
    'SELECT * FROM annonce WHERE id =?',
    [annId],
    async (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating annonce');
      } else {
        const annFromDb = selectResults[0];
        if (annFromDb) {
          const annPropToUpdate = req.body;
          await connection.query(
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
