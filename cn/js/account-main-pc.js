var page = 0;
var pageNum = $('.pc-page').length;
$('.pc-l').click(function () {
    page--;
    $('.pc-r').show();
    if (page >= 0) {
        if (page == 0) {
            $('.pc-arrow').hide();
            rightBtnShow();
        }
        showPage();
    } else {
        page = 0;
    }
});

$('.pc-r').click(function () {
    $('.pc-l').show();
    page++;
    if (page < pageNum) {
        showPage();
    } else {
        page = pageNum - 1;
    }
});

//目录
$('.pc-list').each(function () {
    $('.pc-list li').click(function () {
        var num = $(this).index();
        lightList(num);
        $('.pc-arrow').show();
        switch (num) {
            case 0:
                page = 0;
                lightList(0);
                break;
            case 1:
                page = 1;
                lightList(1);
                break;
            case 2:
                page = 3;
                lightList(2);
                break;
        }
        showPage();
    });
});

function lightList(num) {
    $('.pc-list ul li').eq(num).addClass('cur').siblings("li").removeClass('cur');
}

rightBtnShow();

function showPage() {
    $('.pc-page').hide();
    switch (page) {
        case 0:
            $('.pc-page0').show();
            lightList(0);
            break;
        case 1:
            $('.pc-page1').show();
            lightList(1);
            break;
        case 2:
            $('.pc-page2').show();
            lightList(1);
            break;
        case 3:
            $('.pc-page3').show();
            lightList(2);
            break;
        case 4:
            $('.pc-page4').show();
            lightList(2);
            break;
        case 5:
            $('.pc-page5').show();
            lightList(2);
            $('.pc-r').hide();
            break;
    }
}

function rightBtnShow() {
    $('.pc-r').show();
}

/*app*/
var app_page = 0;
var app_pageNum = $('.app-page').length;
$('.app-l').click(function () {
    app_page--;
    $('.app-r').show();
    if (app_page >= 0) {
        if (app_page == 0) {
            $('.app-arrow').hide();
            app_rightBtnShow();
        }
        app_showPage();
    } else {
        app_page = 0;
    }
});

$('.app-r').click(function () {
    $('.app-l').show();
    app_page++;
    if (app_page < app_pageNum) {
        app_showPage();
    } else {
        app_page = app_pageNum - 1;
    }
});

//目录
$('.app-list').each(function () {
    $('.app-list li').click(function () {
        var app_num = $(this).index();
        app_lightList(app_num);
        $('.app-arrow').show();
        switch (app_num) {
            case 0:
                app_page = 0;
                app_lightList(0);
                break;
            case 1:
                app_page = 1;
                app_lightList(1);
                break;
            case 2:
                app_page = 2;
                app_lightList(2);
                break;
        }
        app_showPage();
    });
});

function app_lightList(app_num) {
    $('.app-list ul li').eq(app_num).addClass('cur').siblings("li").removeClass('cur');
}

app_rightBtnShow();

function app_showPage() {
    $('.app-page').hide();
    switch (app_page) {
        case 0:
            $('.app-page0').show();
            app_lightList(0);
            break;
        case 1:
            $('.app-page1').show();
            app_lightList(1);
            break;
        case 2:
            $('.app-page2').show();
            app_lightList(2);
            break;
        case 3:
            $('.app-page3').show();
            app_lightList(2);
            break;
        case 4:
            $('.app-page4').show();
            app_lightList(2);
            $('.app-r').hide();
            break;
    }
}

function app_rightBtnShow() {
    $('.app-r').show();
}

/*取款*/
var qu_page = 0;
var qu_pageNum = $('.qu-page').length;
$('.qu-l').click(function () {
    qu_page--;
    $('.qu-r').show();
    if (qu_page >= 0) {
        if (qu_page == 0) {
            $('.qu-arrow').hide();
            qu_rightBtnShow();
        }
        qu_showPage();
    } else {
        qu_page = 0;
    }
});

$('.qu-r').click(function () {
    $('.qu-l').show();
    qu_page++;
    if (qu_page < qu_pageNum) {
        qu_showPage();
    } else {
        qu_page = qu_pageNum - 1;
    }
});

//目录
$('.qu-list').each(function () {
    $('.qu-list li').click(function () {
        var qu_num = $(this).index();
        qu_lightList(qu_num);
        $('.qu-arrow').show();
        switch (qu_num) {
            case 0:
                qu_page = 0;
                qu_lightList(0);
                break;
            case 1:
                qu_page = 1;
                qu_lightList(1);
                break;
            case 2:
                qu_page = 3;
                qu_lightList(2);
                break;
        }
        qu_showPage();
    });
});

function qu_lightList(qu_num) {
    $('.qu-list ul li').eq(qu_num).addClass('cur').siblings("li").removeClass('cur');
}

qu_rightBtnShow();

function qu_showPage() {
    $('.qu-page').hide();
    switch (qu_page) {
        case 0:
            $('.qu-page0').show();
            qu_lightList(0);
            break;
        case 1:
            $('.qu-page1').show();
            qu_lightList(1);
            break;
        case 2:
            $('.qu-page2').show();
            qu_lightList(1);
            break;
        case 3:
            $('.qu-page3').show();
            qu_lightList(1);
            break;
        case 4:
            $('.qu-page4').show();
            qu_lightList(2);
            break;
        case 5:
            $('.qu-page5').show();
            qu_lightList(2);
            break;
        case 6:
            $('.qu-page6').show();
            qu_lightList(2);
            break;
        case 7:
            $('.qu-page7').show();
            qu_lightList(2);
            $('.qu-r').hide();
            break;
        /*case 8:
            $('.qu-page8').show();
            qu_lightList(2);
            break;*/
    }
}

function qu_rightBtnShow() {
    $('.qu-r').show();
}

/*App取款*/
var app_qu_page = 0;
var app_qu_pageNum = $('.app-qu-page').length;
$('.app-qu-l').click(function () {
    app_qu_page--;
    $('.app-qu-r').show();
    if (app_qu_page >= 0) {
        if (app_qu_page == 0) {
            $('.app-qu-arrow').hide();
            app_qu_rightBtnShow();
        }
        app_qu_showPage();
    } else {
        app_qu_page = 0;
    }
});

$('.app-qu-r').click(function () {
    $('.app-qu-l').show();
    app_qu_page++;
    if (app_qu_page < app_qu_pageNum) {
        app_qu_showPage();
    } else {
        app_qu_page = app_qu_pageNum - 1;
    }
});

//目录
$('.app-qu-list').each(function () {
    $('.app-qu-list li').click(function () {
        var app_qu_num = $(this).index();
        app_qu_lightList(app_qu_num);
        $('.app-qu-arrow').show();
        switch (app_qu_num) {
            case 0:
                app_qu_page = 0;
                app_qu_lightList(0);
                break;
            case 1:
                app_qu_page = 1;
                app_qu_lightList(1);
                break;
            case 2:
                app_qu_page = 3;
                app_qu_lightList(2);
                break;
        }
        app_qu_showPage();
    });
});

function app_qu_lightList(app_qu_num) {
    $('.app-qu-list ul li').eq(app_qu_num).addClass('cur').siblings("li").removeClass('cur');
}

app_qu_rightBtnShow();

function app_qu_showPage() {
    $('.app-qu-page').hide();
    switch (app_qu_page) {
        case 0:
            $('.app-qu-page0').show();
            app_qu_lightList(0);
            break;
        case 1:
            $('.app-qu-page1').show();
            app_qu_lightList(1);
            break;
        case 2:
            $('.app-qu-page2').show();
            app_qu_lightList(1);
            break;
        case 3:
            $('.app-qu-page3').show();
            app_qu_lightList(2);
            $('.app-qu-r').hide();
            break;
    }
}

function app_qu_rightBtnShow() {
    $('.app-qu-r').show();
}
