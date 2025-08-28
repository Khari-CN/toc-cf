// angular js
$(function () {
  $("#datepicker").change(function () {
    //alert($("#datepicker").val());
  });
});
var cfApp = angular.module("cfApp", []);
cfApp.directive("repeatFinish", function () {
  return {
    controller: [
      "$scope",
      function ($scope) {
        $scope.loadend = function () {
          $scope.$parent.loadStatus = "暂无数据";
        };
      },
    ],
    link: function (scope, element, attr) {
      if (scope.$last == true) {
        console.log("ng-repeat执行完毕");
        scope.loadend();
      }
    },
  };
});
cfApp.controller("homeCtrl", function ($scope, $http, $timeout, $filter, $log) {
  $scope.flags = {
    新西兰: "New Zealand.png",
    纽元: "New Zealand.png",
    韩国: "South Korea.png",
    澳大利亚: "Australia.png",
    澳元: "Australia.png",
    日本: "japan.png",
    日元: "japan.png",
    德国: "Germany.png",
    瑞士: "Switzerland.png",
    瑞典: "Sweden.png",
    香港: "Hong Kong.png",
    中国香港: "Hong Kong.png",
    西班牙: "Spain.png",
    英国: "UK.png",
    英镑: "UK.png",
    意大利: "Italy.png",
    加拿大: "Canada.png",
    加元: "Canada.png",
    美国: "United States of America(USA).png",
    美元: "United States of America(USA).png",
    中国: "China.png",
    人民币: "China.png",
    台湾: "Taiwan.png",
    法国: "France.png",
    欧元区: "European Union.png",
    欧元: "European Union.png",
    欧洲: "European Union.png",
    欧盟: "European Union.png",
    南非: "South Africa.png",
    巴西: "Brazil.png",
    印度: "India.png",
    希腊: "Greece.png",
    新加坡: "Singapore.png",
    奥地利: "Austria.png",
    菲律宾: "Philippines.png",
    挪威: "Norway.png",
    印尼: "Indonesia.png",
    OECD: "OECD.png",
    葡萄牙: "Portugal.png",
    巴基斯坦: "Pakistan.png",
    捷克斯洛伐克: "Czech Republic.png",
    比利时: "Belgium.png",
    俄罗斯: "Russian Federation.png",
    爱尔兰: "Ireland.png",
    以色列: "Israel.png",
    哥伦比亚: "Colombia.png",
    泰国: "Thailand.png",
    波兰: "Poland.png",
    匈牙利: "Hungary.png",
    墨西哥: "Mexico.png",
    丹麦: "Denmark.png",
    芬兰: "Finland.png",
    荷兰: "Netherlands.png",
  };
  $scope.currency = {
    新西兰: "纽元",
    韩国: "其它",
    澳大利亚: "澳元",
    日本: "日元",
    德国: "欧元",
    瑞士: "其它",
    瑞典: "其它",
    香港: "港元",
    西班牙: "欧元",
    英国: "英镑",
    意大利: "欧元",
    加拿大: "加元",
    美国: "美元",
    中国: "人民币",
    台湾: "其它",
    法国: "欧元",
    欧元区: "欧元",
    南非: "其它",
    巴西: "其它",
    印度: "其它",
    希腊: "欧元",
    新加坡: "其它",
    奥地利: "其它",
    菲律宾: "其它",
    挪威: "其它",
    印尼: "其它",
    OECD: "其它",
    葡萄牙: "其它",
    巴基斯坦: "其它",
    捷克斯洛伐克: "其它",
    比利时: "其它",
    俄罗斯: "其它",
  };
  //得到所有的国家和"其它"代表的国家
  $scope.countrystr = function () {
    var allCountry = [];
    var otherCountry = [];
    for (var i in $scope.currency) {
      allCountry.push(i);
      if ($scope.currency[i] == "其它") {
        otherCountry.push(i);
      }
    }
    return {
      allCountry: allCountry.join(","),
      otherCountry: otherCountry.join(","),
    };
  };
  // variables
  $scope.data = {};
  $scope.data.commodity = [];
  $scope.data.exchange = [];
  $scope.data.stock = [];
  $scope.data.metal = [];
  $scope.importance = [];
  $scope.country = [];
  $scope.wealth = [];
  $scope.data.news = {};
  $scope.data.comments = {};
  $scope.data.calendar = [];
  $scope.data.financeEventList = [];
  $scope.data.financeVacationList = [];
  $scope.priceUpdatedDate;
  $scope.date = new Date(new Date().toLocaleDateString()).getTime();
  $scope.dayInWeek = [];
  $scope.dayInWeekChange = [];
  $scope.chineseDays = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  $scope.titles = [
    "API汽油库存变动(万桶)",
    "API精炼油库存变动(万桶)",
    "API原油库存变动(万桶)",
    "API库欣原油库存变动(万桶)",
    "EIA汽油库存变动(万桶)",
    "EIA精炼厂设备利用率(%)",
    "EIA俄克拉荷马州库欣原油库存(万桶)",
    "EIA原油库存变动(万桶)",
    "EIA精炼油库存变动(万桶)",
    "油服贝克休斯总钻井总数(口)",
    "油服贝克休斯混杂钻井总数(口)",
    "油服贝克休斯混杂钻井总数(口)",
    "油服贝克休斯天然气钻井总数(口)",
    "EIA天然气一年远期均价预期(美元/千立方英尺)",
  ];
  $scope.wealthUpdatedTimestamp;
  var goodBuyPercent = 0;
  var goodSellPercent = 0;
  var wealthyStock = [];
  var flag = 0;
  $scope.cancelStatus = 0;
  $scope.clicktimes_prev = 1;
  $scope.clicktimes_next = 1;

  $scope.getGoodBuyPercent = function () {
    return goodBuyPercent;
  };
  $scope.getGoodSellPercent = function () {
    return goodSellPercent;
  };

  function CDate(date, chineseDay, isActive) {
    this.date = date;
    this.chineseDay = chineseDay;
    this.isActive = isActive;
  }

  $scope.getClassTwoHours = function (ctime) {
    //console.log(ctime);
    var now = new Date();
    var time = new Date(ctime);
    var hour = Math.floor((now.getTime() - time.getTime()) / (3600 * 1000));
    if (hour <= 2) {
      return "new-if";
    }
    return "";
  };
  //初始化一周时间的显示并请求财经数据
  $scope.init = function (date) {
    $scope.date = date;
    $scope.dayInWeek = [];
    /* $scope.dayInWeekChange=[];*/
    var monday = getMonday($scope.date);
    var now;
    for (i = 0; i < 7; i++) {
      var newDate = new Date(monday);
      newDate.setTime(monday.getTime() + i * 86400000);
      var cDate = new CDate(newDate, $scope.chineseDays[i], false);
      $scope.dayInWeek.push(cDate);
      // console.log("$scope.date", $scope.date)
      if (newDate.getDate() == new Date($scope.date).getDate()) {
        $scope.changeDay(cDate);
      }
    }
  };

  //获取当前周的周一所代表的日期
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  //要得到前一周prevornext = -7,要得到后一周prevornext = 7
  function prev_next(prevornext) {
    var now = new Date($scope.change_date); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += nowYear < 2000 ? 1900 : 0; //
    //前一周 nowDay - 7,下一周 + 7
    var getUpWeekStartDate = new Date(nowYear, nowMonth, nowDay + prevornext);
    $scope.date = new Date(getUpWeekStartDate);
    $scope.change_date = $filter("date")($scope.date, "yyyy-MM-dd");
    $scope.dayInWeek = [];
    /* $scope.dayInWeekChange=[];*/
    var monday = getMonday($scope.date);

    for (i = 0; i < 7; i++) {
      var newDate = new Date(monday);
      newDate.setTime(monday.getTime() + i * 86400000);
      var cDate = new CDate(newDate, $scope.chineseDays[i], false);
      //alert(cDate.date);
      $scope.dayInWeek.push(cDate);
      if (
        $scope.dayInWeek[i].date.getDate() ==
          new Date($scope.current_date).getDate() &&
        $scope.dayInWeek[i].date.getMonth() ==
          new Date($scope.current_date).getMonth() &&
        $scope.dayInWeek[i].date.getYear() ==
          new Date($scope.current_date).getYear()
      ) {
        $scope.dayInWeek[i].isActive = true;
      } else {
        $scope.dayInWeek[i].isActive = false;
      }
    }
  }
  //前一星期
  $scope.show_prev = function () {
    prev_next(-7);
    $scope.clicktimes_prev = $scope.clicktimes_prev + 1;
  };
  //后一星期
  $scope.show_next = function () {
    prev_next(7);
    $scope.clicktimes_next = $scope.clicktimes_next + 1;
  };
  //日期点击改变事件(星期几)
  $scope.changeDay = function (cday) {
    $scope.current_date = $filter("date")(cday.date, "yyyy-MM-dd");
    $scope.change_date = $filter("date")(cday.date, "yyyy-MM-dd");
    // console.log("change_date", $scope.change_date);
    // console.log("current_date", $scope.current_date);
    $scope.select_date = cday;
    $scope.getData($scope.select_date);
  };
  //日历上选择日期
  $scope.changeDay1 = function (current_date) {
    $scope.init(
      new Date(new Date(current_date).toLocaleDateString()).getTime()
    );
  };
  //获取财经数据、事件、假期
  $scope.getData = function (cday) {
    var level = "";
    var country = "";
    var type = "zh_CN";
    //如果没有国家选中则查询所有的国家
    if ($scope.importance.length == 0) {
      level = "";
    } else {
      level = $scope.importance.join(",");
    }
    //如果没有星级选中则查询所有的星级
    if ($scope.country.length == 0) {
      country = "";
    } else {
      country = $scope.country.join(",");
    }
    //开始加载数据
    $scope.loadStatus = "正在加载数据";
    //财经数据  new Date(new Date(cday.date).toLocaleDateString()).getTime()
    var data = {
      PageType: 1,
      time: new Date(new Date(cday.date).toLocaleDateString()).getTime(),
      level: level,
      country: country,
      type: type,
      _r: Math.random(),
    };
    $scope.http(cday, data);
    //事件
    /*var data = {PageType:2,releaseTime:$filter('date')(cday.date, "yyyy-MM-dd"),level:level,country:country,"_r":Math.random()};
        $scope.http(cday,data);
        //假期
        var data = {PageType:3,releaseTime:$filter('date')(cday.date, "yyyy-MM-dd"),level:level,country:country,"_r":Math.random()};
        $scope.http(cday,data);*/
    //数据加载结束
  };
  //打算http请求去获取财经数据
  $scope.http = function (cday, data) {
    $http({
      method: "GET",
      url: info_url + "/v1/api/calendar/list",
      params: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        isAjax: true,
      },
      //修改data的参数格式（angularjs默认传参json对象，后台不识别，修改为key=value&key=value形式）
      /*transformRequest: function (data) {
                var str = [];
                for (var p in data)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            },*/
    }).success(function (response) {
      //将返回数据同步到前台
      if (response.code == 0) {
        if (response.data) {
          // console.log(response.data);
          $scope.data.calendar = response.data;
          if (
            $scope.data.calendar == null ||
            $scope.data.calendar.length == 0
          ) {
            $scope.loadStatus = "暂无数据";
          }
          for (var i in $scope.data.calendar) {
            $scope.data.calendar[i].previous =
              $scope.data.calendar[i].previous == ""
                ? "--"
                : $scope.data.calendar[i].previous;
            $scope.data.calendar[i].forecast =
              $scope.data.calendar[i].forecast == ""
                ? "--"
                : $scope.data.calendar[i].forecast;
            $scope.data.calendar[i].actual =
              $scope.data.calendar[i].actual == ""
                ? "--"
                : $scope.data.calendar[i].actual;
            $scope.data.calendar[i].profitable =
              $scope.data.calendar[i].profitable == null ||
              $scope.data.calendar[i].profitable == ""
                ? "--"
                : $scope.data.calendar[i].profitable;
            $scope.data.calendar[i].impactValue =
              $scope.data.calendar[i].impactValue == null ||
              $scope.data.calendar[i].impactValue == ""
                ? "--"
                : $scope.data.calendar[i].impactValue;
            if (
              $scope.data.calendar[i].country === "香港" ||
              $scope.data.calendar[i].country === "中国香港"
            ) {
              $scope.data.calendar[i].country = "中国香港";
            }
          }
        }
        /*if (response.data && response.data.financeEvent) {
                    $scope.data.financeEventList = response.data.financeEvent;
                }
                if (response.data && response.data.financeVacation) {
                    $scope.data.financeVacationList = response.data.financeVacation;
                }*/
      }
      //修改当前选中的时间显示颜色
      for (i = 0; i < $scope.dayInWeek.length; i++) {
        $scope.dayInWeek[i].isActive = false;
      }
      /* for(i=0;i<$scope.dayInWeekChange.length;i++){
                 $scope.dayInWeekChange[i].isActive = false;
             }*/
      cday.isActive = true;
    });
  };

  //重要等级筛选（星级筛选）
  $scope.starSelect1 = function ($event) {
    $scope.cancelStatus = 1;
    var star;
    var li;
    //根据点击的是<li>还是<span>获取需要的信息星级和<li>标签
    if ($($event.target).is("li")) {
      star = $($event.target).attr("star");
      li = $($event.target);
    } else {
      star = $($event.target).parent().attr("star");
      li = $($event.target).parent();
    }
    var className1 = li.hasClass("active");
    var star_arr = new Array();
    star_arr = star.split(",");
    console.log(className1);
    if (className1 == false) {
      for (i = 0; i < star_arr.length; i++) {
        $scope.importance.push(star_arr[i]);
      }
    } else {
      for (i = 0; i < star_arr.length; i++) {
        $scope.importance.splice($.inArray(star_arr[i], $scope.importance), 1);
      }
    }
    $scope.getData($scope.select_date);
  };
  //点击单个国家
  $scope.countrySelect = function ($event) {
    $scope.cancelStatus = 1;
    var target = $($event.target);
    var country;
    var li;
    //有事件元素获取需要的元素与国家
    //判定点击的具体元素得到需要的li元素与国家
    if (target.is("img")) {
      //如果点击图片<img>
      country = target.attr("country");
      li = target.parent().parent();
    } else if (target.is("span")) {
      //如果单击<span>
      country = target.find("img").attr("country");
      li = target.parent();
    } else {
      //如点击<li>
      country = target.find("img").attr("country");
      li = target;
    }
    if (country == "其它") {
      //如果是其它国家，获取其它国家所包括的具体国家
      country = $scope.countrystr().otherCountry;
    }
    //在$scope.country添加或删除点击的国家
    var className1 = li.hasClass("active");
    if (className1 == false) {
      $scope.country.push(country);
    } else {
      $scope.country.splice($.inArray(country, $scope.country), 1);
    }
    //获取数据
    $scope.getData($scope.select_date);
  };
  //点击多个国家
  $scope.countrySelect1 = function ($event) {
    $scope.cancelStatus = 1;
    let className = $($event.target).hasClass("active");
    let country = $($event.target).attr("country");
    const country_arr = country.split(",");
    if (className == false) {
      for (i = 0; i < country_arr.length; i++) {
        if ($.inArray(country_arr[i], $scope.country) == -1) {
          $scope.country.push(country_arr[i]);
        }
      }
    } else {
      for (i = 0; i < country_arr.length; i++) {
        $scope.country.splice($.inArray(country_arr[i], $scope.country), 1);
      }
    }
    $scope.getData($scope.select_date);
  };
  //全选和全不选都全查
  $scope.AllorNull = function () {
    $scope.country = [];
    $scope.importance = [];
    flag = 0;
    $scope.cancelStatus = 1;
    $scope.getData($scope.select_date);
  };
  //判断是否是数组
  $scope.isArray = function (value) {
    if (angular.isArray(value)) {
      return true;
    } else {
      return false;
    }
  };
  $scope.selectClass = function (value) {
    if (value == "利空") {
      return "little";
    } else if (value == "利多") {
      return "more";
    } else {
      return "middle";
    }
  };
  $scope.init(new Date());
  $scope.$watch($scope.data, function () {
    if ($scope.data.calendar.length != 0) {
      for (var i in $scope.data.calendar) {
        console.log($scope.data.calendar[i]);
        $scope.data.calendar[i].predictValue =
          $scope.data.calendar[i].predictValue == ""
            ? "--"
            : $scope.data.calendar[i].predictValue;
      }
    }
  });
});
cfApp.controller("calendarCtrl", function ($scope, $http) {
  $scope.onlineResponse = {};
  $scope.onlineResponse.accountname = "";
  $scope.onlineResponse.email = "";
  $scope.onlineResponse.phone = "";
  $scope.onlineResponse.content = "订阅财经日历";
  $scope.onlineResponse.tickedReceiveInfo = 1;
  $scope.onlineResponse.type = "CALENDAR";
  $scope.showError = false;
  $scope.showSuccess = false;
  $scope.showButton = true;
  $scope.tickedReceiveInfo = true;
  $scope.initTracker = function () {
    var result;
    ga(function (tracker) {
      var clientId = tracker.get("clientId");
      if (typeof clientId === "undefined" || clientId === null) {
        clientId = "";
      }
      result = {
        unique: tracker.get("clientId"),
        hostname: window.location.hostname,
        referrer: document.referrer,
        href: window.location.href,
      };
    });
    return result;
  };
  //发送异步通知信息
  $scope.sendNotifyMsg = function () {
    var tracker = $scope.initTracker();
    var obj = {
      // unique: tracker.unique,
      hostname: tracker.hostname,
      referrer: tracker.referrer,
      href: tracker.href,
      driverType: 1,
      dataType: "4",
      phone: $scope.onlineResponse.phone,
      email: $scope.onlineResponse.email,
    };
    $.ajax({
      cache: false,
      type: "POST",
      url: mis_url + "/public/userLog/save",
      data: JSON.stringify(obj),
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      async: false,
      error: function (request) {
        console.log("whiteList phone check error");
      },
      success: function (data) {},
    });
  };
  //表单提交
  $scope.submit = function () {
    if (isValidated()) {
      if (!$scope.tickedReceiveInfo) {
        return;
      }
      $scope.showButton = false;
      $scope.onlineResponse.tickedReceiveInfo = 1;
      $http
        .post(mis_url + "/public/response/create.json", $scope.onlineResponse)
        .success(function (data) {
          $scope.showError = false;
          $scope.showSuccess = true;
          $scope.onlineResponse.accountname = "";
          $scope.onlineResponse.email = "";
          $scope.onlineResponse.phone = "";
        })
        .error(function (data) {
          $scope.showError = true;
          $scope.showSuccess = false;
        });
      $scope.sendNotifyMsg();
    }
    return false;
  };

  //表单验证
  function isValidated() {
    if (!$scope.onlineResponse.accountname) {
      $("#name-err").show();
      return false;
    }
    if (!$scope.onlineResponse.phone) {
      $("#phone-err").show();
      return false;
    }
    if (!$scope.onlineResponse.email) {
      $("#email-err").show();
      return false;
    }
    if (
      $("#name-err").is(":visible") ||
      $("#phone-err").is(":visible") ||
      $("#email-err").is(":visible")
    ) {
      return false;
    }
    return true;
  }
});

// end angular js
