const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('fs').promises;
const { talkerRes } = require('./helpers/talkerRes');
// const { talkerById } = require('./helpers/talkerById');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await talkerRes();
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  try {
    const data = await readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    const { id } = req.params;
    const talker = talkers.find((talk) => talk.id === Number(id));

    if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (error) {
    res.status(400).send('Erro');
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

// Part
