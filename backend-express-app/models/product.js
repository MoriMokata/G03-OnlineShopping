const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema = Schema({
    name: String,
    price: Number,
    detail: String,
    quantity: Number,
    type: String,
    img: String,
    added_time: { type: Date, default: Date.now },
}, {
    collection: 'products'
});

module.exports = { productSchema };