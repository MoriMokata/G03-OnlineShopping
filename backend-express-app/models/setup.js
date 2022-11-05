const mongoose = require('mongoose');
const { productSchema } = require('../models/product');

const url = 'mongodb://localhost:27017/online_shopping';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const setupMongoose = (req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB');
        return next();
    })
    .catch(err => {
        console.log('Cannot connect to MongoDB');
        res.status(501).send(err);
    });
}

module.exports = setupMongoose, mongoose;