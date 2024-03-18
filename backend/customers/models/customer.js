const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name : String,
    industry : String
});

module.exports = mongoose.model('Customer', customerSchema);