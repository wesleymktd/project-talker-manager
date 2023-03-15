const fs = require('fs').promises;

const writeTalkerJson = async (path, json) => {
  try {
    const jsonString = JSON.stringify(json, null, 2);
    await fs.writeFile(path, jsonString);
    console.log('arquivo escrito');
  } catch (err) {
    console.log(err);
  }   
};

module.exports = writeTalkerJson;