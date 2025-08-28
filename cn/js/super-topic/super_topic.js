$(".topic-furture ").on("click", ".layout-content", function () {
  $(this).find(".future-popup").show();
  setTimeout(function () {
    $(".future-popup").hide();
  }, 500);
});

$.extend({
  JsonpAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, {
      _r: Math.random(),
    });
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      data: options,
      dataType: "json", // 数据类型为jsonp
      // jsonp:'jsonpCallback',
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
    $.extend(options, {
      r: Math.random(),
    });
    var stringOption = {
      apiKey:
        "aa36cadb05d8afaa896487a920df255f7771b3983dbed00e6c1b6ee6ac04356b",
    };
    let newsStringOption = { ...options, ...stringOption };
    $.ajax({
      type: type,
      url: url,
      async: false,
      data: options,
      dataType: "json", // 数据类型为jsonp
      //jsonp:'jsonpCallback',
      headers: { sign: hex_md5(this.objToKeyValue(newsStringOption)) },
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
    $.extend(options, {
      url: Math.random(),
    });
    $.ajaxk("POST", url, options, callbackSuc, callbackErr);
  },
  getAjax: function (url, options, callbackSuc, callbackErr) {
    // $.extend(options, {
    //   r: Math.random(),
    // });
    $.ajaxk("GET", url, options, callbackSuc, callbackErr);
  },
  // 获取数据 开始 结束 正在进行
  getStatus: function (length, draw) {
    var url = `${cms_url}/api/jwt/topic/topicList`;
    // var url = "http://mis.cf860.com/public/topic/topicPageList";
    var options = {
      length: length,
      draw: draw,
    };
    $.getAjax(url, options, function (data) {
      // console.log(data);
      if (data.code == "0") {
        $.dealList(data);
      }
    });
  },
  //按时间处理顺序
  dealList: function (data) {
    var data = data.data;
    var now = new Date().getTime();
    //根据对象的startTime字段进行排序
    data.sort(function (a, b) {
      return b.startTime - a.startTime;
    });
    // console.log(data);
    if (data.length < 10) {
      $(".load-more").hide();
    } else {
      $(".load-more").show();
    }
    for (var i in data) {
      if (now > data[i].endTime) {
        // console.log(data[i]);
        $(".topic-end").append($.editList(data[i]));
      } else if (now < data[i].startTime) {
        // console.log(data[i])
        $(".topic-furture").append($.editList(data[i]));
      } else {
        $(".topic-ing").append($.editList(data[i]));
      }
    }
  },

  appendPopup: function (futureTime) {
    var html = "";
    html = [
      '<div class="future-popup">别这么猴急，<span>' +
        futureTime +
        "</span>见</div>",
    ].join("");
    return html;
  },

  // 编辑内容
  editList: function (data) {
    var html = "";
    var hideFlag = "none";
    var bgColor, staC, bgImg, url, realUrl;
    //状态中文字
    staC = $.status(data);
    //状态英文color
    bgColor = $.statuss(staC);
    //得到跳转链接
    url = $.statusu(staC, data);
    realUrl = "window.location.href='" + url + "'";
    //  图片
    bgImg = data.imgUrlDetail;
    bgImg = bgImg.replace("ivyat.com", "qwerdfa.com");
    var stime = $.dateFormat(data.startTime);
    // var total = parseInt(data.supportCount) + parseInt(data.oppositionCount);
    const total = data.topicNumber
    html += [
      "<a href='javascript:void(0)'  class=\"layout-content\">",
      '                        <div class="item-1"  onclick= ' +
        realUrl +
        " style='background: url(" +
        bgImg +
        ")  ; background-size: 345px 200px;'>",
      '                            <div class="status ">',
      '                                <div class=" label ' +
        bgColor +
        '">' +
        staC +
        "</div>",
      "                            </div>",
      '                            <div class="count">',
      '                                <div class="count-content">帖子数: <span style="padding-right:15px">' +
        data.totalPosts +
        "</span>    参与人: <span>" +
        total +
        "</span></div>",
      "                            </div>",
      "                        </div>",
      '                        <div class="item-2">',
      '                            <div class="news-title">' +
        data.title +
        "</div>",
      '                            <div class="news-time">' + stime + "</div>",
      "                        </div>",
      '<div class="future-popup" >别这么猴急，<span>' +
        stime +
        "</span>见</div>",
      "                    </a>",
    ].join("");
    return html;
  },
  loadMore: function (pageNo) {
    $(".load-more").click(function () {
      pageNo = pageNo + 1;
      $.getStatus(12, pageNo);
    });
  },
  objToKeyValue: function (obj) {
    var arr = [];
    var str = [];
    for (var name in obj) {
      //存下对象的key值
      arr.push(name);
    }
    arr.sort(); //对象key值排序

    for (var i = 0, j = arr.length; i < j; i++) {
      //拼接 key=value
      str.push(arr[i] + "=" + obj[arr[i]]);
    }

    return str.join("&"); //返回 key1=value1&key2=value2 ...
  },
});
