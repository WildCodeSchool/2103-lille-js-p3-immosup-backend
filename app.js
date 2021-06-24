const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');

const app = express();

const port = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());
setupRoutes(app);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
