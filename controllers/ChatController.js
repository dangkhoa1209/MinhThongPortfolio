const formidable = require('formidable');
const MessageModel = require("../models/MessageModel");
const md5 = require('md5');
const moment = require('moment');
const BoxChatModel = require('../models/BoxChatModel');




module.exports.messagepage = (req, res) => {
    Promise.all([BoxChatModel.find().sort({"lasttimeMili":-1})])
        .then(data => {
            const [boxchats] = data;
            res.render('message-management', {
                boxchats
            })
        })
        .catch(err => {
            res.render('error')
        })
}

module.exports.adminloadmessage = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {email, countload} = field;
        dataform.push(email, countload);
    });

    form.on('end', async function() {
        var form = (dataform[1] - 1) * 50;
        var get = 50;
        var messages = await MessageModel.find({"email":dataform[0]}).sort({"_id":-1});
        BoxChatModel.updateOne({"email": dataform[0]}, {status:"seen"}, (err) => {})
        res.send(messages);
    }) 
}

module.exports.adminloadimageandfile = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {email, countload} = field;
        dataform.push(email, countload);
    });

    form.on('end', async function() {
        var messages = await MessageModel.find({"email":dataform[0], $or:[ { "kind":"file" }, { "kind":"image" } ] }).sort({"_id":-1});
        res.send(messages);
    }) 
}

module.exports.adminsendfile = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var fileupload = [];
    var dataform = [];
    var images = [];
    var newMessage;
    form.parse(req, function(err, field, files){
        const {email} = field;
        dataform.push(email);
    });

    form.on('fileBegin', function(name, file) {
        var now = Date.now();
        var filedot = file.name.split(".");
        let image = md5(now + file.name) + "." + filedot[filedot.length - 1];
        file.path = 'public/images/' + image;
        if(filedot[filedot.length - 1].toLowerCase() == "png" || filedot[filedot.length - 1].toLowerCase() == "jpg" || filedot[filedot.length - 1].toLowerCase() == "jpeg" || filedot[filedot.length - 1].toLowerCase() == "svg"){
            images.push([image, file.name, "image"]);
        }else{
            images.push([image, file.name, "file"]);
        }
    });
    form.on('end', async function() {
        var time = moment().format('HH:mm, DD/MM/YYYY');
        var timeMili = Number(new Date(Date.now()));
        //Kiểm tra thời gian giữa 2 lần chat, nếu từ 30p thì thêm thời gian
        var boxchat = await BoxChatModel.findOne({"email": dataform[0]});
        if(timeMili - (Number(boxchat.lasttimeMili)) >= 10000){
            newMessage = new MessageModel({
                email: dataform[0],
                name: "",
                userpost: "admin",
                message: time,
                kind: "time",
                time: timeMili
            });
            newMessage.save();
            fileupload.push(newMessage);
        }
        images.forEach(element => {
            if(element[2] == "image"){
                newMessage = new MessageModel({
                    email: dataform[0],
                    name: element[0],
                    userpost: "admin",
                    message: element[1],
                    kind: "image",
                    time: time,
                });
                newMessage.save();
            }else{
                newMessage = new MessageModel({
                    email: dataform[0],
                    name: element[0],
                    userpost: "admin",
                    message: element[1],
                    kind: "file",
                    time: time
                });
                newMessage.save();
            }
            BoxChatModel.updateOne({"email": dataform[0]}, {lastmessage:element[1], lasttime:time, status:"seen",lasttimeMili: timeMili}, (err) => {})
            fileupload.push(newMessage);
        });
        res.send(fileupload);
    }) 
}

module.exports.adminsendmessage = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {email, message} = field;
        dataform.push(email, message);
    });

    form.on('end', async function() {
        var time = moment().format('HH:mm, DD/MM/YYYY');
        var timeMili = Number(new Date(Date.now()));
        var messageN = []
        //Kiểm tra thời gian giữa 2 lần chat, nếu từ 30p thì thêm thời gian
        var boxchat = await BoxChatModel.findOne({"email": dataform[0]});
        if(timeMili - (Number(boxchat.lasttimeMili)) >= 60000*30){
            var newMessageTime = new MessageModel({
                email: dataform[0],
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
            email: dataform[0],
            name: "",
            userpost: "admin",
            message: dataform[1],
            kind: "text",
            time: time
        });
        BoxChatModel.updateOne({"email": dataform[0]}, {lastmessage:dataform[1], lasttime:time, status:"seen", lasttimeMili: timeMili}, (err) => {})
        newMessage.save();
        messageN.push(newMessage);
        res.send(messageN);
    }) 
}

module.exports.checkseen = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    var dataform = [];
    form.parse(req, function(err, field, files){
        const {email} = field;
        dataform.push(email);
    });
    
    form.on('end', function() {
        BoxChatModel.updateOne({"email": dataform[0]}, {status:"seen"}, (err) => {})
        res.send("ok");
    }) 
}

module.exports.finduser = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    var dataform = [];
    form.parse(req, function(err, field, files){
        const {text} = field;
        dataform.push(text);
    });
    
    form.on('end', async function() {
        var boxchats = await BoxChatModel.find({$or:[{'email': {'$regex': dataform[0]}},{ 'name': {'$regex': dataform[0]}}]})
        res.send(boxchats)
    }) 
}