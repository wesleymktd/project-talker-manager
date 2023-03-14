const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); 
};

module.exports = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'O campo "email" é obrigatório' });    
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  
    next();
  };
