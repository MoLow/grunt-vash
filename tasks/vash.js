/*
 * grunt-vash
 *
 * Copyright (c) 2015 Moshe Atlow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var chalk = require('chalk');
    var vash = require('vash');
    var async = require('async');

    grunt.registerMultiTask('vash', 'Compile vash templates.', function () {
        var options = this.options({
        });
        var done = this.async();
        var files = this.files;

        async.each(files, function (f, cb) {

            var model = f.orig.src[0].model;
            
            vash.renderFile(f.dest, model, function (a, output) {
                if (!output) {
                    grunt.fail.warn('Vash failed to compile "' + f.dest + '".');
                }
                else {
                    if (options.process && grunt.util.kindOf(options.process) === "function") {
                        output = options.process(output, f.orig.src[0].dest);
                    }

                    grunt.file.write(f.orig.src[0].dest, output);
                    grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created.');
                    cb();
                }
            });

        }, function () {
            grunt.log.ok(files.length + ' ' + grunt.util.pluralize(files.length, 'file/files') + ' created.');
            done();
        });


    });

};
