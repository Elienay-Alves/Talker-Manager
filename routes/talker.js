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

router.use(validateToken, validateName, validateAge, validateTalk, validateWatchedAt, validateRate);

// Req6

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkersToUpdate = await read();
  const talkerIndex = talkersToUpdate.findIndex((talker) => talker.id === id);

  talkersToUpdate[talkerIndex] = { ...talkersToUpdate[talkerIndex], ...req.body, id };

  await write(talkersToUpdate);

  res.status(200).json(talkersToUpdate[talkerIndex]);
});

// req 5
router.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerToCreate = await read();
  const id = talkerToCreate.length + 1;

  talkerToCreate.push({ name, age, id, talk: { ...talk } });

  write(talkerToCreate);

  res.status(201).json({ name, age, id, talk: { ...talk } });
});

module.exports = router;