var cfApp = angular.module('cfApp', []);
cfApp.controller('assessmentController', function($scope, $http, $location) {

    // don't allow access if cookie not exist
    if($.cookie("accessAssessment") == 'true') {
        $.cookie('accessAssessment', 'false', { path: '/' });
    } else {
        window.location.href = "/";
    }

    $scope.age = $location.search().age;
    $scope.income = $location.search().income;
    $scope.risk = $location.search().risk;
    $scope.invest = $location.search().invest;
    $scope.data;
    // $scope.flatform;
    var point = calculatePoint();
    // console.log( $location.search().income);
    // console.log($scope.income);
    // console.log($location.search());
    // console.log( $scope.age);
    // console.log(point);

    function calculatePoint() {
        return calculatePointByAge() + calculatPointByIncome() + calculatPointByRisk() + calculatePointByInvest() ;
    }
    function calculatePointByInvest() {
        var point = 0;
        if($scope.invest == "0-1") {
            point = 4;
        } else if ($scope.invest == "1-3") {
            point = 5;
        } else if ($scope.invest == "3-5") {
            point = 6;
        }else if ($scope.invest == "5-7") {
            point = 8;
        }else if ($scope.invest == "7年以上") {
            point = 10;
        }
        return point;

    }
    function calculatePointByAge() {
        var point = 0;
        if(18 <= $scope.age && $scope.age <= 25) {
            point = 6;
        } else if (26 <= $scope.age && $scope.age <= 40) {
            point = 10;
        } else if (41 <= $scope.age && $scope.age <= 50) {
            point = 8;
        } else if (51 <= $scope.age && $scope.age <= 60) {
            point = 5;
        }else if (61 <= $scope.age ) {
            point = 4;
        }
        return point;
    }

    function calculatPointByIncome() {
        var point = 0;
        if($scope.income == "5000以下") {
            point = 4;
        } else if ($scope.income == "1000-30000") {
            point = 5;
        } else if ($scope.income == "30000-100000") {
            point = 6;
        }else if ($scope.income == "100000以上") {
            point = 8;
        }else if( $scope.income == "5001-10000") {
            point = 10;
        }
        return point;
    }

    function calculatPointByRisk() {
        var point = 0;
        if($scope.risk == '低') {
            point = 4;
        } else if ($scope.risk == '中') {
            point = 8;
        } else if ($scope.risk == '高') {
            point = 10;
        }
        return point;
    }



    var html1 = [
      '<li class="fadeInUp" >适合初学者，入金门槛低至25美元</li>',
      '                                <li class="fadeInUp" >杠杆最高500倍</li>',
      '                                <li class="fadeInUp" >最小下单量0.01手</li>',
      '                                <li class="fadeInUp" >免费获得' +
        CF_TEXT +
        "提供的资讯</li>",
    ].join("");
    var html2 = [
      '<li class="fadeInUp" >入金门槛降至100美元，点差直降30%</li>',
      '                                <li class="fadeInUp" >杠杆最高500倍</li>',
      '                                <li class="fadeInUp" >最小下单量0.01手</li>',
      '                                <li class="fadeInUp" >免费获得' +
        CF_TEXT +
        "提供的资讯</li>",
    ].join("");
    var html3 = [
      '<li class="fadeInUp" >点差直降50%，尊享迎新礼遇</li>',
      // "                                <li class="fadeInUp" >赠送200元京东E卡</li>",
      '                                <li class="fadeInUp" >价值30美元的生日奖赏</li>',
      '                                <li class="fadeInUp" >免费获得' +
        CF_TEXT +
        "提供的资讯</li>",
    ].join("");
    var html4 = [
        '<li class="fadeInUp" >0点差，高额净存款利息</li>',
        '                               <li class="fadeInUp" ><!--赠送200元京东E卡+-->投资宝典</li>',
        '                                <li class="fadeInUp" >价值200美元的生日奖赏</li>',
        '                                <li class="fadeInUp" >量身订制交易分析报告</li>',
        '                                <li class="fadeInUp" >独立贵宾服务专线</li>',
      ].join("");

    if(16 <= point && point<= 17){
        $(".chart-moreif").html("<span class='cust-type'>迷你</span> <br\>  账户");
        $(".medal").toggleClass("medal1");
        $('#circle-bg').empty().append('<img src="/toc-cf//sc.cfygxz.com/source/www/assessment/new-version/circle_bg1.png">');
        $("#right-ichart").html(html1);
        $("#right-ichart li").toggleClass("icon1");
    }else if( 18 <= point && point<= 30){
        $(".chart-moreif").html("<span class='cust-type'>标准</span> <br\> 账户");
        $(".medal").toggleClass("medal2");
        $('#circle-bg').empty().append('<img src="/toc-cf//sc.cfygxz.com/source/www/assessment/new-version/circle_bg2.png">');
        $("#right-ichart").html(html2);
        $("#right-ichart li").toggleClass("icon2");
    }else if( 31 <= point && point<= 36){
        $(".chart-moreif").html("<span class='cust-type'>铂金</span> <br\> 账户");
        $(".medal").toggleClass("medal3");
        $('#circle-bg').empty().append('<img src="/toc-cf//sc.cfygxz.com/source/www/assessment/new-version/circle_bg3.png">');
        $("#right-ichart").html(html3);
        $("#right-ichart li").toggleClass("icon3");
    }else if( 37 <= point && point<= 40){
        $(".chart-moreif").html("<span class='cust-type'>巴菲特</span> <br\> 账户");
        $(".medal").toggleClass("medal4");
        $('#circle-bg').empty().append('<img src="/toc-cf//sc.cfygxz.com/source/www/assessment/new-version/circle_bg4.png">');
        $("#right-ichart").html(html4);
        $("#right-ichart li").toggleClass("icon4")
    }else{
        $(".chart-moreif").html("<span class='cust-type'>标准</span> <br\> 账户");
        $(".medal").toggleClass("medal2");
        $('#circle-bg').empty().append('<img src="/toc-cf//sc.cfygxz.com/source/www/assessment/new-version/circle_bg2.png">');
        $("#right-ichart").html(html2);
    }

    AOS.init({
        offset: 100,
        easing: "ease",
        duration: 800,
        delay: 100,
        once: false
    });


    // load game;
    $('.section2').load("assessment-cfd.html", function() {
        initAssessment();
    });

});