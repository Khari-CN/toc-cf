(function($) {
    function changeActive(){       
    	if(window.location.href.indexOf('active=tab') > 1) {
            var index = (window.location.href.split('active=tab')[1]).substring(0,1) - 1;
            $('#main-tabs li:eq(' + index + ')').click();    
        }    
    }

    // Click to change main Tabs
    function clickMaintabs(idTab) {
        var x = $(idTab);
        var y = x.find('li');
        $(y).click(function(event) {
            console.log(event)
            var index = $(this).index();
            index += 1;
            if (index !== 5) {
                event.preventDefault();
            }
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var z = $(this).closest(".tab-left").next().find($(".item" + index + "-details"));
            z.fadeIn(350, "swing").removeClass('hide');
            z.siblings().removeClass('show').hide();

        });
    }
    // Click to change child Tabs
    function clickChildtabs(idTab) {
        var x = $(idTab);
        var y = x.find('li');
        $(y).click(function(event) {
           
            var index = $(this).index();
            index += 1;
            $(".colllap-ex").html("全部展开<i class='fa fa-angle-up'></i>");
            var zz = $(this).closest('.bg-expand').next().find('.active');
            var xx = zz.find('.article-question');
            var yy = zz.find('.article-answer');
            xx.addClass('collapsed');
            yy.removeClass('in');
            yy.css({
                'height': '0',
            });
            event.preventDefault();
            $(this).siblings().removeClass('active-tab');
            $(this).addClass('active-tab');
            var z = $(this).closest(".bg-expand").next().find($(".tab" + index + "-details"));
            z.fadeIn(350, "swing").removeClass('hide').addClass('active');
            z.siblings().removeClass('show active').hide();

        });
    }

    // Click to change content of title, collapse or collapsed
    function showTabs(i) {
        $(".item" + i + "-details .colllap-ex").click(function() {
            var o = $(this).closest('.bg-expand').next().find('.active');
            var m = o.find('.article-question');
            var n = o.find('.article-answer');
            if ($(".item" + i + "-details .colllap-ex").text() == '全部展开') {
                if (m.hasClass('collapsed')) {
                    m.removeClass('collapsed');
                    n.addClass('in');
                    n.css({
                        'height': 'auto',
                    });

                }

            } else if ($(".item" + i + "-details .colllap-ex").text() == '全部关闭') {
                m.addClass('collapsed');
                n.removeClass('in');
                n.css({
                    'height': '0',
                });
            }

        });
        $(".item" + i + "-details .colllap-ex1").click(function() {
            var g = $(this).closest('.bg-expand').siblings();
            var h = g.find('.article-question');
            var j = g.find('.article-answer');
            if ($(".item" + i + "-details .colllap-ex1").text() == '全部展开') {
                if (h.hasClass('collapsed')) {
                    h.removeClass('collapsed');
                    j.addClass('in');
                    j.css({
                        'height': 'auto',
                    });
                }
            } else if ($(".item" + i + "-details .colllap-ex1").text() == '全部关闭') {
                h.addClass('collapsed');
                j.removeClass('in');
                j.css({
                    'height': '0',
                });
            }
        });

    }
    //  Toggle word
    function toggleWord(id) {
        $(id).click(function() {
            if ($(this).text() == "全部展开") {
                $(this).html("全部关闭<i class='fa fa-angle-down'></i>");
            } else {
                $(this).html("全部展开<i class='fa fa-angle-up'></i>");
            }
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
        
        clickMaintabs(".item-wrapper");
        clickChildtabs(".item-wrapper1");
        for (i = 1; i <= 4; i++) {
            showTabs(i);
        }

        toggleWord(".colllap-ex");
        toggleWord(".colllap-ex1");
        changeActive();
    });
})(jQuery);
