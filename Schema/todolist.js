const mongoose = require('mongoose');
const Schemaa = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('list', Schemaa);