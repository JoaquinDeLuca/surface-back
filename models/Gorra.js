const mongoose = require('mongoose');

const gorraSchema = new mongoose.Schema({
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
});

const Gorra = mongoose.model('gorras', gorraSchema);
module.exports = Gorra;