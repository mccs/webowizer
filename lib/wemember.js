var _ = require('underscore');
var fs = require('fs');
var Q = require('q');

function Wemember(dir, base) {
  this.base = base;
  this.dir = dir;
}

_(Wemember).extend({
  create: function (dir, base) {
    return new Wemember(dir, base);
  }
});

_(Wemember.prototype).extend({

  deleteFile: function (file) {
    var d = Q.defer();
    fs.unlink(this.getDir() + '/' + file, function (err) {
      if (err) {
        d.reject(err);
      } else {
        d.resolve();
      }
    })
    return d.promise;
  },

  getContents: function () {
    var d = Q.defer();
    fs.readdir(this.getDir(), function (err, files) {
      if (err) {
        d.reject(err);
      } else {
        d.resolve(files);
      }
    });
    return d.promise;
  },

  getDir: function () {
    return this.base + '/' + this.dir;
  }

});

module.exports = Wemember;
