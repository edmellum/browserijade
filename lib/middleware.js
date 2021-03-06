// Browserijade
// (c) 2011 David Ed Mellum
// Browserijade may be freely distributed under the MIT license.

var path = require('path');
var fs = require('fs');

var glob = require('glob');
var jade = require('jade');

// Export a function that returns the actual middleware
// so we can take some arguments.
var browserijade = module.exports = function(templates_dir, ignores, options) {
	var options = options || {};
	options.debug = options.debug || false;

	var runtime = getRuntime();
	var templates = getTemplates(templates_dir, ignores);

	return function(bundle) {
		bundle.register('.jade', function(body, fullPath) {
			return preCompile(body, fullPath, options.debug);
		});

		for(target in templates) {
			bundle.require(target, {target: templates[target]});
		};
	}
}

// Get the Jade light-weight runtime's path.
var getRuntime = function() {
	var jade_path = require.resolve('jade');
	return path.join(jade_path, '../lib/runtime.js');
}

// Take a Jade file, pre-compile it, then make sure
// it's getting exported so it'll be require-able from
// Browserify.
var preCompile = browserijade.preCompile = function(body, fullPath, debug) {
	compiled = jade.compile(body, {
		client: true,
		filename: fullPath,
		compileDebug: debug
	}).toString();
	
	return 'module.exports = ' + compiled;
}

// Return all Jade templates in `templates_dir` that doesn't
// have a file name that's in `ignores`.
var getTemplates = function(templates_dir, ignores) {
	templates_dir = path.normalize(templates_dir);
	ignores = ignores || [];

	var templates = {};

	// Glob needs Unix style forward slashed paths to work with.
	unixed_dir = unixifyPath(templates_dir);
	// Supply path to cwd. Speeds everything up and makes it not
	// break on Windows.
	var template_paths = glob.sync('**/*.jade', {cwd: unixed_dir});

	template_paths.forEach(function(template) {
		if(-1 == ignores.indexOf(path.basename(template))) {
			templates[path.join(templates_dir, template)] = template;
		}
	});

	return templates;
}

// Convert a Windows path to a Unix style path.
var unixifyPath = function(path) {
	if('C:\\' === path.substr(0, 3)) {
		return path.substr(2, path.length).replace(/\\/g, '/');
	} else {
		return path;
	}
}