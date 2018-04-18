(function(){

    // invalidate for unsupported browsers
    var isIE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null ? parseFloat( RegExp.$1 ) : false;
    if (isIE&&isIE<9) {return;} // return if SVG API is not supported

    // polygon morph
    var morphTween21 = KUTE.fromTo('#polygon3', { path: '#polygon3' }, { path: '#polygon2' }, {
        duration: 2000, easing: 'easingCubicOut',
    }); 
    var morphTween22 = KUTE.fromTo('#polygon3', { path: '#polygon2' }, { path: '#polygon1' }, {
        delay: 500, duration: 2000, easing: 'easingCubicOut'
    }); 
    var morphTween23 = KUTE.fromTo('#polygon3', { path: '#polygon1' }, { path: '#polygon5' }, {
        delay: 500, duration: 2000, easing: 'easingCubicOut'
    });
    var morphTween24 = KUTE.fromTo('#polygon3', { path: '#polygon5' }, { path: '#polygon4' }, {
        delay: 500, duration: 2000, easing: 'easingCubicOut'
    });
    var morphTween25 = KUTE.fromTo('#polygon3', { path: '#polygon4' }, { path: '#polygon3' }, {
        delay: 500, duration: 2000, easing: 'easingCubicOut'
    });
    var morphTween26 = KUTE.fromTo('#polygon3', { path: '#polygon3' }, { path: '#polygon6' }, {
        delay: 500, duration: 2000, easing: 'easingCubicOut'
    });

    morphTween21.chain(morphTween22);
    morphTween22.chain(morphTween23);
    morphTween23.chain(morphTween24);
    morphTween24.chain(morphTween25);
    morphTween25.chain(morphTween26);
    morphTween26.chain(morphTween21);

    morphTween21.start(); morphTween21._dl = 100;

}())