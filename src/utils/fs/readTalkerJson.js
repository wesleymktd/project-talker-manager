const fs = require('fs').promises;

const readTalkerJson = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const response = JSON.parse(data);
    return response;
  } catch (err) {
    console.log(err);
  }   
};

module.exports = readTalkerJson;