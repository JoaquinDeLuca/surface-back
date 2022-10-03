const mongoose = require('mongoose');

const capSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
});

const Cap = mongoose.model('caps', capSchema);
module.exports = Cap;