(function($) {
    // Function to play video
    function playVideo() {
        $("#click").click(function() {
            $(".video").show();

        });
        $(".overlay").click(function() {
            $(".video").hide();

        });
    }
    // Function to run slide
    function runSlider() {
        $('.flexslider').flexslider({
            slideshow: true,
            animation: "fade",
            directionNav: false,
            slideshowSpeed: 7000,
            animationSpeed: 1500,
            // pauseOnAction: false,
            pauseOnHover: false,
            controlNav: true,
            start: function(slider) {
                $('body').removeClass('loading');
            }

        });
        $('.flex-control-nav li').on('mouseover', function() {
            $(".slides >li").finish();
            $(this).find('a').trigger('click');
            pauseOnAction: true;
        });
    }

    $(document).ready(function() {
        playVideo();
        runSlider();
    });



})(jQuery);
