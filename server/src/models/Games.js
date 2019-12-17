const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const gamesSchema = new Schema({
  data: [
    {
      name: { type: String, required: true },
      priceRUB: { type: Number, required: true },
      priceUSD: { type: Number, required: true },
      img: { type: String, required: true },
    },
  ],
});

const games = mongoose.model('Games', gamesSchema);
module.exports = games;
