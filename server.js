var config = require('./config');
var express = require('express');
var fs = require('fs');
var http = require('http');
var mkdirp = require('mkdirp');

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
  var name = req.param('name').split('/');
  var file;

  mkdirp('webowy-bank/' + name.slice(0, -1).join('/'), function (err) {
    file = fs.createWriteStream('webowy-bank/' + name.join('/'));
    if (err) {
      res.send('shit! ' + err);
    } else {
      http.get(req.param('url'), function(response, err) {
        if (err) {
          res.send('shit2! ' + err);
        } else {
          response.pipe(file);
          res.send('success');
        }
      });
    }
  });
});

app.listen(config.server.port);
console.log(config.name + ' is listening on port ' + config.server.port);