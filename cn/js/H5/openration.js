$.extend({
  ajaxNews: function (url, options, callbackSuc, callbackErr) {
    options = $.extend(options, { _r: Math.random() });
    $.ajax({
      type: options.ajaxtype,
      url: url,
      async: false,
      data: options,
      dataType: "jsonp",
      jsonp: "jsonpCallback",
      success: function (data) {
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  //post提交加载
  loadingPost: function (url, param, callbackSuc, callbackErr) {
    param = $.extend(param, { ajaxtype: "POST" });
    $.ajaxNews(url, param, callbackSuc, callbackErr);
  },
  //加载数据
  loadIndex: function () {
    var url = mis_url + "/operationData/queryData";
    $.loadingPost(
      url,
      null,
      function (response) {
        $.dataCustome(response);
      },
      function (data) {
        console.log("请求失败");
      }
    );
  },
  dataCustome: function (response) {
    var html = "";
    var thisyear = "16";
    var line = '<img class="line" src="https://sc.cfygxz.com/source/www/aboutUs/operation-report/new-version/data_line.png">';
    html = [
      ' <li><span class="year-num">' +
        thisyear + '<span class="year">年</span>'+
        "</span><span>稳定营运</span></li>" +line,
      ' <li><span class="size">' +
        response.totalMem +
        "</span><span>总客户数</span></li>" +line,
      '                                <li><span class="size">' +
        response.tradeTime +
        "</span><span>交易次数</span></li>" +line,
      '                                <li><span class="size">' +
        response.sud +
        "</span><span>客户提款额(USD)</span></li>" +line,
      '                                <li><span class="size">' +
        response.usd +
        "</span><span>送出赠金额(USD)</span></li>",
    ].join("");
    $("#data-custorm").empty().append(html);
  },
});