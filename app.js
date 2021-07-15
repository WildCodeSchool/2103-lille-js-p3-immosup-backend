const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const passport = require('passport');
const { setupRoutes } = require('./routes');

const app = express();
app.use(express.static('./pictures'));
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
setupRoutes(app);
app.use(upload());
app.use(express.static('pictures'));

app.post('/files', (req, res) => {
  fs.writeFile('pictures/toto.jpg', req.files.image.data, () => {
    res.send('yay');
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
