const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: String,
    pwd: String,
    name: String,
});

/*
const UserNew = mongoose.model('User', UserSchema)
UserNew.create({
    username: 'admin',
    pwd: '123456',
    name: 'Tran Minh Thong',
});
*/

module.exports = mongoose.model('User', UserSchema)