var mongoose = require('mongoose');

// SCHEMA SETUP
var carSchema = new mongoose.Schema({
    make: String,
    model: String,
    color: String,
    year: Number,
    image: String,
    qty: Number
});

// COMPILE TO A MODEL, and export it (in app.js we import this:)
module.exports = mongoose.model("Car", carSchema);