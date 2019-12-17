const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const session = require('express-session');
const passport = require('passport');
const auth = require('./routes/auth');
const cases = require('./routes/cases');
const livedrop = require('./routes/livedrop');
const games = require('./routes/games');
const userbalance = require('./routes/userbalance');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const setup = require('./utils/start');
require('./utils/passport-steam');
require('./utils/passport-vk');

setup(app);
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET],
    maxAge: 365 * 24 * 60 * 60 * 1000,
  }),
);
const host = process.env.FRONT_HOST || 'localhost';
const port = process.env.PORT || ':5000';
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}${port}`
    : `https://${host}`;
const allowedOrigins = [
  url,
  'https://any-pay.org',
  undefined,
  'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
];
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: function(origin, callback) {
      // console.log(origin);
      if (origin == undefined || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`aaaaa - ${origin}`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);
app.use(auth);
app.use(livedrop);
app.use(games);
app.use(cases);
app.use(userbalance);
app.get('/', (req, res) => {
  res.send('LOL');
});
