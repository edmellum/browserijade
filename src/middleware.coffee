# Browserijade
# (c) 2011 David Ed Mellum
# Browserijade may be freely distributed under the MIT license.

path = require "path"
fs = require "fs"

glob = require "glob"
jade = require "jade"

# Export a function that returns the actual middleware
# so we can take some arguments.
module.exports = (templates_dir, ignores)->
	cacheRuntime()

	templates = getTemplates(templates_dir, ignores)

	return (bundle)->
		bundle.register ".jade", jadeHandler
		bundle.require templates

# Cache the light-weight runtime in `__dirname` to help
# Browserify find it.
cacheRuntime = ->
	jade_path = require.resolve("jade")
	jade_runtime_path = path.join(jade_path, "../lib/runtime.js")

	runtime = fs.readFileSync path
	fs.writeFileSync __dirname + "/runtime.js", runtime

# Take a Jade file, pre-compile it, then make sure
# it's getting exported so it'll be require-able from
# Browserify.
jadeHandler = (body)->
	compiled = jade.compile(body, client: true).toString()
	return "module.exports = #{compiled}"

# Return all Jade templates in `templates_dir` that doesn't
# have a file name that's in `ignores`.
getTemplates = (templates_dir, ignores)->
	templates_dir = path.normalize templates_dir
	ignores ?= []

	template_files = glob.globSync(templates_dir + "/*")
	templates = []
	for template in template_files
		for ignore in ignores
			if template != path.join templates_dir, ignore
				templates.push template
	return templates