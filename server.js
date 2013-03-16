var config = require('./config');
var express = require('express');
var Memowizer = require('./lib/memowizer');
var Validator = require('./lib/validator');
var Wemember = require('./lib/wemember');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/' + config.dir));
  app.use(app.router);
});

app.get('/', function (req, res) {
  res.send('Welcome to the ' + config.name);
});

app.get('/info', function (req, res) {
  var path = req.param('path');
  Wemember.create(path, config.dir).getContents().then(function (files) {
    res.send({
      contents: files,
      path: path
    });
  }, function (err) {
    console.log(
      'error: {path: "' + path + '"} - ' + err.toString()
    );
    res.send(404);
  });
});

app.post('/webowize', function (req, res) {
  var props = {
    name: req.param('name'),
    url: req.param('url')
  };

  if (!Validator.create(props).isValid()) {
    console.log(
      'error: {name: "' + props.name + '", url: "' +props.url +
      '"} - invalid'
    );
    res.send({
      err: 'invalid parameters'
    }, 400);
  } else {
    Memowizer.create(props.name, props.url, config.dir)
      .save()
      .then(function () {
        res.send({
          path: props.name
        }, 201);
      }, function (err) {
        console.log(
          'error: {name: "' + props.name + '", url: "' + props.url +
          '"} - ' + err
        );
        res.send({
          err: err
        }, 500);
      });
  }
});

app.listen(config.server.port);
console.log(config.name + ' is listening on port ' + config.server.port);