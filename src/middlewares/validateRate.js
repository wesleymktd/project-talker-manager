module.exports = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (typeof rate !== 'number') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};