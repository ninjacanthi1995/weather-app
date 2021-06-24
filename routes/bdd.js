var mongoose = require('mongoose');

const uri = 'mongodb+srv://ninjacanthi1995:Neuco123@cluster0.89hu1.mongodb.net/weatherapp?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(uri, options, function(error) {
    console.log(error);    
});

const citySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    temp_max: Number,
    temp_min: Number
});

const cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;