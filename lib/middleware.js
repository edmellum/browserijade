var browserijade, cacheRuntime, fs, getTemplates, glob, jade, path, preCompile;
path = require("path");
fs = require("fs");
glob = require("glob");
jade = require("jade");
browserijade = function(templates_dir, ignores) {
  var templates;
  cacheRuntime();
  templates = getTemplates(templates_dir, ignores);
  return function(bundle) {
    bundle.register(".jade", preCompile);
    return bundle.require(templates);
  };
};
cacheRuntime = function() {
  var jade_path, runtime, runtime_path;
  jade_path = require.resolve("jade");
  runtime_path = path.join(jade_path, "../lib/runtime.js");
  runtime = fs.readFileSync(runtime_path, "utf8");
  return fs.writeFileSync(__dirname + "/runtime.js", runtime);
};
preCompile = function(body) {
  var compiled;
  compiled = jade.compile(body, {
    client: true
  }).toString();
  return "module.exports = " + compiled;
};
getTemplates = function(templates_dir, ignores) {
  var ignore, template, templates, _i, _j, _len, _len2;
  templates_dir = path.normalize(templates_dir);
  if (ignores == null) {
    ignores = [];
  }
  templates = glob.globSync(templates_dir + "/*");
  for (_i = 0, _len = templates.length; _i < _len; _i++) {
    template = templates[_i];
    for (_j = 0, _len2 = ignores.length; _j < _len2; _j++) {
      ignore = ignores[_j];
      if (template === path.join(templates_dir, ignore)) {
        delete templates[template];
      }
    }
  }
  return templates;
};
module.exports = {
  browserijade: browserijade,
  preCompile: preCompile
};