$.extend({
    //通用ajax请求
    ajaxk: function (type, url, options, callbackSuc, callbackErr) {
        $.ajax({
            type: type,
            url: url,
            async: false,
            data: options,
            headers: {isAjax: "true"},
            dataType: "json",// 数据类型为jsonp
            //jsonp:'jsonpCallback',
            success: function (data) {
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function (data) {
                console.log("请求失败，url :" + url);
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    postAjax: function (url, options, callbackSuc, callbackErr) {
        $.ajaxk("POST", url, options, callbackSuc, callbackErr);
    },
    getAjax: function (url, options, callbackSuc, callbackErr) {
        $.ajaxk("GET", url, options, callbackSuc, callbackErr);
    },

    //获取初始化环球新闻或专家评论
    initNews: function () {
        //清空原始数据
        $("#news_more").html("");
        $.postData({firstTypeId: 9107});
        //初始化广告位
        var imgUrl = cms_url+"/api/ad/action/3";
        $.getAjax(imgUrl,$.initImg);
    },
    //请求数据
    postData: function (options) {
        var url = info_url + "/1/api/article/getArticleAllList";
        $.getAjax(url, options, function (data) {
            if (data.code == 0) {
                $.initData(data.data);
            }
        });
    },
    //得到请求参数并生成html
    initData: function (data) {
        // if (data.length < 10) {
        //     $("#moreComment").hide();
        // } else {
        //     $("#moreComment").show();
        // }
        //for UAT test 
         if (data.length < 5) {
            $("#moreComment").hide();
        } else {
            $("#moreComment").show();
        }
        var str = '';
        $.each(data, function (index, array) {
            var url = "/cn/edu/analyst-detailed/analyst-detailed.html#/" + array.articleId;
            array.ctime = $.dateFormat(array.ctime);
            //动态添加便签（标签个数不确定）
            /*var keywordList = "";
            if(array['keyword'].indexOf(""+ CF_TEXT +"-专家评论-") > -1){
                var index = array['keyword'].indexOf(""+ CF_TEXT +"-专家评论-");
                var end = array['keyword'].indexOf(",",index);
                if(end <= 0){
                    end = array['keyword'].length;
                }
                var keyword = array['keyword'].substring(index,end).replace(""+CF_TEXT+"-专家评论-","");
                keywordList = "<li>"+keyword+"</li>";
            }*/
            str += ["<div class=\"col-md-12 analyst\">",
                "							<div class=\"col-md-2 widt-colum1\">",
                "								<img src=\"" + array.imageUrl + "\" alt=\"\">",
                "							</div>",
                "							<div class=\"col-md-10 widt-colum2\">",
                "								<div class=\"tit-time clearfix\">",
                "									<a href=\"" + url + "\" class=\"title-content\">" + array['title'] + "</a>",
                "									<p class=\"date\"><span class=\"pd-r\">" + array['ctime']+"</span></p>",
                "								</div>",
                /*"								<ul class=\"box-list\">",
                keywordList,
                "								</ul>",*/
                "							</div>",
                "						</div>"].join("");
        });
        $("#news_more").append(str);
    },

    //加载更多数据
    loadData: function () {
        $("#moreComment").click(function () {
            var cTime = (new Date()).getTime();
            // console.log("analyst", $(".analyst") );
            // console.log("analyst-lenght", $(".analyst").eq($(".analyst").length - 1).find("p") );
            // if ($(".analyst") && $(".analyst").length > 0 && $(".analyst").eq($(".analyst").length - 1).find("p")) {
            //     var time = $(".analyst").eq($(".analyst").length - 1).find("p").text();
            //     if (time) {
            //         cTime = (new Date(time)).getTime();
            //     }
            // }
            var keyword = $('.current').attr("keywordType");
            if (keyword == "9107") keyword = "";
            console.log("ctime",  cTime);
            var options = {
                firstTypeId: 9107,
                secondTypeId: keyword,//代表分类
                ctime: cTime
            };
            $.postData(options);
        });
    },

    //点击广告位跳转（event：点击事件本身）
    imgLink: function (event) {
        window.location.href = $(event.target).parent().attr("linkUrl");
    },
    //初始化广告位(返回内容为String)
    initImg: function (data) {
        dataJson = JSON.parse(data);
        for (var i in dataJson) {
            if (dataJson[i].description.trim() == "左") {
                $("#leftImg").attr("linkUrl", dataJson[i].attr.image_link);
                $("#leftImg").find("img").attr("src", dataJson[i].attr.image_url);
            } else {
                $("#rightImg").attr("linkUrl", dataJson[i].attr.image_link);
                $("#rightImg").find("img").attr("src", dataJson[i].attr.image_url);
            }
            ;
        }
        ;
    },
    //格式化日期
    dateFormat: function (longTypeDate) {
        var dateType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateType = date.getFullYear() + "-" + $.getFullPart(date.getMonth() + 1) + "-" + $.getFullPart(date.getDate()) + " " + $.getFullPart(date.getHours())
            + ":" + $.getFullPart(date.getMinutes()) + ":" + $.getFullPart(date.getSeconds());
        return dateType;
    },
    dateForMatMinue: function (longTypeDate) {
        var date = new Date();
        date.setTime(longTypeDate);
        return $.getFullPart(date.getHours()) + ":" + $.getFullPart(date.getMinutes());
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
