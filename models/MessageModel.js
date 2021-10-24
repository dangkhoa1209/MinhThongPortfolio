
const mongoose = require('mongoose')


const MessageSchema = new mongoose.Schema({
    email: String,
    name: String,
    userpost: String,
    message: String,
    kind: String,
    time: String
});


module.exports = mongoose.model('Message', MessageSchema)