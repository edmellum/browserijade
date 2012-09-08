var jade = require('browserijade');

jade('test');

// make the require function accessible from globals
window.require = require;
