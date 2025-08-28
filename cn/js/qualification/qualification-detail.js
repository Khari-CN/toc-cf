
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
     //添加广告位图片
     loadImg:function(){
         var url = cms_url+"/api/ad/action/10";
         $.loadingPost(url,null,function(data){
             var img = JSON.parse(data);
             if(img.length > 0){
                $("#imgUrl").find("a").attr("href",img[0].attr.image_link);
                $("#imgUrl").find("img").attr("src",img[0].attr.image_url);
             }    
         })
     },
     // 得到每一个分类下的内容
     getItem:function (item) {
         var html ='';
         for(var j=0 ;j<item.list.length;j++){
             html += [" <div class=\"item-1\">",
                 "  "+item.list[j].subtitle+"",
                 " "+item.list[j].answer+"",
                 " "+item.list[j].pic+"",
                 "                            </div>"].join("");
         }
         return html;
     },
     //面包屑文案
     getText:function (text) {
         $("#crumb-text").html(text)
     },
     //左边列表
     getList:function (prama,data) {
         var list='';
         for(var i =0;i<data.length;i++){
              var titleNum;
              titleNum = i+1;

             list+=["     <li  data-type="+ i +"><span>"+ titleNum +"</span><a href=\"javascript:void(0)\">"+data[i].title+"</a></li>",
                 "                   "].join("");
         }
         $("#urlList").empty().append(list)
     },
     //右边内容
     getContent:function (prama) {
        var url = " /cn/js/qualification/qualification-detail.json";
         $.loadingPost(url,null,function(data){
             var data = data.data;
             var str='';

             //左侧列表
             $.getList(prama,data);
             //底部上一篇下一篇
             $.navList(prama,data);
             for(var i = 0;i<data.length;i++){
                 if( prama == i){
                     //面包屑文案
                     $.getText(data[i].title);

                     str = ["<div class=\"detail-title\">" + data[i].title +"</div>",
                         "                      <div class=\"top1\">",
                         "                          "+ data[i].result.detail.shortTitle +"",

                         "                          <div class=\"layout-1\">",
                         "                             "+ $.getItem(data[i].result.detail) +"",
                         "                          </div>",
                         "                      </div>",
                         "                    <div class=\"top2\">",
                         "                        "+ data[i].result.application.shortTitle +"",
                         "                        <div class=\"layout-1\">",
                         "                             "+ $.getItem(data[i].result.application) +"",
                         "                        </div>",
                         "                    </div>",
                         "                    <div class=\"top3\">",
                         "                       "+ data[i].result.how.shortTitle +"",
                         "                        <div class=\"layout-1\">",
                         "                             "+ $.getItem(data[i].result.how) +"",
                         "                        </div>",
                         "                    </div>",
                         "                    <div class=\"top4\">",
                         "                        "+ data[i].result.example.shortTitle +"",
                         "                        <div class=\"layout-1\">",
                         "                             "+ $.getItem(data[i].result.example) +"",
                         "                        </div>",
                         "                    </div>"].join("");
                 }

             }
             $(".content-detail").empty().append(str);
         })
     },
   //  导航条
     navList:function (prama,data) {
       var list='';
         var numa,numb;
         numa =Number(prama+1) ;
         numb = Number(prama-1);

               if(numb== -1){
                   list+=[" <div class=\"lastpage\">上一篇：<a id=\"lastPage\" data-num=\""+numb+"\">没有上一篇了</a></div>",
                       "                    <div class=\"nextpage\">下一篇：<a id=\"nextPage\" data-num=\"" +numa+ "\">"+data[numa].title+"</a></div>"].join("");
               }else if(numa == data.length){
                   list+=[" <div class=\"lastpage\">上一篇：<a id=\"lastPage\" data-num=\""+numb+"\">"+data[numb].title+"</a></div>",
                       "                    <div class=\"nextpage\">下一篇：<a id=\"nextPage\" data-num=\"" +numa+ "\">没有下一篇了</a></div>"].join("");
               }else{
                    list+=[" <div class=\"lastpage\">上一篇：<a id=\"lastPage\" data-num=\""+numb+"\">"+data[numb].title+"</a></div>",
                        "                    <div class=\"nextpage\">下一篇：<a id=\"nextPage\" data-num=\"" +numa+ "\">"+data[numa].title+"</a></div>"].join("");
               }

         $("#pageOrder").empty().append(list)
     },
     // 返回顶部
     backTop:function () {
         $("html,body").animate({scrollTop:0}, 500);
     }

 });
