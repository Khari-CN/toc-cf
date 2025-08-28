(function($) {
    $(function() {
        $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#datepicker").datepicker($.datepicker.regional["zh-TW"]);
    });

    //  Check informations of user
    function checkInfo() {
        var phone = $('#phone'),
            phoneErr = $('#phone-err'),
            name = $('#name'),
            nameErr = $('#name-err'),
            email = $('#email'),
            emailErr = $('#email-err');

        var emailYz = /^[a-z0-9-.]{1,30}@[a-z0-9-]{1,65}\.[a-z]{2,5}$/,
            phoneYz = /^\d{11}$/,
            nameYz = /^[\u4E00-\u9FA5A-Z\0]+$/;

        //  check name
        name.focusout(function() {
            if (nameYz.test(this.value)) {
                nameErr.hide();
            } else {
                nameErr.show();
            }
        });

        //  check phone
        phone.focusout(function() {
            if (phoneYz.test(this.value)) {
                phoneErr.hide();
            } else {
                phoneErr.show();
            }
        });
        phone.focusin(function() {
            $(".area-code").css({
                "color": '#666',
            });
        });
        // check email
        email.focusout(function() {
            if (emailYz.test(this.value)) {
                emailErr.hide();
            } else {
                emailErr.show();
            }
        });
    }
    // Function to check number
    function checkNumber() {
        $("#phone").autoNumeric("init", {
            vMin: "0",
            vMax: 99999999999,
            aSep: ''
        });
    }

    $('.slides li').click(function() {
        var that = this;

        // remove active class
        $('.slides li a').removeClass('active');

        var index = $('.slides li').index(that);
        if (index > 6) {
            index = index - 7;
        }

        // add active class
        $(that).find('a').addClass('active');

    });
    // Function to select or disselect country flag
    function selectCountry(){
         $("#country-selector li").click(
            function() {
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                }
                else{
                    $(this).addClass('active');
                }
                // $(this).toggleClass("active");
            }
        );
    }
    // Function to select region country
    function selectRegionct(){
        $("#continent-selector li").click(
            function() {
                
                var territory = $(this).index();
                var country = $("#country-selector li");
                $(this).toggleClass("active");                
                switch (territory) {
                    case 0:                        
                        var asia = $("#country-selector li.asia");
                            if(!$(this).hasClass('active'))
                            {
                                asia.removeClass('active');
                            }
                            else{
                                asia.addClass('active');
                            }
                        break;
                    case 1:
                        var euro = $("#country-selector li.euro");
                        if(!$(this).hasClass('active'))
                            {
                                euro.removeClass('active');
                            }
                            else{
                                euro.addClass('active');
                            }
                        break;
                    case 2:
                        var america = $("#country-selector li.america");
                        if(!$(this).hasClass('active'))
                            {
                                america.removeClass('active');
                            }
                            else{
                                america.addClass('active');
                            }
                        break;
                }

            }

        );
    }
    // Function to turn on or of Stars
    function turnStars(){
        $("#star-selector li").click(
            function() {
                $(this).toggleClass("active");
            }

        );

    }

    // Function to select or dis select All
     function sellectAll() {
        var flag = 0;
        $("#selectall").click(function(event) {
            if (flag == 0){
                $(".news2_nr_bottom_box li").addClass('active');
                $(this).html("全部取消")
                flag = 1;

            }
            else{
                $(".news2_nr_bottom_box li").removeClass('active');
                $(this).html("全部选择")
                flag = 0;
            }
            /* Act on the event */
            
        });
    }

    /*====================CALL FUNCTIONS HERE=====================*/

    $(document).ready(function() {
        //country
        selectCountry();
        //area
        selectRegionct();
        //star
        turnStars();
        //select all
        sellectAll();
    });
    // silder timeline
    $(window).load(function() {
        checkInfo();
        checkNumber();
		/*
        $('.flexslider').flexslider({
            slideshow: false,
            animation: "slide",
            animationLoop: false,
            itemWidth: 150,
            itemMargin: 5,
            minItems: 7,
            maxItems: 7,
            move: 7,
            controlNav: false,
            start: function(slider) {
                $('body').removeClass('loading');
            }

        });
		*/
		

    });
	
	
	
	
})(jQuery);
