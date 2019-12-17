const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const casesSchema = new Schema({
  type: { type: String, required: true },
  data: [
    {
      name: { type: String, required: true },
      priceRUB: { type: Number, required: true },
      priceUSD: { type: Number, required: true },
      sellPrice: { type: Number, required: false },
      chance: { type: Number, required: true },
      img: { type: String, required: true },
    },
  ],
});

const cases = mongoose.model('Cases', casesSchema);
module.exports = cases;
