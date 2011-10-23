# Browserijade
# (c) 2011 David Ed Mellum
# Browserijade may be freely distributed under the MIT license.

jade = require "./runtime"

# Simple wrapper to simplify rendering.
module.exports = (template)->
	eval template