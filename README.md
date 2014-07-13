Liya  [![devDependency Status](https://david-dm.org/SerkanSipahi/skeleton.png)](https://david-dm.org/SerkanSipahi/skeleton#info=devDependencies)
===============

#### Skeleton, in progress

Idee: der user kann entscheiden ob das menu komplett ausfahren(dektop/tablet/mobile)/einfahren soll

todo: wenn data-sk-align nicht angegeben, dann
ist data-sk-align="default" default!

todo: man sollte auch statt top-nav=align-top, bottom-nav=align-bottom,
left-nav=align-left, right-nav=align-right auch nur outside angegeben werden
können. (funktioniert nicht richtig!, siehe element inspektor)

todo: wenn oben oder untere navigation nicht im quellcode, dann
passt sich die seite nicht an! lösung: wenn oben oder unte nicht angegeben,
dann linke/content/rechte navi z.B. attr=.sk-left-nav[data-top-nav-not-exists]

todo: menu Einstellungen: offcanvas, flyout, fadein
outside:offcanvas(ease-in-out), back:fadein(ease-out)

@todo: wenn: data-sk-align nicht angegeben dann ist es immer data-sk-align="default"

idee
==============
data-sk-height, data-sk-width

<div id="skeleton" data-sk-width="1024px">
    <div class="sk-top-nav" data-sk-height="50px" data-sk-align="top">
        =top=
    </div>
    <div class="sk-left-nav" data-sk-width="300px" data-sk-align="left">
        =left=
    </div>
    <div class="sk-content">
        =content=
    </div>
    <div class="sk-right-nav" data-sk-width="250px" data-sk-align="right">
        =right=
    </div>
    <div class="sk-bottom-nav" data-sk-height="300px" data-sk-align="bottom">
        =bottom=
    </div>
</div>
