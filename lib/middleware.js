var cacheRuntime, fs, getTemplates, glob, jade, jadeHandler, path;
path = require("path");
fs = require("fs");
glob = require("glob");
jade = require("jade");
module.exports = function(templates_dir, ignores) {
  var templates;
  cacheRuntime();
  templates = getTemplates(templates_dir, ignores);
  return function(bundle) {
    bundle.register(".jade", jadeHandler);
    return bundle.require(templates);
  };
};
cacheRuntime = function() {
  var jade_path, jade_runtime_path, runtime;
  jade_path = require.resolve("jade");
  jade_runtime_path = path.join(jade_path, "../lib/runtime.js");
  runtime = fs.readFileSync(path);
  return fs.writeFileSync(__dirname + "/runtime.js", runtime);
};
jadeHandler = function(body) {
  var compiled;
  compiled = jade.compile(body, {
    client: true
  }).toString();
  return "module.exports = " + compiled;
};
getTemplates = function(templates_dir, ignores) {
  var ignore, template, template_files, templates, _i, _j, _len, _len2;
  templates_dir = path.normalize(templates_dir);
  if (ignores == null) {
    ignores = [];
  }
  template_files = glob.globSync(templates_dir + "/*");
  templates = [];
  for (_i = 0, _len = template_files.length; _i < _len; _i++) {
    template = template_files[_i];
    for (_j = 0, _len2 = ignores.length; _j < _len2; _j++) {
      ignore = ignores[_j];
      if (template !== path.join(templates_dir, ignore)) {
        templates.push(template);
      }
    }
  }
  return templates;
};