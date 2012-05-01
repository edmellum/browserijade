var vm = require('vm');
var assert = require('assert');

var browserify = require('browserify');
var browserijade = require('../');
var browserijade_client = require('../lib/browserijade');

// Create the bundle using browserijade to add our test views.
// Also require in a the client-side code manually so we don't
// have to `npm link` just to test.
var bundle = browserify();
bundle.use(browserijade(__dirname + '/views'));
bundle.require('./browserijade', {target: 'browserijade', basedir: './lib', root: '/'})
var src = bundle.bundle();

// Make sure this bundle isn't FUBAR.
assert.ok(typeof src === 'string');
assert.ok(src.length > 0);

// Setup a VM to run the bundle in.
var sandbox = { console : console, 'window': {} };
vm.runInNewContext(src, sandbox);

// Has the client-side code been required correctly?
assert.deepEqual(
    Object.keys(browserijade_client).sort(),
    Object.keys(sandbox.require('browserijade')).sort()
);

// Render the test page.
assert.equal(
    sandbox.require('browserijade')('test'),
    '<!DOCTYPE html><html lang=\"en\"><title>test</title></html><body><h1>Test</h1></body>'
);

// Render the test page.
assert.equal(
    sandbox.require('browserijade')('subfolder/subtest'),
    '<!DOCTYPE html><html lang=\"en\"><title>subtest</title></html><body><h1>Subtest</h1></body>'
);