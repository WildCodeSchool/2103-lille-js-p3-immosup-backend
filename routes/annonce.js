const annonceRouter = require('express').Router();
const db = require('../conf');
const Ann = require('../models/annonce');

/* annonceRouter.get('/:id', (req, res) => {
  const annId = req.params.id;
  console.log('toto');
  db.query(
    'SELECT * FROM accomodations WHERE id = ?',
    [annId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving annonce from database');
      } else if (results.length) {
        console.log(results);
        res.json(results[0]);
      } else res.status(404).send('Annonce not found');
    }
  );
}); */
annonceRouter.get('/', async (req, res) => {
  const [results] = await Ann.getAll();
  res.json(results);
});

annonceRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await Ann.getOne(id);
    if (!results) {
      res.status(404).send(`Accomodation ${id} not found`);
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).send('Error retrieving accomodations from database');
  }
});

annonceRouter.post('/', async (req, res) => {
  const error = Ann.validateCreation(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    try {
      const [results] = await Ann.create(req.body);
      res.status(201).json({
        id: results.insertId,
        ...req.body,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

annonceRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const error = Ann.validateUpdate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    try {
      const [[existingUser]] = await Ann.getOne(id);
      await Ann.update(req.params.id, req.body);
      res.json({ ...existingUser, ...req.body });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

annonceRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sqlValues = [id];
  const sql = 'DELETE FROM accomodations WHERE id = ?';
  try {
    const [results] = await db.query(sql, sqlValues);
    if (!results) {
      res.status(404).send(`Accomodation not found`);
    } else {
      res.status(200).json(results).send('Annonce deleted!');
    }
  } catch (err) {
    res.status(500).send('Error deleting an user');
  }
});

module.exports = annonceRouter;
