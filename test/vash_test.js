'use strict';

var grunt = require('grunt');
var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.vash = {
    compile: function (test) {

        test.expect(1);

        var actual = read('tmp/vash.html');
        var expected = read('test/expected/vash.html');
        test.equal(expected, actual, 'should compile vash templates to html');


        test.done();
    }
};
