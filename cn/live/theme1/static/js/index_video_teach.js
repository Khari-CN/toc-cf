/**
 * 直播间视频区教学选项卡操作类
 * author Amy zhang
 */

var videosTeach = {
    player:"",
    init: function(){
        this.setEvent();
    },
    setEvent: function(){
        /**
         * 教学视频列表切换
         */
        $('#teachVideoId a').bind("click", function(e, callback, isAll){

            $('#teachVideoId a').removeClass('on');
            var $this = $(this);
            // if($("#tab-content").hasClass(".finished-load")) return;
            videosTeach.getVideoList($this.addClass("on").attr("t"), function(){
                if(typeof callback === "function"){
                    callback(isAll);
                }
            });
        });
        /**
         * 教学视频
         */
        $("#tab-content").on('click','li a',function(){
            $("#backLiveRoom").show();
              var teachVideoUrl = $(this).attr('data-url');
              if(indexPlayer == undefined){
                  console.log("没有indexplayer")
              }else{
                  indexPlayer.pause()
               }
              $("#videoLoop,#nextCourse,#videoPlayerPanel").hide();
              $(".video-teach").show();
              // $("#video-teach_html5_api").attr('src','');

              videosTeach.teachVideo(teachVideoUrl)
        })
        /**
         * 返回直播间按钮事件
         */
        $("#backLiveRoom").click(function () {
            $(this).hide();
            videosTeach.player.pause();
            if(indexPlayer){
                indexPlayer.play()
            }

            var liveRoomStatus = indexJS.needLive.length;
            var data = indexJS.needLive;
            if(liveRoomStatus == 0){
                $("#videoLoop").show();
                videos.playVideo("fromTeach");
            }else{
                $(".video-teach").hide();
                // videos.playAuto(data[0])
                if(data[0].courseType==0){
                    //文字直播
                    $("#nextCourse").show();
                }else{
                  $("#videoPlayerPanel").show();
                }
            }
        })
    },
    /**
     * 教学视频播放
     */
    teachVideo:function(url){
        videosTeach.player =videojs('video-teach');
       videojs('video-teach').ready(function () {
           videosTeach.player.src(url);
           videosTeach.player.load();
           videosTeach.player.play()
       })
    },
    /**
     * 获取视频
     * @param categoryId
     * @param callback
     */
    getVideoList:function (prama) {
        var url = m_url +"/api/getTeachVedios";
        var options = {
            //第几页0则代表全部
            startPage:0,
            endPage:1000,
            code:prama
        };
        common.ajaxNews(url,options,function(data){
            videosTeach.editVideo(data);
        });
    },
    editVideo:function (data) {
        // console.log(data);
        var str ='';
        for(var i in data){
            var detailTitle = data[i].detailList[0].title;

            str += ["<li>",
                "   <a href=\"javascript:void(0)\" data-url='"+data[i].mediaUrl +"'>",
                "    <img src=\""+ data[i].mediaImgUrl +"\" alt=\"\">",
                "    <p>"+detailTitle+"</p>",
                "    </a>",
                "    </li>"].join("");
        }
        $("#tab-content").empty().append(str);
        // $("#tab-content").addClass("finished-load");

    }

};
