$.extend({
    ajaxNews: function (url,options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: url,
            async: false,
            data: options,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
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
        param = $.extend(param, {"ajaxtype": "POST"});
        $.ajaxNews(url,param, callbackSuc, callbackErr);
    },
    //加载数据
    loadIndex:function(){
        var url = mis_url +"/operationData/queryData";
        $.loadingPost(url,null,function (response) {
            console.log(response);
            $.dataCustome(response)

        },function (data) {
            console.log("请求失败");
        })

    },

    dataCustome:function (response) {
        var html = '';
        html = [" <li><span class=\"fontsize\">"+ response.totalMem +"</span><span>总客户数（人）</span></li>",
            "                        <li><span class=\"fontsize\">"+ response.tradeTime +"</span><span>交易次数（次）</span></li>",
            "                        <li><span class=\"fontsize\">"+ response.sud +"</span><span>客户提款额（USD）</span></li>",
            "                        <li><span class=\"fontsize\">"+response.usd +"</span><span>送出赠金额（USD）</span></li>"].join("");
        $("#data-custorm").empty().append(html)
    }
})