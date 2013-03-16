var _ = require('underscore');
var Fetcher = require('./fetcher');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Q = require('q');

function Memowizer(name, url) {
  this.fetcher = new Fetcher(url);
  this.name = name.split('/');
}

_(Memowizer).extend({

  create: function (name, url) {
    return new Memowizer(name, url);
  }

});

_(Memowizer.prototype).extend({

  createDir: function () {
    var d = Q.defer();
    mkdirp('webowy-bank/' + this.getPath(), function (err) {
      if (err) {
        d.reject(new Error(err));
      } else {
        d.resolve();
      }
    });
    return d.promise;
  },

  getName: function () {
    return this.name.join('/');
  },

  getPath: function () {
    return this.name.slice(0, -1).join('/');
  },

  prep: function () {
    return Q.all([
      this.fetcher.fetch(),
      this.createDir()
    ]);
  },

  save: function () {
    var _this = this;
    return this.prep().then(function (fetch) {
      fetch[0].pipe(
        fs.createWriteStream('webowy-bank/' + _this.getName())
      );
    }, function (err) {
      console.log('Memowizer.save - ' + err);
    });
  }

});

module.exports = Memowizer;
