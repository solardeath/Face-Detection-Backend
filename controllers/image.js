const Clarifai = require('clarifai');
const { json } = require('body-parser');

const app = new Clarifai.App({
    apiKey: "9215d097ec2440a0892ed4f270dfd74c",
});

const handleAPICall = (req,res) =>{
    app.models
        .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to work with api'))
}


const handleImage = (req, res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage
}