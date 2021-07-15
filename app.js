const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { setupRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
setupRoutes(app);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
