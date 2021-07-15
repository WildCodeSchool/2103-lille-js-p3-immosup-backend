const upload = require('express-fileupload');
const fs = require('fs');
const uploadRouter = require('express').Router();
const express = require('express');

uploadRouter.use(express.static('./pictures'));
uploadRouter.use(express.static('pictures'));

uploadRouter.use(upload());
uploadRouter.post('/', (req, res) => {
  fs.writeFile('pictures/toto2.jpg', req.files.image.data, () => {
    res.send('yay');
  });
});

module.exports = uploadRouter;
