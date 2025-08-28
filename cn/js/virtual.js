$.extend({
    ajaxNews: function (url,options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: url,
            async: false,
            data: options,
            dataType:"json",
            success: function (data) {
                if ($.isFunction(callbackSuc))
                    callbackSuc(data);
            },
            error: function (data) {
                if ($.isFunction(callbackErr))
                    callbackErr(data);
            }
        });
    },
    //post提交加载
    loadingPost: function (url,param, callbackSuc, callbackErr) {
        param = $.extend(param, {"ajaxtype": "GET"});
        $.ajaxNews(url,param, callbackSuc, callbackErr);
    },
    appendStr: function () {
        var url = "/cn/product/virtual.json";
        $.ajaxNews(url, null, function (data) {
            var data = data.result;
            var length = data.length;
            var str = '';
            for (var i = 0; i < length; i++) {
                var href = "/cn/product/" + data[i].url;
                str += [
                    "<a href=" + href + " target=\"_blank\">",
                    "   <div class=\"vir-list\">",
                    "       <img src=\"/source/www/product/virtual/icon.png\"/>",
                    "       <span>" + data[i].title + "</span>",
                    "   </div>",
                    "</a>"
                ].join("");
            }
            ;
            $(".study").empty().append(str);
        })
    }
});