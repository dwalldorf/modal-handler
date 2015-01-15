module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('karma');

    var appDir = 'app';

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            // constants
            app: {
                appDir: appDir,
                distDir: 'dist',
                lessDir: appDir + '/static/less'
            },

            // Testing and jshint
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                files: [
                    '<%= app.appDir %>/src/app_components/**/*.js'
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

            // development related
            connect: {
                options: {
                    port: 8900,
                    hostname: '0.0.0.0'
                },
                proxies: {
                    context: '/api',
                    host: 'localhost',
                    port: 3000,
                    https: false,
                    changeOrigin: true,
                    xforward: false
                },
                app: {
                    options: {
                        base: ['<%= app.appDir %>'],
                        open: true,
                        livereload: 35730
                    }
                },
                dist: {
                    options: {
                        base: ['<%= app.distDir %>'],
                        open: true,
                        livereload: 35730
                    }
                }
            },
            watch: {
                html: {
                    files: ['<%= app.appDir %>/**/*.html'],
                    options: {
                        livereload: 35730
                    }
                },
                less: {
                    files: '<%= app.appDir %>/static/less/**/*.less',
                    tasks: ['less'],
                    options: {
                        livereload: 35730
                    }
                },
                i18n: {
                    files: '<%= app.appDir %>/static/i18n/*.json',
                    options: {
                        livereload: 35730
                    }
                },
                jshint: {
                    files: ['<%= app.appDir %>/**/*.js', 'Gruntfile.js', '.jshintrc'],
                    tasks: ['jshint'],
                    options: {
                        livereload: 35730
                    }
                }
            },

            // build process
            clean: {
                app: {
                    dot: true,
                    src: ['.tmp']
                },
                dist: {
                    dot: true,
                    src: 'dist'
                }
            },
            bowerInstall: {
                app: {
                    src: ['app/index.html']
                }
            },
            less: {
                compileDev: {
                    options: {
                        strictMath: true
                    },
                    src: '<%= app.lessDir %>/base.less',
                    dest: '<%= app.lessDir %>/.tmp/base.css'
                }
            },
            copy: {
                components: {
                    files: [
                        {
                            expand: true,
                            dot: true,
                            cwd: '<%= app.appDir %>',
                            dest: '<%= app.distDir %>',
                            src: [
                                '**/*.html',
                                'static/**/locale-*.json',
                                '!src/bower_components/**/*',
                                '!**/*.js',
                                '!**/*.css'
                            ]
                        }
                    ]
                },
                bootstrapFonts: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= app.appDir %>/src/bower_components/bootstrap/fonts',
                            dest: '<%= app.appDir %>/static/less/fonts',
                            src: [
                                's*.ttf',
                                '*.woff'
                            ]
                        }
                    ]
                }
            },
            useminPrepare: {
                html: '<%= app.appDir %>/index.html'
            },
            usemin: {
                html: ['<%= app.distDir %>/index.html']
            },
            htmlmin: {
                dist: {
                    options: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeCommentsFromCDATA: true,
                        removeOptionalTags: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= app.distDir %>',
                            src: ['**/*.html'],
                            dest: '<%= app.distDir %>'
                        }
                    ]
                }
            },
            rev: {
                files: {
                    src: ['<%= app.distDir %>/css/*.css']
                }
            }
        }
    );

    grunt.registerTask('test', ['karma:app']);
    grunt.registerTask('testDriven', ['karma:testDriven']);

    grunt.registerTask('less-compile', ['less:compileDev']);

    grunt.registerTask('prepare', ['bowerInstall', 'less', 'configureProxies:server']);
    grunt.registerTask('serve', ['clean:app', 'prepare', 'copy:bootstrapFonts', 'jshint', 'connect:app', 'watch']);
    grunt.registerTask('serveDist', ['build', 'connect:dist:keepalive']);
    grunt.registerTask('build', [
        //'test',
        'jshint',
        'clean',
        'copy:components',
        'less',
        'bowerInstall',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
        'htmlmin'
    ]);
};