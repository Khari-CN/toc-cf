// 步骤组件
!(function() {

    class Step {
        constructor(el, config) {
            if (!el) {
                console.log('请传入节点！')
                return
            }
            this.el = el
            this.config = config
  
            this.currentIndex = 0
            this.length = 0
            this.init()
        }
  
        init() {
            this.ulDom = this.el.getElementsByClassName('ipage-component-step-ul')[0]
            this.imgsDom = this.el.getElementsByClassName('ipage-component-step-images')[0]
  
            this.bindEvent()
            this.renderImage()
        }
  
        bindEvent() {
            const stepItemList = this.ulDom.getElementsByClassName('step-item-li')
            for (let i = 0; i < stepItemList.length; i++) {
                const step = stepItemList[i]
                step.addEventListener('click', ()=>{
                    if (i === this.currentIndex) {
                        return
                    } else {
                        stepItemList[this.currentIndex].classList.remove('active')
                        this.currentIndex = i
                        stepItemList[this.currentIndex].classList.add('active')
                        this.renderImage()
                    }
  
                }
                , false)
            }
        }
  
        renderImage() {
            const images = this.imgsDom.getElementsByClassName('step-item-image')
            for (let i = 0; i < images.length; i++) {
                if (i === this.currentIndex) {
                    images[this.currentIndex].style.display = 'block'
                } else {
                    images[i].style.display = 'none'
                }
            }
        }
    }
  
    const steps = document.querySelectorAll('.ipage-component-step')
    for (let i = 0; i < steps.length; i++) {
        const el = steps[i]
        new Step(el,{
            type: el.dataset.type
        })
    }
  
  }
  )()
  
  $('.CFD-ios').hover(function() {
    $(".ios-CFD").show();
  }, function() {
    $(".ios-CFD").hide();
  });
  $('.CFD-android').hover(function() {
    $(".android-CFD").show();
  }, function() {
    $(".android-CFD").hide();
  });

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
    idealList:function () {
        var url = "/cn/js/qualification/qualification.json";
        $.loadingPost(url,null,function(data){
            $.appendStr(data)
        });
    },
    appendStr:function(data) {
        var data = data.result;
        var length = data.length;
          var lock;

        var str='';
        for(var i=0;i<length;i++){
            var lockLabel = data[i].property;
            if(lockLabel == 1){
                lock = "ds"
            }else{
                lock =""
            }
            var href =  data[i].addUrl;
            str += ["   <li>",
                "                           <a href=" + href +  " target=\"_blank\">",
                "                               <div class=\"item-1\"><div class=\"mask "+ lock +"\"><img class=\"lock "+ lock +"\" src=\"/source/www/news/qualification/forward.png\" alt=\"\"></div><img class=\"top-bannerr\" src=\""+img_url + data[i].imgUrl+"\" alt=\"\"></div>",
                "                               <div class=\"item-2\">",
                "                                   <div class=\"left\"><span></span> "+ data[i].title + "</div>",
                "                                   <div class=\"right\"><i class='rightArrow'></i></div>",
                "                               </div>",
                "                               <div class=\"item-3\">",
                "                                   " + data[i].abstract + " ",
                "                               </div>",
                "                           </a>",
                "                       </li>"].join("");
        }
        $("#detail-box").empty().append(str);
    },
    //添加广告位图片
    loadImg: function () {
        var url = cms_url + "/api/ad/action/10";
        $.loadingPost(url, null, function (data) {
          var img = JSON.parse(data);
          if (!img || img.length == 0) {
            return;
          }
          $("#imgUrl").find("a").attr("href", img[0].attr.image_link);
          $("#imgUrl").find("img").attr("src", img[0].attr.image_url);
        });
      },
});