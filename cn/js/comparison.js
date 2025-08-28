(function($) {
   var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave',
                duration: 1500,
                offset: 93
            }
        });

    // build scenes
    new ScrollMagic.Scene({triggerElement: ".section-compare"})
                    .setClassToggle(".menu-bottom", "active") // add class toggle
                    .addTo(controller);


    $(document).ready(function() {

    });



})(jQuery);