const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    picture_url: { type: String, required: true }
})


const product = mongoose.model("products", productSchema);
module.exports = product
