# Browserijade
# (c) 2011 David Ed Mellum
# Browserijade may be freely distributed under the MIT license.

path = require 'path'
fs = require 'fs'

glob = require 'glob'
jade = require 'jade'

# Export a function that returns the actual middleware
# so we can take some arguments.
browserijade = (templates_dir, ignores)->
	cacheRuntime()

	templates = getTemplates(templates_dir, ignores)

	return (bundle)->
		bundle.register '.jade', preCompile
		bundle.require templates

# Cache the light-weight runtime in `__dirname` to help
# Browserify find it.
cacheRuntime = ->
	jade_path = require.resolve('jade')
	runtime_path = path.join(jade_path, '../lib/runtime.js')

	runtime = fs.readFileSync runtime_path, 'utf8'
	fs.writeFileSync __dirname + '/runtime.js', runtime

# Take a Jade file, pre-compile it, then make sure
# it's getting exported so it'll be require-able from
# Browserify.
preCompile = (body)->
	compiled = jade.compile(body, client: true).toString()
	return "module.exports = #{compiled}"

# Return all Jade templates in `templates_dir` that doesn't
# have a file name that's in `ignores`.
getTemplates = (templates_dir, ignores)->
	templates_dir = path.normalize templates_dir
	ignores ?= []

	templates = glob.globSync(templates_dir + '/*')
	for template in templates
		for ignore in ignores
			if template == path.join templates_dir, ignore
				delete templates[template]
	return templates

module.exports = {
	browserijade
	preCompile 
}