var compiler = require('vue-template-compiler');

module.exports = function (content) {

  var compiled = compiler.compile(content);
  if (compiled.errors.length > 0) {
      throw compiled.errors;
  }

  var output =
    'module.exports = function (options) {\n' +
    '  options = options || {}; \n' +
    '  options.render = ' + toFunction(compiled.render) + '\n' +
    '  options.staticRenderFns = [' +  compiled.staticRenderFns.map(toFunction).join(',') + ']\n' +
    '  return options\n' +
    '}';

  return output;
};

function toFunction (code) {
  return 'function(){' + code + '}';
}
