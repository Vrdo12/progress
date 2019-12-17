const db = require('../utils/db');
const passport = require('passport');
const livedrop = require('express').Router();

require('dotenv').config();

livedrop.get('/live', (req, res) => {
  db.getLivedrop().then(data => res.send(data.reverse().slice(0, 10)));
});

livedrop.get('/liveinfo', (req, res) => {
  db.getLiveinfo().then(data => res.send({ users: data[0], cases: data[1] }));
});

module.exports = livedrop;
