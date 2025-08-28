/**
 * 直播间视频通用操作类
 * author Alan.wu
 */
var indexPlayer;

var videos={
    init:function(){
        /** 滚动字幕事件 */
        this.rollNews.bindEvents();
        /** 消息公告 */
        this.rollNews.getBulletin();
        /** 初始化播放列表 */
        this.playlist.init();
        return this;
    },
    /**
     * 播放器
     */
    player : {
        //腾讯云监听定时器对象
        qCloudIntervalObj: null,
        /**
         * 视频数据
         * @param $panel
         * @param key
         * @param value
         * @returns {*}
         */
        videoData : function($panel, key, value){
            var data = $panel.data("videoData") || {};
            if(arguments.length == 3){
                data[key] = value;
                $panel.data("videoData", data);
                return data;
            }else{
                return data[key];
            }
        },
        /**
         * 使用video播放视频
         * @param $panel
         * @param url
         * @param title
         * @param autostart
         */
        playByVideo : function($panel, url, title, autostart){
            this.clear($panel);
            $panel.html('<video src="' + url + '" controls="true" webkit-playsinline autoplay="'+autostart+'" style="width: 100%; height: 100%; background-color: rgb(0, 0, 0);"></video>');
            var vDom=$panel.find("video");
            /*makeVideoPlayableInline(vDom.get(0));*/
            if(autostart){
                vDom.trigger("play");
            }else{
                vDom.trigger("pause");
            }
        },

        /**
         * 使用腾讯云直播
         * @param $panel
         * @param url
         * @param title
         * @param autostart
         */
        playByQCloud: function($panel, url, title, autostart){
            this.clear($panel);
            var options = {
                "volume":1,
                "autoplay" : autostart,
                "width" :  '100%',
                "height" : '100%',
                "wording": {
                    5: "请检查是否已安装flash，如已安装请允许网站运行flash",
                    1002: "直播即将开始，请耐心等待"
                },
                listener: function(msg){
                    if(videos.player.qCloudIntervalObj) {
                        window.clearInterval(videos.player.qCloudIntervalObj);
                    }
                    if(msg.type == 'error'){
                        videos.player.qCloudIntervalObj = window.setInterval(function(){
                            player.load();
                        }, 5000);
                    }else{
                        if(videos.player.qCloudIntervalObj) {
                            window.clearInterval(videos.player.qCloudIntervalObj);
                        }
                    }
                }
            };
            var hdsdUrl = common.getVideoHDSDUrl(url);
            if (/\.m3u8/.test(url)){
                options.m3u8 = url;
                options.m3u8_hd = hdsdUrl.hd;
                options.m3u8_sd = hdsdUrl.sd;
            }else if(/rtmp/.test(url)){
                options.rtmp = url;
                options.rtmp_hd = hdsdUrl.hd;
                options.rtmp_sd = hdsdUrl.sd;
            }else{
                options.flv = url;
                options.flv_hd = hdsdUrl.hd;
                options.flv_sd = hdsdUrl.sd;
            }
            var player =  new TcPlayer($panel.attr('id'), options);
        },
        /**
         * 网易云直播
         * @param $panel
         * @param url
         * @param title
         * @param autostart
         */
        playByNetEaseCloud: function($panel, url, type){

            var container = document.getElementById($panel.attr('id'));
            container.innerHTML = '<video autoplay controls width="100%" height="100%" id="my-video" class="video-js"><source src="'+ url + '" type="'+ type +'"></video>';
            var options ={
                "controls": true,
                "autoplay": true,

                /*预加载选项*/
                "preload": "auto",
                /*
                'auto'预加载视频（需要浏览器允许）;
                'metadata'仅预加载视频meta信息;
                'none'不预加载;
                */
                "width": "100%",//设置播放器宽度
                "height": "100%",//设置播放器高度
                // "techOrder": ["flash", "html5"], //优先使用的播放模式
                "streamTimeoutTime": 30 * 1000, //拉流超时时间，默认30s
                /*设置播放器控件*/
                controlBar: {
                    playToggle: false
                },
                bigPlayButton:false
            };
            neplayer('my-video',options)

        },
        /**
         * 清空播放器
         */
        clear : function($panel){
            $panel.empty();
            this.videoData($panel, "currVideoUrl", "");
            this.videoData($panel, "currVideoTitle", "");
        },

        /**
         * 播放视频
         * @param url
         * @param title
         */
        play : function(url, title){
            if(url){
                var $panel = $("#videoPlayerPanel");
                if(this.videoData($panel, "currVideoUrl") == url && this.videoData($panel, "currVideoTitle") == title){
                    return;
                }
                this.videoData($panel, "currVideoUrl", url);
                this.videoData($panel, "currVideoTitle", title);

                if (/\.126\./.test(url)){
                    // this.playByQCloud($panel, url, title, true);
                    var typeVideo;
                    if(url.indexOf("rtmp") != -1){
                        typeVideo= "rtmp/flv"
                    }else{
                        typeVideo= "video/x-flv"
                    }
                    this.playByNetEaseCloud($panel, url, typeVideo);
                }
                videos.setStudioInfo(false);
            }
        }
    },

    /**
     * 播放列表
     */
    playlist : {
        /**
         * 初始化
         */
        init : function(){
            indexJS.setListScroll($(".mod_livelist .livetab .scrollbox"));//设置今日直播滚动条
            this.setEvent();
        },

        /**
         * 设置
         */
        setEvent : function(){
            //播放列表-tab切换
            $("#playlist_nav a").bind("click", function(){
                var loc_type = $(this).attr("t");
                $(this).addClass("on").siblings().removeClass("on");
                $("#playlist_panel ul[t!='" + loc_type + "']").hide();
                $("#playlist_panel ul[t='" + loc_type + "']").show();
            });

            //播放列表-隐藏
            $("#playlist_hide").bind("click", function(){
                $("#playlist_min").show();
                $("#playlist_max").hide();
            });

            //播放列表-显示
            $("#playlist_show").bind("click", function(){
                $("#playlist_min").hide();
                $("#playlist_max").show();
            });
            $("#strade-part .swiper-button-next").click(function () {
                var clicked = $.cookie("clicked")
                if(clicked == "yes"){
                    indexJS.straSwiper.init();
                    $.cookie('clicked', null);
                }

            })
        },

        /**
         * 刷新样式
         */
        refreshStyle : function(){
            var currTime = common.getHHMM(indexJS.serverTime);
            $("#playlist_panel ul[t='today'] li").each(function(){
                if(currTime < $(this).attr("st")){
                    $(this).attr("class", "");
                }else if(currTime < $(this).attr("et")){
                    $(this).attr("class", "on");
                }else{
                    $(this).attr("class", "over");
                }
            });
        }
    },

    /**
     * 滚动字幕（新闻）
     */
    rollNews : {
        /** 滚动定时器ID */
        newMarIntervalId : null,

        /**
         * 滚动新闻事件
         */
        bindEvents : function(){
            /**
             * 隐藏滚动文字
             */
            $('.mod_scrollnews .newsclose').click(function(){
                $('.mod_scrollnews .newslist').hide();
                $('.mod_scrollnews .newsbtn').show();
                clearInterval(videos.rollNews.newMarIntervalId);
                videos.rollNews.newMarIntervalId=null;
            });

            /**
             * 显示滚动文字
             */
            $('.mod_scrollnews .newsbtn').click(function(){
                $(this).hide();
                $('.mod_scrollnews .newslist').slideDown();
                $('#rollNewCount').data('count',0).text('').hide();
                videos.rollNews.newsMarquee(true);
            });

            /**
             * 点击显示详细内容
             */
            $(".newsbox ul").on("click","li",function () {
                var liContent = $(this).attr("data-content");
                var liTitle =$(this).attr("data-title");
                $(".notice-brand .notice-title").empty().html(liTitle);
                $(".notice-brand .notice-detail").empty().html(liContent);
                common.openPopup('.blackbg,.notice-brand');
            });


        },
        //获取消息公告
        getBulletin:function () {
            var url = mm_url+"/api/getNewBulletin";
            common.getJson(url,null,function(data){
               // console.log(data)
                if(data.msg =="OK"){
                    videos.rollNews.editNews(data.data)
                }

            });
        },

        /**
         * 滚动新闻
         * @param data
         */
        editNews:function(data){
            var str =''
          for(var i in data){
             str +=[" <li  data-content='"+ data[i].detailList[0].content + " ' data-title='"+data[i].detailList[0].title+"'><i></i>"+ data[i].detailList[0].title+"</li>",
                 ""].join("");
          }
          $(".newsbox ul").empty().append(str);
            videos.rollNews.newsMarquee( $(".newslist"));

        },

        /**
         * 新闻滚动
         */
        newsMarquee:function (ele) {
            $(ele).slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",interTime:50,trigger:"click"});
        }
    },
    /**
     * 循环教学视频
     */
    loopVideo:function(list){
        var i =0;
        indexPlayer = videojs("my-player", {
            "width":"100%",
            "height":"100%",
            "autoplay":true,
            "controls": true,
            "sources": [{
                src: list[i],
                type: "video/mp4"
            }],

        }, function(){
            this.on('loadeddata',function(){

            })
            this.on('ended',function(){
                i++;
                if(i >= list.length){
                    i = 0;
                }
                var videoObj = list[i];
                this.src({type: "video/mp4", src: videoObj});
                this.play();
            })

        });
        // console.log(indexPlayer)
    },

    /**
     * 有直播课
     * @param isOnlyLive
     */
    playAuto : function(course){
        // console.log(course)
        if (course.liveLink && course.liveLink.length > 0) {
            $.each(course.liveLink, function(i, row) {
                // console.log(row)
                if (row.code == '1') {
                    course.studioLink = row.url;
                }
            });
        }
        var $panel = $("#videoPlayerPanel");
        if(course.courseType==0){
            //文字直播
            $("#nextCourse").show();
            this.setStudioInfo(course);
            this.player.clear($panel);
        }else{
            $panel.empty();
            $("#nextCourse").empty().hide();
            $("#videoPlayerPanel").show();
            //视频直播时间
            this.player.play(course.studioLink, course.title);
        }
        // 找出当前分析师的 id对应到相对应的交易策略
        var lecturerId = course.lecturerId;
        var num = Number($('#'+ lecturerId).attr('data-swiper-slide-index'))
           num = num+1
        indexJS.straSwiper.slideTo(num);
        $.cookie('clicked', 'yes');

    },
    /**
     * 无直播课 教学视频循环播放
     */
    playVideo:function(text){
        //视频右侧显示内容
        if(text == "fromTeach"){
            $("#playlist_panel ul[t='today']").children.last().remove();
        }
        $("#playlist_panel .teachLesson").prev().removeClass("on")
        $("#videoLoop").show();
        videos.getVideoListChu(0,100)
    },
    /**
     * 获取教学视频
     */
    getVideoListChu:function(startPage,endPage){
        var url = m_url + "/api/getTeachVedios";
        var options = {
            startPage:startPage,
            endPage:endPage
        };
        common.ajaxNews(url,options,function (video) {
            if(video.length == 0){
                $("#video_more").empty();
                return;
            }
            videos.loopVideo( videos.getNewRandomVideo(video));
        });
    },

    /**
     *  遍历video数据 随机排列
     */
    getNewRandomVideo:function(video){
        var mediaVideo =[];
        var newVideo = [];
        for(var i in video) {
            mediaVideo.push(video[i].mediaUrl);
            newVideo= mediaVideo.sort(videos.randomsort);
        }
        return newVideo;
    },
    /**
     *  随机排列获取的数据
     */
    randomsort:function(){
        return Math.random()>.5 ? -1 : 1;
    },
    /**
     * 设置直播信息
     * @param course 课程信息，如果是false表示隐藏课程信息提示
     */
    setStudioInfo:function(course){
        this.textShow(course);
    },
    textShow:function(course){
        var txt='当前正在文字直播';
        var date = new Date().getDay();
        $("#nextCourse").find(".ntext").text(txt);
        $("#nextCourse").find("img").attr("src", course.avarImg);
        $("#nextCourse .nextbox").show();
        $("#nextCourse").find(".t_name").text("特邀"+ course.lecturer);
        $("#nextCourse").find(".live_name").text(course.title);
        $("#nextCourse").find(".time").text(common.daysCN[date]+' '+course.startTime+' - '+ course.endTime);

    },

};