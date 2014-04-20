module.exports = function(grunt) {

    'use strict';

    var watch_files = [
        'Gruntfile.js',
        'karma.conf.js',
        'skeleton.js',
        'tests/*.js'
    ];

    grunt.initConfig({
        jshint: {
            files: watch_files,
            options: {
                expr:true,
                newcap: false,
                quotmark: 'single',
                validthis:true,
                loopfunc: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            }
        },
        'bower-install-simple': {
            options: {
                color: true,
                production:  false
            }
        },
        copy: {
            sass: {
                cwd : 'bower_components/bootstrap-sass-official/vendor/assets/stylesheets',
                src : '**',
                dest : 'vendor/scss',
                flatten : false,
                filter : 'isFile',
                expand: true
            }
        },
        concat: {
            classy: {
                files: {
                    'vendor/js/ready.js': 'bower_components/domready/ready.js'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'skeleton.css': 'scss/styles.scss',
                    './tests/results.css' : './tests/tests_conf.scss'
                }
            },
            options: {
                style: 'expanded'
            }
        },
        bootcamp: {
            test: {
                files: {
                    src: ['./tests/results.css']
                }
            }
        },
        clean : {
            bower : [
                '.sass-cache',
                'bower_components',
                'vendor/js/*.js',
                'vendor/scss/bootstrap',
                'vendor/scss/bootstrap.scss',
                'skeleton.css',
                'skeleton.min.css',
                'skeleton.min.js'
            ]
        },
        scsslint: {
            allFiles: [
                'scss/skeleton.scss'
            ],
            options: {
                config: '.scss-lint.yml'
            }
        },
        watch: {
            js : {
                files: watch_files,
                tasks: ['jshint'],
                options : {
                    livereload : true
                }
            },
            sass : {
                files: ['scss/*.scss', 'tests/*.scss'],
                tasks: ['sass'/*, 'scsslint'*/, 'bootcamp'],
                options : {
                    livereload : true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('bootcamp');

    grunt.registerTask('default', ['jshint', 'sass', /*'scsslint',*/ 'bootcamp', 'watch']);
    grunt.registerTask('bower', [
        'clean:bower',
        'bower-install-simple',
        'concat', 'copy'
    ]);
    grunt.registerTask('clear', ['clean:bower']);

};