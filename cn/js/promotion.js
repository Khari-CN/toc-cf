// window.addEventListener(
//   "resize",
//   function () {
//     $("#container").html("");
//     $.getData();
//     if (screenwidth !== $(window).width()) {
//       $("#container").html("");
//       $.getData();
//       $.show4Items(1);
//       $(".reload").css("display", "block");
//       alert("resize");
//       location.reload();
//     }
//     console.log("hello world");
//   },
//   true
// );
// $(window).on("resize", function () {
//   if (screenwidth !== $(window).width()) {
//     //action performed while resize

//     $("#container").html("");
//     $.getData();
//     $.show4Items(1);
//     $(".reload").css("display", "block");
//     location.reload();
//   }
// });
var resizeTimer;
var screenwidth = $(window).width();

$(window).on("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    var newScreenWidth = $(window).width();
    if (screenwidth !== newScreenWidth) {
      // 确实发生了宽度变化，执行相关操作
      $("#container").html("");
      $.getData();
      $.show4Items(1);
      $(".reload").css("display", "block");
    }
    screenwidth = newScreenWidth; // 更新屏幕宽度以供下次比较
  }, 250); // 250毫秒的防抖动时间
});



$.extend({
  //通用ajax
  ajaxk: function (type, url, options, callbackSuc, callbackErr) {
    $.ajax({
      type: type,
      url: url,
      async: false,
      data: options,
      dataType: "json", // 数据类型为jsonp
      //jsonp:'jsonpCallback',
      success: function (data) {
        //console.log(data);
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  //post请求
  post: function (url, options, callbackSuc, callbackErr) {
    $.ajaxk("POST", url, options, callbackSuc, callbackErr);
  },
  //get请求
  post: function (url, callbackSuc, callbackErr) {
    $.ajaxk("GET", url, null, callbackSuc, callbackErr);
  },
  //获取数据
  getData: function () {
    //广告列表
    // var urlSmall = cms_url+"/api/ad/action/2?_r="+Math.random();
    var param = "2";
    var width = document.documentElement.clientWidth;

    if (width <= 798) {
      param = "27";
    }
    var urlSmall = `https://www.cms139.com/api/ad/action/${param}?_r=${Math.random()}`;
    $.post(urlSmall, $.editSmalls);
  },

  editSmalls: function (data) {
    var smalls = JSON.parse(data);
    // console.log(smalls)
    // console.log($("#container"))

    var containerHtml = "";

    for (let i = 0; i < smalls.length; i++) {
      var text = smalls[i].description.split("#");
      var width = document.documentElement.clientWidth;
      // if (width <= 798){
      //   smalls[i].attr.image_link = smalls[i].attr.image_link.replace("www", "m");
      //   console.log(smalls[i]);
      // }

      // console.log("hello world", smalls[i]);
      if (i == 0) {
        //填充大图片位置的数据
        $("#big-title").text(smalls[0].name);
        $("#big-1").text(text[0]);
        $("#big-2").text(text[1]);
        $("#big-3").text(text[2]);
        $("#big-4").text(text[3]);
        $("#big-5").text(text[4]);
        $("#big-img").attr("href", smalls[0].attr.image_link);
        $("#big-img").find("img").attr("src", smalls[0].attr.image_url);
        $("#time").attr("time", smalls[0].endTime);
        $("#action-detail").attr("href", smalls[0].attr.image_link);
      } else {
        //填充小图片位置的数据
        // var index = parseInt(i);
        var item = i % 4 == 0 ? "item2" : "item1";
        var imageLink = smalls[i].attr.image_link;
        // console.log("smalls[index].attr.image_link", smalls[i].attr.image_link)

        var html = [
          '<div class="col-md-4 ' + item + '">',
          '<div class="img-wrapper">',
          '<a class="img-item" href="' +
            smalls[i].attr.image_link +
            '" onclick="window.location.href=\'' +
            smalls[i].attr.image_link +
            "'\">",
          '<img src="' + smalls[i].attr.image_url + '">',
          '<div class="pc">',
          '<div class="hover-img">',
          '<p class="text-hover">' + smalls[i].name + "</p>",
          '<img src="//sc.cfygxz.com/source/www/acc/promotion/forward.png">',
          "</div>",
          "</div>",
          "</a>",
          "</div>",
          '<div class="sub-promotion-intro">',
          '<p class="title-item-min">' + text[0] + "</p>",
          '<div class="height-content-item">',
          '<div class="sub-rewards">',
          '<div class="title-min-1">' + text[1] + "</div>",
          '<div class="des-min-1">' + text[2] + "</div>",
          "</div>",
          '<div class="sub-platform">',
          '<div class="title-min-1">' + text[3] + "</div>",
          '<div class="des-min-1">' + text[4] + "</div>",
          "</div>",
          "</div>",
          '<div class="sub-countdown-box">',
          '<div class="parent-box border-settime-1">',
          '<div class="sub-countdown-hints">',
          '<span class="rest">离结束剩</span>',
          "</div>",
          '<div id="time" class="item-wrapper clock" time="' +
            smalls[i].endTime +
            '">',
          '<span class="days">0<span class="text-day">天</span></span>',
          '<span class="hours">0:</span>',
          '<span class="minute">0:</span>',
          '<span class="seconds">00</span>',
          "</div>",
          '<div class="sub-countdown-icon">',
          '<div class="icon-active"></div>',
          "</div>",
          "</div>",
          "</div>",
          '<div class="m">',
          '<a class="btn-blue" href="' +
            smalls[i].attr.image_link +
            '" onclick="window.location.href=\'' +
            smalls[i].attr.image_link +
            "'\">",
          "活动详情</a>",
          "</div>",
          "</div>",
          "</div>",
        ].join("");

        containerHtml += html;
        // $("#image-link-" + i).attr("href", imageLink);
        // $("#image-link-" + i).on("click", function() {
        //   console.log("imageLink", imageLink)
        //   window.location.href=imageLink
        // });
        // $("#btn-link-" + i).attr("href", imageLink);
        // $("#btn-link-" + i).on("click", function() { window.location.href=imageLink})
        //修改结束活动的跳转地址
      }
    }

    // console.log("containerHtml", containerHtml);
    $("#container").html(containerHtml);

    $.show4Items(1);
    // console.log("append end", $("#container").html())
  },
  show4Items: function (time) {
    $(".container > .col-md-12 > .col-md-4").each(function (index) {
      if (index < time * 4) {
        $(this).show();
      }
    });
  },
});
(function ($) {
  $.getData();
  function timer(element, time) {
    var countDown = setInterval(function () {
      var days = Math.floor(time / 24 / 60 / 60);
      var hoursLeft = Math.floor(time - days * 86400);
      var hours = Math.floor(hoursLeft / 3600);
      var minutesLeft = Math.floor(hoursLeft - hours * 3600);
      var minutes = Math.floor(minutesLeft / 60);
      var remainingSeconds = time % 60;
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      element.innerHTML =
        '<span class="days">' +
        days +
        '<span class="text-day">天</span></span><span class="hours">' +
        hours +
        ':</span><span class="minute">' +
        minutes +
        ':</span><span class="seconds">' +
        remainingSeconds +
        "</span>"; // "Ngày: " + days + ":" + "Giờ: " + hours + ":" + "Phút: " + minutes + ":" + "Giây: " + remainingSeconds;
      if (time <= 0) {
        element.innerHTML = '<span class="days">已结束</span>';
        $(element).closest(".parent-box").addClass("inactive");
        $(element).closest(".parent-box").find(".rest").css("display", "none");
        clearInterval(countDown);
        // console.log("cfd countdown running");
        var aList = $(element).parent().parent().parent().parent().find("a");
        aList.each(function () {
          // $(this).attr("href","https://www.cf-service.com/k800/chatClient/chatbox.jsp?companyID=475&configID=56");
          $(this).attr("target", "_blank");
        });
      } else {
        time--;
        // console.log("cfd countdown stoped");
      }
    }, 1000);
  }

  function startClock(element, time) {
    if (isNaN(time) == true) {
      console.log("Thời gian nhập vào không phải số");
      return false;
    } else {
      timer(element, time);
    }
  }

  function convert(date, timezone) {
    var utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * timezone);
  }

  $(".reload").click(function () {
    $(this).hide();
    $.show4Items(2);
  });

  // function show4Items(time) {
  //   $(".container > .col-md-12 > .col-md-4").each(function (index) {
  //     if (index < time * 4) {
  //       $(this).show();
  //     }
  //   });
  // }
  /* OnLoad Page */
  $(document).ready(function ($) {
    // show four items in first time
    // show4Items(1);

    var current = convert(new Date(), 8);
    $(".clock").each(function () {
      //console.log($(this).attr("time"))
      if ($(this).attr("time") == "" || $(this).attr("time") == "undefined") {
        $(this).html("<span class='days'>永久有效</span>");
        $(this).parent().find(".rest").text("");
      } else {
        var end = convert(new Date($(this).attr("time")), 8);
        var remain = Math.floor((end.getTime() - current.getTime()) / 1000);
        startClock(this, remain);
      }
    });
  });
})(jQuery);

// 步骤组件
!(function () {
  class Step {
    constructor(el, config) {
      if (!el) {
        console.log("请传入节点！");
        return;
      }
      this.el = el;
      this.config = config;

      this.currentIndex = 0;
      this.length = 0;
      this.init();
    }

    init() {
      this.ulDom = this.el.getElementsByClassName("ipage-component-step-ul")[0];
      this.imgsDom = this.el.getElementsByClassName(
        "ipage-component-step-images"
      )[0];

      this.bindEvent();
      this.renderImage();
    }

    bindEvent() {
      const stepItemList = this.ulDom.getElementsByClassName("step-item-li");
      for (let i = 0; i < stepItemList.length; i++) {
        const step = stepItemList[i];
        step.addEventListener(
          "click",
          () => {
            if (i === this.currentIndex) {
              return;
            } else {
              stepItemList[this.currentIndex].classList.remove("active");
              this.currentIndex = i;
              stepItemList[this.currentIndex].classList.add("active");
              this.renderImage();
            }
          },
          false
        );
      }
    }

    renderImage() {
      const images = this.imgsDom.getElementsByClassName("step-item-image");
      for (let i = 0; i < images.length; i++) {
        if (i === this.currentIndex) {
          images[this.currentIndex].style.display = "block";
        } else {
          images[i].style.display = "none";
        }
      }
    }
  }

  const steps = document.querySelectorAll(".ipage-component-step");
  for (let i = 0; i < steps.length; i++) {
    const el = steps[i];
    new Step(el, {
      type: el.dataset.type,
    });
  }
})();
