(function($) {
    function hoverButton() {
        $(".height-btn").hover(function() {
            /* Stuff to do when the mouse enters the element */
            $(this).addClass('active');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            $(this).removeClass('active');
        });
    }
    // Function to check age of customers
    function checkAge() {
        var error = $(".madlib-error");
        $("#age").focusout(function(event) {
            var age = $("#age").val();
            if (age && (age >= 18 && age <= 70)) {
                error.hide();
            } else {
                error.show();
            }
        });
    }

    function checkIncome() {
        var error = $(".income-error");
        $("#income").focusout(function(event) {
            if ($(this).val()) {
                error.hide();
            } else {
                error.show();
            }
        });
    }

    function goSubmit() {
        $('#get-result').click(function(e) {
            e.preventDefault();
            if (validate()) {
            	$.cookie('accessAssessment', 'true', { path: '/' });
                var url = "platform/assessment-result.html#/?age=" + $('#age').val() + '&income=' + $('#income').val().replace(/,/g, '') + '&risk=' + $('#job').val();
                window.location.href = url;
            }
        });
    }


    function validate() {
        if ($(".madlib-error").is(':visible') || $(".income-error").is(':visible')) {
            return false;
        }

        if (!$('#income').val() || !$('#age').val()) {
            if (!$('#income').val()) {
                $(".income-error").show();
            }
            if (!$('#age').val()) {
                $(".madlib-error").show();
            }
            return false;
        }
        return true;
    }

    // Function to check number
    function checkNumber() {

        $(".age").autoNumeric("init", {
            vMin: "0",
            vMax: 1000
        });
        $(".enter-income").autoNumeric("init", {
            vMin: "0",
            vMax: 999999999
        });
    }


    $(document).ready(function() {
        hoverButton();
        checkAge();
        checkNumber();
        checkIncome();
        goSubmit();
    });



})(jQuery);
