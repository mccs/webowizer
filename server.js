var config = require('./config');
var express = require('express');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/wemory-bank'));
  app.use(app.router);
});

app.get('/', function (req, res) {
  res.send('Welcome to the ' + config.name);
});

app.listen(config.server.port);
console.log(config.name + ' is listening on port ' + config.server.port);