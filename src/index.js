const express = require('express');
const readTalkerJson = require('./utils/fs/readTalkerJson');
const writeTalkerJson = require('./utils/fs/writeTalkerJson');
const loginRouter = require('./routes/loginRouter');
const authToken = require('./middlewares/authToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const path = './src/talker.json';

app.use('/login', loginRouter);

app.post('/talker',
authToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  try {
    const talkers = await readTalkerJson(path);
    const id = talkers.length + 1;
    const newTalker = { id, ...req.body };
    talkers.push(newTalker);
    await writeTalkerJson(path, talkers);

    res.status(201).json(newTalker);
  } catch (err) {
    console.log(err);
  }
});

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
