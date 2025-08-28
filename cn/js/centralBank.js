"use strict";
var brankRate = {};
var policy = [
  ["加息", "信誉高", "市场引导者"],
  ["宽松", "债券稀缺", "脱欧风险"],
  ["谨慎", "两难困难", "脱欧风险"],
  ["保守", "稳健", "乐观"],
  ["极度宽松", "收益曲线控制", "通胀目标"],
  ["乐观", "稳健", "保守"],
];
var iconList = [
  "FED_icon.png",
  "ECB_icon.png",
  "BOE_icon.png",
  "BOC_icon.png",
  "BOJ_icon.png",
  "RBA_icon.png",
];
$.extend({
  //jsonp请求
  JsonpAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, { _r: Math.random() });
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      data: options,
      headers: { isAjax: "true" },
      dataType: "jsonp", // 数据类型为jsonp
      jsonp: "jsonpCallback",
      success: function (data) {
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  JsonAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, { _r: Math.random() });
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      data: options,
      headers: { isAjax: "true" },
      dataType: "json", // 数据类型为jsonp
      success: function (data) {
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  //tab切换事件
  tabs: function tabs(tab) {
    tab.click(function () {
      var imgList = [
        "FED_bg.png",
        "ECB_bg.png",
        "BOE_bg.png",
        "BOC_bg.png",
        "BOJ_bg.png",
        "RBA_bg.png",
      ];
      var suffix = tab.index(this);
      var type = $(".active").attr("type");
      // 左边背景图片 填充更换
      var left = $(".bank-content .left");
      left.css(
        "background-image",
        `url(${img_url}/source/www/news/centralBank/new-version/${imgList[suffix]})`
      );
      // 黄色边框切换
      tab.removeClass("active");
      $(this).addClass("active");
      //填充央行年息信息
      $.editBrankRate($(this).text());
      // 填充左边内容 政策
      var obj = $.policyContent(suffix);
      $.common(obj);
      // //填充银行新闻
      // $.getCentralBank(type, 5);
    });
  },
  //填充央行年免息信息
  editBrankRate: function (name) {
    $("#brankRate").empty();
    var changeTime = brankRate[name].changeTime;
    var split = changeTime.split("日");
    $("#brankRate").append(
      [
        " <li>",
        split[0] + "日" + "<br>",
        split[1],
        "  </li>",
        "  <li>",
        brankRate[name].rate,
        "  </li>",
        "  <li>",
        brankRate[name].nextTime,
        "  </li>",
        "  <li>",
        brankRate[name].expectation,
        "  </li>",
        "  <li>",
        brankRate[name].effect,
        "  </li>",
      ].join("")
    );
  },
  //    公用填充 html
  common: function common(htmlA) {
    var left = $(".bank-content .left");
    left.empty();
    left.append(htmlA);
  },
  //  填充左边内容 政策
  policyContent: function (suffix) {
    return [
      '<div class="key-words">',
      " " + policy[suffix][0] + "",
      "  </div>",
      '                  <div class="key-words">',
      "" + policy[suffix][1] + "",
      " </div>",
      '                  <div class="key-words">',
      " " + policy[suffix][2] + "",
      "  </div>",
    ].join("");
  },
  //获取央行动态数据
  getCentralBank: function (type, length) {
    var url = info_url + "/1/api/article/getArticleAllList";
    var options = {
      firstTypeId: 9287,
      secondTypeId: type,
      limit: length,
      _r: Math.random(),
    };
    $.JsonAjax(url, options, function (data) {
      $("#centralBank").empty();
      if (data.code == 0) {
        var respnose = data.data;
        var str = "";
        for (var i in respnose) {
          str += [
            "<li>",
            "<a href='/cn/info/news/news-detailed.html#/brank/" +
              respnose[i].articleId +
              "'>",
            "" +
              respnose[i].title +
              "<span>" +
              $.dateFormat(respnose[i].ctime) +
              "</span>",
            "</a>",
            "  </li>",
          ].join("");
        }
        $("#centralBank").append(str);
      }
    });
  },
  //获取央行年息数据
  getBrankRate: function () {
    // var url = mis_url + "/cfd/brankRate";
    // $.JsonpAjax(url,null,function (data) {
    //     if(data instanceof Array){
    //         for (var i in data) {
    //             brankRate[data[i].name] = data[i];
    //         }
    //     }
    //     //初始化，填充央行年息信息
    //     $.editBrankRate("美联储");

    // });

    // Hardcode data originally provided by backend
    var data = [
      {
        changeTime: "2022年3月16日",
        effect: "美联储若如期升息，将带动美元升值",
        expectation: "0.5%-0.70%",
        id: 1,
        name: "美联储",
        nextTime: "2022年5月3日",
        rate: "0.25%-0.5%",
        status: 1,
      },
      {
        changeTime: "2022年4月13日",
        effect: "加拿大央行抢先Fed 升息并启动缩表，美元/加元总体延续震荡行情",
        expectation: "1%",
        id: 7,
        name: "加央行",
        nextTime: "2022年6月1日",
        rate: "1%",
        status: 1,
      },
      {
        changeTime: "2022年4月1日",
        effect: "日本央行不升息，日圆贬至25年新低",
        expectation: "-0.10%",
        id: 9,
        name: "日央行",
        nextTime: "2022年5月30日",
        rate: "-0.10%",
        status: 1,
      },
      {
        changeTime: "2022年4月5日",
        effect: "澳洲的利率处于0.1%的历史最低点，但也有可能下半年采取升息",
        expectation: "0.10%",
        id: 11,
        name: "澳储行",
        nextTime: "2022年5月3日",
        rate: "0.10%",
        status: 1,
      },
      {
        changeTime: "2022年4月14日",
        effect: "欧央行利率决议继续鸽派，欧元/美元闻声下跌",
        expectation: "0%",
        id: 15,
        name: "欧央行",
        nextTime: "2022年6月9日",
        rate: "0%",
        status: 1,
      },
      {
        changeTime: "2022年3月17日",
        effect: "英国央行宣布银行利率调整至0.75%；通膨率可能会持续升高",
        expectation: "0.75%",
        id: 17,
        name: "英央行",
        nextTime: "2022年5月5日",
        rate: "0.75%",
        status: 1,
      },
    ];

    if (data instanceof Array) {
      for (var i in data) {
        brankRate[data[i].name] = data[i];
      }
    }

    //初始化，填充央行年息信息
    $.editBrankRate("美联储");
  },
  //格式化日期
  dateFormat: function (longTypeDate) {
    var dateType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateType =
      date.getFullYear() +
      "年" +
      $.getFullPart(date.getMonth() + 1) +
      "月" +
      $.getFullPart(date.getDate()) +
      "日";
    return dateType;
  },
  getFullPart: function (day) {
    return day < 10 ? "0" + day : day;
  },
});

$('.CFD-ios').hover(function() {
  $(".ios-CFD").show();
}, function() {
  $(".ios-CFD").hide();
});
$('.CFD-android').hover(function() {
  $(".android-CFD").show();
}, function() {
  $(".android-CFD").hide();
});

