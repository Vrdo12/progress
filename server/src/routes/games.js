const db = require('../utils/db');
const passport = require('passport');
const jwt = require('../utils/token');
const games = require('express').Router();

require('dotenv').config();

games.get('/games', (req, res) => {
  db.getGames().then(response => {
    const encrypted = jwt({ response });
    res.send({ encrypted });
  });
});

module.exports = games;
