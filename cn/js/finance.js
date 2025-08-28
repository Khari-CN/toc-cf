$.extend({
  //通用ajax请求
  ajaxk: function (type, url, options, callbackSuc, callbackErr) {
    $.ajax({
      type: type,
      url: url,
      async: false,
      data: options,
      headers: { isAjax: "true" },
      dataType: "json", // 数据类型为jsonp
      //jsonp:'jsonpCallback',
      success: function (data) {
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  postAjax: function (url, callbackSuc, callbackErr) {
    $.ajaxk("POST", url, "", callbackSuc, callbackErr);
  },
  getAjax: function (url, options, callbackSuc, callbackErr) {
    $.ajaxk("GET", url, options, callbackSuc, callbackErr);
  },
  getType: function () {
    //得到浏览器url地址#后的字符串（httt://../../..#..）
    var type = window.location.hash.substring(1);
    return type;
  },
  getUrl: function (key) {
    var value = $.getType(key);
    if (value.indexOf("news") != -1) {
      $(".title-banner").html("环球新闻");
      // $(".sub-title-news").html("实时同步权威财经机构资讯");
      $("#commentry").html("环球新闻");
      return {
        moreType: 9119, //代表加载的类型是新闻
      };
    } else {
      $(".title-banner").html("专家评论");
      // $(".sub-title-news").html("每天由" + CF_TEXT + "专业团队对产品及行情进行分析");
      $("#commentry").html("专家评论");
      return {
        moreType: 9107, //代表加载的类型是专家评论
      };
    }
  },
  //获取初始化环球新闻或专家评论
  initNews: function () {
    //清空原始数据
    $("#news_more").html("");
    var url = info_url + "/1/api/article/getArticleAllList";
    var options = {
      firstTypeId: $.getUrl("type").moreType, //代表及时新闻
    };
    $.getAjax(url, options, function (data) {
      if (data.code == 0) {
        $.initData(data.data);
      }
    });
    //初始化广告位
    var imgUrl = cms_url + "/api/ad/action/3?_r=" + Math.random();
    $.getAjax(imgUrl, $.initImg);
  },
  //初始化广告位(返回内容为String)
  initImg: function (data) {
    dataJson = JSON.parse(data);
    //console.log(dataJson);
    for (var i in dataJson) {
      if (dataJson[i].description.trim() == "左") {
        $("#leftImg").attr("linkUrl", dataJson[i].attr.image_link);
        $("#leftImg").find("img").attr("src", dataJson[i].attr.image_url);
      } else {
        $("#rightImg").attr("linkUrl", dataJson[i].attr.image_link);
        $("#rightImg").find("img").attr("src", dataJson[i].attr.image_url);
      }
    }
  },
  //加载数据
  loadData: function () {
    $("#more").click(function () {
      var time = $("#news_more .col-md-12")
        .eq($("#news_more .col-md-12").length - 1)
        .find("p")
        .text();
      var cTime = new Date(time).getTime();
      var url = info_url + "/1/api/article/getArticleAllList";
      var options = {
        firstTypeId: $.getUrl("type").moreType, //代表及时新闻
        // ctime: cTime,
      };
      $.getAjax(url, options, function (data) {
        if (data.code == 0) {
          $.initData(data.data);
        }
      });
    });
  },
  //点击更多
  loadMore: function () {
    $.loadData();
  },
  //点击广告位跳转（event：点击事件本身）
  imgLink: function (event) {
    window.location.href = $(event.target).parent().attr("linkUrl");
  },
  //得到请求参数并生成html
  initData: function (data) {
    var str = "";
    $.each(data, function (index, array) {
      var url =
        "/cn/info/news/news-detailed.html#" +
        $.getType() +
        "/" +
        array.articleId;
      array.ctime = $.dateFormat(array.ctime);
      str +=
        '<div id="' +
        img_url +
        '" class="col-md-12"><div class="col-md-2 widt-colum1"><img src="' +
        array.imageUrl +
        '"></div>';
      str +=
        '<div class="col-md-10 widt-colum2"><div class="tit-time clearfix"><a href="' +
        url +
        '" desUrl="newdetail" class="title-content">' +
        array["title"] +
        '</a><p class="date"><span class="pd-r">' +
        array["ctime"] +
        "</span></p></div>";
      str += "</div>";
      str += "</div>";
    });
    $("#news_more").append(str);
  },
  //格式化日期
  dateFormat: function (longTypeDate) {
    var dateType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateType =
      date.getFullYear() +
      "-" +
      $.getFullPart(date.getMonth() + 1) +
      "-" +
      $.getFullPart(date.getDate()) +
      " " +
      $.getFullPart(date.getHours()) +
      ":" +
      $.getFullPart(date.getMinutes()) +
      ":" +
      $.getFullPart(date.getSeconds());
    return dateType;
  },
  dateForMatMinue: function (longTypeDate) {
    var date = new Date();
    date.setTime(longTypeDate);
    return (
      $.getFullPart(date.getHours()) + ":" + $.getFullPart(date.getMinutes())
    );
  },
  dateForMatDay: function (longTypeDate) {
    var date = new Date();
    date.setTime(longTypeDate);
    return date.getMonth() + 1 + "月" + date.getDate();
  },
  getFullPart: function (day) {
    return day < 10 ? "0" + day : day;
  },
});
