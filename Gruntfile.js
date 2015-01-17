module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('karma');

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            // constants
            app: {
                appDir: 'app',
                distDir: 'dist'
            },

            // Testing and jshint
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                files: [
                    '<%= app.appDir %>/src/**/*.js'
                ]
            },
            karma: {
                options: {
                    configFile: 'spec/karma.conf.js',
                },
                app: {
                    browsers: ['PhantomJS', 'Chrome', 'Firefox'],
                    reporters: [
                        'spec'
                    ]
                },
                testDriven: {
                    singleRun: false,
                    browsers: ['PhantomJS'],
                    reporters: [
                        'spec',
                        'html'
                    ]
                }
            },

            watch: {
                jshint: {
                    files: ['<%= app.appDir %>/src/**/*.js', 'Gruntfile.js', '.jshintrc'],
                    tasks: ['jshint'],
                    options: {
                        livereload: 35730
                    }
                }
            },

            // build process
            clean: {
                dist: {
                    dot: true,
                    src: 'dist'
                }
            },
            copy: {
                src: {
                    files: [
                        {
                            expand: true,
                            dot: true,
                            cwd: '<%= app.appDir %>',
                            dest: '<%= app.distDir %>',
                            src: [
                                'src/**/*.js'
                            ]
                        }
                    ]
                }
            },
            uglify: {
                options: {
                    compress: true
                },
                dist: {
                    files: {
                        '<%= app.distDir %>/app.min.js': ['app/src/app.js']
                    }
                }
            }
        }
    );

    grunt.registerTask('test', ['karma:app']);
    grunt.registerTask('testDriven', ['karma:testDriven']);
    grunt.registerTask('build', [
        //'test',
        //'jshint',
        'clean',
        'copy',
        'uglify'
    ]);
};