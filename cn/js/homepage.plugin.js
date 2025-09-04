// angular js
var cfApp = angular.module('cfApp', []);
cfApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

cfApp.controller('homeCtrl', function ($scope, $http, $timeout, $filter, $log) {
    // constant
    showingCommodity = ["UKOil", "USOil"];
    showingExchange = ["EURUSD", "USDJPY", "AUDUSD", "GBPUSD"];
    showingStock = ["HK50", "CHINA300", "TECH100", "JPN225"];
    showingMetal = ["XAGUSD", "XAUUSD", "XAUCNH", "XAGCNH"];
    showingWealth = ["AUDNZD", "AUDUSD", "CADJPY", "EURAUD"];
    showingIdeal = ["BTCUSD", "ETCUSD", "LTCUSD", "BCHUSD"];
    idealName = {
        "BTCUSD": "比特币",
        "ETCUSD": "以太币",
        "LTCUSD": "莱特币",
        "BCHUSD": "比特币现金"
    };
    $scope.flags = {
        "新西兰": "New Zealand.png",
        "纽元": "New Zealand.png",
        "韩国": "South Korea.png",
        "澳大利亚": "Australia.png",
        "澳元": "Australia.png",
        "日本": "japan.png",
        "日元": "japan.png",
        "德国": "Germany.png",
        "瑞士": "Switzerland.png",
        "瑞典": "Sweden.png",
        "香港": "Hong Kong.png",
        "中国香港": "Hong Kong.png",
        "西班牙": "Spain.png",
        "英国": "UK.png",
        "英镑": "UK.png",
        "意大利": "Italy.png",
        "加拿大": "Canada.png",
        "加元": "Canada.png",
        "美国": "United States of America(USA).png",
        "美元": "United States of America(USA).png",
        "中国": "China.png",
        "人民币": "China.png",
        "台湾": "Taiwan.png",
        "法国": "France.png",
        "欧元区": "European Union.png",
        "欧元": "European Union.png",
        "欧洲": "European Union.png",
        "欧盟": "European Union.png",
        "南非": "South Africa.png",
        "巴西": "Brazil.png",
        "印度": "India.png",
        "希腊": "Greece.png",
        "新加坡": "Singapore.png",
        "奥地利": "Austria.png",
        "菲律宾": "Philippines.png",
        "挪威": "Norway.png",
        "印尼": "Indonesia.png",
        "OECD": "OECD.png",
        "葡萄牙": "Portugal.png",
        "巴基斯坦": "Pakistan.png",
        "捷克斯洛伐克": "Czech Republic.png",
        "比利时": "Belgium.png",
        "俄罗斯": "Russian Federation.png"
    };
    // variables
    $scope.data = {};
    $scope.data.commodity = [];
    $scope.data.exchange = [];
    $scope.data.stock = [];
    $scope.data.metal = [];
    $scope.data.idealMoney = [];
    $scope.wealth = [];
    $scope.data.news = {};
    $scope.data.comments = {};
    $scope.data.calendar = [];
    $scope.priceUpdatedDate;
    $scope.date = new Date();
    $scope.dayInWeek = [];
    $scope.bannerImgList = [];//滚动banner图片路径信息
    $scope.chineseDays = ["一", "二", "三", "四", "五", "六", "日"];
    $scope.wealthUpdatedTimestamp;
    var goodBuyPercent = 0;
    var goodSellPercent = 0;
    var wealthyStock = [];
    $scope.runSlider = function () {
        $('.flexslider').flexslider({
            slideshow: true,
            animation: "fade",
            directionNav: false,
            slideshowSpeed: 5000,
            animationSpeed: 1500,
            pauseOnAction: false,
            pauseOnHover: true,
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });
        $('.flex-control-nav li').on('mouseover', function () {
            $(".slides >li").finish();
            $(this).find('a').trigger('click');
        });
    }
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        $scope.runSlider();
    });
    $scope.getGoodBuyPercent = function () {
        return goodBuyPercent;
    }
    $scope.getGoodSellPercent = function () {
        return goodSellPercent;
    }
    function CDate(date, chineseDay, isActive) {
        this.date = date;
        this.chineseDay = chineseDay;
        this.isActive = isActive;
    }
    //新闻 评论 时间转化
    function initi(d) {
        var year = d.getFullYear();
        var day = d.getDate();
        var month = +d.getMonth() + 1;
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var f = year + "-" + formate(month) + "-" + formate(day) + " " + formate(hour) + ":" + formate(minute) + ":" + formate(second)
        return f;
    }
    function formate(d) {
        return d > 9 ? d : '0' + d;
    }
    // add by skyline begin
    $scope.getClassTwoHours = function (ctime) {
        var now = new Date();
        var hour = Math.floor((now.getTime() - ctime) / (3600 * 1000));
        if (hour <= 2) {
            return ("new-if");
        }
        return "";
    }
    // skyline end
    function init() {
        $http.get(
            cms_url + "/api/ad/action/4?_r=" + Math.random())
            .then(function (response) {
                $scope.bannerImgList = angular.fromJson(angular.fromJson(response).data);
            });
        // get price data (get each five minutes)
        $scope.getData();
        // get wealthy stock
        $http.get(
            api_url + '/public/stock/wealthy?_r=' + Math.random())
            .then(function (response) {
                wealthyStock = response.data;
                wealthyStock = Array.isArray(wealthyStock) ? wealthyStock : Array.from(wealthyStock);
            });
        // get news
        $http.get(
            info_url + "/1/api/article/getArticleAllList?firstTypeId=9119&limit=8", {headers: {isAjax: "true"}}).then(
            function (res) {
                var data = res.data;
                if (data.code == 0) {
                    var response = data.data;
                    for (var i in response) {
                        response[i].utime = initi(new Date(response[i].ctime));
                    }
                    $scope.data.news = response;
                }
            });

        // get comments
        $http.get(
            info_url + "/1/api/article/getArticleAllList?firstTypeId=9107&limit=8", {headers: {isAjax: "true"}}).then(
            function (res) {
                var data = res.data;
                if (data.code == 0) {
                    var response = data.data;
                    for (var i in response) {
                        response[i].utime = initi(new Date(response[i].ctime));
                    }
                    $scope.data.comments = response;
                }
            });

        // get trade ratio
        $http.get(api_url + '/public/stock/cf')
            .then(
                function (response) {

                    if (response.data.code === "SUCCESS") {

                        $scope.wealth = [];

                        var data = response.data.result.stocks;
                        for (i = 0; i < data.length; i++) {
                            var symbol = data[i].symbol;
                            if (isWealth(symbol)) {
                                $scope.wealth.push(data[i]);
                            }
                        }
                        $scope.wealthUpdatedTimestamp = new Date(response.data.result.updatedTimestamp);
                        goodSellPercent = response.data.result.goodSellPercent;
                        goodBuyPercent = response.data.result.goodBuyPercent;

                    }
                });


        // init calendar and get calendar for today
        $scope.date = new Date();
        $scope.dayInWeek = [];
        var monday = getMonday($scope.date);

        for (i = 0; i < 7; i++) {
            var newDate = new Date(monday);
            newDate.setTime(monday.getTime() + i * 86400000);
            var cDate = new CDate(newDate, $scope.chineseDays[i], false);
            $scope.dayInWeek.push(cDate);
            if (newDate.getDate() == $scope.date.getDate()) {
                $scope.changeDay(cDate);
            }
        }

        watchCollection("data.commodity");
        watchCollection("data.exchange");
        watchCollection("data.stock");
        watchCollection("data.metal");
        watchCollection("data.idealMoney");
    };
    $scope.getData = function () {
        $http.get(api_url + '/public/marketprice/cf.json?_r=' + Math.random()).then(
            function (response) {
                $scope.priceUpdatedDate = new Date();
                $scope.data.commodity = [];
                $scope.data.exchange = [];
                $scope.data.stock = [];
                $scope.data.metal = [];
                $scope.data.idealMoney = [];

                var data = response.data;
                for (i = 0; i < data.length; i++) {
                    var symbol = data[i].symbol;
                    data[i].ampclss = data[i].amplitude > 0 ? 'up' : 'down';
                    data[i].amplitude = Math.abs(data[i].amplitude);

                    if (isCommodity(symbol)) {
                        $scope.data.commodity.push(data[i]);

                    } else if (isExchange(symbol)) {
                        $scope.data.exchange.push(data[i]);

                    } else if (isStock(symbol)) {
                        if (symbol.indexOf("(") == -1) {
                            $scope.data.stock.push(data[i]);
                        }

                    } else if (isMetal(symbol)) {
                        $scope.data.metal.push(data[i]);

                    } else if (isIdeal(symbol)) {
                        data[i].name = idealName[data[i].name];
                        data[i].price = parseFloat(data[i].price).toFixed(1)
                        $scope.data.idealMoney.push(data[i]);
                    }
                }

            });

        $timeout($scope.getData, 5000);
    };
    function watchCollection(name) {
        $scope.$watch(name, function (newVal, oldVal) {
            if (newVal == null || newVal.length < 1 || oldVal.length < 1) {
                return;
            }
            for (var i = 0; i < newVal.length; i++) {
                if (newVal[i].price > oldVal[i].price) {
                    if (oldVal[i].prclss && oldVal[i].prclss.indexOf("blinkc") >= 0) {
                        newVal[i].prclss = "up blinkd ";
                    } else {
                        newVal[i].prclss = "up blinkc ";
                    }
                } else if (newVal[i].price < oldVal[i].price) {
                    if (oldVal[i].prclss && oldVal[i].prclss.indexOf("blinkb") >= 0) {
                        newVal[i].prclss = "down blink ";
                    } else {
                        newVal[i].prclss = "down blinkb ";
                    }
                } else {
                    if (oldVal[i].prclss) {
                        newVal[i].prclss = oldVal[i].prclss;
                    }
                }
                if (newVal[i] && newVal[i].prclss == null) {
                    newVal[i].prclss = "up";
                }

            }
        }, true);
    }
    $scope.changeDay = function (cday) {
        var time = new Date(new Date(cday.date).toLocaleDateString()).getTime();
        $http({
            method: 'GET',
            url: info_url + "/v1/api/calendar/list?time=" + time + "&dataTypeCon=1&type=zh_CN",
            headers: {'Content-Type': 'application/x-www-form-urlencoded', isAjax: true}
        }).success(function (response) {
            $scope.data.calendar = [];
            if (response.code == 0 && response.data) {
                var size = response.data.length;
                $scope.data.calendar = response.data.slice(0, (size > 5) ? 5 : size);
            }
            for (i = 0; i < $scope.dayInWeek.length; i++) {
                $scope.dayInWeek[i].isActive = false;
            }
            cday.isActive = true;
        });
    }
    $scope.isWealthy = function (symbol) {
        return wealthyStock.indexOf(symbol) !== -1;
    };
    function isContains(str, substr) {
        return str.indexOf(substr) >= 0;
    }
    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }
    function isCommodity(symbol) {
        symbol = symbol.trim();
        return showingCommodity.indexOf(symbol) !== -1;
        /*return (symbol.indexOf("B")==0 || symbol.indexOf("CL")==0) && symbol.indexOf("CLWTI") == -1;*/
    }
    function isExchange(symbol) {
        symbol = symbol.trim();
        return (showingExchange.indexOf(symbol) !== -1
            || showingExchange.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
            || showingExchange.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1);
    }
    function isStock(symbol) {
        symbol = symbol.trim();
        var m = symbol.match(/(\w*)(\d*)/);
        if (!m) {
            return false;
        }
        symbol = m[1];

        if ((showingStock.indexOf(symbol) !== -1
            || showingStock.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
            || showingStock.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1)) {
            return true;
        }
        return false;

    };
    function isMetal(symbol) {
        symbol = symbol.trim();
        return (showingMetal.indexOf(symbol) !== -1
            || showingMetal.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
            || showingMetal.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1);
    };
    function isIdeal(symbol) {
        symbol = symbol.trim();
        return (showingIdeal.indexOf(symbol) !== -1
            || showingIdeal.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
            || showingIdeal.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1);
    };
    function isWealth(symbol) {
        symbol = symbol.trim();
        return (showingWealth.indexOf(symbol) !== -1
            || showingWealth.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
            || showingWealth.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1);
    };
    // init data
    init();
});

cfApp.directive('cfPie', function () {
    return {
        restrict: 'E',
        scope:
            {
                data: '@',
                buy: '@',
                sell: '@'

            },
        template: '<div id="container{{pieData.symbol}}"></div><div class="figures">{{(value>0?"+":"")}}{{value|number :0}}</div><div class="gloss"><a ng-class="cClass" href="/cn/information/position.html">{{text}}</a></div>',
        link: function (scope, element, attrs) {
            scope.value;
            scope.cClass = "";
            scope.text = "";

            scope.pieData = JSON.parse(scope.data);

            var stock = scope.pieData;
            var buyRatio;
            var sellRatio;
            /*if(stock.recSellRatios>0){
                buyRatio = stock.buyRatios	* (1. - stock.reliableRatios) + stock.recBuyRatios * stock.reliableRatios;
                buyRatio = round(buyRatio*100,0);
                sellRatio = 100 - buyRatio;
            }else{
                buyRatio = round(stock.buyRatios*100,0);
                sellRatio = round(stock.sellRatios*100,0);
            }*/
            buyRatio = round(((stock.buyRatios * 0.5) + 0.25) * 100,0);
            sellRatio = round(((stock.sellRatios * 0.5 ) + 0.25) * 100,0);

            scope.value = buyRatio - sellRatio;

            if (scope.value < 0) {
                scope.text = '看多';
                scope.cClass = 'cap2';
            } else if (scope.value > 0) {
                scope.text = '看空';
                scope.cClass = 'cap3';
            } else {
                scope.text = '持平';
                scope.cClass = 'cap1';
            }

            function round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            scope.$watch(
                "pieData",
                function (newValue, oldValue) {
                    createChart("#container" + scope.pieData.symbol, sellRatio, buyRatio, scope.pieData.name);
                    hoverChart();
                }
            );

            function hoverChart() {
                $(".item-chart .pie-chart").hover(function () {
                    $(".pie-chart").removeClass('active');
                    $(this).addClass('active');
                });
            }

            function createChart(id, x, y, title) {
                var x1 = x,
                    y1 = y;
                var data = [{
                        y: x1,
                        color: '#ffffff',
                        drilldown: {
                            data: [x1],
                            color: ['#0078b4']
                        }
                    }, {
                        y: y1,
                        color: '#ffffff',
                        drilldown: {
                            data: [y1],
                            color: ['#ff9f00']
                        }
                    }],
                    browserData = [],
                    versionsData = [],
                    i,
                    j,
                    dataLen = data.length,
                    drillDataLen,
                    brightness;

                // Build the data arrays
                for (i = 0; i < dataLen; i += 1) {

                    // add browser data
                    browserData.push({
                        y: data[i].y,
                        color: data[i].color,
                        dataLabels: data[i].dataLabels
                    });

                    // add version data
                    drillDataLen = data[i].drilldown.data.length;
                    for (j = 0; j < drillDataLen; j += 1) {
                        versionsData.push({
                            y: data[i].drilldown.data[j],
                            color: data[i].drilldown.color[j]
                        });
                    }
                }
                // Create the chart
                $(id).highcharts({
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        type: 'pie',
                        renderTo: 'histogram',
                        defaultSeriesType: 'bar',
                        backgroundColor: null
                    },
                    title: {
                        text: title,
                        y: 170,
                        useHTML: true
                    },
                    series: [{
                        name: 'Versions',
                        data: versionsData,
                        borderWidth: 0,
                        size: '85%',
                        innerSize: '85%',
                        allowPointSelect: true,
                        enableMouseTracking: false,
                        dataLabels: {
                            formatter: function () {
                                // hide data label
                                return null;
                            }
                        },
                        states: {
                            hover: {
                                halo: {
                                    size: 0,
                                    opacity: .3
                                }

                            }
                        }
                    }]
                });
            }


        }
    }
});