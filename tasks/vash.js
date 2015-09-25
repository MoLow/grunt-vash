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


        var renderFile = function (origin, file, cb) {
            vash.renderFile(origin, file.model, function (a, output) {
                if (!output) {
                    grunt.verbose.writeln('Vash failed to compile "' + file.dest + '".');
                }
                else {
                    if (options.process && grunt.util.kindOf(options.process) === "function") {
                        output = options.process(output, file.dest);
                    }

                    grunt.file.write(file.dest, output);
                    grunt.verbose.writeln('File ' + chalk.cyan(file.dest) + ' created.');
                    cb();
                }
            });
        };



        async.each(files, function (f, cb) {
            var curr = f.orig.src[0];
            if (curr.model) {
                renderFile(f.dest, curr, cb);
            } else {
                async.each(curr, function (_curr, cb) {
                    renderFile(f.dest, _curr, cb);
                }, cb);
            }




        }, function () {
            grunt.log.ok(files.length + ' ' + grunt.util.pluralize(files.length, 'file/files') + ' created.');
            done();
        });


    });

};
