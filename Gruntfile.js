/*
 * grunt-vash
 *
 * Copyright (c) 2015 Moshe Atlow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
              'Gruntfile.js',
              'tasks/**/*.js',
              '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            test: ['tmp']
        },

        // Configuration to be run (and then tested).
        vash: {
            compile: {
                files: {
                    'test/fixtures/unit.vash': {
                        dest: 'tmp/vash.html',
                        model: {
                            theme: 'theme1', dir: 'test/fixtures/'
                        }
                    },
                }
            },
        },


        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // By default, lint and run all tests.

    grunt.registerTask('test', ['jshint', 'vash', 'nodeunit', 'clean']);

    grunt.registerTask('default', ['test']);

};
