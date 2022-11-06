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

const cartSchema = Schema({
    userId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
    quantity: Number,
    isOrdered: { type: Boolean, default: false },
}, {
    collection: 'carts'
})

module.exports = { productSchema, cartSchema };