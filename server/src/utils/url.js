if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

exports.returnURLSteam =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/steam/return`
    : `https://${host}/steam/return`;

exports.defaultURLSteam =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;

exports.returnURLVk =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/vkontakte/callback`
    : `https://${host}/vkontakte/callback`;
exports.defaultURLVk =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;
