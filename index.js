const express = require('express');
const connection = require('./db-config');
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.post('/api/users', (req, res) => {
  const {
    Titre,
    Categorie,
    Type,
    Meuble,
    Classe,
    Gaz,
    Piece,
    Carre,
    Prix,
    Description,
    Photo,
    Localisation,
    Coordonnées,
  } = req.body;
  connection.query(
    'INSERT INTO users (Titre, Categorie, Type, Meuble, Classe, Gaz, Piece, Carre, Prix, Description, Photo, Localisation, Coordonnées) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?)',
    [
      Titre,
      Categorie,
      Type,
      Meuble,
      Classe,
      Gaz,
      Piece,
      Carre,
      Prix,
      Description,
      Photo,
      Localisation,
      Coordonnées,
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
