const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = Schema({
    username: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    role: String,

    firstName: String,
    lastName: String,
    address: {
        address: String,
        country: String,
        region: String,
        zipcode: String,
        mobile: String,
    },
    gender: String,
    occupation: String,
    birthDay: Date,
    picture: String
}, {
    collection: 'users'
});

module.exports = { userSchema };