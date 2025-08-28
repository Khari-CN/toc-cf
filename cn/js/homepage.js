(function ($) {
  // Function to change quatation images and contents
  function section1Tabs(idTab) {
    var stopClick = 0;
    var xx = $(idTab);
    var yy = xx.find("li");
    $(yy).click(function (event) {
      //        	triggerScrollEvent();
      if (event.timeStamp - stopClick > 500) {
        var index = $(this).index();
        index += 1;
        event.preventDefault();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var zz = $(this)
          .closest(idTab)
          .next()
          .find($(".frame" + index));
        var e = $(this)
          .closest(idTab)
          .next()
          .find($(".frame" + index + " img"));
        var g = zz.find($(".item-details"));
        var h = zz.siblings().find(".item-details");
        var block1 = zz.find(".block-1");
        var block2 = zz.find(".block-2");
        var block3 = zz.find(".block-3");
        var block4 = zz.find(".block-4");
        var f = e.parent().siblings("div");
        e.fadeTo(300, 1).removeClass("hide");
        f.find("img").fadeTo(300, 0).removeClass("show");
        h.removeClass("show").hide();
        g.show();
        zz.addClass("active").removeClass("hide");
        // add class .delay(350)
        zz.siblings("div").finish().removeClass("active");
        var d = $(".frame-bg" + index);
        if (d.length) {
          for (i = 0; i <= 5; i++) {
            if (d.hasClass("after" + i)) {
              var tt = "after" + i;
              d.removeClass(tt);
              var qq = $(".frame-bg" + index).siblings(".before");
              if (qq.length) {
              }
              if (qq.hasClass("before")) {
                qq.delay(500).queue(function (next) {
                  qq.removeClass("before").finish();
                  qq.addClass(tt).finish();
                  next();
                });
              }
            }
          }
        }
        d.addClass("before");
        var q = $(".frame-bg" + index).siblings(".before");
        if (q.length) {
        }
        if (q.hasClass("before")) {
          q.delay(500).queue(function (next) {
            q.removeClass("before").finish();
            q.addClass("after" + index).finish();
            next();
          });
        }

        stopClick = event.timeStamp;
        triggerScrollEvent(zz[0]);
      }
    });
  }
  // Function to type text on top
  function typeText() {
    $("#typed").typed({
      stringsElement: $("#typed-strings"),
      typeSpeed: 70,
      loop: true,
      loopCount: false,
      // time before backspacing
      backDelay: 3000,
      contentType: "html",
      loopCount: false,
    });
  }

  // Function to change color typed text
  /*function myTimer() {
        switch ($(".background-change .animation").attr("class")) {
            case "animation":
                $(".background-change .animation").addClass("first");
                break;
            case "animation first":
                $(".background-change .animation").toggleClass("first second");
                break;
            case "animation second":
                $(".background-change .animation").toggleClass("second third");
                break;
            case "animation third":
                $(".background-change .animation").toggleClass("third fourth");
                break;
            case "animation fourth":
                $(".background-change .animation").toggleClass("fourth fifth");
                break;
            case "animation fifth":
                $(".background-change .animation").toggleClass("fifth first")
        }
    }*/
  // Function to change normal Tabs on section 3 home page
  function section3Tabs(idTab) {
    var x = $(idTab);
    var y = x.find("li");
    $(y).click(function (event) {
      var index = $(this).index();
      index += 1;
      event.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      var z = $(this)
        .closest(idTab)
        .next()
        .find($(".item" + index + "-details"));
      z.fadeIn(350, "swing").removeClass("hide");
      z.siblings().removeClass("show").hide();
    });
  }
  // Function to change Tabs and gif files on section 4 home page
  function section4Tabs(idTab) {
    var x = $(idTab);
    var y = x.find("li");
    $(y).click(function (event) {
      var index = $(this).index();
      index += 1;
      event.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      var z = $(this)
        .closest(idTab)
        .next()
        .find($(".item" + index + "-details"));
      z.fadeIn(350, "swing").removeClass("hide");
      z.siblings().removeClass("show").hide();
      var gif = $("#gif-de" + index);
      gif.removeClass("hide").fadeIn(function () {
        triggerScrollEvent($(y).closest(".section4")[0]);
      });
      gif.siblings().removeClass("show").fadeOut();
    });
  }
  // Function to update values of quatation box
  function updateQata() {
    $.ajax({
      dataType: "json",
      url: "json/text.json",
      success: function (data) {
        var i = 0;

        var setTime = setInterval(function () {
          for (var make in data.Bigdata) {
            var max1 = data.Bigdata["frame1"].length;
            var max2 = data.Bigdata["frame2"].length;
            var max = max1 > max2 ? max1 : max2;
            if (make == "frame1") {
              if (i >= max1) {
                var model = data.Bigdata["frame1"][max1 - 1].price;
                var doors = data.Bigdata["frame1"][max1 - 1].timer;
              } else {
                for (var car = 0; car <= data.Bigdata["frame1"].length; car++)
                  var tt = data.Bigdata["frame1"].length;
                // console.log(tt);
                for (j = 0; j <= 3; j++) {
                  var jcr = j + 1;
                  eval(
                    "var price" +
                      jcr +
                      "=data.Bigdata['frame1'][" +
                      i +
                      "][" +
                      j +
                      "].price" +
                      jcr
                  );
                }
              }
            } else if (make == "frame2") {
              if (i >= max2) {
                var model1 = data.Bigdata["frame2"][max2 - 1].price;
                var doors2 = data.Bigdata["frame2"][max2 - 1].timer;
              } else {
                var tt = data.Bigdata["frame2"][1][0].percent1;
                // console.log(tt);
                for (m = 0; m <= 3; m++) {
                  var mcr = m + 1;
                  eval(
                    "var price2" +
                      mcr +
                      "=data.Bigdata['frame2'][" +
                      i +
                      "][" +
                      m +
                      "].price" +
                      mcr
                  );
                }
              }
            }
            $("#price1").addClass("blink").html(price1);
            $("#price2").addClass("blinkc").html(price2);
            $("#price3").addClass("blinkc").html(price3);
            $("#price4").addClass("blink").html(price4);
            $("#price21").addClass("blinkc").html(price21);
            $("#price22").addClass("blink").html(price22);
            $("#price23").addClass("blink").html(price23);
            $("#price24").addClass("blinkc").html(price24);
            var rvbl = $(".block-wrapper").find(".blink");
            var rvblc = $(".block-wrapper").find(".blinkc");
            // console.log(rvbl);
            rvbl.delay(2000).queue(function (next) {
              rvbl.removeClass("blink").finish();
              rvblc.removeClass("blinkc").finish();
              next();
            });
          }
          i += 1;
          // console.log(i);
          // console.log(max);
          if (i >= max) {
            clearInterval(setTime);
          }
        }, 5000);
      },
    });
  }
  // Function to change Charts on mouse hover
  function hoverChart() {
    $(".item-chart li").hover(function () {
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    });
  }
  // Function to run sliders on Home Page
  function runSlider() {
    $(".hero .flexslider").flexslider({
      slideshow: true,
      animation: "fade",
      directionNav: false,
      slideshowSpeed: 5000,
      animationSpeed: 1500,
      pauseOnAction: false,
      pauseOnHover: true,
      start: function (slider) {
        $("body").removeClass("loading");
      },
    });
    $(".flex-control-nav li").on("mouseover", function () {
      $(".slides >li").finish();
      $(this).find("a").trigger("click");
    });
  }

  function createChart(id, x, y, title) {
    var x1 = x,
      y1 = y;
    var data = [
        {
          y: x1,
          color: "#ffffff",
          drilldown: {
            data: [x1],
            color: ["#0078b4"],
          },
        },
        {
          y: y1,
          color: "#ffffff",
          drilldown: {
            data: [y1],
            color: ["#ff9f00"],
          },
        },
      ],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;

    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {
      // add browser data
      browserData.push({
        y: data[i].y,
        color: data[i].color,
        dataLabels: data[i].dataLabels,
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        versionsData.push({
          y: data[i].drilldown.data[j],
          color: data[i].drilldown.color[j],
        });
      }
    }
    // Create the chart
    $(id).highcharts({
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      chart: {
        type: "pie",
        renderTo: "histogram",
        defaultSeriesType: "bar",
        backgroundColor: null,
      },
      title: {
        text: title,
        y: 170,
        useHTML: true,
      },
      series: [
        {
          name: "Versions",
          data: versionsData,
          borderWidth: 0,
          size: "85%",
          innerSize: "85%",
          allowPointSelect: true,
          enableMouseTracking: false,
          dataLabels: {
            formatter: function () {
              // hide data label
              return null;
            },
          },
          states: {
            hover: {
              halo: {
                size: 0,
                opacity: 0.3,
              },
            },
          },
        },
      ],
    });
  }

  // Function to appeare highcharts
  (function (H) {
    function deferRender(proceed) {
      var series = this,
        $renderTo = $(this.chart.container.parentNode);

      // It is appeared, render it
      if ($renderTo.is(":appeared") || !series.options.animation) {
        proceed.call(series);

        // It is not appeared, halt renering until appear
      } else {
        $renderTo.appear(); // Initialize appear plugin
        $renderTo.on("appear", function () {
          proceed.call(series);
        });
      }
    }

    H.wrap(H.Series.prototype, "render", deferRender);
  })(Highcharts);

  // Function to check age of customers
  function checkAge() {
    var error = $(".madlib-error");
    $("#age").focusout(function (event) {
      var age = $("#age").val();
      if (age && age >= 18 && age <= 70) {
        error.hide();
      } else {
        error.show();
      }
    });
  }

  // function checkIncome() {
  //     var error = $(".income-error");
  //     $("#income").focusout(function(event) {
  //         if($(this).val()) {
  //             error.hide();
  //         } else {
  //             error.show();
  //         }
  //     });
  // }

  function goSubmit() {
    $("#get-result").click(function (e) {
      e.preventDefault();
      if (validate()) {
        $.cookie("accessAssessment", "true", { path: "/" });
        var url =
          "/cn/platform/assessment-result.html#/?age=" +
          $("#age").val() +
          "&income=" +
          $("#income .current").html() +
          "&risk=" +
          $("#job").val() +
          "&invest=" +
          $("#investYear .current").html();
        window.location.href = url;
      }
    });
  }

  function validate() {
    if (
      $(".madlib-error").is(":visible") ||
      $(".income-error").is(":visible")
    ) {
      return false;
    }

    if (
      !$("#age").val() ||
      !$("#income .current").html() ||
      !$("#investYear .current").html()
    ) {
      if (!$("#income").val()) {
        $(".income-error").show();
      }
      if (!$("#age").val()) {
        $(".madlib-error").show();
      }
      return false;
    }
    return true;
  }

  // Function to check number
  // function checkNumber() {
  //     $(".age").autoNumeric("init", {
  //         vMin: "0",
  //         vMax: 1000
  //     });
  //     $(".enter-income").autoNumeric("init", {
  //         vMin: "0",
  //         vMax: 999999999
  //     });
  // }

  // build scenes scroll magic
  // var controller = new ScrollMagic.Controller({
  //   globalSceneOptions: {
  //     offset: 250,
  //   },
  // });

  // var scene = new ScrollMagic.Scene({
  //   triggerElement: ".section1",
  // })
  //   .setClassToggle(".section1", "active")
  //   .addTo(controller);

  // Function to init clock Countdown.
  function startCountdown(element, end) {
    var clock = $(element).FlipClock({
      clockFace: "DailyCounter",
      autoStart: false,
    });

    var current = convert(new Date(), 8);
    var end = convert(end, 8);
    var remain = (end.getTime() - current.getTime()) / 1000;

    clock.setCountdown(true);
    if (remain < 0) {
      clock.setTime(0);
      clock.stop();
    } else {
      clock.setTime(remain);
      clock.start();
    }
  }

  function convert(date, timezone) {
    var utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * timezone);
  }

  function startCountdowns() {
    //        startCountdown($('.clock'), new Date('December 4, 2016'));
    startCountdown($(".clock1"), new Date("January 07, 2017 06:00:00"));
  }

  function triggerScrollEvent(elm) {
    //    	window.scrollTo(window.scrollX, window.scrollY + 1);
    //    	window.scrollTo(window.scrollX, window.scrollY - 1);
    echo.render(elm);
  }

  $(".view-more .adr-w, .view-more1 li").hover(function () {
    triggerScrollEvent(this);
  });
  /* OnLoad Page */
  echo.init();
  $(document).ready(function ($) {
    section1Tabs(".nav-wrapper");
    section3Tabs(".item-wrapper");
    section4Tabs(".item-wrapperi");
    hoverChart();
    runSlider();
    typeText();
    //        updateQata();
    checkAge();
    // checkNumber();
    // checkIncome();
    goSubmit();
    startCountdowns();
    // $("#job").niceSelect();
    // $("#pay").niceSelect();
    // $("#invest").niceSelect();
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window
    });
    wow.init();
  });

  /* OnLoad Window */
  var init = function () {};
  window.onload = init;
  $(function () {
    $(".web-arrow a").click(function () {
      $(".section4 .item-1").toggle();
      $(".section4 .item-2").toggle();
    });
  });
})(jQuery);

/* For section 3  */
(function a() {
  // e.preventDefault();
  new Swiper("#swiper2", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      disableOnInteraction: false,
      enabled: true,
    },
    autoplay: true,
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 60,
    autoHeight: true,
  });
})();

(function a() {
  // e.preventDefault();
  new Swiper("#swiper3", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      disableOnInteraction: false,
      enabled: true,
    },
    autoplay: true,
    slidesPerView: 1,
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 30,
    autoHeight: true,
  });
})();

/* For section 5  */

AOS.init();

/* For section 7 partners */

(function a() {
  // e.preventDefault();
  new Swiper("#swiper1", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      disableOnInteraction: false,
      enabled: true,
    },
    autoplay: true,
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 50,
    autoHeight: true,
  });
})();

(function a() {
  // e.preventDefault();
  new Swiper("#swiper4", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      disableOnInteraction: false,
      enabled: true,
    },
    autoplay: true,
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 50,
    autoHeight: true,
  });
})();

(function a() {
  // e.preventDefault();
  new Swiper("#swiper5", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      disableOnInteraction: false,
      enabled: true,
    },
    autoplay: false,
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 50,
    autoHeight: true,
  });
})();

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

          // this.bindEvent()
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
