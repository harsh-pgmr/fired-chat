const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});




module.exports = mongoose.model('Messages', messagesSchema);