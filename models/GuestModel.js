const mongoose = require('mongoose')


const GuestSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    title: String,
    message: String,
    kind: String,
    status: String
});


module.exports = mongoose.model('Guest', GuestSchema)