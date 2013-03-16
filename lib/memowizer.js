var _ = require('underscore');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Q = require('q');

function Memowizer(name) {
  this.name = name.split('/');
}

_(Memowizer.prototype).extend({

  createDir: function () {
    var deferred = Q.defer();
    mkdirp('webowy-bank/' + this.getPath(), function (err) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  },

  getName: function () {
    return this.name.join('/');
  },

  getPath: function () {
    return this.name.slice(0, -1).join('/');
  },

  save: function (data) {
    var _this = this;
    return this.createDir().then(function () {
      data.pipe(
        fs.createWriteStream('webowy-bank/' + _this.getName())
      );
    }, function (err) {
      console.log('Memowizer.save - ' + err);
    });
  }

});

module.exports = Memowizer;
