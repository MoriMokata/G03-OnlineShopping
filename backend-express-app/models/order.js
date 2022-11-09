const mongoose = require('mongoose');
const { cartSchema } = require('./product');
const { userAddressSchema } = require('./user');
var Schema = mongoose.Schema;

const orderSchema = Schema({
    userAddress: userAddressSchema,
    carts: [cartSchema],
    comment: String,
    shipping: {
        name: String,
        price: Number,
    },
    payment: {
        cardType: String,
        cardName: String,
        cardNumber: String,
        expirationData: String,
        cvv: String,
    },
    totalPrice: Number,
    orderTime: { type: Date, default: Date.now },
}, {
    collection: 'orders'
});

module.exports = { orderSchema };