var config = require('./config');
var express = require('express');
var Memowizer = require('./lib/memowizer');
var Validator = require('./lib/validator');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/webowy-bank'));
  app.use(app.router);
});

app.get('/', function (req, res) {
  res.send('Welcome to the ' + config.name);
});

app.post('/webowize', function (req, res) {
  var props = {
    name: req.param('name'),
    url: req.param('url')
  };

  if (!Validator.create(props).isValid()) {
    console.log('error: {name: "' + props.name + '", url: "'+ props.url +'"} - invalid');;
    res.send({
      success: false,
      msg: 'invalid parameters'
    }, 400);
  } else {
    Memowizer.create(req.param('name'), req.param('url'))
      .save()
      .then(function () {
        res.send({
          success: true,
          msg: 'webowized!'
        }, 201);
      }, function (err) {
        console.log('error: {name: "' + props.name + '", url: "'+ props.url +'"} - ' + err);
        res.send({
          success: false,
          msg: err
        }, 500);
      });
  }
});

app.listen(config.server.port);
console.log(config.name + ' is listening on port ' + config.server.port);