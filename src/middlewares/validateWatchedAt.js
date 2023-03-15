module.exports = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt || watchedAt.length === 0) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};