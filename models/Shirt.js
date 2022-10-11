const mongoose = require("mongoose");

const shirtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collarShirt: { type: Boolean, require: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  type: { type: String, default: "shirt" },
});

const Shirt = mongoose.model("tshirts", shirtSchema);
module.exports = Shirt;
