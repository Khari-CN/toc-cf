(function($) {

    function loadingPage(){
        setTimeout(function(){
            $('#spinner').hide();
            $('#assessment-pagewrap').show();
            //createChart("#chart-cirle", 70, 25, 5, "差价合约平台");           
        },

        3000);
    }
    // Function to change normal Tabs on section 1 Assessement page
    function platForm() {
        var i = 0;
        $('a.toggle-tab').click(function(e) {
            i = 1;
            if( i == 1 ){
                $('#right-ichart li').removeClass('fadeInUp');
            }
            $(this).closest('.item').hide();
            $(this).closest('.item').siblings('.item').fadeIn();
        });
    }

    // Function to run sliders on Home Page
    function runSlider() {
        $('.flexslider').flexslider({
            slideshow: false,
            animation: "fade",
            animationLoop: false,
            directionNav: false,
            slideshowSpeed: 0,
            animationSpeed: 0,
            pauseOnAction: false,
            pauseOnHover: false,
            controlNav: false,
            keyboard: false,
            start: function(slider) {
                $('body').removeClass('loading');
            }

        });
    }

    // Function to slide down

    function slideDown() {
        $('.cont-info li').click(function() {
            $(this).toggleClass('active');
            $(this).find('p').slideToggle(200);
            var sibClass = $(this).siblings();
            sibClass.find('p').slideUp(200);
            sibClass.delay(250).queue(function(next) {
                sibClass.removeClass('active').finish();
                next();
            });

        });
    }

    // Function to change scene on click
    function nextScene() {
        $('.next-scene').click(function() {
            $('.flexslider').flexslider('next');
            $(this).closest('li').next().find('.text-show').addClass('fadeInRight animated');
        });

    }

    // Function to create coundown Clock 
    var itemClock = [{ 'name': 'clock-cute', 'time': 12000 },{ 'name': 'count-down3s', 'time': 3 }];

    function timer(name, time) {
        var countDown = setInterval(function() {
            var days = Math.floor(time / 24 / 60 / 60);
            var hoursLeft = Math.floor((time) - (days * 86400));
            var hours = Math.floor(hoursLeft / 3600);
            var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
            var minutes = Math.floor(minutesLeft / 60);
            var remainingSeconds = time % 60;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }
            document.getElementById(name).innerHTML = '<span class="minute">' + minutes + ':</span><span class="seconds">' + remainingSeconds + '</span>';
            if (time == 0) {
                console.log($('.slides li:nth-child(2)'));
                if(!($('.slides li:nth-child(24)').hasClass('flex-active-slide'))){
                    $('.slides li:last-child').css({
                        'z-index': '2',
                        'opacity': '1'
                    });
                    $('.slides li:last-child').siblings().css({
                        'z-index': '1',
                        'opacity': '0'
                    });
                }
                clearInterval(countDown);
                $('#clock-cute').css('color', '#666');
                // console.log("cfd countdown running");
            } else {
                time--;
                // console.log("cfd countdown stoped");
            }

        }, 1000);
        $('#scene-finish').click(function() {
            enableScroll();
            clearInterval(countDown);
            $('#overlay-region').hide();
            $('.pcst-megamenu').show();
            $('.section2').css({
                position: 'relative',
                'z-index': '0'
            });
            
        });
        $('#quit-game').click(function() {
            enableScroll();
            $(this).hide();
            $('.flexslider').removeData("flexslider");
            runSlider();
            /* Act on the event */
            clearInterval(countDown);
            $('#start-clock,.cfd-step').css({
                display: 'block',
            });
            $('#overlay-region').hide();
            $('.pcst-megamenu').show();
            $('.section2').css({
                position: 'relative',
                'z-index': '0'
            });
            $('.section2 .title-recommend').css({
                top: '9%',
            });
            $('#clock-cute').css('color', '#cf8200');
             document.getElementById(name).innerHTML = '02:00';

        });
    }
    function countDown3s(name, time) {
        var countDown = setInterval(function() {
            $('#count-down3s').addClass('zoomIn animated');
            var days = Math.floor(time / 24 / 60 / 60);
            var hoursLeft = Math.floor((time) - (days * 86400));
            var hours = Math.floor(hoursLeft / 3600);
            var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
            var minutes = Math.floor(minutesLeft / 60);
            var remainingSeconds = time % 60;
            document.getElementById(name).innerHTML = '<span class="seconds">' + remainingSeconds + '</span>';

            if (time == 0) {
                clearInterval(countDown);                
                setTimeout(function(){
                    $("#quit-game").css({
                        display: 'block',
                    });
                    $('.flexslider').flexslider('next'); 
                    $('#count-down3s').css({
                        'display': 'none',
                        'z-index': 0
                    });
                    $('#count-down3s').removeClass('zoomIn animated');   
                    $('#count-down3s span').html('');
                },1000);
                // console.log("cfd countdown running");
            } else {
                time--;
                setTimeout(function(){
                $('#count-down3s').removeClass('zoomIn animated');
                },500);
                
                // console.log("cfd countdown stoped");
            }

        }, 1000);
        $('#overlay-region').click(function(event) {
            event.preventDefault();
        });
    }

    function startClock(name, time) {
        if (isNaN(time) == true) {
            console.log("Thời gian nhập vào không phải số");
            return false;

        } else {
            $('#start-clock').click(function() {

                disableScroll();
                $('#overlay-region').show();
                $('#count-down3s').css({
                    'display': 'block',
                    'z-index': 299
                });
                countDown3s(itemClock[1].name, itemClock[1].time);
                    $('#start-clock,.cfd-step').css({
                    display: 'none',
                    });
                $('.section2').css({
                    position: 'fixed',
                    bottom: '0',
                    width: '100%',
                    'z-index': '300'
                });
                $('.section2 .title-recommend').css({
                    top: '14%',
                });
                $('.pcst-megamenu').hide();
                setTimeout(function(){
                if($('#start-clock').hasClass('clock-ist'))
                {
                    time = 120 ;
                }
                else if($('#start-clock').hasClass('clock-strade')){
                    time = 60 ;
                }
                else if($('#start-clock').hasClass('clock-cfd')){
                    time = 120 ;
                      
                }
                timer(name, time);           
                    
                },4200);
                /* Act on the event */
                
            });
        }
    }
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
          window.onwheel = preventDefault; // modern standard
          window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
          window.ontouchmove  = preventDefault; // mobile
          document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.onmousewheel = document.onmousewheel = null; 
            window.onwheel = null; 
            window.ontouchmove = null;  
            document.onkeydown = null;  
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
        loadingPage();        
    });
    
    window.initAssessment = function() {
        platForm();
        runSlider();
        nextScene();
        startClock(itemClock[0].name, itemClock[0].time);
    };  

})(jQuery);
