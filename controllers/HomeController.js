const formidable = require('formidable');
const md5 = require('md5');
const moment = require('moment');
const nodemailer = require('nodemailer');


const HomeModel = require('../models/HomeModel');
const UserModel = require('../models/UserModel');
const PortfolioModel = require('../models/PortfolioModel');
const NewsModel = require('../models/NewsModel');
const GuestModel = require('../models/GuestModel');
const InformationModel = require('../models/InformationModel');
const BoxChatModel = require('../models/BoxChatModel');
const MessageModel = require('../models/MessageModel');


module.exports.home = (req, res) => {
    Promise.all([
        HomeModel.findOne(),
        PortfolioModel.find().sort({"_id": -1}).limit(9),
        NewsModel.find({kindNews:"newproduct"}),
        NewsModel.find({kindNews:"promotion"}),
        InformationModel.findOne()
    ])
    .then(data => {
        const [infohome, portfolios, newproducts, promotions, information] = data;
        //ktra session cookie admin
        var admin = false;
        if(req.session.admin || req.cookies.admin){
            admin = true;
        }
        //ktra session cookie cua khach hang
        var guest = "";
        if(req.session.guest){
            guest = req.session.guest.email;
        }
        if(req.cookies.guest){
            guest = req.cookies.guest;
        }
        res.render('home', { infohome, admin, portfolios, newproducts, promotions, guest, information})
    })
    .catch(err => {
        console.log(err);
        res.send('System Error!');
    })
}

module.exports.login = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {username, pwd} = field;
        dataform.push(username, pwd);
    });

    form.on('end', async function() {
        var admin = await UserModel.findOne({"username": dataform[0], "pwd": md5(dataform[1])})
        if(admin == null){
            res.send("error");
        }else{
            req.session.admin = {
                username: admin.username,
                name: admin.name
            }
            //60000 = 1phut
            res.cookie('admin', admin.username, { expires: new Date(Date.now() + 60000*60*24*60), httpOnly: false });
            res.send("success");
        }
    })
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.cookie('admin', "", { expires: new Date(Date.now()), httpOnly: false });
    res.redirect('/')
}

module.exports.sendinfouser = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {name, email, phone, title, message} = field;
        dataform.push(name, email, phone, title, message);
    });

    form.on('end', async function() {
        let guest = new GuestModel({
            name: dataform[0],
            email: dataform[1],
            phone: dataform[2],
            title: dataform[3],
            message: dataform[4],
            kind: "contact",
            status: "notseen"
        });
        guest.save();

        //ktra boxchat da ton tai chua
        var boxchat = await BoxChatModel.findOne({"email": dataform[1]});
        if(boxchat == null){
            var time = moment().format('HH:mm, DD/MM/YYYY');
            var timeMili = Number(new Date(Date.now()));
            var newBoxChat = new BoxChatModel({
                name: dataform[0],
                email: dataform[1],
                phone: dataform[2],
                lastmessage: "Thank you for contacting us!",
                status: "notseen",
                lasttime: time,
                lasttimeMili: timeMili
            })
            newBoxChat.save();

            var newMessageTime = new MessageModel({
                email: dataform[1],
                name: dataform[0],
                userpost: "admin",
                message: time,
                kind: "time",
                time: timeMili
            });
            newMessageTime.save();

            var newMessage = new MessageModel({
                email: dataform[1],
                name: dataform[0],
                userpost: "admin",
                message: "Thank you for contacting us!",
                kind: "text",
                time: timeMili
            });
            newMessage.save();
        }

        req.session.guest = {
           email: dataform[1]
        }
        //60000 = 1phut
        res.cookie('guest', dataform[1], { expires: new Date(Date.now() + 60000*60*24*60), httpOnly: false });

        //gửi email về admin
        var information = await InformationModel.findOne()
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: information.email,
                pass: information.password
            }
        });
        
        var mailOptions = {
            from: 'Minh Thong Portfolio',
            to: information.emailcontact,
            subject: 'THONG PORTFOLIO - CONTACT',
            html: `
                <p>Khách hàng yêu cầu liên hệ</p>
                <p>Name: ${dataform[0]}</p>
                <p>Email: ${dataform[1]}</p>
                <p>Phone: ${dataform[2]}</p>
                <p>Title: ${dataform[3]}</p>
                <p>Message: ${dataform[4]}</p>
            `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
        });
        if(boxchat == null){
            res.send(newBoxChat);
        }else{
            res.send(boxchat);
            //gửi email về admin
            var information = await InformationModel.findOne()
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: information.email,
                    pass: information.password
                }
            });
            
            var mailOptions = {
                from: 'Minh Thong Portfolio',
                to: information.emailcontact,
                subject: 'THONG PORTFOLIO - CONTACT',
                html: `
                    <p>Khách hàng yêu cầu liên hệ</p>
                    <p>Name: ${dataform[0]}</p>
                    <p>Email: ${dataform[1]}</p>
                    <p>Phone: ${dataform[2]}</p>
                    <p>Title: ${dataform[3]}</p>
                    <p>Message: ${dataform[4]}</p>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                }
            });
        }
    }) 
}

module.exports.sendinfochat = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {name, email, phone, title, message} = field;
        dataform.push(name, email, phone, title, message);
    });

    form.on('end', async function() {
        //ktra boxchat da ton tai chua
        var boxchat = await BoxChatModel.findOne({"email": dataform[1]});
        if(boxchat == null){
            var time = moment().format('HH:mm, DD/MM/YYYY');
            var timeMili = Number(new Date(Date.now()));
            var newBoxChat = new BoxChatModel({
                name: dataform[0],
                email: dataform[1],
                phone: dataform[2],
                lastmessage: "Thank you for contacting us!",
                status: "notseen",
                lasttime: time,
                lasttimeMili: timeMili
            })
            newBoxChat.save();

            var newMessageTime = new MessageModel({
                email: dataform[1],
                name: dataform[0],
                userpost: "admin",
                message: time,
                kind: "time",
                time: timeMili
            });
            newMessageTime.save();

            var newMessage = new MessageModel({
                email: dataform[1],
                name: dataform[0],
                userpost: "admin",
                message: "Thank you for contacting us!",
                kind: "text",
                time: timeMili
            });
            newMessage.save();
        }

        req.session.guest = {
           email: dataform[1]
        }

        //gửi email về admin
        var information = await InformationModel.findOne()
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: information.email,
                pass: information.password
            }
            });
            
            var mailOptions = {
            from: 'Minh Thong Portfolio',
            to: information.emailcontact,
            subject: 'THONG PORTFOLIO - MESSAGE',
            html: `
                <p>Khách hàng yêu cầu nhắn tin</p>
                <p>Name: ${dataform[0]}</p>
                <p>Email: ${dataform[1]}</p>
            `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
        });
        //60000 = 1phut
        res.cookie('guest', dataform[1], { expires: new Date(Date.now() + 60000*60*24*60), httpOnly: false });
        if(boxchat == null){
            res.send(newBoxChat);
        }else{
            //gửi email về admin
            var information = await InformationModel.findOne()
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: information.email,
                    pass: information.password
                }
                });
                
                var mailOptions = {
                from: 'Minh Thong Portfolio',
                to: information.emailcontact,
                subject: 'THONG PORTFOLIO - MESSAGE',
                html: `
                    <p>Khách hàng yêu cầu nhắn tin</p>
                    <p>Name: ${dataform[0]}</p>
                    <p>Email: ${dataform[1]}</p>
                `
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                }
            });          
            res.send(boxchat);
        }
    }) 
}

module.exports.loadmessage = (req, res) => {
    var email = "";
    if(req.session.guest){
        email = req.session.guest.email;
    }
    if(req.cookies.guest){
        email = req.cookies.guest;
    }
    if(email == ""){
        res.redirect("/logout");
    }else{
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        var dataform = [];

        if(!req.session.guest && !req.cookies.guest){
            res.redirect('/')
        }

        form.parse(req, function(err, field, files){
            const {email, countload} = field;
            dataform.push(email, countload);
        });

        form.on('end', async function() {
            var form = (dataform[1] - 1) * 50;
            var get = 50;
            var messages = await MessageModel.find({"email":dataform[0]}).sort({"_id":-1});
            res.send(messages);
        }) 
    }
}

module.exports.sendfile = async (req, res) => {
    var email = "";
    if(req.session.guest){
        email = req.session.guest.email;
    }
    if(req.cookies.guest){
        email = req.cookies.guest;
    }
    if(email == ""){
        res.redirect("/logout");
    }else{
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        var fileupload = [];
        var newMessage;
        //Kiểm tra thời gian giữa 2 lần chat, nếu từ 30p thì thêm thời gian
        var time = moment().format('HH:mm, DD/MM/YYYY');
        var timeMili = Number(new Date(Date.now()));
        var boxchat = await BoxChatModel.findOne({"email": email});
        if(timeMili - (Number(boxchat.lasttimeMili)) >= 60000*30){
            newMessage = new MessageModel({
                email: email,
                name: "",
                userpost: "admin",
                message: time,
                kind: "time",
                time: timeMili
            });
            newMessage.save();
            fileupload.push(newMessage);
        }
        form.parse(req, function(err, field, files){

        });

        form.on('fileBegin', function(name, file) {
            var now = Date.now();
            var time = moment().format('HH:mm, DD/MM/YYYY');
            var timeMili = Number(new Date(Date.now()));
            var filedot = file.name.split(".");
            let image = md5(now + file.name) + "." + filedot[filedot.length - 1];
            file.path = 'public/images/' + image;
            
            if(filedot[filedot.length - 1].toLowerCase() == "png" || filedot[filedot.length - 1].toLowerCase() == "jpg" || filedot[filedot.length - 1].toLowerCase() == "jpeg" || filedot[filedot.length - 1].toLowerCase() == "svg"){
                newMessage = new MessageModel({
                    email: email,
                    name: image,
                    userpost: email,
                    message: file.name,
                    kind: "image",
                    time: time
                });
                newMessage.save();
            }else{
                newMessage = new MessageModel({
                    email: email,
                    name: image,
                    userpost: email,
                    message: file.name,
                    kind: "file",
                    time: time
                });
                newMessage.save();
            }
            BoxChatModel.updateOne({"email": email}, {lastmessage:file.name, lasttime:time, status:"notseen",lasttimeMili: timeMili}, (err) => {})
            fileupload.push(newMessage);
        });
        form.on('end', function() {
            res.send(fileupload);
        }) 
    }
}

module.exports.sendmessage = (req, res) => {
    var email = "";
    if(req.session.guest){
        email = req.session.guest.email;
    }
    if(req.cookies.guest){
        email = req.cookies.guest;
    }
    if(email == ""){
        res.redirect("/logout");
    }else{
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        var dataform = [];

        form.parse(req, function(err, field, files){
            const {message} = field;
            dataform.push(message);
        });

        form.on('end', async function() {
            var messageN = [];
            var time = moment().format('HH:mm, DD/MM/YYYY');
            var timeMili = Number(new Date(Date.now()));
            //Kiểm tra thời gian giữa 2 lần chat, nếu từ 30p thì thêm thời gian
            var boxchat = await BoxChatModel.findOne({"email": email});
            if(timeMili - (Number(boxchat.lasttimeMili)) >= 60000*30){
                var newMessageTime = new MessageModel({
                    email: email,
                    name: "",
                    userpost: "admin",
                    message: time,
                    kind: "time",
                    time: timeMili
                });
                newMessageTime.save();
                messageN.push(newMessageTime);
            }
            var newMessage = new MessageModel({
                email: email,
                name: "",
                userpost: email,
                message: dataform[0],
                kind: "text",
                time: time
            });
            BoxChatModel.updateOne({"email": email}, {lastmessage:dataform[0], lasttime:time, status:"notseen",lasttimeMili: timeMili}, (err) => {})
            newMessage.save();
            
            messageN.push(newMessage)
            res.send(messageN);
        }) 
    }
}

module.exports.loadPortfolio = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {kindPort} = field;
        dataform.push(kindPort);
    });

    form.on('end', async function() {
        if(dataform[0] == "all"){
            var portfolios = await PortfolioModel.find().sort({"_id": -1}).limit(9)
        }else{
            var portfolios = await PortfolioModel.find({"kindProduct":dataform[0]}).sort({"_id": -1}).limit(9)
        }
        res.send(portfolios)
    });
}

