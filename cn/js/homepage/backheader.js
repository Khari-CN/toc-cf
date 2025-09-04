var cs_url = "https://m.cfd139.com/cn/onlinecs.html";
var ac_url = "";
function openLive800() {
  $(".live800").attr("href", cs_url);
}

function hrefParam(key) {
  value = "";
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) value = unescape(r[2]);
  return value;
}

function menu() {
  var html = "";
  if (
    hrefParam("app") != "" ||
    hrefParam("special") != "" ||
    sessionStorage.getItem("pageType") === "app"
  ) {
    html +=
      '<div class="m-header m-header2" style="height: 1.2rem;line-height: 1.2rem; background-color: rgb(35, 85, 120);border-bottom: none;padding-top: 0.1rem;font-size: 0;" id="m-header">';
    html += '<div class="layout-1" style="padding:0;" >';
    html +=
      '   <div class="item-1" onclick="history.go(-1)" style="  width: 2rem;  padding-left: 0.3rem;">';
    html += '     <a href="javascript:;" class="left-2"></a>';
    html += '     <a href="javascript:;" class="left-3">返回</a>';
    html += "   </div>";
    html += " </div>";
    html += " </div>";
  } else if (
    hrefParam("special-inner") != "" ||
    hrefParam("noneheader") != "" ||
    sessionStorage.getItem("noneheader") === "1"
  ) {
    $(".m-header").hide();
    html = "";
  } else if (hrefParam("none") != "") {
    $(".m-header").hide();
    html = "";
  } else {
    html +=
      '<div class="main-header"><div class="header-top"></div><div class="m-header m-header3" id="m-header">';
    html += '  <div class="layout-1" style="padding-left: 0.3rem;">';
    html += '   <div class="item-1">';
    html += '     <a href="" class="left-1"></a>';
    html += " </div>";
    html += ' <div class="item-2">';
    html += '     <a href="javascript:;" class="right-1">开启真实账户';
    html += "     </a>";
    html += '    <a href="javascript:;" class="right-2" node-name="point">';
    html += "  </a>";
    html += "</div>";
    html += " </div>";
    html += "	</div>";
    html += "	</div>";
  }

  document.write(html);
}

document.addEventListener("scroll", function () {
  var scroll =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset;

  // console.log("hello before");
  if (scroll >= 30) {
    $(".header-top").addClass("scroll-down");
    $(".m-header3").addClass("top-0");
    $(".m-header3").addClass("menu-sroll-bg");
  } else {
    $(".header-top").removeClass("scroll-down");
    $(".m-header3").removeClass("top-0");
    $(".m-header3").removeClass("menu-sroll-bg");
  }
});

function footer() {
  if (
    hrefParam("app") != "" ||
    hrefParam("special") != "" ||
    hrefParam("special-inner") != "" ||
    hrefParam("noneheader") != "" ||
    sessionStorage.getItem("pageType") === "app" ||
    sessionStorage.getItem("noneheader") === "1"
  ) {
    $(".down-footer").hide();
    html = "";
    document.write(html);
  } else if (hrefParam("none") == 2) {
    $("#m-footer,.down-footer,.copyright").hide();
    html = "";
    document.write(html);
  } else {
    var html = "";
    html += '<div class="footer" id="m-footer">';
    html += '<div class="layout-1">';
    html += "<ul>";
    html +=
      "<li><a class='suggestion-footer' href=\"javascript:void(0)\" onclick=\"showAdviceForm()\"><img class='icon' src='//sc.cfygxz.com/source/www/homepage/m/m_footer_icon4.png'><em>功能建议</em></a></li>";
    html +=
      '<li><a href="/cn/acc/promotion.html"><img class="icon" src="//sc.cfygxz.com/source/www/homepage/m/m_footer_icon1.png"><em>最新优惠</em></a></li>';
    html +=
      "<li><a class='live800' href=\"javascript:void(0)\"  onclick=\"openLive800();ga('send', 'event', 'Chat_Live800', 'Click800', 'SJ_GW', '1');\"><img class='icon' src='//sc.cfygxz.com/source/www/homepage/m/m_footer_icon2.png'><em>在线客服</em></a></li>";
    html +=
      "<li><a class='referral-footer' href=\"javascript:void(0)\" onclick=\"ga('send', 'event', 'Reg_Real', 'ClickAccount', 'SJ_GW', '1')\"><img class='icon' src='//sc.cfygxz.com/source/www/homepage/m/m_footer_icon3.png'><em>一键开户</em></a></li>";
    html += " </ul>";
    html += "</div>";
    html += "</div>	";
    document.write(html);
  }
}
$(function () {
  if (!ac_url) {
    $(".referral-footer").attr(
      "href",
      "https://ac.cfd139.com" + window.location.search
    );
  } else {
    $(".referral-footer").attr("href", ac_url + "/" + window.location.search);
  }
});
function showAdviceForm() {
  $("#suggestion").show();
}
