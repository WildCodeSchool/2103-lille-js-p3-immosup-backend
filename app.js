const express = require('express');
// const db = require('./conf');

const app = express();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
