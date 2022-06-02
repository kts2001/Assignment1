let mongoose = require('mongoose');

// create a model class
let businessModel = mongoose.Schema({
    Name: String,
    Phone: Number,
    Email: String,
    
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Business', businessModel);