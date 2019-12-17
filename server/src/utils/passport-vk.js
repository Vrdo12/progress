const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const User = require('../models/User');

const { VKONTAKTE_APP_ID, VKONTAKTE_APP_SECRET } = process.env;
const { returnURLVk } = require('./url');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new VKontakteStrategy(
    {
      clientID: VKONTAKTE_APP_ID,
      clientSecret: VKONTAKTE_APP_SECRET,
      callbackURL: returnURLVk,
    },
    (accessToken, refreshToken, params, profile, done) => {
      profile.email = profile.id;
      done(null, profile);
    },
  ),
);
