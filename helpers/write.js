const { writeFile } = require('fs').promises;

const write = (something) => {
    writeFile('./talker.json', JSON.stringify(something));
};

module.exports = write;