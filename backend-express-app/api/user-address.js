const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { userAddressSchema } = require('../models/user');
const authorization = require('../middlewares/authorize');

const findUserAddressesByUser = (userId) => {
    return new Promise((resolve, reject) => {
        let UserAddress = mongoose.model('user_addresses', userAddressSchema);
        UserAddress.find({ userId: userId }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const addAddress = (addressData) => {
    return new Promise((resolve, reject) => {
        let UserAddress = mongoose.model('user_addresses', userAddressSchema);
        UserAddress.create(addressData, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

router.route('/add').post(authorization, (req, res) => {
    addAddress(req.body)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
});

router.route('/user/:userId').get(authorization, (req, res) => {
    let id = req.params.userId;

    findUserAddressesByUser(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).send(`${err.name}: ${err.message}`);
    });
    
})

module.exports = router;