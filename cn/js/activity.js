$.extend({
    //通用ajax请求
    ajaxk:function (type,url,options, callbackSuc, callbackErr) {
        $.ajax({
            type: type,
            url: url,
            async: false,
            data: options,
            dataType: "json",// 数据类型为jsonp
            //jsonp:'jsonpCallback',
            success: function (data) {
                //console.log(data);
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function (data) {
                console.log("请求失败，url :" + url);
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    postAjax:function(url,options, callbackSuc, callbackErr){
        $.ajaxk("POST",url,options, callbackSuc, callbackErr);
    },
    getAjax:function(url,callbackSuc, callbackErr){
        $.ajaxk("GET",url,"", callbackSuc, callbackErr);
    },
    //加载数据
    loadData:function () {
        $('.reload').click(function () {
            var time=$("#content .padding-content").eq($("#content .padding-content").length-1).find(".date").text();
            var cTime = new Date(time)
            var url = "/news/v2/more/110";
            var options = {
                "_r":Math.random(),
                ctime:cTime.getTime()
            };
            $.postAjax(url,options, function(data){
                if(data.code == 200){
                    $.initData(data.ch_msg);
                }
            });
        });
    },
    //初始化活动列表页
    initActivity:function () {
        //清空原始数据
        $("#content").html("");
        var url = www_url+"/news/v2/more/110";
        var options = {
            "_r":Math.random()
        };
        $.postAjax(url,options, function(data){
            if(data.code == 200){
                $.initData(data.ch_msg);
            }
        });
    },
    //得到请求参数并生成html
    initData:function (data) {
        if(data.length<10){
            $('.reload').hide()
        }else {
            $('.reload').show();
        }
        var str = '';
        var total = data.length > 10 ? 10 : data.length;
        for(var i=0;i<total;i++){
            var url = "/cn/about/activity/activity-detailed.html#" + data[i].id;
            data[i].ctime = $.dateFormat(data[i].ctime);
            str += ["<div class=\"col-md-12 padding-content\">",
                    "    <div class=\"col-md-2 widt-colum1\">",
                    "        <img src=\""+data[i].image+"\">",
                    "    </div>",
                    "    <div class=\"col-md-10 widt-colum2\">",
                    "        <a href=\""+url+"\" class=\"title-content\">"+data[i].title+"</a>",
                    "        <p class=\"date\">"+data[i].ctime+"</p>",
                    "        <div class=\"des-content\">"+data[i].summary+"<a href=\""+url+"\" class=\"link\"></a></div>",
                    "   </div>",
                    "</div>"].join("");
        };
        $("#content").append(str);
    },
    //格式化日期
    dateFormat:function (longTypeDate) {
        var dateType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateType = date.getFullYear() + "." + $.getFullPart(date.getMonth() + 1) + "." + $.getFullPart(date.getDate());
        return dateType;
    },
    getFullPart:function (day) {
        return day < 10 ? "0" + day : day;
    },
});
