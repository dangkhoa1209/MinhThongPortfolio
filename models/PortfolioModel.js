const mongoose = require('mongoose')


const PortfolioSchema = new mongoose.Schema({
    image: String,
    name: String,
    introduce: String,
    kindProduct: String,
    date: String
});

/*
const PortfolioNew = mongoose.model('Portfolio', PortfolioSchema)
PortfolioNew.create({
    image: 'logo.jpg',
    name: 'Fisrt image',
    introduce: 'This is a first image',
    kindProduct: 'logo',
    date: '19/6/2021',
});
*/

module.exports = mongoose.model('Portfolio', PortfolioSchema)