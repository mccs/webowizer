var _ = require('underscore');

var patterns = {
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  name: /^([\w \.-]*)([\/\w \.-]*)*$/
};

function Validator(props) {
  this.props = props;
}

_(Validator).extend({
  create: function (props) {
    return new Validator(props);
  }
});

_(Validator.prototype).extend({

  isValid: function () {
    var valid = true;
    for (var k in this.props) {
      if (!patterns[k].test(this.props[k])) {
        valid = false;
      }
    }
    return valid;
  }

});

module.exports = Validator;
