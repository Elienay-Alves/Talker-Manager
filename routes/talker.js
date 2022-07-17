const { Router } = require('express');
const read = require('../helpers/read');
const write = require('../helpers/write');
const talkerRead = require('../helpers/read');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  } = require('../middlewares/authenticationMiddleware');

const router = Router();

// Req 2
router.get('/:id', async (req, res) => {
  const talkers = await talkerRead();
  const id = parseInt(req.params.id, 10);
  const talker = talkers.find((t) => t.id === id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

// Req 1
router.get('/', async (_req, res) => {
  const talker = await talkerRead();
  res.status(200).json(talker);
});

// req 5
router.post('/', validateToken, validateName,
validateAge, validateTalk, validateWatchedAt,
validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerToUpdate = await read();
  const id = talkerToUpdate.length + 1;

  talkerToUpdate.push({ name, age, id, talk: { ...talk } });

  write(talkerToUpdate);

  res.status(201).json({ name, age, id, talk: { ...talk } });
});

module.exports = router;