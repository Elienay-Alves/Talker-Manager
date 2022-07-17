const express = require('express');
const bodyParser = require('body-parser');
const generateToken = require('./helpers/generateTolken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Req 1 e 2
const talkerRouter = require('./routes/talker');

app.use('/talker', talkerRouter);

// Req 3
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if ([email, password].includes(undefined)) {
      return res.status(401).json({ message: 'Missing fields' });
    }
    const token = generateToken();
    return res.status(200).json({ token: `${token}` });
  } catch (error) {
    return res.status(500).end();
  }
});

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});