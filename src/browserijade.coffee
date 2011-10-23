# Browserijade
# (c) 2011 David Ed Mellum
# Browserijade may be freely distributed under the MIT license.

jade = require "./runtime"

# Render a pre-compiled Jade template in a self-executing closure.
renderString = (template)->
	eval template

renderFile = (path)->
	path = "/#{path}.jade"
	template = require path
	renderString template

module.exports = {
	renderString
	renderFile
}