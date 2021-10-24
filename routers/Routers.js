const express = require('express')
const Router = express.Router();

const HomeController = require('../controllers/HomeController')
const EditController = require('../controllers/EditController')
const ChatController = require('../controllers/ChatController')
const PortfolioController = require('../controllers/PortfolioController')

const isAdmin = (req, res, next) => {
    if(req.session.admin || req.cookies.admin){
        next();
    }else{
        res.redirect('/');
    }
}

const checkUser = async (req, res, next) => {
    var email = "";
    if(req.session.guest && email == ""){
        email = req.session.guest.email;
    }
    if(req.cookies.guest && email == ""){
        email = req.cookies.guest;
    }
    if(email == ""){
        res.redirect('/logout');
    }else{
        var boxchats = await BoxChatModel.find({"email": email});
        var guest = await GuestModel.find({"email": email});
        if(boxchats.length == 0 || guest.length == 0){
            req.session.destroy();
            res.cookie('guest', "", { expires: new Date(Date.now()), httpOnly: false });
            BoxChatModel.deleteMany({"email": email}, (err) => {})
            GuestModel.deleteMany({"email": email}, (err) => {})
            MessageModel.deleteMany({"email": email}, (err) => {})
            res.redirect('/logout');
        }else{
            next();
        }
    }
}


//Home
Router.get('/', HomeController.home)
Router.post('/login', HomeController.login)
Router.get('/logout', HomeController.logout)
Router.post('/sendinfouser', HomeController.sendinfouser)
Router.post('/loadPortfolio', HomeController.loadPortfolio)

//User chat
Router.post('/sendinfochat', HomeController.sendinfochat)
Router.post('/loadmessage', HomeController.loadmessage)
Router.post('/sendfile',checkUser, HomeController.sendfile)
Router.post('/sendmessage',checkUser, HomeController.sendmessage)


//Edit page
Router.get('/editpage', isAdmin, EditController.editpage)
Router.post('/updatelogo', isAdmin, EditController.updatelogo)
Router.post('/updateabout', isAdmin, EditController.updateabout)
Router.post('/updatebanner', isAdmin, EditController.updatebanner)
Router.post('/updatebanner', isAdmin, EditController.updatebanner)
Router.post('/createportfolio', isAdmin, EditController.createportfolio)
Router.post('/deleteportfolio', isAdmin, EditController.deleteportfolio)
Router.post('/updateportfolionotimage', isAdmin, EditController.updateportfolionotimage)
Router.post('/updateportfoliohaveimage', isAdmin, EditController.updateportfoliohaveimage)
Router.post('/deletenews', isAdmin, EditController.deletenews)
Router.post('/createnews', isAdmin, EditController.createnews); 
Router.post('/updateinformation', isAdmin, EditController.updateinformation); 
Router.post('/systemreset', isAdmin, EditController.systemreset); 

//Admin chat
Router.get('/messagepage', isAdmin, ChatController.messagepage);
Router.post('/adminloadmessage', isAdmin, ChatController.adminloadmessage)
   //Sau khi người dùng click vào boxchat - hệ thống sẽ tự load ảnh và file đã gửi trước đó
Router.post('/adminloadimageandfile', isAdmin, ChatController.adminloadimageandfile)
Router.post('/adminsendfile', isAdmin, ChatController.adminsendfile)
Router.post('/adminsendmessage', isAdmin, ChatController.adminsendmessage )
Router.post('/checkseen', isAdmin, ChatController.checkseen )
Router.post('/finduser', isAdmin, ChatController.finduser )

//Portfolio page
Router.get('/portfolios', PortfolioController.portfolios)
Router.post('/loadSwitchPage', PortfolioController.loadSwitchPage)
Router.post('/loadPortfolioInPortfolioPage', PortfolioController.loadPortfolioInPortfolioPage)



module.exports = Router