var jade, renderFile, renderString;
jade = require("./runtime");
renderString = function(template) {
  return eval(template);
};
renderFile = function(path) {
  var template;
  path = "/" + path + ".jade";
  template = require(path);
  return renderString(template);
};
module.exports = {
  renderString: renderString,
  renderFile: renderFile
};