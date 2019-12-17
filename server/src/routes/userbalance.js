
const db = require('../utils/db');
const userbalance = require('express').Router();
const crypto = require('crypto');
const Request = require('request');
const http = require('https');
const url = require('url');
const uuid = require('uuid/v4');
const redirect = require('express-redirect');
const md5 = require('md5');

require('dotenv').config();

redirect(userbalance);
userbalance.get('/addbalance', (req, res) => {
  userbalance.post('/result', (reqq, ress) => {
    if (
      reqq.query.merchant_id === process.env.merchant_id &&
      reqq.query.amount &&
      reqq.query.pay_id
    ) {
      console.log('user', req.user);
      console.log('pass', req.session.passport);
      db.addBalance(
        {
          userID: req.session.passport.user.id,
        },
        {
          merchant_id: reqq.merchant_id,
          pay_id: reqq.query.pay_id,
          amount: reqq.query.amount,
        },
      )
        .then(data => res.send({ ...data }))
        .catch(err => {
          console.log(err);
          return res.send(err);
        });
    }
  });
  const data = {
    merchant_id: process.env.merchant_id,
    pay_id: req.body.id,
    amount: req.body.sum,
    currency: 'RUB',
    desc: 'Пополнение счёта',
  };
  data.sign = md5(
    `${data.currency}:${data.amount}:${process.env.api_key}:${
      data.merchant_id
    }:${data.pay_id}`,
  );
});

module.exports = userbalance;
