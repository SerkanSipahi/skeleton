(function(window, undefined){

    'use strict';

    // > mapings
    Function.fn = Function.prototype;

    // > private properties
    var _version          = '0.0.4',
        _public           = {},
        _dataSetNamespace = 'sk',
        _defaults         = {
            // >
            core_main_wrapper : ['#skeleton', '1200px'],
            // >
            core_main_content_area : '.skeleton-content',
            // >
            core_main_menus : {
                left : {
                    '.skeleton-left-nav' : {
                        align : 'left',
                        move  : 'right',
                        type  : 'offcanvas',
                        with  : '300px',
                        bind : {
                            '.cumstom-nav-1' : {
                                align : 'left',
                                move : 'right',
                                type : 'offcanvas',
                                '@media (max-width: 320px)' : {
                                    align: 'right',
                                    move : 'right'
                                },
                                bind : {
                                    '.cumstom-nav-1-1' : {
                                        align : 'left',
                                        move : 'right',
                                        type : 'offcanvas'
                                    }
                                }
                            },
                            '.cumstom-nav-2' : {
                                align : 'left',
                                move : 'right',
                                type : 'offcanvas'
                            },
                            '.cumstom-nav-3' : {
                                align : 'left',
                                move : 'right',
                                type : 'offcanvas'
                            }
                        }
                    }
                },
                right : {
                    '.skeleton-right-nav' : {
                        align : 'back',
                        move  : 'left',
                        type  : 'offcanvas',
                        with  : '300px'
                    }
                },
                top : {
                    '.skeleton-top-nav' : {
                        align : 'top',
                        move  : 'down',
                        type  : 'flyout',
                        height: '50px'
                    }
                },
                bottom : {
                    '.skeleton-top-nav' : {
                        align : 'back',
                        move  : 'none',
                        type  : 'fade-in',
                        height : '100px'
                    }
                }
            },
            simple_menus : {
                'micro-menu-1' : {
                    related_to : '.some-div-box',
                    align : 'left',
                    move : 'right',
                    type : 'offcanvas'
                }
            }

        },
        _hasOwnProp  = Object.prototype.hasOwnProperty,
        _proToString = Object.prototype.toString;

    // > constructor
    var Skeleton = function(options){
        _public = this;

        this.extend(_defaults, options);
        this.init();
    };

    // > public properties
    _public.a = 'Hello';
    _public.b = 'World';

    // > public methods
    Skeleton.fn = {
        extend : function(child, parent){

        },
        init : function(){

        }
    };

}(this, void(0)));