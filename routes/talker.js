const { Router } = require('express');
const talkerRead = require('../helpers/read');

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const talkers = await talkerRead();
    const id = parseInt(req.params.id, 10);
    const talker = talkers.find((t) => t.id === id);

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (error) {
    res.status(400).send('Erro');
  }
});

router.get('/', async (_req, res) => {
  try {
    const talker = await talkerRead();
    res.status(200).json(talker);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;