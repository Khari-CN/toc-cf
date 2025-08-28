$.extend({
    //中文状态
    status:function (result) {
        var now = new Date().getTime();
        if(now>result.endTime){
            return "往期";
        }
        if(now<result.startTime){
            return "未开启";
        }
        return "进行中";
    },
    //英文状态背景
    statuss:function (sta) {
        if(sta =="未开启"){
            return  "blue"
        }else if(sta =="往期"){
            return "grey"
        }else{
            return "red"
        }
    },
    //状态url
    statusu:function (sta,idData) {
        if(sta =="未开启" ){
            return  "javascript:void(0)"
        }else if(sta =="进行中" || sta =="往期"){
            if($.tail()){
                $(".footer-con").html('');
                return "/cn/super-topic/topic_detail.html?noneheader=1&topicId="+idData.topicId+"";
            }
            return "/cn/super-topic/topic_detail.html?topicId="+idData.topicId+""
        }
    },
    //判断尾巴是否含有 noneheader
    tail:function () {
        var tailText = window.location.search;
        if(tailText.indexOf("noneheader") != -1){
            return "true"
        }
    },
    //格式化日期
    dateFormat:function (longTypeDate) {
        var dateType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateType = $.getFullPart(date.getFullYear()) + "-" + $.getFullPart(date.getMonth() + 1) + "-" + $.getFullPart(date.getDate());
        return dateType;
    },

    dateFormatComment:function (longTypeDate) {
        var dateType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateType =  $.getFullPart(date.getMonth() + 1) + "月" + $.getFullPart(date.getDate()) + "日";
        return dateType;
    },

    getFullPart:function (day) {
        return day < 10 ? "0" + day : day;
    }
});