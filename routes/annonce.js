const annonceRouter = require('express').Router();
const Ann = require('../models/annonce');

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
  try {
    const [result] = await Ann.create(req.body);
    res.status(201).send({
      id: result.insertId,
      ...req.body,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send('');
    } else if (err.code === 'ER_BAD_NULL_ERROR') {
      res.status(422).send('');
    } else {
      res.status(500).send('Error creating annonce from database');
    }
  }
});

annonceRouter.put('/:id', async (req, res) => {
  try {
    const [[existingAnn]] = await Ann.getOne(req.params.id);
    if (!existingAnn) {
      res.status(400).json('annonce not found');
    } else {
      await Ann.update(req.params.id, req.body);
      res.status(200).send({
        ...existingAnn,
        ...req.body,
      });
    }
  } catch (err) {
    if (
      err.code === 'ER_BAD_FIELD_ERROR' ||
      err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
    ) {
      res.status(422).send(err.sqlMessage);
    } else {
      res.status(500).send('Error updating annonce from database');
    }
  }
});

annonceRouter.delete('/:id', async (req, res) => {
  try {
    const [results] = await Ann.destroy(req.params.id);
    if (!results) {
      res.status(404).send(`Accomodation not found`);
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).send('Error deleting an user');
  }
});

annonceRouter.get('/landlord/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Ann.getOneLandlord(id);
    if (!results) {
      res.status(404).send(`Accomodation ${id} not found`);
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).send('Error retrieving accomodations from database');
  }
});

module.exports = annonceRouter;
