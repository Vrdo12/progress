const db = require('../utils/db');
const jwt = require('../utils/token');
const Livedrop = require('../models/Livedrop');
const cases = require('express').Router();

const MY_SLACK_WEBHOOK_URL =
  'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

require('dotenv').config();

cases.post('/cases/:name', (req, res) => {
  db.getCase(req.params.name).then(response => {
    const encrypted = jwt(response.toJSON());
    res.send({ encrypted });
  });
});

cases.post('/opencase', (req, res) => {
  db.removeBalance(
    { userID: req.session.passport.user.id },
    {
      type: 'balance',
      sellPrice: req.body.winner.sellPrice || 9,
      caseType: req.body.case.type,
      name: req.body.winner.name,
      img: req.body.winner.img,
      price: req.body.case.priceRUB,
      order: req.body.winner.order || 0,
    },
  ).then(data => {
    Livedrop.collection.countDocuments({}, {}, (error, count) => {
      slack.alert({
        text: 'Winner',
        fields: {
          user: `Username: ${req.session.passport.user.displayName}, ID: ${
            req.session.passport.user.id
          }`,
          game: req.body.winner.name,
          order: req.body.case.type === 'xujan' ? req.body.winner.order : count,
        },
      });
    });

    data.gameHistory.reverse();
    res.send({ ...data });
  });
});

cases.post('/sellgame', (req, res) => {
  db.sellGame(
    { userID: req.session.passport.user.id },
    {
      _id: req.body._id,
      name: req.body.name,
      caseType: req.body.caseType,
      sellPrice: req.body.sellPrice,
    },
  ).then(data => {
    data.gameHistory.reverse();
    res.send({ ...data });
  });
});

cases.post('/getkey', (req, res) => {
  db.getKey(
    { userID: req.session.passport.user.id },
    {
      _id: req.body._id,
      name: req.body.name,
      caseType: req.body.caseType,
      sellPrice: req.body.sellPrice,
    },
  ).then(data => {
    slack.alert({
      text: 'GET KEY',
      fields: {
        user: `Username: ${req.session.passport.user.displayName}, ID: ${
          req.session.passport.user.id
        }`,
        game: req.body.name,
        order: req.body.order,
      },
    });
    data.gameHistory.reverse();
    res.send({ ...data });
  });
});

module.exports = cases;
