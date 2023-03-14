const express = require('express');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
const tokenGenerate = require('../utils/tokenGenerate');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (_req, res) => {
    // const { email, password } = req.body;
    const token = tokenGenerate();
    
    return res.status(200).send({ token: `${token}` });
  });

module.exports = router;