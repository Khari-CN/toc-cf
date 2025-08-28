$(function () {
  function CheckIsAndroid() {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          //移动终端浏览器版本信息
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
          iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf("iPad") > -1, //是否iPad
        };
      })(),
    };
    //if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
    //    return false;
    //}
    if (browser.versions.android) return true;
    return false;
  }
  function CheckIsIOS() {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          //移动终端浏览器版本信息
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
          iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf("iPad") > -1, //是否iPad
        };
      })(),
    };
    if (
      browser.versions.iPhone ||
      browser.versions.iPad ||
      browser.versions.ios
    ) {
      return true;
    }
  }
  if (CheckIsIOS()) {
    $(".live-footer a").attr(
      "href",
      "https://itunes.apple.com/us/app/chuang-fucfd/id1153506842?mt=8"
    );
    $(".download").attr(
      "href",
      "https://itunes.apple.com/us/app/chuang-fucfd/id1153506842?mt=8"
    );
    $(".download-cfix").attr(
      "href",
      "https://itunes.apple.com/us/app/%E5%88%9B%E5%AF%8C%E6%99%BA%E6%B1%87/id1220257029?mt=8"
    );

    $("#ios").addClass("check").find(".arrow").show();
    $("#ios").find(".show").hide();
    $("#ios").find(".hide").show();
    $("#ios")
      .children("a")
      .attr(
        "href",
        "https://itunes.apple.com/us/app/chuang-fucfd/id1153506842?mt=8"
      );

    $(".swiper-container  .item-a a").attr(
      "href",
      "https://itunes.apple.com/cn/app/id1091504867?mt=8"
    );
    $(".swiper-container  .item-b a").attr(
      "href",
      "https://itunes.apple.com/us/app/chuang-fucfd/id1153506842?mt=8"
    );
  }
  if (CheckIsAndroid()) {
    $(".live-footer a").attr(
      "href",
      "https://sc.cfygxz.com/source/material/CFD_APP.apk"
    );
    $(".download").attr(
      "href",
      "https://sc.cfygxz.com/source/material/CFD_APP.apk"
    );
    $(".download-cfix").attr(
      "href",
      "https://sc.cfygxz.com/source/material/cfix.apk"
    );

    $("#android").addClass("check").find(".arrow").show();
    $("#android").find(".show").hide();
    $("#android").find(".hide").show();
    $("#android")
      .children("a")
      .attr("href", "https://sc.cfygxz.com/source/material/CFD_APP.apk");

    $(".swiper-container  .item-b a").attr(
      "href",
      "https://sc.cfygxz.com/source/material/CFD_APP.apk"
    );
    $(".swiper-container  .item-a a").attr(
      "href",
      "https://sc.cfygxz.com/source/material/CFD_PRO.apk"
    );
  }
});
