const upload = require('express-fileupload');
const fs = require('fs');
const uploadRouter = require('express').Router();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../conf');

uploadRouter.use(express.static('./pictures'));
uploadRouter.use(express.static('pictures'));

uploadRouter.use(upload());
uploadRouter.post('/', (req, res) => {
  const fileName = `pictures/${uuidv4()}.jpeg`;
  fs.writeFile(fileName, req.files.image.data, () => {
    db.query(
      'INSERT INTO photos (url, idUser , idAccomodation) VALUES (?, ?, ?)',
      [fileName, 8, null]
    );
    res.send('yay');
  });
});

module.exports = uploadRouter;
