var Skeleton = (function(document, window, undefined){

    'use strict';

    // > feature detecting
    var _feature = {
        querySelectorAll : !!document.querySelectorAll,
        functionBind     : !!Function.prototype.bind
    };

    // > private properties
    var _$                 = null,
        _version           = '0.0.5',
        _public            = {},
        _namespaceAlias    = 'sk',
        _proToString       = Object.prototype.toString;

    // > private methods
    var _initQuerySelector = function(){

        if(_feature.querySelectorAll && _feature.functionBind){
            _$ = document.querySelectorAll.bind(document);
        } else {
            // > simulate querySelectorAll for ie7, ie8
            var s = d.createStyleSheet();
            d.querySelectorAll = function(r, c, i, j, a) {
                a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i=r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j=a.length; j--;) { a[j].currentStyle.k && c.push(a[j]); }
                    s.removeRule(0);
                }
                return c;
            };
            // > simulate functionBind for ie7, ie8
            Function.prototype.bind = function (oThis) {
                if (typeof this !== 'function') {
                    throw { name:'TypeError', message:'Function.prototype.bind - what is trying to be bound is not callable'};
                }
                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
            _$ = document.querySelectorAll.bind(document);
        }
    };

    // > constructor
    function Skeleton(element){
        // > internals
        _public = this;
        this.element = element+' ';
        _initQuerySelector();

        // > check if element exists etc
        // make some checks here...

        // > skeleton core
        this.createContentDatasets();
    }

    // > public properties
    _public.a = null;
    _public.b = null;

    // > public methods
    Skeleton.prototype = {

        /*
         * > this function build something like that
         *   and add to to .${_namespaceAlias}-content
         * *******************************************
         * data-sk-top-opt="top"
         * data-sk-left-opt="default"
         * data-sk-right-opt="back"
         * data-sk-bottom-opt="back"
         **/
        createContentDatasets : function(){

            var skNavs    = _$(this.element+'[data-'+_namespaceAlias+'-align]'),
                skContent = _$(this.element+' .'+_namespaceAlias+'-content'),
                attributes, pattern = new RegExp('data-'+_namespaceAlias+'-align'),
                attributeName, navName, skOptValue;

            // > refactor this later e.g. helper methods Element.prototpye.attr()..
            for(var i= 0, outerLength=skNavs.length;i<outerLength;i++){
                attributes = skNavs[i].attributes;
                for(var f= 0, innerLength=attributes.length;f<innerLength;f++){
                    if(!pattern.test(attributes[f].name)) { continue; }
                        navName = /sk-(.*)-nav/.exec(skNavs[i].className)[1];
                        skOptValue = attributes[f].value;
                        skContent[0].setAttribute(
                            'data-'+_namespaceAlias+'-'+navName+'-opt',
                            skOptValue
                        );
                }
            }

        },
        openLeftNav : function(){

        },
        closeLeftNav : function(){

        },
        toggleLeftNav : function(){

        }
    };

    return Skeleton;

}(document, this, void(0)));