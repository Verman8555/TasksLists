const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listform = new Schema({
    name: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('list', listform);