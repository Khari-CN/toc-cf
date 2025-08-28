// (function($) {
//      var wow = new WOW({
//             boxClass: 'wow', // animated element css class (default is wow)
//             animateClass: 'animated', // animation css class (default is animated)
//             offset: 0, // distance to the element when triggering the animation (default is 0)
//             mobile: true, // trigger animations on mobile devices (default is true)
//             live: true, // act on asynchronously loaded content (default is true)
//             callback: function(box) {
//                 // the callback is fired every time an animation is started
//                 // the argument that is passed in is the DOM node being animated
//             },
//             scrollContainer: null // optional scroll container selector, otherwise use window
//         });
//
//     $(document).ready(function() {
//         wow.init();
//     });
//
//
//
// })(jQuery);

// $(document).ready(function(){
//     var $li = $('.operation_procedure .procedure li');
//     $li.hover(function(){
//         var $this = $(this);
//         $li.find('.operation_procedure .procedure li').removeClass('spbg');
//         $this.addClass('spbg').siblings().removeClass('spbg');
//     });
// });
$(function(){
    window.onload = function()
    {
        var $li = $('.tool .procedure2 li');
        $li.hover(function(){
            var $this = $(this);
            $li.find('.tool .procedure2 li').removeClass('spShand');
            $this.addClass('spShand').siblings().removeClass('spShand');
        })
    };

    $(".bt3 a").mouseenter(function(){
        $(".er").stop().fadeIn();
    });

    $(".bt3 a").mouseleave(function(){
        $(".er").stop().fadeOut();
    });

    $("#a_open").click(function(){
        $("#commonLayoutBox").slideDown("fast");
        $(".open_big").slideDown("fast");


    });
    $(".open_close").click(function(){
        $("#commonLayoutBox").slideUp();
        $(".open_big").slideUp();
    });

    $("#a_openmobile").click(function(){
        $("#commonLayoutBox").slideDown("fast");
        $(".open_big").slideDown("fast");


    });
    $(".open_close").click(function(){
        $("#commonLayoutBox").slideUp();
        $(".open_big").slideUp();
    });
});