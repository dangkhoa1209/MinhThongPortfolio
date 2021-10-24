const formidable = require('formidable');
const mongodb = require('mongodb')
const fs = require('fs');
const md5 = require('md5');
const moment = require("moment");

const HomeModel = require("../models/HomeModel")
const PortfolioModel = require("../models/PortfolioModel")
const NewsModel = require("../models/NewsModel")
const InformationModel = require("../models/InformationModel");
const BoxChatModel = require('../models/BoxChatModel');
const GuestModel = require('../models/GuestModel');
const MessageModel = require('../models/MessageModel');

module.exports.editpage = (req, res) => {
    Promise.all([HomeModel.findOne(), PortfolioModel.find().sort({"_id":-1}), NewsModel.find().sort({"_id":-1}), InformationModel.findOne()])
        .then(data => {
            const [infohome, portfolios, listnews, information] = data;
            res.render('editpage', {
                infohome,
                portfolios,
                listnews,
                information
            })
        })
        .catch(err => {
            res.render('error')
        })
}

module.exports.updatelogo = (req, res) => {
    var form = new formidable.IncomingForm();
    var dataform = [];
    var logo = [];
    form.parse(req, function(err, field, files) {
        const {id, oldlogo} = field;
        dataform.push(id, oldlogo)
    })
    form.on('fileBegin', function(name, file) {
        var now = Date.now();
        var filedot = file.name.split(".");
        let logoname = md5(now + file.name) + "." + filedot[filedot.length - 1];
        file.path = 'public/imagesSystem/logo/' + logoname;
        logo.push(logoname);
    });

    form.on('end', function() {
        HomeModel.updateOne({"_id": dataform[0]}, {logo: logo[0]}, (err) => {
            if (err) {
                console.log("Error update logo");
            } else {
                //xoá file cũ
                //process.cwd() đường dẫn đến file tổng
                fs.unlink(process.cwd() + '/public/imagesSystem/logo/' + dataform[1], function (err) {            
                    if (err) {                                                 
                        console.error("Khong the xoa file logo cũ");                                    
                    }                                                                                  
                });    
                res.send({logo:logo[0]});
            }
        })
    })
}

module.exports.updateabout = (req, res) => {
    var form = new formidable.IncomingForm();
    var dataform = [];
    form.parse(req, function(err, field, files) {
        const {id, title, content} = field;
        dataform.push(id, title, content)
    })

    form.on('end', function() {
        HomeModel.updateOne({"_id": dataform[0]}, {titleAbout: dataform [1], contentAbout: dataform[2]}, (err) => {
            if(err){
                console.log("Error update about");
            }else{
                res.send("ok");
            }
        })
    })
};

module.exports.updatebanner = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];
    var banner = [];
    form.parse(req, function(err, field, files) {
        const {id, title, kindbanner} = field;
        dataform.push(id, title, kindbanner)
    })

    form.on('fileBegin', function(name, file) {
        var now = Date.now();
        var filedot = file.name.split(".");
        let bannername = md5(now + file.name) + "." + filedot[filedot.length - 1];
        file.path = 'public/imagesSystem/banner/' + bannername;
        banner.push(bannername);
    });

    form.on('end', async function() {
        //update not image
        if(dataform[2] == ""){
            HomeModel.updateOne({"_id": dataform[0]}, {title: dataform [1]}, (err) => {
                if(err){
                    console.log("Error update banner");
                }else{
                    res.send("ok");
                }
            })
        }else{
            //update have image
            let oldbanner = await HomeModel.findById(dataform[0]);
            HomeModel.updateOne({"_id": dataform[0]}, {title: dataform [1], banner:banner[0], kindBanner:dataform[2]}, (err) => {
                if(err){
                    console.log("Error update banner");
                }else{
                    fs.unlink(process.cwd() + '/public/imagesSystem/banner/' + oldbanner.banner, function (err) {            
                        if (err) {                                                 
                            console.error("Khong the xoa file portfolio cũ");                                    
                        }                                                                                  
                    });  
                    res.send("ok");
                }
            })
        }
    })

}

module.exports.createportfolio = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];
    var images = [];
    form.parse(req, function(err, field, files) {
        const {nameimage, introduce, kindProduct} = field;
        dataform.push(nameimage, introduce, kindProduct)
    })

    form.on('fileBegin', function(name, file) {
        var now = Date.now();
        var filedot = file.name.split(".");
        let image = md5(now + file.name) + "." + filedot[filedot.length - 1];
        file.path = 'public/images/' + image;
        images.push(image);
    });

    form.on('end', function() {
        let newPortfolio = new PortfolioModel({
            image: images[0],
            name: dataform[0],
            introduce: dataform[1],
            kindProduct: dataform[2],
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        newPortfolio.save();
        res.send(newPortfolio);
    })
}

module.exports.deleteportfolio = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {id} = field;
        dataform.push(id);
    });

    form.on('end', async function() {
        var oldport = await PortfolioModel.findById(dataform[0]);
        PortfolioModel.deleteOne({ '_id': dataform[0] }, (err) => {
            if(err){
                console.log(err);
            }else{
                fs.unlink(process.cwd() + '/public/images/' + oldport.image, function (err) {            
                    if (err) {                                                 
                        console.error("Khong the xoa file portfolio cũ");                                    
                    }                                                                                  
                });   
                res.send("ok");
            }
        })
    })
}

module.exports.updateportfolionotimage = (req, res) => {
    var form = new  formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {id, nameimage, introduce, kindProduct} = field;
        if(kindProduct == null){
            kindProduct = "otherproduct";
        }
        dataform.push(id, nameimage, introduce, kindProduct)
    });

    form.on('end', function(){
        PortfolioModel.updateOne({"_id": dataform[0]}, {name: dataform [1], introduce:dataform[2], kindProduct:dataform[3]}, (err) => {
            if(err){
                console.log("Error update portfolio");
            }else{
                res.send("ok");
            }
        })
    })
}

module.exports.updateportfoliohaveimage = (req, res) => {
    var form = new  formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];
    var images = [];

    form.parse(req, function(err, field, files){
        const {id, nameimage, introduce, kindProduct} = field;
        dataform.push(id, nameimage, introduce, kindProduct)
    });

    form.on('fileBegin', function(name, file) {
        var now = Date.now();
        var filedot = file.name.split(".");
        let image = md5(now + file.name) + "." + filedot[filedot.length - 1];
        file.path = 'public/images/' + image;
        images.push(image);
    });

    form.on('end', async function(){
        var oldport = await PortfolioModel.findById(dataform[0]);
        PortfolioModel.updateOne({"_id": dataform[0]}, {image:images[0] ,name: dataform [1], introduce:dataform[2], kindProduct:dataform[3]}, (err) => {
            if(err){
                console.log("Error update portfolio");
            }else{
                fs.unlink(process.cwd() + '/public/images/' + oldport.image, function (err) {            
                    if (err) {                                                 
                        console.error("Khong the xoa file portfolio cũ");                                    
                    }                                                                                  
                });   
                res.send(images[0]);
            }
        })
    });
}

module.exports.deletenews = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {id} = field;
        dataform.push(id)
    });

    form.on('end', async function(){
        var oldnews = await NewsModel.findById(dataform[0]);
        NewsModel.deleteOne({ '_id': dataform[0] }, (err) => {
            if(err){
                console.log("Error update portfolio");
            }else{
                fs.unlink(process.cwd() + '/public/images/' + oldnews.image, function (err) {            
                    if (err) {                                                 
                        console.error("Khong the xoa file portfolio cũ");                                    
                    }                                                                                  
                });   
                res.send("ok");
            }
        })
    });
}

module.exports.createnews = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];
    var images = [];

    form.parse(req, function(err, field, files){
        const {kindNews} = field;
        dataform.push(kindNews)
    });

    form.on('fileBegin', function(name, file) {
        var now = Date.now();
        var filedot = file.name.split(".");
        let image = md5(now + file.name) + "." + filedot[filedot.length - 1];
        file.path = 'public/images/' + image;
        images.push(image);
    });

    form.on('end', function() {
        let news = new NewsModel({
            image: images[0],
            kindNews: dataform[0],
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        news.save();
        res.send(news);
    })
}

module.exports.updateinformation = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {phonecontact, emailcontact, kakaocontact, email, pwd} = field;
        dataform.push(phonecontact, emailcontact, kakaocontact, email, pwd)
    });

    form.on('end', function() {
        InformationModel.updateOne({emailcontact: dataform [1], phonecontact:dataform[0], kakaocontact:dataform[2], email:dataform[3], password:dataform[4]}, (err) => {
            if(err){
                console.log("Error update portfolio");
            }else{
                res.send("ok");
            }
        })
    })
}

module.exports.systemreset = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {codereset} = field;
        dataform.push(codereset)
    });

    form.on('end', async function() {
        if(dataform[0] == "resetpage"){
            //delete boxchat
            BoxChatModel.deleteMany((err) => {})
            //delete guest
            GuestModel.deleteMany((err) => {})
            //delete message
            var messages = await MessageModel.find();
            messages.forEach(function(message) {
                if(message.kind == "file" || message.kind == "image"){
                    fs.unlink(process.cwd() + '/public/images/' + message.name, function (err) {            
                        if (err) {                                                 
                            console.error("Khong the xoa file portfolio cũ");                                    
                        }                                                                                  
                    });   
                }
            })
            MessageModel.deleteMany((err) => {})
        }
        res.send("ok");
    })
}