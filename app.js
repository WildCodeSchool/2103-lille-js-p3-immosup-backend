const express = require('express');
const passport = require('passport');

const cors = require('cors');
const { setupRoutes } = require('./routes');

const app = express();

const port = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

setupRoutes(app);
app.use(passport.initialize());

app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/misc'));

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
