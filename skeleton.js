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

        this.namespaces = 'sk';
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

        // > skeleton core
        this.createContentDatasets();
    }

    // > public methods
    Skeleton.prototype = {

        initNavigtions : function(){

        },
        /*
         * @todo: Documentation
         * @todo: move this method to privates
         **/
        createContentDatasets : function(){

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
            /*
            for(var n=0; n<4; n++){
                res = navContainer[n].getAttribute('data-sk-align');
                if(res===null){
                    navContainer[n].setAttribute('data-sk-align', 'default');
                }
            }
            */

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