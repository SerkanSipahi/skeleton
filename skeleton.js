
//hybridjs

var $ = null,
    utility = null;

(function(){

    // > useful functions
    // > write tests
    utility = {
        // > http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139
        rgbToHex : function(r, g, b) {
            var match = null;
            // > if we pass like this: 'rgb(255, 255, 255)'
            if(typeof(r)==='string' && (match = /rgb\((\d+), (\d+), (\d+)\)/ig.exec(r))){
                r=~~match[1], g=~~match[2], b=~~match[3];
            }
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
    };

    // > global error handling
    window.onerror = function errorHandler(message, url, line){
        console.log('onerror', arguments);
    };
    // > $for loop
    Window.prototype.for = function(callback){

        if (this === void 0 || this === null) { throw new TypeError(); }
        var t = Object(this),
            len = t.length >>> 0;

        if (typeof callback !== 'function') { throw new TypeError(); }
        for (var i = 0; i < len; i++){
            if (i in t){
                callback.call(t[i], i, t[i]);
            }
        }
    };

    // > $each loop
    Array.prototype.each =
    NodeList.prototype.each =
    HTMLCollection.prototype.each = function(callback){
        Window.prototype.for.call(this, callback);
    };

    // > $get(index)
    Array.prototype.get =
    NodeList.prototype.get =
    HTMLCollection.prototype.get = function(index){
        return this[index];
    };

    // > setter or getter .css()
    Element.prototype.css = function(attr, value){

        if(attr===void(0)) { throw { name : 'MissingArgument', message : 'Missing first Argument!' }; }

        var res = null, tmpAttr = attr;
        if((capital = /-([a-z])/g.exec(attr))){
            attr = attr.replace(capital[0], capital[1].toUpperCase());
        }
        if(attr && value){
            res = this; this.style[attr] = value;
        } else if(attr && !value){
            res = this.style[attr];
            if(res===''){
                res = window.getComputedStyle(this).getPropertyValue(tmpAttr);
            }
        }
        return res;
    };

    // > Remove Element from DomTree
    Element.prototype.remove = function(){
        this.parentNode.removeChild(this);
    };
    NodeList.prototype.remove =
    HTMLCollection.prototype.remove = function(){
        this.each(function(){ this.remove(); });
    };

    // > map querySelectorAll to $
    $ = document.querySelectorAll.bind(document);

    // > find children of Element
    Element.prototype.find = function(selector){
        return this.querySelectorAll(selector);
    };

}());

var Skeleton = (function(document, window, undefined){

    'use strict';

    // > private properties
    var _pluginPath        = '#skeleton',
        _$                 = null,
        _version           = '0.0.5',
        _public            = {},
        _namespaceAlias    = 'sk',
        _proToString       = Object.prototype.toString;

    // > bind queryselectorall to _$
    _$ = document.querySelectorAll.bind(document);

    // > constructor
    function Skeleton(pluginDest){

        this._ns         = '.sk';
        this._coreMenus  = [
            this._ns+'-top-nav',
            this._ns+'-left-nav',
            this._ns+'-right-nav',
            this._ns+'-bottom-nav'
        ];
        this._customMenus = null;

        this.skNavs     = null;
        this.skContent  = null;
        this.skLeft     = null;
        this.skRight    = null;
        this.skTop      = null;
        this.skBottom   = null;

        this.pluginDest = pluginDest;

        this.element = _pluginPath+' ';

        // > check if element exists etc
        // make some checks here...

        this.init();
    }

    // > public methods
    Skeleton.prototype = {


        // >> public methods

        init : function(){
            this._createContentDatasets();
            /////////////////////////////
            this._saveCustomMenus();
            this._removeCustomMenusFromDomTree();
            this._addPreparedCustomMenusToDom();

            console.log(this._customMenus);

        },

        // >> private methods
        /*
         * Liefert alle Custom-Menus zurück
         *
         * e.g. left.positions = positions der core navigation
         *
         * Object = {
         *    left   : {
         *      positions : [ left, right, top, bottom ],
         *      customMenus  : [ domObject, domObject, domObject ]
         *    }
         *    right   : {
         *      positions : [ left, right, top, bottom ],
         *      customMenus  : [ domObject, domObject, domObject ]
         *    }
         *    top    : ...
         *    bottom : ...
         * }
         *
         * >> read operation
         *
         **/
        _getCustomMenus : function(){

            var tmpContainer = {}, $element = null, $customMenus = null,
                positionCirle = ['top', 'right', 'bottom', 'left'];

            this._coreMenus.each(function(key, element){
                $element = $(element).get(0);
                $customMenus = $element.find('.sk-custom-menu');

                if($customMenus.length){
                    element = element.replace(/(\.sk-)(.*?)(-nav)/gi, function(match, p1,p2,p3){
                        if(p1||p3) {return p2;}
                    });
                    if(!tmpContainer[element]){
                        tmpContainer[element] = {};
                        tmpContainer[element].positions = [];
                        tmpContainer[element].customMenus  = [];
                    }
                    positionCirle.each(function(key, value){
                        tmpContainer[element].positions.push(
                            $element.css(value)
                        );
                    });
                    $customMenus.each(function(){
                        tmpContainer[element].customMenus.push(this);
                    });
                }
            });

            return tmpContainer;
        },
        _saveCustomMenus : function(){
            this._customMenus = this._getCustomMenus();
        },
        /*
         * Die Custom-Menüs innerhalb der Core-Navigation können entfernt werden, weil
         * wir Sie(domNodes) bereits mit _initCustomMenus in einem Object gespeichert werden!
         *
         * >> read/write operation
         **/
        _removeCustomMenusFromDomTree : function(){
            this._coreMenus.each(function(key, element){
                $(element).get(0).find('.sk-custom-menu').remove();
            });
        },
        _addPreparedCustomMenusToDom : function(){

        },
        /************************************************/

        /*
         * @todo: Documentation
         * @todo: move this method to privates
         **/
        _createContentDatasets : function(){

            var skNavs       = _$(this.element+' [data-sk-align]'),
                skContent    = _$(this.element+' .sk-content'),
                skLeft       = _$(this.element+' .sk-left-nav'),
                skRight      = _$(this.element+' .sk-right-nav'),
                skTop        = _$(this.element+' .sk-top-nav'),
                skBottom     = _$(this.element+' .sk-bottom-nav'),
                navContainer = [skTop[0], skBottom[0], skLeft[0], skRight[0]],
                navName      = null,
                skOptValue   = null,
                res          = null;


            // wenn nichts angegeben dann auf data-sk-align="default setzen"
            // funktionisert nur wenn sieh unten functionen einen freshen domnode(sk-navs ziehen)

            for(var n=0; n<4; n++){
                res = navContainer[n].getAttribute('data-sk-align');
                if(res===null){
                    //navContainer[n].setAttribute('data-sk-align', 'default');
                }
            }

            // > get all(left,right,top,bottom) algin settings and
            // add them sk-content e.g. data-sk-top-opt="back"
            for(var i= 0, outerLength=skNavs.length;i<outerLength;i++){
                skOptValue = skNavs[i].getAttribute('data-sk-align');
                navName = /sk-(.*)-nav/.exec(skNavs[i].className)[1];
                skContent[0].setAttribute(
                    'data-sk-'+navName+'-opt',
                    skOptValue
                );
            }

            // *** relatedTo->(1) skeleton.scss ***
            // > e.g. for left
            // if top or bottom has top/back/front/bottom on align
            // we add left and right navi this(see below) attributes

            // .sk-left-nav[data-sk-top-opt="top"]    { top : 0; }
            // .sk-left-nav[data-sk-top-opt="back"]   { top : 0; }
            // .sk-left-nav[data-sk-top-opt="bottom"] { top : 0; }

            var element   = null,
                container = [[skTop[0]||[],'top'], [skBottom[0]||[],'bottom']];

            if(skTop.length || skBottom.length){
                for(var x=0,length=container.length;x<length;x++){
                    // > if we havent top or bottom nav, continue;
                    if(container[x][0].length===0) { continue; }

                    res = container[x][0].getAttribute('data-sk-align');
                    if(/top|back|front|bottom/.test(res)){
                        skLeft[0].setAttribute('data-sk-'+container[x][1]+'-opt', res);
                        skRight[0].setAttribute('data-sk-'+container[x][1]+'-opt', res);
                    }
                }
            }

            // *** relatedTo->(2) skeleton.scss ***

            // create float-contents
            var floatSettingContainer = [], align;
            for(var z = 0, zLength=[skLeft, skRight].length;z<zLength;z++){
                res   = [skLeft[0], skRight[0]][z].getAttribute('data-sk-float');
                align = [skLeft[0], skRight[0]][z].getAttribute('data-sk-align');
                if(res==='' && /default|static/.test(align)){
                    floatSettingContainer.push( z===0 ? 'left' : 'right');
                }
            }

            if(floatSettingContainer.length){
                skTop[0].setAttribute('data-sk-opt-float', floatSettingContainer.join(','));
                skBottom[0].setAttribute('data-sk-opt-float', floatSettingContainer.join(','));
            }

            // wenn top-navi oder bottom-navi default ist und linke oder rechte navi static,
            // dann muss linker/rechter navi top:0, bottom:0 gesetzt werden

            // hat top default wert? wenn ja schaue ob linke oder rechte navi static haben!
            // wenn ja, .sk-left-nav[data-sk-top-opt="default"] usw.

            var alignTop    = skTop[0].getAttribute('data-sk-align'),
                alignBottom = skBottom[0].getAttribute('data-sk-align'),
                alignLeft   = skLeft[0].getAttribute('data-sk-align'),
                alignRight  = skRight[0].getAttribute('data-sk-align');

            if(alignTop==='default'){
                if(alignLeft==='static'){
                    skLeft[0].setAttribute('data-sk-top-opt', 'default');
                }
                if(alignRight==='static'){
                    skRight[0].setAttribute('data-sk-top-opt', 'default');
                }
            }
            if(alignBottom==='default'){
                if(alignLeft==='static'){
                    skLeft[0].setAttribute('data-sk-bottom-opt', 'default');
                }
                if(alignRight==='static'){
                    skRight[0].setAttribute('data-sk-bottom-opt', 'default');
                }
            }



        }
    };

    return Skeleton;

}(document, this, void(0)));