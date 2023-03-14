const express = require('express');
const readTalkerJson = require('./utils/fs/readTalkerJson');
const tokenGenerate = require('./utils/tokenGenerate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const path = './src/talker.json';

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkerJson(path);
  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  } 
  return res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkerJson(path);
  const { id } = req.params;
  const talker = talkers.find((el) => el.id === Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (_req, res) => {
  // const { email, password } = req.body;
  const token = tokenGenerate();
  // console.log('token gerado', token);
  
  return res.status(200).send({ token: `${token}` });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
