const contactsRouter = require('express').Router();
const { db } = require('../conf');

contactsRouter.get('/:id', async (req, res) => {
  try {
    const sql =
      'select id_sender from messages where id_receiver=? group by id_sender';
    const [results] = await db.query(sql, [req.params.id]);

    res.json(results);
  } catch (err) {
    res.status(500).send('Error retrieving contacts from database');
  }
});

contactsRouter.get('/messages/:idReceiver/:idSender', async (req, res) => {
  const { idSender, idReceiver } = req.params;
  try {
    const sql = `
      select 
        idmessage, content, timedate, id_receiver, id_accomodations,  id_sender 
      from 
        messages 
      where 
          (id_sender = ? and id_receiver = ?) 
        or 
          (id_sender = ? and id_receiver = ?) 
      order by idmessage`;
    const [results] = await db.query(sql, [
      idSender,
      idReceiver,
      idReceiver,
      idSender,
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).send('Error retrieving messages from database');
  }
});

contactsRouter.post('/messages', async (req, res) => {
  const { content, idSender, idReceiver } = req.body;
  await db.query(
    'INSERT INTO messages(id_sender, id_receiver, timedate, content) VALUES(?,?,?,?)',
    [idSender, idReceiver, new Date(), content]
  );
  res.status(201).send(`message: ${content}`);
});
module.exports = contactsRouter;
