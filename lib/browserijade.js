// Browserijade
// (c) 2011 David Ed Mellum
// Browserijade may be freely distributed under the MIT license.

jade = require('jade/lib/runtime');

// Render a jade file from an included folder in the Browserify
// bundle by a path local to the included templates folder.
var renderFile = function(path, locals) {
	locals = locals || {};
	path = path + '.jade';
	template = require(path);
	return template(locals);
}

// Render a pre-compiled Jade template in a self-executing closure.
var renderString = function(template) {
	return eval(template);
}

module.exports = renderFile;
module.exports.renderString = renderString;