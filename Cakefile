fs            = require "fs"
{print}       = require "sys"
{spawn, exec} = require "child_process"

spawnandlog = (command)->
	proc = exec command

	proc.stdout.on "data", (data)->
		print data.toString()
	proc.stderr.on "data", (data)->
		print data.toString()
	proc.on "exit", (code)->
		if code != 0
			print "Command exited with code: " + code
	
	proc

task "build", "Build the Coffee files.", ->
	spawnandlog "coffee -cb -o lib src"

task "watch", "Watch and rebuild the Coffee files.", ->
	spawnandlog "coffee -cwb -o lib src"

task "doc", "Regenerate Documentation", ->
	spawnandlog "docco src/middleware.coffee"
