(function($) {

    // Function to run sliders on the Manual Page
    function runSlider() {
        // $('.flexslider').removeData("flexslider");
        $('.flexslider').flexslider({
            slideshow: false,
            animation: "fade",
            animationLoop: false,
            directionNav: true,
            slideshowSpeed: 0,
            animationSpeed: 0,
            pauseOnAction: false,
            pauseOnHover: false,
            controlNav: false,
            keyboard: false,
            multipleKeyboard: false,
            prevText: "",
            nextText: "",
            touch: false,
            start: function(slider) {
                $('body').removeClass('loading');
            },
			end:function(){
			},
			after: function (slider) {
				console.log(slider)
				if(slider.slides.eq(0).hasClass("flex-active-slide")){
					console.log(00000)
				}
			}

        });
    }
    // Function to plays next sliders on click event
    function clickNextslide(){
        $('.slides li img').click(function(event){
            if($(this).parent().is(':last-child')){
                return false;
            }else{
                $(this).closest('.slides').next().find('.flex-next').click();
            }  
                      
        });
    }
    // Function click tabs
    function clickTabs(idTab) {
        $(idTab +" li").click(function(event) {            
            $( ".flex-direction-nav" ).remove();
            $('.flexslider').removeData("flexslider");
            runSlider();
            $(".flex-next").attr("href","javascript:void(0)") 
            $(".flex-prev").attr("href","javascript:void(0)")  
            var index = $(this).index();
            event.preventDefault();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var subLinkTab = $(this).closest(idTab).next().find(".tab-links");
            var subContTab = $(this).closest(idTab).next().find(".tab-contents");
            subLinkTab.children("li:first-child").addClass('active');
            subLinkTab.children("li:first-child").siblings().removeClass('active');
            subContTab.children("li:first-child").show();
            subContTab.children("li:first-child").siblings().hide();
            var z = $(this).closest(idTab).next().children('li').eq(index);
            z.fadeIn(350, "swing");
            z.siblings().removeClass('show').hide();
        });
    }
    // Function to calculate the value persent on the progress bar
    function progressBar(id){
        var barSum = $(id+' li').length;
        for (var i = 0; i < barSum; i++) {
            var barWith = (100/barSum)*(i+1);
            $(id+ ' .progress').eq(i).width(barWith+"%")
        }
    }
    // Call progressBar function
    function calcProgressBar(){
        for (var i = 1; i <= 8; i++) {
            progressBar('#slide'+i);
        }
    }
    /**
     * START - ONLOAD - JS
     */
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */


    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function($) {
        runSlider();
        $(".flex-next").attr("href","javascript:void(0)")
        $(".flex-prev").attr("href","javascript:void(0)")
        clickTabs(".tab-links");
        calcProgressBar();
        clickNextslide();
            
    });

    /* OnLoad Window */
    var init = function() {

    };
    window.onload = init;

})(jQuery);

$('.CFD-ios').hover(function () {
    $(".ios-CFD").show();
}, function () {
    $(".ios-CFD").hide();
});
$('.CFD-android').hover(function () {
    $(".android-CFD").show();
}, function () {
    $(".android-CFD").hide();
});

