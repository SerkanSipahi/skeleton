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

            var skNavs     = _$(this.element+'[data-'+_namespaceAlias+'-align]'),
                skContent  = _$(this.element+' .'+_namespaceAlias+'-content'),
                skLeft     = _$(this.element+' .'+_namespaceAlias+'-left-nav'),
                skRight    = _$(this.element+' .'+_namespaceAlias+'-right-nav'),
                skTop      = _$(this.element+' .'+_namespaceAlias+'-top-nav'),
                skBottom   = _$(this.element+' .'+_namespaceAlias+'-bottom-nav'),
                navName    = null,
                skOptValue = null;


            // > get all(left,right,top,bottom) algin settings and
            // add them sk-content e.g. data-sk-top-opt="back"
            for(var i= 0, outerLength=skNavs.length;i<outerLength;i++){
                skOptValue = skNavs[i].getAttribute('data-'+_namespaceAlias+'-align');
                navName = /sk-(.*)-nav/.exec(skNavs[i].className)[1];
                skContent[0].setAttribute(
                    'data-'+_namespaceAlias+'-'+navName+'-opt',
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

            var res       = null,
                element   = null,
                container = [[skTop[0]||[],'top'], [skBottom[0]||[],'bottom']];

            if(skTop.length || skBottom.length){
                for(var x=0,length=container.length;x<length;x++){
                    // > if we havent top or bottom nav, continue;
                    if(container[x][0].length===0) { continue; }

                    res = container[x][0].getAttribute('data-'+_namespaceAlias+'-align');
                    if(/top|back|front|bottom/.test(res)){
                        skLeft[0].setAttribute('data-'+_namespaceAlias+'-'+container[x][1]+'-opt', res);
                        skRight[0].setAttribute('data-'+_namespaceAlias+'-'+container[x][1]+'-opt', res);
                    }
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