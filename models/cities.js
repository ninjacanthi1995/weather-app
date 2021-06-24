const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    temp_max: Number,
    temp_min: Number,
    lon: Number,
    lat: Number
});

const cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;