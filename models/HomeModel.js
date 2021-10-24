const mongoose = require('mongoose')


const HomeSchema = new mongoose.Schema({
    logo: String,
    banner: String,
    kindBanner: String,
    title: String,
    titleAbout: String,
    contentAbout: String,
});


/*const HomeNew = mongoose.model('Home', HomeSchema)
HomeNew.create({
    logo: 'logo.jpg',
    banner: 'khoa.jpg',
    kindBanner: 'image',
    title: 'Designer&Editer',
    titleAbout: 'About me minh thong retina',
    contentAbout: 'i am a designer aaaaaa',
});*/


module.exports = mongoose.model('Home', HomeSchema)