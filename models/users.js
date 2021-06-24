const mongoose = require('mongoose');

const city = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    temp_max: Number,
    temp_min: Number,
    lon: Number,
    lat: Number
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cities: [city]
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;