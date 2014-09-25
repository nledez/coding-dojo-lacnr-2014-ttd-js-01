tests:
	@env NODE_ENV=test ./node_modules/mocha/bin/mocha test/* --reporter spec
