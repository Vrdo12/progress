const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const LivedropSchema = new Schema({
  name: { type: String, required: true },
  priceRUB: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  chance: { type: Number, required: true },
  img: { type: String, required: true },
  type: { type: String },
  caseName: { type: String },
  time: { type: Date },
});

const Livedrop = mongoose.model('Livedrop', LivedropSchema);
module.exports = Livedrop;
