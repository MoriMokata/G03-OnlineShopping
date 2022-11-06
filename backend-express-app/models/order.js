const mongoose = require('mongoose');
const { cartSchema } = require('./product');
var Schema = mongoose.Schema;

const orderSchema = Schema({
    total_price: Number,
    carts: [cartSchema],
    order_time: { type: Date, default: Date.now },
}, {
    collection: 'products'
});

module.exports = { orderSchema };