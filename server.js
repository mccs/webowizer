var config = require('./config');
var express = require('express');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/wemory-bank'));
  app.use(app.router);
});

app.get('/', function (req, res) {
  res.send('Hello, there!');
});

app.listen(config.server.port);
console.log('Webowizer is listening on port ' + config.server.port);