# Browserijade
# (c) 2011 David Ed Mellum
# Browserijade may be freely distributed under the MIT license.

window.jade = require "./runtime"

# Render a pre-compiled Jade template in a self-executing closure.
renderString = (template)->
	eval template

renderFile = (path, locals)->
	locals ?= {}
	path = "/#{path}.jade"
	template = require path
	template locals

module.exports = {
	renderString
	renderFile
}