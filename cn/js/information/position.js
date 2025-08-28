var oil = ["BF", "BG", "BH", "BJ", "BK", "BM", "BN", "BQ", "BU", "BV", "BX", "BZ", "CLF", "CLG", "CLH", "CLJ", "CLK", "CLM", "CLN", "CLQ", "CLU", "CLV", "CLX", "CLZ", "UKOil", "USOil"];
var exchange = ["AUDJPY", "AUDNZD", "AUDUSD", "CADJPY", "EURAUD", "EURCHF", "EURGBP", "EURJPY", "EURUSD", "GBPAUD", "GBPCHF", "GBPJPY", "GBPUSD", "NZDJPY", "NZDUSD", "USDCAD", "USDCHF", "USDCNH", "USDJPY", "HKDCNH"];
var stock = ["China", "A50", "CHINA300", "DJ30", "FTSE", "CHINA", "A50", "HK50", "JPN225", "SP500", "Tech100"];
var metal = ["XAGUSD", "XAUUSD", "XAUCNH", "XAGCNH"];
var dollar = ["AUDUSD", "USDJPY", "EURUSD", "GBPUSD", "NZDUSD", "USDCAD", "USDCHF"];
var other = ["AUDJPY", "AUDNZD", "CADJPY", "EURAUD", "EURCHF", "EURGBP", "EURJPY", "GBPAUD", "GBPCHF", "GBPJPY", "NZDJPY"];
var cnh = ["USDCNH", "HKDCNH"];
var list = { oils: oil, exchanges: exchange, stocks: stock, metals: metal, dollars: dollar, others: other, cnhs: cnh }
$.extend({
    JsonAjax: function(url, options, callbackSuc, callbackErr) {
        $.extend(options, { _r: Math.random() });
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            data: options,
            dataType: "json",
            success: function(data) {
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function(data) {
                console.log("请求失败，url :" + url);
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    postAjax: function(url, options, callbackSuc, callbackErr) {
        $.extend(options, { url: Math.random() });
        $.ajaxk("POST", url, options, callbackSuc, callbackErr);
    },
    getAjax: function(url, callbackSuc, callbackErr) {
        $.extend(options, { url: Math.random() });
        $.ajaxk("GET", url, "", callbackSuc, callbackErr);
    },
    mechined: function() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        if (isAndroid) return 0;
        if (isiOS) return 1;
        else return -1;
    },
    click: function() {
        $(".conList a").click(function() {
            var name = $(this).attr("name");
            if ($.mechined() == 0) {
                uiObject.toProductChartPage(name);
            } else {
                toProductChartPage(name);
            }
        });
    },
    initData: function(data, type_arr, html, i) {
        var types;
        var style;
        types = data.filter(function(arr) {
            return arr.symbol == type_arr[i];
        });
        if (types[0]) {
            var buyratios = Math.round(((types[0].buyRatios * 0.5) + 0.25) * 100);
            var sellratios = Math.round(((types[0].sellRatios * 0.5) + 0.25) * 100);
            var widthMore = (buyratios / 100 * 2.89).toFixed(2) + "rem";
            var color = buyratios > 60 ? "#fd9e37" : (buyratios < 60 && buyratios > 40 ? "#55fc43" : "#3391e7");
            var result = "";
            if (buyratios > 60) {
                result = "极端看多"
            } else if (buyratios < 60 && buyratios > 40) {
                result = "多空交战"
            } else if (buyratios < 40) {
                result = "极端看空"
            }
            style = document.getElementById("dynamic");
            style.innerHTML +=
                '.appear' + i + '{\n' +
                '    animation: appear' + i + ';\n' +
                '    animation-duration: 1.5s;\n' +
                '    -webkit-animation:appear' + i + ' 1.5s;\n' +
                '    animation-fill-mode: forwards;\n' +
                '}\n' +
                '@-webkit-keyframes appear' + i + '{0% {width: 0;} 100% {width: ' + widthMore + ';}}\n' +
                '@keyframes appear' + i + ' {0% {width: 0;} 100% {width: ' + widthMore + ';}}\n';
            html += [
                '<a href="javascript:;" name="' + types[0].symbol + '">' +
                '   <div class="layout">' +
                '       <div class="item">' +
                '           <div class="nameCon"><span>' + types[0].name + ' </span><span style="color: ' + color + '">' + result + '</span></div>' +
                '           <div class="scale">' +
                '               <div class="data">看多<span>' + buyratios + '</span>%</div>' +
                '               <div class="rect"><span class="appear' + i + '" style="width: ' + widthMore + '"></span></div>' +
                '               <div class="data">看空<span>' + sellratios + '</span>%</div>' +
                '           </div>' +
                '       </div>' +
                '       <div class="shadow"></div>' +
                '   </div>' +
                '</a>'
            ].join();
        }
        return html;
    },
    conData: function() {
        var url = "https://mis.cfd139.com/public/stock/cf";
        $.JsonAjax(url, null, function(data) {
            if (data.code == 'SUCCESS') {
                $(".conNav").hide();
                var tab = $(".navTit ul li"),
                    tab_child = $(".conNav ul li");
                var stocks = data.result.stocks;
                // console.log(data.result.stocks);
                // console.log("hello");
                // console.log(data);
                var type_arr = stock;
                var html = "";
                for (var i = 0; i < stocks.length; i++) {
                    var href = window.location.search;
                    if (href.indexOf("indices") != -1) {
                        $("#m-header,#m-footer").hide();
                        $(".navTit li").hide().removeClass("checked");
                        $(".conPage .conNav").hide();
                        $(".stocks").show().addClass("checked");
                        type_arr = stock;
                    }
                    html = $.initData(stocks, type_arr, html, i)
                }
                $(".conList").empty().append(html);
                $.click();
                tab.click(function() {
                    $(this).addClass("checked").siblings("li").removeClass('checked');
                    var type = $(this).attr("type");
                    if (type == "exchanges") {
                        $(".conNav").show();
                    } else {
                        $(".conNav").hide();
                    }
                    var htmls = "";
                    type_arr = list[type];
                    for (var i = 0; i < stocks.length; i++) {
                        htmls = $.initData(stocks, type_arr, htmls, i)
                    }
                    $(".conList").empty().append(htmls);
                    $.click();
                    tab_child.removeClass("checked")
                });
                tab_child.click(function() {
                    $(this).addClass("checked").siblings("li").removeClass('checked');
                    var type = $(this).attr("type");
                    var html_child = "";
                    type_arr = list[type];
                    for (var i = 0; i < stocks.length; i++) {
                        html_child = $.initData(stocks, type_arr, html_child, i)
                    }
                    $(".conList").empty().append(html_child);
                    $.click();
                });
            }
        })
    }
});