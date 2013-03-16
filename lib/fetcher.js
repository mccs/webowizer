var _ = require('underscore');
var http = require('http');
var Q = require('q');

function Fetcher(url) {
  this.url = url;
}

_(Fetcher.prototype).extend({

  fetch: function () {
    var deferred = Q.defer();
    http.get(this.url, function(response, err) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(response);
      }
    });
    return deferred.promise;
  }

});

module.exports = Fetcher;
