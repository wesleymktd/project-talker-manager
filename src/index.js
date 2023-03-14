const express = require('express');
const readTalkerJson = require('./utils/fs/readTalkerJson');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const path = './src/talker.json';

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkerJson(path);
  console.log(talkers);
  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  } 
  return res.status(200).send([]);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
