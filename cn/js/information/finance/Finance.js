//遮罩
function zhezhao() {
  var html = '<div class="shape_wrap"  style="font-size:0.2rem; text-align:center">';
  html += '	<div class="shape_container">';
  html += '		<div class="shape"></div>';
  html += "<span>正在加载中...</span>";
  html += "	</div>";
  html += "</div>";
  return html;
}

//没有数据时的提示，提示内容自定义
function nodata(str) {
  var html = '<div  id="unvacationHtml">';
  html += '<div id="unvacation">';
  html += '	<img loading="lazy" src="/images/finance/123.png"/>';
  html += '	<p align="center">' + str + "</p>";
  html += "</div>";
  html += "</div>";
  $("#PageData").append(html);
}

$(document).ready(function () {
  var country = "";
  var level = "";

  $(".m .l-wrap")
    .children()
    .on("click", ".J_riliFilterBtn", function () {
      $(".main_data").show();
      $(".opacity3").show();
    });
  $(".m .l-wrap")
    .children()
    .on("click", ".main_ok", function () {
      $(".opacity3").hide();
      var results = $(".cur");
      country = "";
      level = "";
      for (i = 0; i < results.length; i++) {
        var result_country = results[i].innerText;
        result_country = result_country.replace(/\ +/g, "");
        result_country = result_country.replace(/[ ]/g, "");
        result_country = result_country.replace(/[\r\n]/g, "");
        if ("" != result_country) {
          if (result_country == "美国") result_country = "美元,美国";
          else if (result_country == "澳大利亚")
            result_country = "澳元,澳大利亚";
          else if (result_country == "中国")
            result_country = "人民币,中国,台湾,台湾地区,香港,中国香港,香港特区";
          else if (result_country == "日本") result_country = "日元,日本";
          else if (result_country == "加拿大") result_country = "加元,加拿大";
          else if (result_country == "欧盟")
            result_country = "欧洲,欧元,欧元区,欧盟";
          else if (result_country == "新西兰") result_country = "纽元,新西兰";
          else if (result_country == "英国") result_country = "英国,英镑";
          if (undefined != country && country.length > 0) {
            country += "," + result_country;
          } else {
            country = result_country;
          }
          if (country.indexOf("其他") >= 0) {
            for (var k = 0; k < countrys_other.length; k++) {
              if (undefined != country && country.length > 0) {
                country += "," + countrys_other[k].country;
              } else {
                country = countrys_other[k].country;
              }
            }
          }
        } else {
          var str = results[i].innerHTML;
          var result_level;
          if (str.indexOf('nature="1"') > 0) {
            result_level = "1";
          } else if (str.indexOf('nature="2"') > 0) {
            result_level = "2";
          } else if (str.indexOf('nature="3"') > 0) {
            result_level = "3";
          }
          if (undefined != level && level.length > 0) {
            level += "," + result_level;
          } else {
            level = result_level;
          }
        }
      }
      var PageType = $(".active");
      PageType = PageType[0].innerText;
      for (var k = 0; k < PageTypes.length; k++) {
        if (PageType == PageTypes[k].type) {
          PageType = PageTypes[k].val;
        }
      }
      var releaseTime = $(".swiper-slide.active2");
      releaseTime = releaseTime[0].innerText.substring(3, 5);
      nowTime = new Date();
      var nowMonth = $(".swiper-slide.active2")[0].children[0].innerHTML;
      var year = nowTime.getFullYear();
      if (nowMonth < 10) {
        nowMonth = "0" + nowMonth;
      }
      releaseTime = year + "-" + nowMonth + "-" + releaseTime;
      var time = new Date(new Date(releaseTime).toLocaleDateString('zh')).getTime();
      // console.log('time1',time)
      // time = isNaN(time) ? new Date(new Date().toLocaleDateString()).getTime() : time
      // console.log('time2',time)
      var obj = new Object();
      obj.time = time;
      // obj.dataTypeCon = 1;
      obj.PageType = PageType;
      obj.country = country;
      obj.level = level;
      obj.type = "zh_CN";
      getData(obj);
      $(".main_data").slideToggle();
    });
  var dataTypeCon = 1;
  var country = country;
  var level = level;
  var months = [
    { month: "一月", value: "1" },
    { month: "二月", value: "2" },
    { month: "三月", value: "3" },
    { month: "四月", value: "4" },
    { month: "五月", value: "5" },
    { month: "六月", value: "6" },
    { month: "七月", value: "7" },
    { month: "八月", value: "8" },
    { month: "九月", value: "9" },
    { month: "十月", value: "10" },
    { month: "十一月", value: "11" },
    { month: "十二月", value: "12" },
  ];
  var weeks = [
    { week: "周日", value: "0" },
    { week: "周一", value: "1" },
    { week: "周二", value: "2" },
    { week: "周三", value: "3" },
    { week: "周四", value: "4" },
    { week: "周五", value: "5" },
    { week: "周六", value: "6" },
  ];
  var demoDate;
  $("#demo")
    .mobiscroll()
    .calendar({
      //这里是date，还有time，datetime不在本文范围。
      theme: "mobiscroll", //样式，可根据操作系统不同设置不一样的样式
      lang: "zh",
      display: "top",
      mode: "scroller",
      dateFormat: "yyyy-mm-dd",
      onBeforeShow: function (inst) {},
      endYear: new Date().getFullYear(), //可根据当前年份设置
      dayText: "日",
      monthText: "月",
      yearText: "年",
      headerText: function (valueText) {
        var array = valueText.split("-");
        demoDate = new Date(array[0], array[1] - 1, array[2]);
        var time = new Date(new Date(valueText).toLocaleDateString('en')).getTime();
        // console.log('hello2',new Date(valueText).toLocaleDateString('en'));
        // console.log('time3',time)
        time = isNaN(time) ? new Date(new Date().toLocaleDateString('en')).getTime() : time
        // console.log('time4',time)
        var obj = new Object();
        obj.time = time;
        // obj.dataTypeCon = dataTypeCon;
        var PageType = $(".active");
        PageType = PageType[0].innerText;
        for (var k = 0; k < PageTypes.length; k++) {
          if (PageType == PageTypes[k].type) {
            PageType = PageTypes[k].val;
          }
        }
        // console.log( 'valueText',valueText)
        // console.log( 'demoDate',demoDate)
        // console.log('PageType', PageType);
        PageType = 1;
        obj.PageType = PageType;
        obj.country = country;
        obj.level = level;
        obj.type = "zh_CN";
        var releaseTime = $(".swiper-slide.active2");
        releaseTime = releaseTime[0].innerText.substring(3, 5);
        nowTime = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          releaseTime
        );
        /*if (demoDate > nowTime || demoDate < nowTime) {
                dayfomat(demoDate);
                getData(obj);
            }*/
        dayfomat(demoDate);
        console.log('detect');
        getData(obj);
      },
    });
  var PageType;
  var countrys = [
    { src: "/images/finance/icon_4.png", country: "澳大利亚" },
    { src: "/images/finance/icon_4.png", country: "澳元" },
    { src: "/images/finance/icon_5.png", country: "美国" },
    { src: "/images/finance/icon_5.png", country: "美元" },
    { src: "/images/finance/icon_3.png", country: "中国" },
    { src: "/images/finance/icon_3.png", country: "人民币" },
    { src: "/images/finance/hg.png", country: "韩国" },
    { src: "/images/finance/rb.png", country: "日本" },
    { src: "/images/finance/rb.png", country: "日元" },
    { src: "/images/finance/yg.png", country: "英国" },
    { src: "/images/finance/yg.png", country: "英镑" },
    { src: "/images/finance/oz.png", country: "欧元区" },
    { src: "/images/finance/oz.png", country: "欧元" },
    { src: "/images/finance/oz.png", country: "欧洲" },
    { src: "/images/finance/oz.png", country: "欧盟" },
    { src: "/images/finance/jnd.png", country: "加拿大" },
    { src: "/images/finance/jnd.png", country: "加元" },
    { src: "/images/finance/rs.png", country: "瑞士" },
    { src: "/images/finance/dg.png", country: "德国" },
    { src: "/images/finance/fg.png", country: "法国" },
    { src: "/images/finance/tw.png", country: "台湾" },
    { src: "/images/finance/tw.png", country: "台湾地区" },
    { src: "/images/finance/xby.png", country: "西班牙" },
    { src: "/images/finance/xg.png", country: "香港" },
    { src: "/images/finance/xg.png", country: "中国香港" },
    { src: "/images/finance/xg.png", country: "香港特区" },
    { src: "/images/finance/xxl.png", country: "新西兰" },
    { src: "/images/finance/xxl.png", country: "纽元" },
    { src: "/images/finance/ydl.png", country: "意大利" },
    { src: "/images/finance/rd.png", country: "瑞典" },
    { src: "/images/finance/yuenan.png", country: "越南" },
    { src: "/images/finance/yn.png", country: "印尼" },
    { src: "/images/finance/pty.png", country: "葡萄牙" },
    { src: "/images/finance/adl.png", country: "奥地利" },
    { src: "/images/finance/xjp.png", country: "新加坡" },
    { src: "/images/finance/cx.png", country: "朝鲜" },
    { src: "/images/finance/bx.png", country: "巴西" },
    { src: "/images/finance/xl.png", country: "希腊" },
    { src: "/images/finance/yd.png", country: "印度" },
    { src: "/images/finance/Finland.png", country: "芬兰" },
    { src: "/images/finance/Netherlands.png", country: "荷兰" },
    { src: "/images/finance/Poland.png", country: "波兰" },
    { src: "/images/finance/Denmark.png", country: "丹麦" },
    { src: "/images/finance/Mexico.png", country: "墨西哥" },
    { src: "/images/finance/European-Union.png", country: "欧盟" },
    { src: "/images/finance/Hungary.png", country: "匈牙利" },
    { src: "/images/finance/Thailand.png", country: "泰国" },
    { src: "/images/finance/Colombia.png", country: "哥伦比亚" },
    { src: "/images/finance/Israel.png", country: "以色列" },
    { src: "/images/finance/Ireland.png", country: "爱尔兰" },
    { src: "/images/finance/Russian.png", country: "俄罗斯" },
    { src: "/images/finance/cf-icon.png", country: "unknown" },
  ];
  var countrys_other = [
    { country: "韩国" },
    { country: "德国" },
    { country: "法国" },
    { country: "西班牙" },
    { country: "意大利" },
    { country: "瑞典" },
    { country: "越南" },
    { country: "印尼" },
    { country: "葡萄牙" },
    { country: "奥地利" },
    { country: "新加坡" },
    { country: "朝鲜" },
    { country: "巴西" },
  ];
  var PageTypes = [
    { val: "1", type: "数据" },
    /*{val: "2", type: "事件"},
        {val: "3", type: "假期"}*/
  ];
  function dayfomat(demoDate) {
    var nowTime;
    if (demoDate == undefined) {
      nowTime = new Date();
    } else {
      nowTime = demoDate;
    }
    var nowMonth = nowTime.getMonth() + 1;
    var nowDay = nowTime.getDay();
    var nowDate = nowTime.getDate();
    var nowflag = nowDate;
    for (var k = 0; k < months.length; k++) {
      if (nowMonth == months[k].value) {
        nowMonth = months[k].month;
      }
    }
    $("#demo").text(nowMonth);
    var daysOfMonth = [];
    var week = [];
    var fullYear = nowTime.getFullYear();
    var month = nowTime.getMonth();
    var nowDates;
    /*if(nowDate==1){
         nowDates = nowDate
         }else{*/
    var nowDatesflag = nowDate;
    var lastDayOfMonth = new Date(fullYear, month + 1, 0).getDate();
    var NextNow = nowTime;
    if (nowDay == 6) {
      NextNow.setDate(NextNow.getDate() - 5);
    } else if (nowDay == 5) {
      NextNow.setDate(NextNow.getDate() - 4);
    } else if (nowDay == 4) {
      NextNow.setDate(NextNow.getDate() - 3);
    } else if (nowDay == 3) {
      NextNow.setDate(NextNow.getDate() - 2);
    } else if (nowDay == 2) {
      NextNow.setDate(NextNow.getDate() - 1);
    } else if (nowDay == 0) {
      NextNow.setDate(NextNow.getDate() - 6);
    } else {
      nowDates = nowDate;
    }
    if (nowDates == 0) {
      nowDates = nowDatesflag;
    } else if (undefined == nowDates) {
      nowDates = NextNow.getDate();
    }
    //if(nowDates<0){
    if (nowflag < 7) {
      var lastDayOfMonths = new Date(
        fullYear,
        NextNow.getMonth() + 1,
        0
      ).getDate();
      var nowDatesflag;
      if (nowDates > 0) {
        nowDatesflag = nowDates;
      } else {
        nowDatesflag = lastDayOfMonths - Math.abs(nowDates);
      }
      if (nowDatesflag == 0) {
        nowDatesflag = lastDayOfMonths;
      }
      for (var i = nowDatesflag; i <= lastDayOfMonths; i++) {
        var datas = new Object();
        datas.day = i;
        var date = new Date(fullYear, NextNow.getMonth(), i);
        datas.week = date.getDay();
        datas.month = NextNow.getMonth();
        daysOfMonth.push(datas);
      }
    }
    if (daysOfMonth.length == 0) {
      for (var i = Math.abs(nowDates); i <= lastDayOfMonth; i++) {
        var datas = new Object();
        datas.day = i;
        var date = new Date(fullYear, NextNow.getMonth(), i);
        datas.week = date.getDay();
        datas.month = NextNow.getMonth();
        daysOfMonth.push(datas);
      }
    }
    if (daysOfMonth.length < 7) {
      result = 7 - daysOfMonth.length;
      for (var i = 1; i <= result; i++) {
        var datas = new Object();
        datas.day = i;
        var date;
        if (NextNow.getMonth() == 11) {
          date = new Date(fullYear + 1, 0, i);
        } else {
          date = new Date(fullYear, NextNow.getMonth() + 1, i);
        }
        datas.week = date.getDay();
        datas.month = NextNow.getMonth() + 1;
        daysOfMonth.push(datas);
      }
    }
    $("#PageDate").html("");
    for (var i = 0; i < 7; i++) {
      var date_str = $("#dateHtml").html();
      for (var j = 0; j < weeks.length; j++) {
        if (daysOfMonth[i].week == weeks[j].value) {
          date_str = date_str.replace("week", weeks[j].week);
        }
        date_str = date_str.replace(
          "month",
          daysOfMonth[i].month + 1 > 12
            ? daysOfMonth[i].month - 11
            : daysOfMonth[i].month + 1
        );
        var day = daysOfMonth[i].day;
        if (day < 10) {
          day = "0" + day;
        }
        date_str = date_str.replace("day", day);
      }
      if (day == nowDate) {
        date_str = date_str.replace(
          "swiper-slide",
          "swiper-slide active2 swiper-slide-active"
        );
      }
      $("#PageDate").append(date_str);
    }
    var $li = $(".jin-rili_tab-list .jin-rili_tab-item");
    var $ul = $(".main-article .section4");
    $li.click(function () {
      var $this = $(this);
      var $t = $this.index();
      $this.addClass("active").siblings().removeClass("active");
      var PageType = $(".active");
      PageType = PageType[0].innerText;
      for (var k = 0; k < PageTypes.length; k++) {
        if (PageType == PageTypes[k].type) {
          PageType = PageTypes[k].val;
        }
      }
      var releaseTime = $(".swiper-slide.active2");
      releaseTime = releaseTime[0].innerText.substring(3, 5);
      nowTime = new Date();
      //var nowMonth = nowTime.getMonth() + 1
      var nowMonth = $(".swiper-slide.active2")[0].children[0].innerHTML;
      var year = nowTime.getFullYear();
      if (nowMonth < 10) {
        nowMonth = "0" + nowMonth;
      }
      releaseTime = year + "-" + nowMonth + "-" + releaseTime;
      var time = new Date(new Date(releaseTime).toLocaleDateString('zh')).getTime();
      // console.log('time4',time)
      // time = isNaN(time) ? new Date(new Date().toLocaleDateString()).getTime() : time
      var obj = new Object();
      obj.time = time;
      // obj.dataTypeCon = dataTypeCon;
      obj.PageType = PageType;
      obj.country = country;
      obj.level = level;
      obj.type = "zh_CN";
      getData(obj);
    });
    /*选择日期添加类和切换*/
    var $li = $(".jin-rili_week-list li");
    var $ul = $(".jin-rili_list");
    $li.click(function () {
      var $this = $(this);
      var $t = $this.index();
      $this.addClass("active2").siblings().removeClass("active2");
      var PageType = $(".active");
      PageType = PageType[0].innerText;
      for (var k = 0; k < PageTypes.length; k++) {
        if (PageType == PageTypes[k].type) {
          PageType = PageTypes[k].val;
        }
      }
      var releaseTime = $(".swiper-slide.active2");
      releaseTime = releaseTime[0].innerText.substring(3, 5);
      var dateTime = releaseTime;
      nowTime = new Date();
      //var nowMonth = nowTime.getMonth() + 1
      var nowMonth = $(".swiper-slide.active2")[0].children[0].innerHTML;

      var year = nowTime.getFullYear();
      if (nowMonth == 12 && releaseTime == 31 && year == 2019) {
        year = 2018;
      }
      if (nowMonth < 10) {
        nowMonth = "0" + nowMonth;
      }
      releaseTime = year + "-" + nowMonth + "-" + releaseTime;
      var time = new Date(new Date(releaseTime).toLocaleDateString('zh')).getTime();
      // console.log('time5',time)
      // time = isNaN(time) ? new Date(new Date().toLocaleDateString()).getTime() : time
      var releaseDate = new Date(year, nowMonth - 1, dateTime);
      var obj = new Object();
      obj.time = time;
      // obj.dataTypeCon = dataTypeCon;
      // obj.PageType = PageType;
      obj.PageType = "1"
      obj.country = "";
      obj.level = "";
      obj.type = "zh_CN";
      getData(obj);
    });
    /*轮播图*/
    var swiper = new Swiper(".swiper-container", {
      pagination: "null",
      paginationClickable: false,
      slidesPerView: 7,
      //      spaceBetween: 5,
      noSwiping: true,
    });
    $(".close_app").click(function () {
      $(".open_app").fadeOut();
      $(".l-main_body").css("margin-top", "50px");
      $(".Btn_app").fadeOut();
      $(this).fadeOut();
    });
  }
  //var releaseTime="2017-08-16"
  var month = $("#demo");
  month = month[0].innerText.substring(0, 1);
  $(function () {
    // console.log("1")
    /*选择日期添加类和切换*/
    var $li = $(".jin-rili_week-list li");
    var $ul = $(".jin-rili_list");
    $li.click(function () {
      var $this = $(this);
      var $t = $this.index();
      $this.addClass("active2").siblings().removeClass("active2");

      var PageType = $(".active");
      PageType = PageType[0].innerText;
      for (var k = 0; k < PageTypes.length; k++) {
        if (PageType == PageTypes[k].type) {
          PageType = PageTypes[k].val;
        }
      }

      var releaseTime = $(".swiper-slide.active2");
      releaseTime = releaseTime[0].innerText.substring(3, 5);
      nowTime = new Date();
      //var nowMonth = nowTime.getMonth() + 1
      var nowMonth = $(".swiper-slide.active2")[0].children[0].innerHTML;
      var year = nowTime.getFullYear();
      if (nowMonth < 10) {
        nowMonth = "0" + nowMonth;
      }
      releaseTime = year + "-" + nowMonth + "-" + releaseTime;
      var time = new Date(new Date(releaseTime).toLocaleDateString('zh')).getTime();
      // console.log('time6',time)
      // time = isNaN(time) ? new Date(new Date().toLocaleDateString()).getTime() : time
      var obj = new Object();
      obj.time = time;
      // obj.dataTypeCon = dataTypeCon;
      obj.PageType = PageType;
      obj.country = country;
      obj.level = level;
      obj.type = "zh_CN";
      dayfomat(demoDate);
      //page(obj,callBack);
      getData(obj);
    });

    dayfomat(demoDate);

    var PageType = $(".active");
    PageType = PageType[0].innerText;
    for (var k = 0; k < PageTypes.length; k++) {
      if (PageType == PageTypes[k].type) {
        PageType = PageTypes[k].val;
      }
    }
    var releaseTime = $(".swiper-slide.active2");
    releaseTime = releaseTime[0].innerText.substring(3, 5);
    nowTime = new Date();
    var nowMonth = $(".swiper-slide.active2")[0].children[0].innerHTML;
    var year = nowTime.getFullYear();
    if (nowMonth < 10) {
      nowMonth = "0" + nowMonth;
    }
    releaseTime = year + "-" + nowMonth + "-" + releaseTime;
    var time = new Date(new Date(releaseTime).toLocaleDateString('zh')).getTime();
    // console.log('time7',time)
    // time = isNaN(time) ? new Date(new Date().toLocaleDateString()).getTime() : time
    var obj = new Object();
    
    obj.time = time;
    // obj.dataTypeCon = dataTypeCon;
    obj.PageType = PageType;
    obj.country = country;
    obj.level = level;
    obj.type = "zh_CN";

    //dayfomat(demoDate);
    //page(obj,callBack);
    // console.log("here")
    getData(obj);
  });
  //ajax请求对象
  var xhr;
  //是否已经加载到数据
  var hasData = false;
  var timeout;
  //对于ajax请求 超时处理
  var clearZZ = function () {
    if ($.type(timeout) !== "undefined") clearTimeout(timeout);

    timeout = setTimeout(function () {
      $(".shape_wrap").remove();
      if ($.type(xhr) !== "undefined") {
        xhr.abort();
      }
      if (!hasData) {
        $("#PageData").empty();
        nodata("加载超时，请重新操作!");
      }
    }, 5000);
  };
  var getData = function (obj) {
    // console.log("obj", obj)
    hasData = false;
    $(".l-main_body").append(zhezhao());
    $(".jin-rili_list-wrap").empty();
    clearZZ();
    // console.log("param", Object.assign(obj, { timestamp: new Date().getTime() }))
    Object.assign(obj, { _r: Math.random(), companyCode: "CF" });
    xhr = $.ajax({
      type: "GET",
      url: info_url + "/v1/api/calendar/list",
      data: Object.assign(obj, { timestamp: new Date().getTime() }),
      headers: {
        isAjax: true,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      //async : false,
      dataType: "json",
      success: function (data) {
        hasData = true;
        $(".shape_wrap").remove();
        // console.log("list", data)
        queryPage(data, obj);
      },
      error: function () {
        hasData = true;
        $("#PageData").empty();
        nodata("加载出错...");
      },
    });
  };
  Date.prototype.format = function (format) {
    var o = {
      Y: this.getFullYear(), // year
      "M+": this.getMonth() + 1, // month
      "d+": this.getDate(), // day
      "h+": this.getHours(), // hour
      "m+": this.getMinutes(), // minute
      "s+": this.getSeconds(), // second
      "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
      S: this.getMilliseconds(),
      // millisecond
    };
    var week = ["日", "一", "二", "三", "四", "五", "六"];
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    if (/(E+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? i18n.common.weekpre2
            : i18n.common.weekpre1
          : "") + week[this.getDay() + ""]
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  };
  var queryPage = function (resp, obj) {
    var financeEvent = resp.data;
    financeVacation = resp.data.financeVacation;
    $("#PageData").html("");
    var html = "";
    if (obj.PageType == 1) {
      //数据
      if (financeEvent.length > 0) {
        for (var i = 0; i < financeEvent.length; i++) {
          if (
            financeEvent[i].country === "香港" ||
            financeEvent[i].country === "中国香港" ||
            financeEvent[i].country === "香港特区"
          ) {
            financeEvent[i].country = "中国香港";
          }
          var data_str = $("#dataHtml").html();
          data_str = data_str.replace("financeData_time", financeEvent[i].time);
          data_str = data_str.replace(
            "financeData_name",
            financeEvent[i].country + financeEvent[i].event
          );
          data_str = data_str.replace(
            "financeData_lastValue",
            financeEvent[i].previous
          );
          data_str = data_str.replace(
            "financeData_predictValue",
            financeEvent[i].forecast ? financeEvent[i].forecast : "--"
          );
          data_str = data_str.replace(
            "financeData_value",
            financeEvent[i].actual ? financeEvent[i].actual : "--"
          );
          var importanceLevel_pattern = /<img id="financeData_importanceLevel" src="">/gi;
          var importanceLevel = financeEvent[i].importance;
          if (importanceLevel == "低") {
            data_str = data_str.replace(
              importanceLevel_pattern,
              "<img loading='lazy' src='/images/finance/1star.png'>"
            );
          } else if (importanceLevel == "中") {
            data_str = data_str.replace(
              importanceLevel_pattern,
              "<img loading='lazy' src='/images/finance/2star.png'>"
            );
          } else {
            data_str = data_str.replace(
              importanceLevel_pattern,
              "<img loading='lazy' src='/images/finance/3star.png'>"
            );
          }
          var country_pattern = /<img id="financeData_country" src="">/gi;
          let found = `<img loading='lazy' src="${
            countrys.find((ele) => ele.country === "unknown").src
          }" />`;
          for (var k = 0; k < countrys.length; k++) {
            if (financeEvent[i].country == countrys[k].country) {
              found = "<img loading='lazy' src='" + countrys[k].src + "'>";
              break;
              //   data_str = data_str.replace(
              //     country_pattern,
              //     "<img src='" + countrys[k].src + "'>"
              //   );
            }
          }
          data_str = data_str.replace(country_pattern, found);
          html += data_str;
        }
      }
    }
    /* else if (obj.PageType == 2) {//事件

            if (financeEvent.length > 0) {
                for (var i = 0; i < financeEvent.length; i++) {
                    var event_str = $("#eventHtml").html();

                    event_str = event_str.replace("financeEvent_time", financeEvent[i].time.substring(0, 5));
                    event_str = event_str.replace("financeEvent_title", financeEvent[i].title);

                    importanceLevel = financeEvent[i].importanceLevel

                    var importanceLevel_pattern = /<img id="financeEvent_importanceLevel" src="">/gi;
                    if (importanceLevel == 1) {
                        event_str = event_str.replace(importanceLevel_pattern, "<img src='/images/finance/1star.png'>");
                    } else if (importanceLevel == 2 || importanceLevel == 3) {
                        event_str = event_str.replace(importanceLevel_pattern, "<img src='/images/finance/2star.png'>");
                    } else {
                        event_str = event_str.replace(importanceLevel_pattern, "<img src='/images/finance/3star.png'>");
                    }


                    var country_pattern = /<img id="financeEvent_country" src="">/gi;
                    for (var k = 0; k < countrys.length; k++) {
                        if (financeEvent[i].country == countrys[k].country) {
                            event_str = event_str.replace(country_pattern, "<img src='" + countrys[k].src + "'>");
                        }
                    }

                    html += event_str;
                }
            }
        } else if (obj.PageType == 3) {//假期
            if (financeVacation.length > 0) {
                for (var i = 0; i < financeVacation.length; i++) {
                    var vacation_str = $("#vacationHtml").html();
                    vacation_str = vacation_str.replace("financeVacation_title", financeVacation[i].title);
                    vacation_str = vacation_str.replace("financeVacation_date", financeVacation[i].date.substring(5, 10));
                    vacation_str = vacation_str.replace("financeVacation_region", financeVacation[i].region);


                    var country_pattern = /<img id="financeVacation_country" src="">/gi;
                    for (var j = 0; j < countrys.length; j++) {
                        if (financeVacation[i].country == countrys[j].country) {
                            vacation_str = vacation_str.replace(country_pattern, "<img src='" + countrys[j].src + "'>");
                        }
                    }
                    html += vacation_str;
                }
            }
        }*/

    if (html.length <= 0) {
      if (obj.PageType == 3) nodata("暂无假期预告");
      /*else if (obj.PageType == 2) nodata("暂无事件数据");
            else if (obj.PageType == 1) nodata("暂无数据");*/ else
        nodata("暂无数据");
      $("#unvacation").attr("align", "center");
    } else {
      $("#PageData").html(html);
    }
  };
});
