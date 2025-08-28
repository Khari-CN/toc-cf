var cfApp = angular.module("cfApp",[]);
cfApp.filter('relationTypeFilter', function() { //可以注入依赖
    return function(text) {
        var dd ="";
        if(text==0) dd="客户";
        if(text==1) dd="直接";
        if(text==2) dd="间接";
        return dd;
    }
});
cfApp.filter('symbolTypeFilter', function() { //可以注入依赖
    return function(text) {
        var dd ="";
        if(text==0) dd="外汇";
        if(text==1) dd="贵金属";
        if(text==2) dd="指数";
        if(text==3) dd="原油";
        return dd;
    }
});
StringUtils = {
    isEmpty : function(s){
        if($.trim(s) == "")
            return true;
        return false;
    },
    tolowerCase : function (str){
        return str.toLowerCase();
    }
}
cfApp.filter('formatPhone', function() { //可以注入依赖
    return function(text) {
        if(StringUtils.isEmpty(text)){
            return "";
        }
        var text1 = text.substring(0,3);

        var text2 = text.substring(text.length-4);
        return text1+"****"+text2;
        // return text.substring(0,4);
    }
});
cfApp.filter('chineseNameFileter', function() { //可以注入依赖
    return function(text) {
        var dd ="";
        if(text==null||text==""){
            return dd;
        }
        var t = text.substring(0,1);
        return t+"**";
    }
});

cfApp.controller("customerController",function($scope, $http, $timeout,$filter,$log){
    // var customerCode = window.location.search;


    /**测试代码区域*/

    // $.ajax({
    //     type : "POST",
    //     url : mis_url + "/public/cfd/account/toRecommendActivity",
    //     data : {
    //         phone:"18654797654",
    //         account:"81015393",
    //         password:"Huang123"
    //     },
    //     async : false,
    //     success : function(data) {
    //         console.info(data);
    //     },
    //     error : function(jqXHR, textStatus, errorThrown) {
    //         console.log(textStatus + errorThrown);
    //     }
    // });

    /**测试代码区域*/
    $scope.getPram = function (name) {
        var search = window.location.search;
        var str = null;
        if(search.length>0){
            var arr = search.split("&");
            for(var i=0;i<arr.length;i++){
                var tmp = arr[i];
                if(tmp.indexOf(name)!=-1){
                    str = tmp.substring(tmp.indexOf(name)+name.length+1);
                }
            }
        }
        if(str==null){
            str = $("#code").val();
        }
        return str;
    }
    //页面查询参数
    $scope.queryParm ={
        pageType:1,//tab类型
        dateType:1,//查询范围
        start:0,//第几页
        length:10,//显示几条
        code:$scope.getPram("code")//测试编码
    }

    $scope.totalInfo = {direct:0,indirect:0,sumDirect:0,sumIndirect:0};
    $scope.queryUrl =mis_url+"/public/customerRelation/queryByPage";
    $scope.querySumUrl =mis_url+"/public/customerRelation/querySumInfo";
    $scope.totalInfoUrl = mis_url+"/public/customerRelation/getTotalInfo";
    $scope.getPhoneByAccountUrl = mis_url+"/public/customerRelation/getPhoneByAccount";

    $scope.checkUrl =mis_url+"/public/customerRelation/checkCustomerActiveStatus";

    $scope.title1=["新客户","姓名","推荐类型","是否激活","开户时间","是否达标"];
    $scope.title2=["新客户","姓名","奖励类型","奖励金额","时间"];
    $scope.title3=["新客户","姓名","单号","交易产品","交易手数","交易时间","返利类型","返利金额"];

    $scope.title11=["新客户","推荐类型","是否激活","开户时间","是否达标"];
    $scope.title22=["新客户","奖励类型","奖励金额","时间"];
    $scope.title33=["新客户","单号","交易手数","交易时间","返利金额"];

    $scope.pageTitle = $scope.title1;
    $scope.pageTitle1 = $scope.title11;
    $scope.pageData = {}//页面分页展示数据
    $scope.currentPage = 1;

    /**初始化数据*/
    $scope.init = function () {
        //初始化总的赠金和返利数据
        $scope.sumDirectByTop =0;
        $scope.sumIndirectByTop = 0;

        $http.post($scope.totalInfoUrl,$scope.queryParm).then(function (resp) {
            if(resp.status ==200){
                $scope.sumDirectByTop = resp.data.direct;
                $scope.sumIndirectByTop = resp.data.indirect;
            }
        })
        $scope.queryPage();

        $http.post($scope.getPhoneByAccountUrl,$scope.queryParm).then(function (resp) {
            if(resp.status ==200){
                $scope.queryParm.phone = resp.data.msg;
                // var pageType="";
                // var path = window.location.pathname;
                // if(path.indexOf("pc")!=-1){
                //     pageType = "pc";
                // }else if(path.indexOf("app")!=-1){
                //     pageType = "app";
                // }else{
                // }
                var pageType = "mobile";
                $scope.imgUrl = mis_url+"/public/customerRelation/createImage?code="+$scope.queryParm.phone+"&pageType="+pageType;
                $scope.inputUrl = id_url.substring(2)+"/cn/"+pageType+"/rcfd_account?code="+$scope.queryParm.phone;
            }
        })

        $(function () {
            lay('#version').html('-v'+ laydate.v);

            //执行一个laydate实例
            laydate.render({
                elem: '#date1' //指定元素
                ,done:function (value) {
                    $scope.queryParm.beginDate = value;
                }
            });
            laydate.render({
                elem: '#date2' //指定元素
                ,done:function (value) {
                    $scope.queryParm.endDate = value;
                }
            });
            laydate.render({
                elem: '#date3' //指定元素
                ,done:function (value) {
                    // $("#date3").val(value);
                    $scope.queryParm.beginDate = value;
                }
            });
            laydate.render({
                elem: '#date4' //指定元素
                ,done:function (value) {
                    // $("#date4").val(value);
                    $scope.queryParm.endDate = value;
                }
            });

        })
    }

    /**tab页切换*/
    $scope.changePage = function (pageType) {
        $scope.queryParm.pageType = pageType;
        $scope.queryParm.start = 0;
        if(1==pageType){
            $scope.pageTitle = $scope.title1;
            $scope.pageTitle1 = $scope.title11;
        }else if(2==pageType){
            $scope.pageTitle = $scope.title2;
            $scope.pageTitle1 = $scope.title22;
        }else {
            $scope.pageTitle = $scope.title3;
            $scope.pageTitle1 = $scope.title33;
        }
        $scope.currentPage = 1;
        if($scope.queryParm.dateType==3){
            $scope.pageData = {};
            return;
        }
        $scope.queryPage();
    }

    $scope.changeDateType = function (dateType) {
        $scope.queryParm.dateType = dateType;
        $scope.queryParm.start = 0;
        $scope.currentPage = 1;
        if(3==dateType){
            $scope.totalInfo.direct = 0;
            $scope.totalInfo.indirect = 0;
            $scope.totalInfo.sumDirect = 0;
            $scope.totalInfo.sumIndirect = 0;
            // $scope.$apply();
            $scope.timeInput = true;
            $scope.pageData = {};
            return;
        }else {
            $scope.timeInput = false;
        }
        $scope.queryPage();
    }

    /**数据查询方法*/
    $scope.queryPage = function () {
        $http.post($scope.queryUrl,$scope.queryParm).then(function (resp) {

            if(resp.status==200){
                $scope.convertPage(resp.data);
            }
        })
    }

    /**下一页*/
    $scope.nextPage = function () {
        if($scope.currentPage>=$scope.pageData.pageCount){
            return;
        }
        $scope.currentPage+=1;
        var start = ($scope.currentPage-1)*$scope.pageData.length;
        $scope.queryParm.start = start;
        $scope.queryPage();
    }
    /**上一页*/
    $scope.prevPage = function () {
        if($scope.currentPage<=1){
            return;
        }
        $scope.currentPage-=1;
        var start = ($scope.currentPage-1)*$scope.pageData.length;
        $scope.queryParm.start = start;
        $scope.queryPage();
    }

    /**处理传回的分页数据*/
    $scope.convertPage = function(page){
        $scope.pageData = page;
        $scope.pageData.pageCount=0;



        var pageCount = $scope.pageData.recordsTotal%$scope.pageData.length
        if(pageCount>0){
            $scope.pageData.pageCount+=1;
        }
        $scope.pageData.pageCount += parseInt($scope.pageData.recordsTotal/$scope.pageData.length);
        //调用方法处理统计
        $scope.converLocalSum();
        $scope.converServerSum();
    }

    $scope.converServerSum = function () {
        $http.post($scope.querySumUrl,$scope.queryParm).then(function (resp) {
            if(resp.status==200){
                $scope.totalInfo.sumDirect = resp.data.direct;
                $scope.totalInfo.sumIndirect = resp.data.indirect;
            }
        })
    }

    $scope.converLocalSum = function () {
        $scope.totalInfo = {direct:0,indirect:0,sumDirect:0,sumIndirect:0};
        angular.forEach($scope.pageData.data, function(data,index,array){
            if($scope.queryParm.pageType==1){//直接新增人数
                if(data.relationType=='直接'){
                    $scope.totalInfo.direct+=1;
                }
                if(data.relationType=='间接'){
                    $scope.totalInfo.indirect+=1;
                }
            }else {
                if(data.relationType==1){
                    $scope.totalInfo.direct+=data.currentRebete;
                }
                if(data.relationType==2){
                    $scope.totalInfo.indirect+=data.currentRebete;
                }
            }
        });
    }

    /**验证当前客户是否激活*/
    //    推荐弹窗
    $scope.active = function () {
        $http.post($scope.checkUrl,$scope.queryParm).then(function (resp) {
            if(resp.status==200){
                var result = resp.data;
                if(result.code===1){
                    $(".m-list").show();
                }else{
                    $('.m-mask').show();
                }
            }
        })
    }
    $scope.init();
});