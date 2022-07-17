const { readFile } = require('fs').promises;

const read = async () => {
    const fileContent = await readFile('./talker.json', 'utf-8');
    return JSON.parse(fileContent);
};

module.exports = read;