const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    role: String,
}, {
    collection: 'users'
});

module.exports = { userSchema };