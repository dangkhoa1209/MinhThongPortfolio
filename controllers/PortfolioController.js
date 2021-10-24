const formidable = require('formidable');
const PortfolioModel = require('../models/PortfolioModel');
const HomeModel = require('../models/HomeModel');

module.exports.portfolios = (req, res) => {
    Promise.all([
        HomeModel.findOne(),
    ])
    .then(data => {
        const [infohome] = data;
        res.render('portfolio', {infohome})
    })
    .catch(err => {
        console.log(err);
        res.send('System Error!');
    })
}

module.exports.loadPortfolioInPortfolioPage = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {kindPort, index} = field;
        dataform.push(kindPort, index);
    });

    form.on('end', async function() {
        var index = (Number(dataform[1]) - 1) * 15
        if(dataform[0] == "all"){
            var portfolios = await PortfolioModel.find().sort({"_id": -1}).skip(index).limit(15);
        }else{
            var portfolios = await PortfolioModel.find({"kindProduct":dataform[0]}).sort({"_id": -1}).skip(index).limit(15);
        }
        res.send(portfolios);
    })
}

module.exports.loadSwitchPage = (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var dataform = [];

    form.parse(req, function(err, field, files){
        const {kindPort} = field;
        dataform.push(kindPort);
    });

    form.on('end', async function() {
        if(dataform[0] == "all"){
            var countPort = await PortfolioModel.find();
        }else{
            var countPort = await PortfolioModel.find({"kindProduct":dataform[0]});
        }
        res.send(countPort);
    })
}