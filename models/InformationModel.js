const mongoose = require('mongoose')


const InformationSchema = new mongoose.Schema({
    emailcontact: String,
    phonecontact: String,
    kakaocontact: String,
    email: String,
    password: String
});


/*
const InformationNew = mongoose.model('Information', InformationSchema)
InformationNew.create({
    emailcontact: "motbuoc14@gmail.com",
    phonecontact: "0333466444",
    email: "motbuoc11@gmail.com",
    password: "KhoaQuynh120900"
});
*/


module.exports = mongoose.model('Information', InformationSchema)