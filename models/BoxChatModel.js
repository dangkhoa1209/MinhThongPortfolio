const mongoose = require('mongoose')


const BoxChatSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    lastmessage: String,
    status: String,
    lasttime: String,
    lasttimeMili: String
});


module.exports = mongoose.model('BoxChat', BoxChatSchema)