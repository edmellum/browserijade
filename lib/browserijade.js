var renderFile, renderString;
window.jade = require("./runtime");
renderString = function(template) {
  return eval(template);
};
renderFile = function(path, locals) {
  var template;
  if (locals == null) {
    locals = {};
  }
  path = "/" + path + ".jade";
  template = require(path);
  return template(locals);
};
module.exports = {
  renderString: renderString,
  renderFile: renderFile
};