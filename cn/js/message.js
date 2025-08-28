(function($) {
    //  Change color option slector
    function changeColor(){
        $('.nice-select li').click(function() {
                $(".current").css('color', '#333');
        });
    }
    //  Check informations of user
    function checkInfo() {
        var phone = $('#phone'),
            phoneErr = $('#phone-err'),
            name = $('#name'),
            nameErr = $('#name-err'),
            email = $('#email'),
            emailErr = $('#email-err');
            moreInfo = $('#more-info');
            desErr = $('#des-error');

        var emailYz = /^[a-z0-9-.]{1,30}@[a-z0-9-]{1,65}\.[a-z]{2,5}$/,
            phoneYz = /^\d{11}$/,
            nameYz = /^[\u4E00-\u9FA5A-Z\0]+$/;

        //  check name
        name.focusout(function() {
            if (nameYz.test(this.value)) {
                nameErr.hide();
            } else{
                nameErr.show();
            }
        });

        //  check phone
        phone.focusout(function() {
            if (phoneYz.test(this.value)) {
                phoneErr.hide();
            } else{
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
            } else{
                emailErr.show();
            }
        });
        // check description
        moreInfo.focusout(function() {
            if (moreInfo.val().length <= 500 && moreInfo.val().trim().length>=1) {
                desErr.hide();
            } else{
                desErr.show();
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
        $('#option').niceSelect();
        changeColor();
        checkInfo();
        checkNumber();
        
    });
    /* OnLoad Window */
    var init = function() {
    };
    window.onload = init;

})(jQuery);
