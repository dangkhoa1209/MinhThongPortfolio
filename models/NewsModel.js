const mongoose = require('mongoose')


const NewsSchema = new mongoose.Schema({
    image: String,
    kindNews: String,
    date: String
});


module.exports = mongoose.model('News', NewsSchema)