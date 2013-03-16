var config = require('./config');
var express = require('express');
var Memowizer = require('./lib/memowizer');

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
  Memowizer.create(req.param('name'), req.param('url'))
    .save()
    .then(function () {
      res.send({
        success: true,
        msg: 'success'
      });
    }, function (err) {
      res.send({
        success: false,
        msg: err
      });
    });
});

app.listen(config.server.port);
console.log(config.name + ' is listening on port ' + config.server.port);