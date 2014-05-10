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
                tasks: ['jshint', 'skeleton:until'],
                options : {
                    livereload : false
                }
            },
            sass : {
                files: ['scss/*.scss', 'tests/*.scss'],
                tasks: ['skeleton:until', 'sass'/*, 'scsslint'*/, 'bootcamp'],
                options : {
                    livereload : false
                }
            },
            html : {
                files: ['index.html'],
                tasks: ['skeleton:until', 'sass'/*, 'scsslint'*/, 'bootcamp'],
                options : {
                    livereload : false
                }
            }
        }
    });

    grunt.task.registerTask('skeleton', 'Skeleton Task', function(arg) {
        if (arguments.length === 0) {
            console.log(this.name + ', no args');
        } else {
            if(arg === 'until'){

                var $             = require('jquery-deferred'),
                    fs            = require('fs'),
                    index_html    = './index.html',
                    skeleton_scss = './scss/skeleton.scss',
                    skeleton_tmp  = './tmp/skeleton_tmp.scss',
                    pattern       = /sk-(left|top|bottom|right)-nav(?:.*?)data-sk-align="static:until\((\d+px)\)"/gm,
                    matched       = [],
                    sk_scss_data  = '',

                    error = function(name, message){
                        throw { name : name, message : message };
                    },
                    match = function(pattern, data, slice_start, slice_end){

                        var _dfd = new $.Deferred(),
                            match, container=[], tmpContainer=[];

                        while(match!==null){
                            match = pattern.exec(data);
                            if(match!==null){
                                tmpContainer=[];
                                for(var i= ( slice_start || 0 ), length=( slice_end || match.length ); i<length; i++){
                                    tmpContainer.push(match[i]);
                                }
                                container.push(tmpContainer);
                            }
                        }
                        _dfd.resolve(container);
                        return _dfd.promise();
                    },
                    readFile = function(filename, charset){

                        var _dfd = new $.Deferred(),
                            _charset = charset || 'utf8';

                        fs.readFile(filename, _charset, function(err, data) {
                            if(err) { _dfd.reject('FileNotFound', 'cant load [' + filename + '] file!'); }
                            _dfd.resolve(data);
                        });
                        return _dfd.promise();

                    },
                    writeFile = function(filename, data, chmod){

                        var _dfd    = new $.Deferred(),
                            _data  = data  || ' ',
                            _chmod = chmod || '0777';

                        fs.writeFile(filename, _data, function (err) {
                            if(err) { _dfd.reject('FileCouldNotWrite', 'cant write [' + filename + '] file!'); }
                            fs.chmod(filename, _chmod, function(){
                                _dfd.reject('PermissionDenied', 'cant set chmod [' + _chmod + ']');
                            });
                            _dfd.resolve(200);
                        });
                        return _dfd.promise();
                    };

                var tasks = $.when(writeFile(skeleton_tmp))
                    .then(function(){
                        return readFile(index_html);
                    })
                    .then(function(data){
                        return match(pattern, data, 1).done(function(data){
                            matched = data;
                        });
                    })
                    .then(function(){
                        return readFile(skeleton_scss).done(function(data){
                            sk_scss_data = data;
                        });
                    });

                tasks.done(function(){

                    var __skeleton_until_as_hash__,
                        tmpContainerHash=[];

                    if(matched.length===1){
                        __skeleton_until_as_hash__ = '('+matched[0].join(' ').replace(' ', ' : ')+')';
                    } else {
                        matched.forEach(function(element){
                            tmpContainerHash.push(element.join(' : '));
                        });
                        __skeleton_until_as_hash__ = '( '+tmpContainerHash.join(', ')+ ' )';
                    }

                    if(matched.length){
                        sk_scss_data = sk_scss_data.replace(/[^$](__skeleton-until-navs-as-hash__)/gmi, function(match, p1){
                            var res = '';
                            p1==='__skeleton-until-navs-as-hash__' ? res = __skeleton_until_as_hash__ : null;
                            return res;
                        });
                    }

                    writeFile('tmp/skeleton_tmp.scss', sk_scss_data).done(function(data){
                        console.log('Tasks finished!');
                    });

                }).fail(function(_error, _message){
                    error.call(null, _error, _message);
                });

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

    grunt.registerTask('default', ['jshint', 'skeleton:until', 'sass', /*'scsslint',*/ 'bootcamp', 'watch']);
    grunt.registerTask('bower', [
        'clean:bower',
        'bower-install-simple',
        'concat', 'copy'
    ]);
    grunt.registerTask('clear', ['clean:bower']);

};