const mongoose = require('mongoose');

const buzosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jacketClosure: { type: Boolean, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Buzos = mongoose.model('buzos', buzosSchema);
module.exports = Buzos;