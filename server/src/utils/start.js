const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
const socket = require('../socket');

module.exports = app => {
  const http = require('http').createServer(app);
  const io = require('socket.io')(http);
  socket(io);
  http.listen(process.env.PORT || 3000, () =>
    console.log(`listening ${process.env.PORT || 3000}`),
  );

  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
    },
  );
};
