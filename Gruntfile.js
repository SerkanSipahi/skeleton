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
                dest : 'libs/vendor/sass',
                flatten : false,
                filter : 'isFile',
                expand: true
            }
        },
        concat: {
            classy: {
                files: {
                    'libs/vendor/js/classy.js': 'bower_components/classy-bitcollage/classy.js'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'libs/css/skeleton.css': 'libs/sass/styles.scss'
                }
            }
        },
        clean : {
            bower : [
                'bower_components',
                'libs/vendor/js/*.js',
                'libs/vendor/sass'
            ]
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
                files: ['libs/sass/styles.scss'],
                tasks: ['sass', 'clean'],
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

    grunt.registerTask('default', ['jshint', 'sass', 'clean', 'watch']);
    grunt.registerTask('bower', [
        'clean:bower',
        'bower-install-simple',
        'concat', 'copy'
    ]);

};