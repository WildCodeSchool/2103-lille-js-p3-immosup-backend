const favoritesRouter = require('express').Router();
const favorite = require('../models/favorites');

favoritesRouter.get('/:id', async (req, res) => {
  try {
    const [fav] = await favorite.getFav(req.params.id);

    if (!fav) {
      res.status(404).send(`Nope ${req.params.id} not found`);
    } else {
      res.status(200).json(fav);
    }
  } catch (err) {
    res.status(500).send('Error retrieving users from database');
  }
});

module.exports = favoritesRouter;
