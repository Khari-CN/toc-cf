/**
 * 直播间前台客户端入口
 */

var indexJS = {
    fromPlatform: null, //来源平台
    isNeverLogin: false, //是否首次访问
    serverTime:new Date() , //服务器时间
    towMinTime: 0, //2分钟间隔时间
    socketUrl: '', //socket路径
    userInfo: {},
    filePath: 'https://chatfiles.kgold852.com', //文件路径
    apiUrl: '', //api路径
    currStudioAuth: false, //当前房间是否授权
    visitorSpeak: false, //游客是否允许发言
    syllabusData: null, //课程数据
    infoNewCount: 0, //快讯新条数
    onlineCsStatus: 0, //在线客服链接状态：0-未连接 1-正在连接 2-已连接
    analystInfo:{},
    liveCourse:'',
    nickCookie:"live_nick_flag",
   courseType :{0:'文字直播',1:'视频直播',2:'音频直播'},
    forward :5,
    Delayed:2,
    downloadArr:[],
    straSwiper:null,
    moreTime:9,
    //直播课程
    needLive:[],
    onlineNum:[],
    loginForce:false,// 是否强制登录
    forceTime:'',//强制登录时间zh
    clearFlushTimer:false,// 快讯刷新
    init: function() {
        //获取分析师信息(分析师列表、分析师交易策略、分析是聊天记录)
        this.getAnalystsInformation();
        this.serverTimeUp();
        this.setVisitStore(); //设置访客存储
        this.setEvent(); //设置各种事件
        box.init();
        this.downLoadSource();
        videosTeach.init();
        videosTeach.getVideoList("teach_video_base");
        videos.init();
        chat.init();
        this.widthCheck();
        this.heightCalcu();

    },
    /**
     * 事件控制
     */
    setEvent: function() {
        $(window).load(function(){
            // 倒计时 20分钟后 如果没有登录则有弹窗提示
            var timeInfo;
            if(indexJS.loginForce == true){
                var loginCookie = $.cookie('loginCookie');
                if(loginCookie == 'none'  ){
                    box.openLgBox(false,true);
                }else if(loginCookie == 'ok'){
                    clearTimeout(timeInfo)
                }
                timeInfo =  setTimeout(function () {
                    if(indexJS.userInfo.isLogin == false){
                        box.openLgBox(false,true);
                        $.cookie("loginCookie",'none');
                    }
                },indexJS.forceTime)
            }



        });
        $(window).resize(function(e) {
            indexJS.widthCheck();
            indexJS.heightCalcu();
        });
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'disableScrolling': true,
            'positionFromTop': 50,
            'albumLabel': "%1 of %2"
        });
        /**
         * 是否允许游客发言 及禁言规则
         */
        indexJS.isShowChat();
        /**
         * 我的帐户按钮事件
         */
        $('#personal_center').click(function() {
            if (indexJS.userInfo.isLogin) {
                chatShowTrade.getPointsInfo();
                common.openPopup('.blackbg,.personal_center');
                $('#infotab a[t="accountInfo"]').click();
            } else {
                common.openPopup('.blackbg,.login');
            }
        });
        /**
         * 资料下载按钮事件
         */
        $("#downLoadSource").on('click','li ul li  a.infodown',function () {
            if (indexJS.userInfo.isLogin) {
                var href = $(this).attr("data-href");
                $(this).attr("href",href)
            } else {
                common.openPopup('.blackbg,.login');
            }
        })
        /**
         * 二维码显示
         */
        $(".code-img ul li").hover(function () {
            $(this).find("img").show()
        },function () {
            $(this).find('img').hide();
        })
        /**
         * 课程表弹窗
         */
            $(".myClass").click(function () {
                common.openPopup('.blackbg,.teach-lesson');
            });
        /*QQ客服按钮事件*/
        $('#qqcs').click(function() {
            live800Prompt(2);
        });
        /*分析师晒单和教学视频切换*/
        // $('.mod_videolist .tabnav a').click(function() {
        //     var t = $(this).attr('data-type');
        //     $(this).addClass('on').siblings().removeClass('on');
        //     $('div[class=' + t + ']').addClass('on').siblings().removeClass('on');
        //     if(t == "main_tab"){
        //         videosTeach.getVideoList("teach_video_base")
        //     }
        // });

        setInterval(function () {
            if (indexJS.clearFlushTimer) indexJS.setInformation();
        },60000);
        /*聊天tab切换*/
        $('.mod_main .tabnav a').click(function() {
            var t = $(this).attr('t');
            $('.mod_main .tabnav a').removeClass('on');
            $('.mod_main .main_tab').removeClass('on');
            $(this).addClass('on');
            $('div[t=' + t + ']').addClass('on');
            indexJS.clearFlushTimer = false;
            switch (t) {
                case 'strage':
                    // 专家策略方法启动
                    break;
                case 'calender':
                    calendar.getCaData();
                    break;
                case 'market':
                    break;
                case 'news':
                    indexJS.setInformation();
                    indexJS.clearFlushTimer = true;
                    break;
            }


            indexJS.heightCalcu();

            if (t == 'chat') {
                chat.showChatMsgNumTip(true);
                chat.setTalkListScroll(true);
            }

        });
        /*滚动条*/
        // if ($(window).width() > 768) {
        //     indexJS.setListScroll($(".tabcont .main_tab .teacherlist .scrollbox")); //直播老师
        //     indexJS.setListScroll('#teachVideoPanel .scrollbox'); //教学列表
        // }
        /**
         * 联系助理按钮事件
         */
        if (indexJS.isNeedOnlineCS()) {
            indexJS.connectOnlineCs();
        }
        $('.mod_infotab .tabnav .myaid , .connectService').click(function() {
            if (indexJS.isNeedOnlineCS()) {
                indexJS.connectOnlineCs();
            } else {
                indexJS.openPrivateMessageWindow();
            }
        });
        /**
         * 资料搜索
         */
        $("#sourceSearch").on('click',function () {
            var text = $.trim($("#sourceBox").val());
            var newSearchArr=[];
            var searchData= indexJS.downLoadArr;
            var textName,teacherName;
            for(var i in searchData){
                textName = searchData[i].detailList[0].title
                teacherName = searchData[i].detailList[0].authorInfo.name;
                if(textName.indexOf(text) >=0 || teacherName.indexOf(text) >=0){
                    newSearchArr.push(searchData[i])
                }
            }
            indexJS.editSourceData(newSearchArr);
        })
        /**
         * 资料搜索清空
         */
        $("#sourceBox").on('input',function () {
            if($(this).val()== ''){
                indexJS.editSourceData(indexJS.downLoadArr);
            }
        })
        /*兼容提示*/
        $('.ietip .iewhybtn').click(function() {
            $('.ietip').hide();
            $('.iestory').show();
        });
        $('.iestory .closebtn').click(function() {
            $('.iestory').hide();
            $('.ietip').show();
        });
        common.placeholderSupport(".formcont .in_line input[placeholder]"); //ie下输入框显示文字提示
        /**
         * 判断快讯滚动条滚动到底部
         */
        $(".message_list ul").scroll(function() {
            var awayBtm = $(document).height() - $(window).scrollTop() - $(window).height();
            // console.log('当前距离页面底部：' + awayBtm + 'px');
            if (awayBtm <= 20) {
                indexJS.flashdown();
            }
        });
    },
    /**
     * 判断是否显示聊天输入框与禁言提示
     */
    isShowChat:function() {
        // console.log(indexJS.userInfo.userType)
        if(indexJS.userInfo.userType == 0 || indexJS.visitorSpeak ){
            //允许游客发言
            $("#contentText").attr("contenteditable", true);
            $("#contentText").empty();
            $("#sendToolBtn,#face-icon").attr("disabled",false);
        }else{
            //禁止游客发言
            $("#contentText").attr("contenteditable", false);
            $("#contentText").empty();
            $("#contentText").append(" <span style=\"margin:15px 5px;\">亲，<a id=\"contentText_login\" href=\"javascript:void(0);\" style=\"text-decoration: underline;color:#0096dc;cursor: pointer;\">登录</a>&nbsp;&nbsp;后可以发言哦~</span>")
            $("#sendToolBtn,#face-icon").attr("disabled",true);
            $("#contentText_login").click(function(){
                box.openLgBox();
            })

        }
    },
    /**
     * 广告配置
     */
    advSetting:function(){
        var url = mm_url + "/api/getPcBanner";
        var topImgUrl,topAUrl='',middleImgUrl,middleUrl;
        common.getJson(url,null,function (data) {
            // console.log(data);
            if( data.top_banner.length == 0   ){
                console.log("没有广告数据")
            }else{
                //顶部广告
                topImgUrl= data.top_banner[0].attr.image_url;
                topAUrl= data.top_banner[0].attr.image_link;
                $("#topBannerAdv").attr("href",topAUrl);
                $("#topBannerAdv img").attr("src",topImgUrl);
            }
              if(data.index_banner.length == 0){
                  console.log("没有策略广告数据")
              }  else{
                  // 策略广告
                  indexJS.editStrageAdv(data.index_banner);
              }
              if(data.middle_banner.length == 0){
                  console.log("没有弹窗广告数据")
              }  else{
                  //弹窗广告
                  middleUrl = data.middle_banner[0].attr.image_link;
                  middleImgUrl  =data.middle_banner[0].attr.image_url;
                  $("#middleBanner").empty().append("<a href='"+ middleUrl +"' target='_blank'><img src='"+ middleImgUrl +"' alt=''></a>");
                  common.openPopup('.bannerblackbg,.banner-popup');
              }




        })
    },
    /**
     * 编辑 交易策略处广告
     */
    editStrageAdv:function(data){
      var str ='';
      for(var i in data){
          str += ["<div class=\"swiper-slide\">",
              "                <a target='_blank' href=\""+ data[i].attr.image_link+"\"><img src=\""+ data[i].attr.image_url +"\"  alt=\"\" ></a>",
              "              </div>"].join("");
      }
      $("#advStrage").empty().append(str)
      indexJS.swiper("#adv")
    },
    /**
     * 初始化信息
     */
    loadInitData:function () {
        var url = mm_url + "/api/getIndexLoadData";
        var courseData =[];
        common.getJson(url,null,function(data){
            indexJS.syllabusData = common.formatToJson(data).data.syllabusResult;
            indexJS.initToday(indexJS.syllabusData);
            indexJS.fillCourse(indexJS.syllabusData);
            courseData  = common.formatToJson(indexJS.syllabusData.courses).timeBuckets;
            var studiolist = common.formatToJson(data).data.studioList;
            indexJS.liveCourse = indexJS.sortLive(courseData);
            // console.log(courseData)
            // 当天课程获取到 判断状态显示不同状态
            indexJS.diffStatus(indexJS.liveCourse);
            //获取并设置房间规则，封装默认的分析师
            indexJS.setChatRule(studiolist);
           indexJS.fillBigCourse(indexJS.syllabusData);
           setTimeout(function(){
               indexJS.initToday(indexJS.syllabusData);
               indexJS.fillCourse(indexJS.syllabusData);
               indexJS.fillBigCourse(indexJS.syllabusData);
           },(indexJS.forward+1)*60*1000)


        });
    },
    /**
     *   // 当天课程获取到 判断直播状态显示不同状态
     * */
    diffStatus:function(data){
        indexJS.needLive = [];
        //直播提取10分钟开始,延后5分钟结束
        var startDate = new Date(new Date().getTime() + 1000*60*indexJS.forward);
        var endDate = new Date(new Date().getTime() - 1000*60*indexJS.Delayed);
        var needStart = common.getFullPart(startDate.getHours())+ ":" + common.getFullPart(startDate.getMinutes());
        var needEnd = common.getFullPart(endDate.getHours())+ ":" + common.getFullPart(endDate.getMinutes());
        //console.log(sortLive);
        if(data.length > 0){
            for(var i in data){

                if(data[i].playStatus != "直播中") {
                    if(data[i].startTime > needStart || data[i].endTime < needEnd){
                        continue;
                    }
                }
                indexJS.needLive.push(data[i]);
            }
        }
        if(indexJS.needLive.length == 0){
            // 无直播
                $("#nextCourse").hide();
                $("#videoPlayerPanel").hide();
                indexJS.haveNoLive();
        }else{
            $("#videoLoop").hide();
            // console.log(indexPlayer)
            if(indexPlayer == undefined){
                console.log("没有indexPlayer")
            }else{
                indexPlayer.pause();
            }

            videos.playAuto(data[0]);
            indexJS.hasLive(data[0].endTime)
        }
    },
    hasLive:function(time){

        var timeOut = indexJS.getTimeOut(time);

        if(timeOut <= 0){
            timeOut = 1000*60;
        }
        setTimeout(function(){
           indexJS.loadInitData()
        },timeOut);
    },
    //如果没有有正在直播的视频
    haveNoLive:function(){
        videos.playVideo();
        var timeOut = 0;
        var nextLive = indexJS.getNextLive();
        //console.log(nextLive);
        if(nextLive.length > 0){
            var hours = nextLive[0].startTime.substring(0,2);
            var min = nextLive[0].startTime.substring(3);
            timeOut = nextLive[0].date - new Date().getTime();
            //直播时间提前10分钟开始
            timeOut = timeOut + parseInt(hours)*60*60*1000 + parseInt(min)*60*1000 - 1000*60*indexJS.forward;
        }else {
            timeOut = 1000*60*60*2;
        }
        //console.log(timeOut);
        //设置定时器，下场直播开始的时候刷新
        if(timeOut <= 0){
            timeOut = 1000*60;
        }
        setTimeout(function(){
            indexJS.loadInitData()
        },timeOut);
    },
    //获取下一节课
    getNextLive:function(){
        var nextLive = [];
        var url = zhibo_api_url+"/common/getCourse";
        var options = {
            type:"cf",
            platform:"pc",
            groupType:"cfstudio",
            groupId:"cfstudio_50",
            flag:"SN",
            systemCategory:"cf",
            strategy:"1"
        };
       common.getAjax(url,options, function (data) {
            //当天的课程
            var live = data.data;
            //console.log(live);
            nextLive = live;
        });
        return nextLive;
    },
    //获取时间差(毫秒)作为定时器的等待时间
    getTimeOut:function(time){
        var hours = time.substring(0,2);
        var min = time.substring(3);
        var endTime = new Date().setHours(hours);
        //直播时间延后5分钟结束
        var endLong = new Date(endTime).setMinutes(min) + 1000*60*(indexJS.Delayed+1);
        var timeOut = endLong - new Date().getTime();
        return timeOut;
    },
    sortLive:function(data){
        var starting = [];
        var noStart = [];
        var end = [];
        for (var i = 0;i < 5;i++) {
            for (var j in data) {
                if (data[j].course[i].title == "") {
                    continue;
                }
                if (parseInt(i) == (new Date().getDay() - 1)) {
                    //添加课程时间
                    data[j].course[i].startTime = data[j].startTime;
                    data[j].course[i].endTime = data[j].endTime;
                    //添加课程状态
                    data[j].course[i].status = indexJS.courseType[data[j].course[i].courseType];
                    //添加分析师头像
                    data[j].course[i].avarImg = indexJS.getAnalyImg(data[j].course[i].lecturerId);
                    var nowTime = common.getFullPart(new Date().getHours())+ ":" + common.getFullPart(new Date().getMinutes());
                    if (data[j].course[i].startTime > nowTime) {
                        data[j].course[i].playStatus = "未开始";
                        noStart.push(data[j].course[i]);
                    } else if (data[j].endTime <= nowTime) {
                        data[j].course[i].playStatus = "已结束";
                        end.push(data[j].course[i]);
                    } else {
                        data[j].course[i].playStatus = "直播中";
                        starting.push(data[j].course[i]);
                    }
                }
            }
        }
        var data1 = starting.concat(noStart);
        var result = data1.concat(end);
        return result;
    },
    //获取对应的分析师头像
    getAnalyImg:function (userNo) {
        var analyList = indexJS.analystInfo;
        for (var i in analyList) {
            if(userNo == analyList[i].userNo){
                return analyList[i].avatar;
            }
        }
        return "";
    },
    /**
     * 设置今日直播课程
     */
    initToday : function(syllabusData){
        var courses = common.formatToJson(syllabusData.courses)
        $("#playlist_panel ul[t='today']").html("");
        if(!courses){
            return;
        }
        var curDay=new Date().getDay();
        var days=courses.days,tmks=courses.timeBuckets,courseObj;
        var html = [], index = 0;
        for(var i= 0,len=days.length;i<len;i++){
            if(days[i].day == curDay && days[i].status == 1){
                for(var k= 0,tklen=tmks.length;k<tklen;k++){
                    courseObj=tmks[k].course[i];
                    if(courseObj.status != 0 && courseObj.lecturer){
                        index ++;
                        html.push('<li class="" st="'+tmks[k].startTime+'" et="'+tmks[k].endTime+'">');
                        html.push('<span class="fl">');
                        html.push('<b>' + index + '</b>');
                        html.push(courseObj.title);
                        html.push('</span>');
                        html.push('<span class="fr">');
                        html.push(tmks[k].startTime + '-' + tmks[k].endTime);
                        html.push('</span></li>');
                    }
                }
                $("#playlist_panel ul[t='today']").html(html.join(""));

                break;
            }
        }
        this.refreshStyle();
        //今日直播列表自动关闭
        window.setTimeout(function(){
            $("#playlist_hide").trigger("click");
        }, 5000);
    },
    /**
     *  分析师信息封装
     */
    analystContent:function(strageList,isStrage){
        for(var i in strageList){
            var curTime = new Date().getTime();
            var endTime = common.langTimeChange(strageList[i].publishEndDate);
            var startTime = common.langTimeChange(strageList[i].publishStartDate);
            if( curTime >  endTime ||  curTime < startTime  ) continue;
            var userNum = strageList[i].detailList[0].authorInfo.userId;
            var strageContent = {
                "data":strageList[i].publishStartDate,
                "content":strageList[i].detailList[0].content,
                "time":common.langTimeChange(strageList[i].publishStartDate),
                "isStrage":isStrage,
                "sortTime":common.sortTime(strageList[i].publishStartDate,isStrage?2:1)
            };
            var analystContent = indexJS.analystInfo[userNum];
            if (analystContent == null) continue;
            //一个对象 的key allContent 将strageContent 的值当做 value放进去
            // console.log(analystContent)
            if ( analystContent.allContent == null)  analystContent.allContent = [];
            analystContent.allContent.push(strageContent);
        }
    },
    /**
     *  分析师信息
     */
    getAnalystsInformation : function(){
        var url = mm_url + "/api/getAnalystsInformation"
        common.getJson(url,null,function (data) {
            var analystData = data.analyList.data;
            for (var i in analystData) {
                indexJS.analystInfo[analystData[i].userNo] = analystData[i];
            }
            var strageList = data.class_note.data;
            var classNote = data.trade_strategy_article.data;
            indexJS.analystContent(strageList,true);
            indexJS.analystContent(classNote,false);
            // console.log(indexJS.analystInfo);
            indexJS.editStrage(indexJS.analystInfo)
        })
    },
    /**
     *  编辑教学策略
     * @param analystInfo
     */
    editStrage:function(analystInfo){
        var str ='';
        // console.log(analystInfo)
        for(var i in analystInfo){
            var html = '';
            var bottomContent = analystInfo[i].allContent;
            if(bottomContent){
                // console.log(bottomContent)
                bottomContent = common.sort(bottomContent,"sortTime",1);
                for(var j in bottomContent) {
                      //根据对象的time字段进行排序
                      var isStrage = bottomContent[j].isStrage;
                      // console.log(isStrage)
                      var strageContent,hanDanContent,classNoteTime,strageTime;

                      if(isStrage == true){
                          strageContent = bottomContent[j].content
                          strageTime = common.formatterDate(common.langTimeChange(bottomContent[j].data)) + " " + common.getHHMMSS(common.langTimeChange(bottomContent[j].data))
                          html+=[
                              "                        <div class=\"layout-1  \" >",
                              "                            <div class=\"item-1 clearfix\">",
                              "                                <div class=\"fl \" >交易策略</div>",
                              "                                <div  class=\"date-now fr\">" + strageTime + "</div>",
                              "                            </div>",
                              "                            <div class=\"item-2 \">",
                              "                                " + strageContent + " ",
                              "                            </div>",
                              "                            <div class=\"strategy-arrow dn\"><em>展开内容</em><span class=\"bg-down\"></span></div>",
                              "                        </div>"
                          ].join("")

                      }else if(isStrage == false){
                           hanDanContent = bottomContent[j].content;
                           classNoteTime = common.getHHMMSS(bottomContent[j].time);
                          html +=[
                              "                        <div class=\"layout-2  \">",
                              "                        <div class=\"item-3\">",
                              "                            <div class=\"game-time\"><span class=\"bg-audio\"></span>"+ classNoteTime +"</div>",
                              "                            <div class=\"game-content \">",
                              "                                "+ hanDanContent +"",
                              "                            </div>",
                              "                        </div>",
                              "                    </div>"
                          ].join("")
                      }

                      }
                  }
            else if(bottomContent == undefined){
                html += [
                    "                        <div class=\"layout-1 \" >",
                    "                            <div class=\"item-1 clearfix\">",
                    "                                <div class=\"fl \" >交易策略</div>",
                    "                            </div>",
                    "                            <div class=\"item-2 strategyHeight\">",
                    "                                当前暂无交易策略 ",
                    "                            </div>",
                   "                        </div>",
                ].join("")
            }
            if(!analystInfo[i].introduction){
                analystInfo[i].introduction ="暂无分析师简介"
            }
           str +=[" <div class=\"swiper-slide\" id='"+ i +"'>",
               "                    <div class=\"teacher-honour\">",
               "                        <div class=\"teacher-left fl\">",
               "                          <img src=\""+analystInfo[i].avatar +"\" alt=\"\">",
               "                          <span>"+analystInfo[i].userName +"</span>",
               "                        </div>",
               "                        <div class=\"teacher-right fr\">",
               "                              <ul class=\"win-rate clearfix\">",
               "                                <li>",
               "                                   <span class=\"bg-champain\"></span>",
               "                                  <div class=\"item-1\">"+analystInfo[i].winRate+"</div>",
               "                                  <div class=\"item-2\">胜率</div>",
               "                                </li>",
               "                                <li>",
               "                                   <span class=\"bg-champain\"></span>",
               "                                  <div class=\"item-1\">"+analystInfo[i].gain+"</div>",
               "                                  <div class=\"item-2\">月赚</div>",
               "                                </li>",
               "                              </ul>",
               "                         </div>",
               "                        <div class=\"teach-arrow\">",
               "                        </div>",
               "                    </div>",
               "                    <div class=\"teacher-info\">",
               "                        <div class=\"info-title\">特约分析师简介</div>",
               "                        <div class=\"info-detail\">",
               "                         "+analystInfo[i].introduction+"",
               "                        </div>",
               "                    </div>",
                      "  <div class=\"strage-content\">",
                          html   ,
                    "  </div>",
               "  </div>"].join("")


        }
        $("#strade-content").append(str);
        indexJS.strageHeight()
        indexJS.straSwiper = new Swiper('#strade-part',{
              loop:true,
              // 如果需要前进后退按钮
              prevButton:'#strade-part .swiper-button-next',
              nested:true,
          })
    },
    strageHeight:function(){
        //专家策略内容展开收缩
            $('.strage-content .item-2').each(function(){
                var height = 94;
                // console.log($(this).height())
                if($(this).height()<= height){
                    $(this).next().hide()
                }else{
                    $(this).addClass("strategyHeight")
                    $(this).next().show()
                }
            });

            $(".strage-content").on("click",".strategy-arrow",function () {
                $(this).find('span').toggleClass('strategy-rotate');
                $(this).prev().toggleClass('strategyHeight');
                if( $(this).find('span').hasClass('strategy-rotate')){
                    $(this).find('em').text("收缩内容")
                }else{
                    $(this).find('em').text("展开内容")
                }
            });
        
    },
    swiper:function( element ){
        var mySwiper = new Swiper( element ,{
            loop:true,
            autoplay:3000,
            autoplayDisableOnInteraction:false
        })
    },
    openPrivateMessageWindow: function() {
        var $pletter_win = $(".pletter_win");
        if ($pletter_win.find(".mult_dialog a[utype=3]").length == 0) {
            chat.getCSList(); //设置所有客服
        } else {
            if ($('.mult_dialog a').length > 0) {
                $('#msgCount').text('').hide();
                $('.mult_dialog a .num[t!=0]').parent().click();
            }
        }
        if ($(this).hasClass('nocs')) {
            box.showTipBox('助理失联中');
        } else {
            common.openPopup('.blackbg,.pletter_win');
        }
    },
    isNeedOnlineCS: function() {
        var roomType = $('#roomInfoId').attr('rt');
        if (roomType == 'vip' || roomType == "train") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 设置房间规则
     */
    //获取房间规则和默认分析师
    setChatRule:function(studioList){
        for (var i in studioList) {
            if(studioList[i]._id == "cfstudio_50"){
                //获取房间规则(设置是否允许游客发言)
                var chatRules = studioList[i].chatRules;
                // console.log(chatRules);
                for (var i in chatRules) {
                    if(chatRules[i].type == "visitor_filter"){
                        indexJS.visitorSpeak = true;
                    }
                    if(chatRules[i].type == "online_mem_set"){
                        //允许游客发言
                        var onlineMessage = JSON.parse(chatRules[i].beforeRuleVal);
                        var timeMessage = JSON.parse(chatRules[i].periodDate).weekTime[0];
                        var member = onlineMessage.normalstart + "_" + onlineMessage.normalend;
                        var time = timeMessage.beginTime + "_" + timeMessage.endTime;
                        indexJS.onlineNum.push({"member":member,"time":time});
                    }
                    if(chatRules[i].type == "login_time_set"){
                            indexJS.loginForce = true;
                            // console.log(chatRules[i])
                        var forceMessage = chatRules[i].afterRuleTips;
                        indexJS.forceTime = chatRules[i].beforeRuleVal * 60 * 1000;
                        $("#login_tip").html(forceMessage)
                    }
                }
            }
        }
    },
    /**
     * 设置在线人数
     */
    getNeedmember:function(){

        for (var i in indexJS.onlineNum) {
            var startTime = indexJS.onlineNum[i].time.split("_")[0];
            var endTime = indexJS.onlineNum[i].time.split("_")[1];
            var nowTime = common.dateFormat(new Date().getTime()).substring(11);
            var min = parseInt(indexJS.onlineNum[i].member.split("_")[0]);
            var max = parseInt(indexJS.onlineNum[i].member.split("_")[1]);
            if (nowTime >= startTime && nowTime <= endTime) {
                var count = indexJS.getOnlineMember();
                if (count && min <= count.member && count.member <= max) {
                    indexJS.onlineMember = count.member;
                } else {
                    indexJS.onlineMember = common.getRandom(min, max);
                    var onlineDate = {time:nowTime,member:indexJS.onlineMember,min:min,max:max};
                    indexJS.saveOnlineMember(onlineDate);
                }
            }
        }
        return indexJS.onlineMember;
    },
    /**
     * 在线人数获取
     */
    getOnlineMember:function(){
        var num = null;
        var url = mm_url+ "/api/getOnlineMember";
        var options = {
            flag:"onlineNum",
        }
        common.getJson(url,options,function (data) {
            //console.log(data);
            if(data != null && data != ""){
                num = JSON.parse(data);
            }
        });
        return num;
    },
    /**
     * 在线人数保存
     * @param onlineDate
     */
    saveOnlineMember:function(onlineDate){
        var url = mm_url + "/api/saveOnlineMember";
        var options = {
            flag:"onlineNum",
            onlineMember:JSON.stringify(onlineDate)
        }
        common.getJson(url,options,function (data) {
            //console.log(data);
        });
    },
    /**
    /**
     * 刷新样式
     */
    refreshStyle : function(text){

        var currTime = common.getHHMM(new Date());
        $("#playlist_panel ul[t='today'] li").each(function(){
            if(currTime < $(this).attr("st")){
                $(this).attr("class", "");
            }else if(currTime < $(this).attr("et")){
                $(this).attr("class", "on");
            }else{
                $(this).attr("class", "over");

            }
        });
        if(!$("#playlist_panel ul[t='today']").children().hasClass("on")){
            $("#playlist_panel ul[t='today']").append('<li class="on teachLesson"><span class="fl"><b>1</b>当前时间段暂无直播课程</span></li>');
        }
    },
    fillBigCourse:function(datas){
        var data = common.formatToJson(datas.courses).timeBuckets;
        var days =common.formatToJson(datas.courses).days;
        // console.log(data);
        $(".course_tab").empty();
        var  als = 'fir';
        for (var i = 0;i < 5;i++) {
            if (days[i].status != 1) {
                $("#crouseList_"+i).append(
                    [
                        '<ul>'+
                        '<li class="fir">' +
                        '<a style="text-align: center" href="javascript:">' +
                        '<span><lable>休市</lable></span>'+
                        '</a>' +
                        '</li>'+
                        '</ul>'

                    ].join("")
                );
            }
            for (var j in data) {
                if(data[j].course[i].title == ""){
                    continue;
                }
                var nowTime = common.getFullPart(new Date().getHours())+ ":" + common.getFullPart(new Date().getMinutes());
                if(parseInt(i) < (new Date().getDay()-1)){
                    data[j].playStatus = "已结束";
                    data[j].color = "over";
                }else if(parseInt(i) == (new Date().getDay()-1)){
                    if(data[j].startTime > nowTime){
                        data[j].playStatus = "未开始";
                        data[j].color = "ever";
                        //console.log(data[j]);

                    }else if(data[j].endTime <= nowTime){
                        data[j].playStatus = "已结束";
                        data[j].color = "over";
                    }else {
                        //console.log(data[j].endTime);
                        data[j].playStatus = "直播中";
                        data[j].color = "on";
                        console.log(data[j]);
                    }
                }else {
                    data[j].playStatus = "未开始";
                    data[j].color = "ever";
                }

                $("#crouseList_"+i).append(
                    [
                        '<ul>'+
                        '<li class="' + als + '">' +
                        '<a href="javascript:" class="'+ data[j].color +'" st="' + data[j].startTime + '" et="' + data[j].endTime + '"><i></i>' +
                        '<span>' +
                        '<lable class="fr">' + data[j].startTime + '- ' + data[j].endTime + '　</lable>' +
                        '</span>' +
                        '<p>' + data[j].course[i].title + '</p>' +
                        '</a>' +
                        '</li>'+
                        '</ul>'

                    ].join("")
                );
                var index = new Date().getDay() - 1;
                $(".course_tab").hide();
                $("#crouseList_"+index).show()
            }
        }
    },
    /**
     * 填充课程，直播预告
     */
    fillCourse: function(syllabusData) {
        var courses = common.formatToJson(syllabusData.courses)
        if (courses) {
            //课程表部分
            var days = courses.days,
                tmk = courses.timeBuckets;
            // console.log(days )
            // console.log(tmk )
            var nva = $(".course_nav").html("");
            var als = '',
                ons = '',
                curDay = new Date(indexJS.serverTime).getDay();
            var startDateTime = indexJS.serverTime - 86400000 * ((curDay + 6) % 7),
                dateStr;
            for (var i = 0, len = days.length; i < len; i++) {
                if (i == 0) {
                    als = 'fir';
                } else if (i == len - 1) {
                    als = 'last';
                } else {
                    als = 'nct';
                }
                if (days[i].day == curDay) {
                    ons = ' on';
                } else {
                    ons = '';
                }
                dateStr = common.formatterDate(new Date(startDateTime + ((days[i].day + 6) % 7) * 86400000)).substring(5);
                nva.append('<a href="javascript:" class="' + als + ons + '" t="' + i + '" d="' + days[i].day + '" ><span>' + common.daysCN[days[i].day + ""] + '<b>' + dateStr + '</b></span><i></i></a>');
                als = '';

            }
            $(".course_nav a").click(function() {
                $(".course_nav a").removeClass("on");
                $('.course_tab').removeClass("on");
                $(this).addClass("on");
                var index = $(this).attr("t")
                $("#crouseList_"+index).show().siblings().hide()
            });
            $(".header-right li.cursor").attr("ck", 1);
            indexJS.setListScroll($(".cursor .dropcont .cont .course_tab .scrollbox"));
        }
    },

    /**
     * 检查客户组别
     * @param type
     *  visitor-visitor
     *  vip-vip || active
     *  new-非vip && 非active
     */
    checkClientGroup: function(type) {
        var currClientGroup = this.userInfo.clientGroup;
        var chkResult = false;
        switch (type) {
            case "visitor":
                chkResult = (currClientGroup == "visitor");
                break;
            case "vip":
                chkResult = (currClientGroup == "vip" || currClientGroup == "active");
                break;
            case "new":
                chkResult = (currClientGroup != "vip" && currClientGroup != "active");
                break;
        }
        return chkResult;
    },
    /**
     * 服务器时间更新
     */
    serverTimeUp: function() {
        this.loadInitData();//课程表
         this.advSetting();//广告配置
        // this.towMinTime = this.serverTime;
        setInterval(function() {
            // indexJS.serverTime += 1000;
            // if (indexJS.serverTime - indexJS.towMinTime >= 2 * 60 * 1000) {
            //     indexJS.towMinTime = indexJS.serverTime;
            // }
            //加载推送消息
            chat.setPushInfo();
            //教学课程
        }, 1000); //每秒一次
    },
    /**
     * 设置访客存储信息
     * @param userInfo
     */
    setVisitStore: function() {

        var user = this.queryUser();
        // console.log(user);
        if(user != null){
            indexJS.userInfo = user;
            indexJS.userInfo.sid = $.cookie("liveId");
            if(indexJS.userInfo.isLogin) {
                indexJS.loginChange();
            }
        }else{
            //不存在用户信息则初始化游客信息
            // console.log(this)
            this.initVistor();
        }
    },
    /**
     * 查询用户
     * @param dom
     */
    queryUser:function () {
        var user = null;
        var url = mm_url +"/api/queryUser";
        common.loadingPost(url,null,function (data) {
            // console.log(data);
            if(data != null && data != ""){
                user = JSON.parse(data);
            }
        });
        return user;
    },
    /**
     * 初始化用户信息
     * @param
     */
    initVistor:function () {
        var randId = common.randomNumber(8);
        indexJS.userInfo.groupType = "cfstudio";
        indexJS.userInfo.isLogin=false;
        indexJS.userInfo.groupId = "cfstudio_50";
        indexJS.userInfo.clientGroup = "visitor";
        indexJS.userInfo.userType = -1;
        indexJS.userInfo.clientStoreId = new Date().getTime() + "_" + randId;
        indexJS.userInfo.visitorId = "visitor_" + randId;
        indexJS.userInfo.nickname = '匿名cf_' + common.randomNumber(6);
        indexJS.userInfo.userId = "visitor_" + randId;
        indexJS.userInfo.socketId = chat.sockeitId;
        indexJS.userInfo.loginId = indexJS.userInfo.userId;
        box.saveUser(indexJS.userInfo);
        indexJS.userInfo.sid = $.cookie("liveId");
    },

    addUserInfortion:function(){
        indexJS.initRegister();
        indexJS.loginChange();
    },

    //自动创建登录其他需要用户信息
    initRegister:function(){
        var randId = common.randomNumber(8);
        indexJS.userInfo.userGroup= "register";
        indexJS.userInfo.userType = 0;
        indexJS.userInfo.sid = $.cookie("liveId");
        indexJS.userInfo.isLogin = true;
        indexJS.userInfo.clientStoreId = new Date().getTime() + "_" + randId;
        indexJS.userInfo.groupId = "cfstudio_50";
        indexJS.userInfo.clientGroup = "register";
        indexJS.userInfo.loginId = indexJS.userInfo.userId;
        indexJS.userInfo.visitorId = "visitor_" + randId;
        indexJS.userInfo.socketId = chat.socketId;
    },
    //登陆之后样式修改
    loginChange:function(){
       $(".login-btn,.login,.blackbg").hide();
       $(".myCount").removeClass("dn");
       // 禁止游客发言样式更改
        $("#contentText").attr("contenteditable", true);
        $("#contentText").empty();
       // 更改用户头像
        if(indexJS.userInfo.avatar == null || indexJS.userInfo.avatar ==""){
            $(".myCount img").attr({"src":"/cn/live/theme1/static/img/teacher.png"});
        }else{
            $(".myCount img").attr({"src":""+ indexJS.userInfo.avatar +""});
            $(".teachImg img").attr({"src":""+ indexJS.userInfo.avatar +""});
        }
    //    第一次登陆下修改昵称
        indexJS.checkNickName();
    //    修改我的用戶信息
        $("#changeUseraName").html(indexJS.userInfo.nickname)
        $("#modifyNickneer").val(indexJS.userInfo.nickname)
        $("#userNum").val(indexJS.userInfo.accountNo);
        var newPhone = indexJS.userInfo.mobilePhone.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")
        $("#userPhone").val(newPhone);
    },
    /**
     * 第一次登陆下修改昵称弹窗出来
     *
     */
    checkNickName:function(){
        if(indexJS.userInfo.nickname.indexOf("匿名cf_") != -1 || indexJS.userInfo.nickname.indexOf("cf_") != -1){
            var cookie = $.cookie(indexJS.nickCookie)==null?"":$.cookie(indexJS.nickCookie);
            if(indexJS.userInfo.accountNo != null && indexJS.userInfo.accountNo != ""){
                if(cookie != "" && cookie.indexOf(indexJS.userInfo.accountNo)>=0){
                    return;
                }
                $.cookie(indexJS.nickCookie,cookie+","+ indexJS.userInfo.accountNo,{ expires: 7});
            }
            $("#modifyfirst").val(indexJS.userInfo.nickname);
            common.openPopup('.blackbg,.nickname-change');
        }
    },

    /**
     * 设置滚动条样式
     * @param dom
     */
    setScrollStyle: function(dom) {
        dom.find(".mCSB_dragger_bar").css({ background: "url(/theme1/img/scroll.png) -10px 50% fdfdrepeat-y", width: "6px", "-webkit-border-radius": "3px", "-moz-border-radius": "3px", "border-radius": "3px" });
    },
    /**
     * 设置列表滚动条
     * @param domClass
     * @param options
     */
    setListScroll: function(domClass, scrollTo, options) {
        //滚动条
        var dom = (typeof domClass == 'object') ? domClass : $(domClass);
        if (dom.hasClass("mCustomScrollbar")) {
            dom.mCustomScrollbar("update");
            if (common.isValid(scrollTo)) {
                dom.mCustomScrollbar("scrollTo", scrollTo);
            }
        } else {
            options = $.extend({ scrollButtons: { enable: true }, theme: "light-thick", scrollbarPosition: "outside", scrollButtons: false }, options);
            dom.mCustomScrollbar(options);
            if (options.isCustom) {
                this.setScrollStyle(dom);
            }
        }
    },
    /**
     * 文档信息(视频,公告，直播安排
     * @param code
     * @param platform
     * @param hasContent
     * @param curPageNo
     * @param pageSize
     * @param orderByStr
     * @param params {{authorId, pageKey, pageLess, isAll}}
     * @param callback
     */
    getArticleList: function(code, platform, hasContent, curPageNo, pageSize, orderByStr, params, callback) {
        params = params || {};
        try {
            $.getJSON('/getArticleList', {
                authorId: common.trim(params.authorId),
                code: code,
                platform: platform,
                hasContent: hasContent,
                pageNo: curPageNo,
                pageKey: common.trim(params.pageKey),
                pageLess: common.trim(params.pageLess),
                isAll: common.trim(params.isAll),
                pageSize: pageSize,
                orderByStr: orderByStr,
                ids: common.isBlank(params.ids) ? '' : params.ids,
                callTradeIsNotAuth: params.callTradeIsNotAuth,
                strategyIsNotAuth: params.strategyIsNotAuth
            }, function(data) {
                //console.log("getArticleList->data:"+JSON.stringify(data));
                if (data)
                    callback({ result: 0, data: data });
                else callback(null);
            });
        } catch (e) {
            console.error("getArticleList->" + e);
            callback(null);
        }
    },

    //下拉刷新
    flashdown:function () {
        var url = "/news/flashup?length=20";
        var maxTime = $(".message_list ul").find("li").eq(-1).attr("time");
        common.getJson(url,{ctime:maxTime},function (data) {
            if(data.code==200)
            {
                var str = indexJS.editFastInfo(data.ch_msg);
                $('.mod_main .message_list  ul').append(str);
            }
        });
    },
    /**
     * 加载快讯数据
     */
    setInformation: function() {
        $.getJSON(  '/news/flashup?length=20', null, function(result) {
            if (result.code == 200) {
                // console.log(result)
                var newsHtml = indexJS.editFastInfo(result.ch_msg);
              $('.mod_main .message_list  ul').empty().append(newsHtml)
            }
        });


        },
    /**
     * 编辑快讯数据
     */
    editFastInfo:function(data){

            var newsHtml = '';

            for(var i in data){
                var ctime = common.longMsTimeToDateTime(data[i].ctime)
                newsHtml +=[
                    ["<li time='"+ data[i].ctime+"'><span><i></i><b>"+ctime.substring(10)+"</b></span>"+ data[i].title+"</li>"].join("")
                ];
            }




        return newsHtml
    },
    /**
     * 链接客服系统
     * */
    connectOnlineCs: function() {
        var protocol = document.location.protocol;
        switch (indexJS.onlineCsStatus) {
            case 0:
                indexJS.onlineCsStatus = 1;
                var url = protocol + "//jms.phgsa.cn/chat.php?pid=FX01&key=UHf8HShbKS1HdkFImwTR&tln=";
                /*                if (common.isLocalHref()) {
                                    url = protocol + "//csuat.phgsa.cn:9045/chat.php?pid=T002&key=Z6KMb9YOBciw2jbvvfSr";
                                }*/
                var csScriptUrl = url +
                    '&tln=' + indexJS.userInfo.userId +
                    '&tnn=' + indexJS.userInfo.nickname +
                    '&tul=' + indexJS.userInfo.clientGroup +
                    '&tp=' + $("#myMobilePhone").attr('t') +
                    '&ta=' + $("#myMobilePhone").attr("ta");
                LazyLoad.js(csScriptUrl, function() {
                    indexJS.onlineCsStatus = 2;
                });
                break;

            case 2:
                $("#chat_info").trigger("click");
                break;
            case 1:
            default:
                break;
        }
    },
    /**
     * 根据内容域模块名返回内容模板
     * @param region 内容域模块名
     * @returns {string}
     */
    formatHtml: function(region) {
        var formatHtmlArr = [];
        switch (region) {
            case 'tradestrategy':
                formatHtmlArr.push('<li class="guideli">');
                formatHtmlArr.push('    <div class="line1 clearfix">');
                formatHtmlArr.push('        <img class="himg" src="{0}" alt="{1}">');
                formatHtmlArr.push('        <h4 class="name">{1}<span class="timespan">{2}</span></h4>');
                formatHtmlArr.push('        <span class="tag"><i></i>{3}</span>');
                formatHtmlArr.push('    </div>');
                formatHtmlArr.push('    <h4 class="gtit"><strong><a href="" target="_blank" class="taglink"></a></strong>{4}</h4>');
                formatHtmlArr.push('    <div class="g_cont">');
                formatHtmlArr.push('    <p>{5}</p>');
                formatHtmlArr.push('    </div>');
                formatHtmlArr.push('</li>');
                break;
            case 'news':
                formatHtmlArr.push('<li><span><i></i><b>{0} </b>{1}</span></li>');
                indexJS.setInformation();
                break;
            case 'te_sdshow':
                formatHtmlArr.push('<li class="sd_li_item">');
                formatHtmlArr.push('    <div class="cont">');
                formatHtmlArr.push('        <div class="sd_tit"><span class="dep">{0}</span><span class="sdtime">晒单时间: {1}</span></div>');
                formatHtmlArr.push('        <a href="{2}" data-rel="sd-img" data-title="{3}" class="lightbox"{5}><img src="{4}" alt="晒单" class="mCS_img_loaded"><i class="i-zoom"></i></a>');
                formatHtmlArr.push('    </div>');
                formatHtmlArr.push('</li>');
                break;
        }
        return formatHtmlArr.join("");
    },
    /**
     * 课程表定时器
     */
    courseTick: {
        //当前课程或下次课程
        course: { courseId: '', courseType: 0, courseTypeName: '', day: 0, endTime: '', isNext: false, lecturer: '', lecturerId: '', startTime: '', status: 0, studioLink: null, title: '', courseName: '' },
        //下次校验时间
        nextTickTime: 0,
        //初始化或者重新校验
        tick: function() {
            if (indexJS.serverTime <= this.nextTickTime) {
                return;
            }
            var currCourse = common.getSyllabusPlan( indexJS.syllabusData, indexJS.serverTime);
            if (!currCourse) {
                return;
            }
            var nextTime = 0;
            var todayTime0 = new Date(indexJS.serverTime);
            todayTime0 = new Date(todayTime0.getFullYear(), todayTime0.getMonth(), todayTime0.getDate()).getTime();
            if (currCourse.isNext) { //下次课程开始作为下一次tick时间
                if (currCourse.day != new Date(indexJS.serverTime).getDay()) {
                    nextTime = todayTime0 + 86400000 + 60000;
                } else {
                    //"17:51" eval("17*60+51")*60*1000
                    nextTime = eval(currCourse.startTime.replace(":", "*60+")) * 60000 + todayTime0;
                }
            } else { //本次课程结束后作为下一次tick时间
                nextTime = eval(currCourse.endTime.replace(":", "*60+")) * 60000 + todayTime0 + 60000;
                if (currCourse.endTime < currCourse.startTime) {
                    nextTime += 86400000;
                }
            }
            if (this.nextTickTime != nextTime) {
                var courseType = { '0': '文字在线', '1': '视频在线', '2': 'oneTV在线', '3': '汇通视讯' };
                var courseId = common.formatterDate(indexJS.serverTime, '-') + '_' + currCourse.startTime + '_' + indexJS.userInfo.groupId;
                this.course = currCourse;
                this.course.courseId = courseId;
                if (common.isValid(currCourse.title) && common.isValid(currCourse.lecturer) && common.isValid(currCourse.courseType)) {
                    this.course.courseTypeName = courseType[currCourse.courseType];
                    this.course.courseName = currCourse.title + '_' + currCourse.lecturer + '_' + courseType[currCourse.courseType];
                    if (this.course.courseName.indexOf('undefined') > 0) {
                        this.course.courseName = '';
                    }
                }
                this.nextTickTime = nextTime;

                //更新课程表样式
                // indexJS.chgSyllabusCls(currCourse);
                //更新视频
                // videos.refreshVideo();
                //更新上课老师
                // indexJS.buildLiveTe(currCourse);
            }
        }
    },
    /**
     * 资料下载
     */
     downLoadSource:function(){
         var url =mm_url  +"/api/download";
         common.getJson(url,null,function (data) {
             var data = data.data;
             // console.log(data);
             indexJS.downLoadArr = data;
            indexJS.editSourceData(data);

         });
    },
    /**
     * 资料下载封装
     */
    editSourceData:function(data){
        var str='';
        for(var i in data){
            var updateTime = common.formatterDate(new Date(data[i].publishStartDate));
            var sourceMediaUrl = data[i].mediaUrl;
            var index01 = sourceMediaUrl.lastIndexOf(".");
            var index02 = sourceMediaUrl.length;
            var suffix = sourceMediaUrl.substring(index01+1,index02);
            str+=[" <li>",
                "                                               <ul class=\"clearfix\" >",
                "                                                   <li title='"+ data[i].detailList[0].title +"'>",
                "                                                       <span class=\"bg-"+ suffix +"\"></span>",
                "                                                       "+ data[i].detailList[0].title+"",
                "                                                   </li>",
                "                                                   <li>",
                "                                                       "+ updateTime +"",
                "                                                   </li>",
                "                                                   <li>",
                "                                                       "+ data[i].detailList[0].authorInfo.name+"",
                "                                                   </li>",
                "                                                   <li>",
                "                                                     <a href='javascript:void(0)' target='_blank' class='infodown' data-href='"+sourceMediaUrl+"'><span  class=\"bg-download\"></span></a>",
                "                                                   </li>",
                "                                               </ul>",
                "                                           </li>"].join("");
        }
        $("#downLoadSource").empty().append(str)
    },
    /*屏幕宽度控制*/
    widthCheck: function() {
        var ww = $(window).width();
        if (ww <= 1680) {
            $('body').addClass('wid1')
            if (ww <= 1440) {
                $('body').addClass('wid2')
                if (ww <= 1280) {
                    $('body').addClass('wid3')
                }
            }
        }
        if (ww > 1680) {
            $('body').removeClass('wid1')
            $('body').removeClass('wid2')
            $('body').removeClass('wid3')
        }
    },
    /*屏幕高度控制*/
    heightCalcu: function() {
        var hh = $(window).height();
        var hh_banner = $('.mod_banner').width() * 150 / 733;; //banner尺寸:733x150
        var hh_room = $('.mod_room').height();
        $('.mod_main .tabcont').height(hh - hh_banner - 115);
        // $('.mod_main .main_tab .scrollbox').height(hh - hh_banner - 130);
        $('.mod_video').height(hh - $('.mod_videolist').height() - 80);
        $('.mod_menu').height(hh - 70);
        $('.calendar_ul.scrollbox2').height(hh - 165);
        $('.main_tab .chat_content,.main_tab .chat_content .scrollbox').height(hh - hh_banner - 115 - $('.chat_input').height());
        $('.sdlistcont').height(hh - 155);
        $('.mysd_list .sdlistcont').height(hh - 215);
        $('.main_tab .sd_list .scrollbox').height(hh - hh_banner - 115 - 70);
        $('.dropitem.dr4 .scrollbox').height(hh - 140);
        $('.dropitem.dr6 .ppt_list').height(hh - 100);
        $('.userlist .scrollbox').height(360);
        $(".calendar-bottom").height(hh - 197)
        $(".message_list").height(hh - 115);
        $(".strade-part").height(hh - 120);
        // $(".dropcont").height(hh -50)
        $('.mod_main .tabcont').css('padding-top', 0);
        $('.boxmask').show();

        if (!$('.fy_pos').hasClass('hid')) {
            $('.mod_main .tabcont').css('padding-top', $('.fy_pos').outerHeight());
            $('.boxmask').hide();
            $('.mod_main .main_tab .scrollbox').height(hh - hh_banner - 130 - $('.fy_pos').outerHeight());
            $('.main_tab .chat_content,.main_tab .chat_content .scrollbox').height(hh - hh_banner - 115 - $('.chat_input').height() - $('.fy_pos').outerHeight());
            $('.main_tab .sd_list .scrollbox').height(hh - hh_banner - 115 - 70 - $('.fy_pos').outerHeight());
            $('.userlist .scrollbox').height(320);
        }

    },
};