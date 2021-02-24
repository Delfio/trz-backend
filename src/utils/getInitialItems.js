const { readFile } = require('fs/promises');
const path = require('path');

const pathOfInstruction = path.resolve('src/utils/GENERATE_INITIAL_ITEMS.sql');

module.exports = async() => {
    return readFile(pathOfInstruction, {
        encoding: 'utf-8',
    });
}

