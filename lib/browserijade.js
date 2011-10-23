var jade;
jade = require("./runtime");
module.exports = function(template) {
  return eval(template);
};