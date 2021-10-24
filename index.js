const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var mongoose = require("mongoose");

require('dotenv').config()


//Tạo socket 
io.on('connection', function (socket) {
    socket.on('send', function (data) {
        io.sockets.emit('send', data);
    });
    socket.on('boxchat', function (data) {
        io.sockets.emit('boxchat', data);
    });
});

//cài đặt session
app.use(session({ 
    secret: 'anything',
    resave: true,
    saveUninitialized: true}));
//Cai dai cookie
app.use(cookieParser());

//cài đặt view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//cài đặt đường dẫn đến mục public
app.use(express.static(__dirname + "/public"));

//chuyển routers nhận được sang ./routes/Routes.js
const Routers = require("./routers/Routers.js");
app.use("/", Routers);

//Liên kết DB

mongoose.connect(process.env.LINK_CONNECTDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PORT = process.env.PORT || 8888;
http.listen(PORT, () => {
    console.log("App listening on port: http://localhost:" + PORT);
});