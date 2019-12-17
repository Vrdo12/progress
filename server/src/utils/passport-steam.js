const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const User = require('../models/User');

const { KEY } = process.env;
const { returnURLSteam, defaultURLSteam } = require('./url');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: returnURLSteam,
      realm: defaultURLSteam,
      apiKey: KEY,
    },
    (identifier, profile, done) => {
      process.nextTick(() => {
        // eslint-disable-next-line no-param-reassign
        profile.identifier = identifier;
        return done(null, profile);
      });
    },
  ),
);
