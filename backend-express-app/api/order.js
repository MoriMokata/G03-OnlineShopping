const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { orderSchema } = require('../models/order');
const authorization = require('../middlewares/authorize');

const createOrder = (orderData) => {
    return new Promise((resolve, reject) => {
        let Order = mongoose.model('orders', orderSchema)
        Order.create(orderData, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });   
}

router.route('/create').post(authorization, (req, res) => {
    createOrder(req.body)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
});

module.exports = router;