var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.NAMES = [];

function random (max) {
    return Math.random() * max; 
}

app.get('/', function(req, res){
    var name = null;
    if (app.NAMES.length > 0) {
        name = app.NAMES[random(app.NAMES.length)];
    }
    res.status(200).json({
        name: name  
    });
});

app.get('/list', function(req, res){
    res.status(200).json({names: app.NAMES});
});

app.post('/list', function(req, res) {
    app.NAMES.push(req.body.name);
    res.status(204).json();
});

app.listen(3000);

module.exports = app;
