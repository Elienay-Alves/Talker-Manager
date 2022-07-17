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

router.use(validateToken);

// Req 7
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await read();

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(talkerIndex, 1);

  await write(talkers);

  res.status(204).end();
});

router.use(validateName, validateAge, validateTalk, validateWatchedAt, validateRate);

// Req6

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await read();
  const talkerIndex = talkers.findIndex((talker) => talker.id === id);

  talkers[talkerIndex] = { ...talkers[talkerIndex], ...req.body, id };

  await write(talkers);

  res.status(200).json(talkers[talkerIndex]);
});

// req 5
router.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await read();
  const id = talkers.length + 1;

  talkers.push({ name, age, id, talk: { ...talk } });

  write(talkers);

  res.status(201).json({ name, age, id, talk: { ...talk } });
});

module.exports = router;