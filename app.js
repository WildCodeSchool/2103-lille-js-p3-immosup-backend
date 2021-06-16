const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
