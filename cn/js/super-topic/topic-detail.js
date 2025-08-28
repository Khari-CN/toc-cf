// 我要发言
$(".talk-btn").click(function () {
  if (!$.isLogin()) {
    $("#loginKuang").show();
  } else {
    // $.hasLogin();
    $.getData("true");
    var text = $("#area").val();
    $.voitSuccess(text);
  }
});
// 输入留言
$("#area").keyup(function () {
  // console.log($(this).val());
  var areaValue = $(this).val();
  $.reduce($.getTextLength(areaValue));
});

$(".point-wrapper .overlay").click(function () {
  $(".point-wrapper").hide();
});
var customerTel, customerNo;
$.extend({
  JsonpAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, { _r: Math.random() });
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      data: options,
      dataType: "jsonp", // 数据类型为jsonp
      jsonp: "jsonpCallback",
      beforeSend: function () {
        $("#loading").html(`<img src='${www_url}/static/img/jiazai.gif' />`); //在后台返回success之前显示loading图标
      },
      success: function (data) {
        //console.log(data);
        $("#loading").hide();
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        $("#loading").hide();
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  //通用ajax请求
  ajaxk: function (type, url, options, callbackSuc, callbackErr) {
    $.ajax({
      type: type,
      url: url,
      async: false,
      data: options,
      dataType: "json", // 数据类型为jsonp
      //jsonp:'jsonpCallback',
      success: function (data) {
        //console.log(data);
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  postAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, { url: Math.random() });
    $.ajaxk("POST", url, options, callbackSuc, callbackErr);
  },
  getAjax: function (url, callbackSuc, callbackErr) {
    $.extend(options, { url: Math.random() });
    $.ajaxk("GET", url, "", callbackSuc, callbackErr);
  },
  //获取cookie
  cookie: function (name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },
  voitSuccess: function (text) {
    // var url = "http://mis.cf860.com/public/topic/topicAnswer";
    var url = `${mis_url}/public/topic/topicAnswer`;
    var id = $.getUrlParam("topicId");
    var number = $.cookie("customerNo");
    var options = {
      customerNo: number,
      remark: text,
      topicId: id,
    };
    $.postAjax(url, options, function (data) {
      //console.log(data);
      if (data.code == 200) {
        $.cookie("clicked", id);
        var text = data.msg;
        $(".talk-box .info").show();
        $("#area").val("");
        setTimeout(function () {
          $(".talk-box .info").hide();
        }, 1000);
      }
    });
  },
  loginInfo: function () {
    var url = `${mis_url}/cfd/fxlogin`;
    var options = {
      /* customerNumber:"81015540",
             password:"ct170424",*/
      customerNumber: $("#phone").val(),
      password: $("#upwd").val(),
      platform: "GTS2",
      actId: "1",
    };
    return {
      url: url,
      options: options,
    };
  },
  //未登录
  login: function () {
    $("#loading").show();
    var url = $.loginInfo().url;
    var options = $.loginInfo().options;
    $.JsonpAjax(url, options, function (data) {
      if (data.code == 200) {
        $.loginSucc(data);
      } else {
        $(".error-info").show().html(data.ch_msg);
      }
    });
  },
  //已经登录
  hasLogin: function () {
    var url = $.loginInfo().url;
    var options = $.loginInfo().options;
    $.JsonpAjax(url, options, function (data) {
      if (data.code == 200) {
        $.loginSucc(data);
      } else {
        $(".error-info").show().html(data.ch_msg);
      }
    });
  },
  loginSucc: function (data) {
    $.cookie("login", "success");
    $("#loginKuang").hide();
    $.succHandel(data);
  },
  succHandel: function (data) {
    customerTel = data.ch_msg.MOBILE_PHONE_NO;
    customerNo = data.ch_msg.customerNumber;
    // 将手机号码存进cookie里面，多次发声
    $.cookie("customerTel", customerTel);
    $.cookie("customerNo", customerNo);
    $.getData("true");
  },
  //是否登陆
  isLogin: function () {
    var cookieLogin = $.cookie("login");
    // console.log(cookieLogin);
    if (cookieLogin == null || cookieLogin == "") {
      //弹出登录框
      return false;
    }
    return true;
  },
  //是否点击过
  isClicked: function () {
    var cookieClicked = $.cookie("clicked");

    if (cookieClicked == null || cookieClicked == "") {
      return true;
    } else {
      $(".btn").addClass("grey").attr("disabled", "disabled");
    }
  },
  //获取字符长度
  getTextLength: function (text) {
    var length = 0;
    for (var i = 0; i < text.length; i++) {
      length++;
    }
    return length;
  },
  //数字减少
  reduce: function (length) {
    if (length > 50) {
      $("#area").attr("disabled", "disabled");
      return;
    }
    $(".left-count span").html(length);
  },
  limited: function (areaValue) {
    $("#area").on("input propertychange", function () {
      var $this = $(this),
        _val = $this.val();
      if (areaValue >= 60) {
        $this.val(_val.substring(0, 60));
      }
    });
  },
  //获取url中的参数
  getUrlParam: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  },
  //获取数据 开始 结束 正在进行
  getData: function (flag) {
    $.ajax({
      type: "GET",
      // url :  "http://mis.cf860.com/public/topic/topicPageList",
      url: `${mis_url}/public/topic/topicPageList`,
      dataType: "json",
      success: function (res, status) {
        if (status == "success") {
          $.editAll(res);
          $.detailList(res);
          if (flag) {
            $.editAll(res, flag);
          }
        }
      },
    });
  },
  swiperMethod: function () {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 30,
    });
  },
  appendCustomerIdea: function () {
    var htmlContent, tel;
    // 将输入的内容 和手机号码append 在 slider后面 待接口
    htmlContent = $("#area").val();
    customerTel = $.cookie("customerTel");
    // console.log(customerTel);
    //截取手机号码
    tel = customerTel.replace(/^(\d{4})\d{4}(\d+)/, "$1****$2");
    // console.log(tel)
    // console.log(htmlContent);
    return { name: tel, identity: htmlContent };
  },
  //编辑数据
  editAll: function (data, flag) {
    var imgUrl,
      topicTitle,
      stime,
      topicStract,
      topicDetail,
      bigBoss,
      bigIdea,
      consumerIdea,
      debate;
    var str = "";
    //接收URL中的参数booksId
    var id = $.getUrlParam("topicId");
    var cookieClicked = $.cookie("clicked");
    if (cookieClicked !== id) {
      $.cookie("clicked", "", { expires: -1 });
    }
    // console.log(id);
    var data = data.data;
    for (var i in data) {
      if (id == data[i].id) {
        // console.log(id);
        // console.log(data[i]);
        imgUrl = data[i].imgUrl;
        topicTitle = data[i].title;
        stime = $.dateFormat(data[i].startTime);
        topicStract = data[i].topicAbstract;
        topicDetail = data[i].topicDetail;
        debate = $.editDebate(data[i]);
        imgUrl = imgUrl.replace("ivyat.com", "qwerdfa.com");
        // console.log(debate);
        $(".detail-img")
          .empty()
          .append('<img src="' + imgUrl + '" alt="">');
        $(".detail-title")
          .empty()
          .append(
            ' <div class="news-title">' +
              topicTitle +
              '</div> <div class="news-time">' +
              stime +
              "</div>"
          );
        // $(".detail-stract").empty().html(topicStract);
        $(".open-title").empty().html(topicStract);
        $(".situ-content .situ-detail").empty().html(topicDetail);

        $.swiperMethod();

        if (cookieClicked == id && $.isLogin()) {
          var grey, newDebate;
          grey = "grey";
          newDebate = $.editDebate(data[i], grey);
          $(".compact").empty().append(newDebate);
        } else {
          $(".compact").empty().append(debate);
        }
        $.voitPoll();
        var newsJson = data[i].newsJson;
        if (typeof newsJson == "undefined" || newsJson == "") {
          $(".news-wrapper").hide();
        } else {
          var newsData = JSON.parse(newsJson);
          $(".news-wrapper").show();
          $.newsData(newsData);
        }
      }
    }
  },

  // 辩论编辑
  editDebate: function (data, grey) {
    var str = "";
    var pointTitle, supportIdea, opositeIdea, supportPoll, opositePoll;
    pointTitle = data.voteView;
    supportIdea = data.supportCopy;
    opositeIdea = data.oppositionCopy;
    supportPoll = data.supportCount + data.supportCountReal;
    opositePoll = data.oppositionCount + data.oppositionCountReal;
    str = [
      [
        ' <div class="title">' + pointTitle + "</div>",
        '            <div class="compact-content">',
        '                <div class="compact-left">',
        '                   <div class="item-1">',
        '                       <span class="red">会:</span>',
        "                       " + supportIdea + "",
        "                   </div>",
        '                    <div class="item-2">',
        '                        <div class="btn ' +
          grey +
          "\" data-type='support'><span></span></div>",
        '                        <div class="count"><span >' +
          supportPoll +
          "</span>票</div>",
        "                    </div>",
        "                </div>",
        '                <div class="compact-right">',
        '                    <div class="item-1">',
        '                        <span class="blue">不会:</span>',
        "                        " + opositeIdea + "",
        "                    </div>",
        '                    <div class="item-2">',
        '                        <div class="btn ' +
          grey +
          "\" data-type='oppose'><span></span></div>",
        '                        <div class="count"><span >' +
          opositePoll +
          "</span>票</div>",
        "                    </div>",
        "                </div>",
        "            </div>",
      ].join(""),
    ];

    return str;
  },
  splitNeedData: function (data) {
    var split = data.split("#");
    var name, identity, idea, teachImg;
    var arr = [];
    for (var i in split) {
      name = split[i].split("&")[0];
      identity = split[i].split("&")[1];
      idea = split[i].split("&")[2];
      teachImg = split[i].split("&")[3];
      arr.push({
        name: name,
        identity: identity,
        idea: idea,
        teachImg: teachImg,
      });
    }
    return arr;
  },
  //按时间处理顺序
  detailList: function (data) {
    var data = data.data;
    //根据对象的startTime字段进行排序
    data.sort(function (a, b) {
      return b.startTime - a.startTime;
    });
    var arr = [];
    var now = new Date().getTime();
    for (var i in data) {
      if (now > data[i].endTime) {
        // console.log(data[i]);
        arr.push(data[i]);
      }
    }
    arr = arr.slice(0, 4);
    $("#detail-hff").empty().append($.editList(arr));
    $.swiperMethod();
  },
  // 编辑内容
  editList: function (data) {
    var html = "";
    var bgColor, staC, bgImg, url;
    for (var i in data) {
      // console.log(data[i])
      //状态中文字
      staC = $.status(data[i]);
      //状态英文color
      bgColor = $.statuss(staC);
      //得到跳转链接
      url = $.statusu(staC, data[i]);
      //  图片
      bgImg = data[i].imgUrl;
      bgImg = bgImg.replace("ivyat.com", "qwerdfa.com");
      html += [
        ' <div class="swiper-slide">',
        '                   <a href="' + url + '" class="item-1">',
        '                       <img src="' + bgImg + '" alt="">',
        '                       <span class="future-label ' +
          bgColor +
          '">' +
          staC +
          "</span>",
        "                   </a>",
        "               </div>",
      ].join("");
    }
    return html;
  },
  //投票
  voitPoll: function () {
    $(".btn").click(function () {
      if (!$.isLogin()) {
        $("#loginKuang").show();
        return;
      }
      var id = $.getUrlParam("topicId");

      if ($.cookie("clicked") == id && $.isLogin()) {
        $(".voited-popup").show();
        setTimeout(function () {
          $(".voited-popup").hide();
        }, 1000);
        return;
      }
      var point = $(this).attr("data-type");
      var opType;
      if ($.isClicked()) {
        var count = Number($(this).siblings().find("span").html());
        $(this)
          .siblings()
          .find("span")
          .html(count + 1);
        $(".btn").addClass("grey").attr("disabled", "disabled");

        if (point == "support") {
          opType = 1;
        } else if (point == "oppose") {
          opType = 2;
        }
        $.changeVoit(opType);
      }
    });
  },
  changeVoit: function (opType) {
    // var url = "http://mis.cf860.com/public/topic/topicAnswer";
    var url = `${mis_url}/public/topic/topicAnswer`;
    var id = $.getUrlParam("topicId");
    var customerNo = $.cookie("customerNo");
    var options = {
      customerNo: customerNo,
      opType: opType,
      topicId: id,
    };
    $.postAjax(url, options, function (data) {
      //console.log(data);
      if (data.code == 200) {
        $.cookie("clicked", id);
      }
    });
  },
  newsData: function (data) {
    var str = "";
    for (var i in data) {
      str += [
        '  <li><a href=" ' +
          data[i].url +
          "\" target='_blank'><span>" +
          data[i].title +
          "</span><p>>>></p></a></li>",
      ].join("");
    }
    $("#newsList").empty().append(str);
  },
});
