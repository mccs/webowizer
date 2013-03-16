var config = require('./config');
var express = require('express');
var Fetcher = require('./lib/fetcher');
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
  new Fetcher(req.param('url')).fetch().then(function (data) {
    new Memowizer(req.param('name'))
      .save(data)
      .then(function () {
        res.send('success');
      }, function (err) {
        res.send('fail... ' + err);
      });
  }, function (err) {
      res.send('fail... ' + err);
  });
});

app.listen(config.server.port);
  console.log(config.name + ' is listening on port ' + config.server.port);