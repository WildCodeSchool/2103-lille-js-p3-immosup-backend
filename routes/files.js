const filesRouter = require('express').Router();

const file = '1';

filesRouter.get('/', async (req, res) => {
  const [results] = await file.getAll();
  res.json(results);
});

filesRouter.post('/', async (req, res) => {
  try {
    const [result] = await file.create(req.body);
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
