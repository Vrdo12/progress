const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { SECRET } = process.env;

module.exports = (data, expiresIn = 3000) =>
  jwt.sign(data, SECRET, {
    expiresIn,
  });
