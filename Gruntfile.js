(function () {
  'use strict';
  // this function is strict...
    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt);
        var timer = require('time-grunt')(grunt);
        // var app = require('./server/server');
        var path = require('path');
        var gi = grunt.file.read(path.join(__dirname, '.gitignore'),
            { encoding: 'utf8' });
        var re1 = /^#.*/gm, re2 = /^\n/gm;
        var ignoreFilesMattchingPatterns = gi.replace(re1, '', 'gm')
            .replace(re2, '', 'gm').split('\n');


        grunt.initConfig({
            jsonlint: {
                all:{
                    src: ['./*.json', './server/*.json', './common/models/*.json']
                }
            }, // https://github.com/brandonramirez/grunt-jsonlint
            json_schema: {}, // https://github.com/werk85/grunt-json-schema
            jshint: {
                options: {
                    reporter: require('jshint-stylish')
                },
                target: ['*.js', 'server/**/*.js', 'common/**/*.js']
            },
            env: {
                development : {
                    NODE_ENV : 'development',
                    DEST     : 'temp',
                },
                test: {
                    NODE_ENV : 'test',
                    DEST     : 'temp',
                },
            },
            'forever-monitor': {
                options:{
                    sourceDir: path.join(__dirname, 'server'),
                    index: 'server.js',
                    max: 3,
                },
                dev: {
                    options: {
                        watch: true,
                        watchIgnoreDotFiles: true,
                        watchIgnorePatterns: ignoreFilesMattchingPatterns,
                        watchDirectory: path.join(__dirname),
                        cwd: path.join(__dirname, 'runs', 'dev'),
                        pidFile: 'JasonRestsMongo.pid',
                        logFile: path.join(__dirname, 'runs', 'dev', 'forever.log'),
                        // path.join(__dirname, '..', 'runs', 'helloWorld.out.log'),
                        outFile: path.join(__dirname, 'runs', 'dev', 'JasonRestsMongo.out.log'),
                        errFile: path.join(__dirname, 'runs', 'dev', 'JasonRestsMongo.err.log'),
                        killTree: false,
                        append: false,
                    },
                },
            },
            forever: {
                dev: {
                    options: {
                        index: 'server/server.js',
                        logDir: 'logsZZ',
                        pidFile: 'dev.pid',
                        cwd: './runs/dev/'
                    }
                },
                test: {
                    options: {
                        index: 'otherindex.js',
                        logDir: 'logs'
                    }
                },
                e2e: {
                    options: {
                        index: 'otherindex.js',
                        logDir: 'logs'
                    }
                },
                prod: {
                    options: {
                        index: 'otherindex.js',
                        logDir: 'logs'
                    }
                }
            },
            mochaTest: {
                test: {
                    appInstance: '',
                    options: {
                    reporter:          'list',
                    captureFile:       './results.txt', // Optionally capture the reporter output to a file
                    quiet:             false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require  cache before running tests (defaults to false)
                    },
                    src:     ['test/*Test.js', 'test/**/*Test.js']
                }
            }
        });

        console.log('grunt ' + Object.keys(grunt));
        grunt.loadNpmTasks('grunt-forever-monitor');
        grunt.registerTask('validate', ['jsonlint', 'jshint']);
        grunt.registerTask('default', ['validate', 'forever-monitor:dev']);
    };
}());
