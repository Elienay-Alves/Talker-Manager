const { readFile } = require('fs').promises;

const talkerRes = () => readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data))
  .catch((_err) => []);

module.exports = {
  talkerRes,
};