$(function () {
  // Set display: none programmatically and switch from visibility: visible
  // as display: none inline will break footer slider css
  $(".footer").hide();
  $(".footer").css("visibility", "visible");

  var handler = function (captchaObj) {
    captchaObj.appendTo("#captcha-box");
    captchaObj.onReady(() => {
      $("#wait").css("opacity", "0");
      captchaObj.verify();
    });

    captchaObj.onSuccess(function () {
      var result = captchaObj.getValidate();
      if (!result) {
        return alert("请完成验证");
      }
      $(".preload-captcha-container").hide();
      $(".main").show();
      $(".footer").show();
      window.localStorage.setItem("ip", ipList);
    });

    // captchaObj.onClose(function () {
    //   showCaptcha();
    // });
  };

  var currentIp = "";
  var ipList = "";
  $.ajax({
    url: "https://api.ipify.org?format=json", 
    dataType: 'json',
    success: function (data) {
      // Setting text of element P with id gfg
      currentIp = data.ip;
      ipList = window.localStorage.getItem("ip") || "";

      if (!ipList.includes(currentIp)) {
        ipList += currentIp + ",";
        initCaptcha();
        return;
      }

      $(".preload-captcha-container").hide();
      $(".main").show();
      $(".footer").show();
    },
    timeout: 3000, // 3 seconds
    error: function() {
      initCaptcha();
    }
  });

  // var showCaptcha = function () {
  //   $(".geetest_panel").addClass("show_geetest_panel_box");
  // };
  var initCaptcha = function () {
    $(".preload-captcha-container").show();
    $.ajax({
      url: id_url + "/gt/register?t=" + new Date().getTime(), // 加随机数防止缓存
      type: "get",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
      success: function (data) {
        // 调用 initGeetest 进行初始化
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
        initGeetest(
          {
            // 以下 4 个配置参数为必须，不能缺少
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: true, // 用于宕机时表示是新验证码的宕机
            product: "bind", // 产品形式，包括：float，popup
            width: "100%",
            hideClose: true,
          },
          handler
        );
      },
    });
  };
});
