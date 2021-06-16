const accomodationsRouters = require('express').Router();
const accomodations = require('../models/accomodations');

accomodationsRouters.get('/', async (req, res) => {
  try {
    console.log(accomodations.getAll);
    res.status(200).json(accomodations);
  } catch {
    res.status(500).send('Error retrieving acc from database');
  }
});

accomodationsRouters.get('/:id', async (req, res) => {
  try {
    if (accomodations.length > 0) {
      res.status(200).json(accomodations);
      console.log(accomodations);
    } else {
      res.status(404).send(`accomodations ${req.params.id} not found`);
    }
  } catch (err) {
    res.status(500).send('Error retrieving accomodations from database');
  }
});

accomodationsRouters.post('/', async (req, res) => {
  const error = accomodations.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    try {
      const [result] = await accomodations.create(req.body);
      res.status(201).json({
        id: result.insertId,
        ...req.body,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

accomodationsRouters.put('/:id', async (req, res) => {
  const error = accomodations.validateUpdate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    try {
      const [existingaccomodations] = await accomodations.getOne(req.params.id);
      const [result] = await accomodations.update(req.params.id, req.body);
      console.log(result);
      res.json({ ...existingaccomodations, ...req.body });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = accomodationsRouters;
