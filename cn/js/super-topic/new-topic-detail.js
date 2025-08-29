// 我要发言
// $(".talk-btn").click(function () {
//   if (!$.isLogin()) {
//     $("#loginKuang").show();
//   } else {
//     // $.hasLogin();
//     $.getData("true");
//     var text = $("#area").val();
//     $.voitSuccess(text);
//   }
// });
// 输入留言
// $("#area").keyup(function () {
//   // console.log($(this).val());
//   var areaValue = $(this).val();
//   $.reduce($.getTextLength(areaValue));
// });
let customerTel, customerNo, appCustomerNo;
$(function () {
  // 我要发言
  $(".talk-btn").click(function () {
    if (!$.isLogin()) {
      $("#loginKuang").show();
    } else {
      // $.hasLogin();
      // $.getData("true");
      var text = $("#area").val();
      $.saveComments(text);
    }
  });
  // 输入留言
  $("#area").keyup(function () {
    // console.log($(this).val());
    var areaValue = $(this).val();
    $.reduce($.getTextLength(areaValue));
  });
});
$.extend({
  JsonpAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, { _r: Math.random() });
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      data: options,
      dataType: "jsonp", // 数据类型为jsonp
      jsonp: "jsonpCallback",
      // contentType: "application/json; charset=utf-8",
      // beforeSend: function () {
      //   $("#loading").html(`<img src='https://m.cf139.com/static/img/jiazai.gif' />`); //在后台返回success之前显示loading图标
      // },
      success: function (data) {
        $("#loading").hide();
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        $("#loading").hide();
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  //通用ajax请求
  ajaxk: function (type, url, options, callbackSuc, callbackErr) {
    $.extend(options, { url: Math.random() });
    var stringOption = {
      apiKey:
        "aa36cadb05d8afaa896487a920df255f7771b3983dbed00e6c1b6ee6ac04356b",
    };

    let newsStringOption = { ...options, ...stringOption };
    $.ajax({
      type: type,
      url: url,
      async: false,
      data: options,
      dataType: "json", // 数据类型为jsonp
      headers: {
        sign: hex_md5(this.objToKeyValue(newsStringOption)),
        isAjax: true,
      },
      success: function (data) {
        if ($.isFunction(callbackSuc)) callbackSuc(data);
      },
      error: function (data) {
        console.log("请求失败，url :" + url);
        if ($.isFunction(callbackErr)) callbackErr(data);
      },
    });
  },
  postAjax: function (url, options, callbackSuc, callbackErr) {
    $.extend(options, { _r: Math.random() });
    $.ajaxk("POST", url, options, callbackSuc, callbackErr);
  },
  getAjax: function (url, options, callbackSuc, callbackErr) {
    $.ajaxk("GET", url, options, callbackSuc, callbackErr);
  },
  login: function () {
    $("#loading").show();
    var url = $.loginInfo().url;
    var options = $.loginInfo().options;
    $.JsonpAjax(url, options, function (data) {
      if (data.code == 200) {
        $.loginSucc(data);
      } else {
        $(".error-info").show().html(data.ch_msg);
      }
    });
  },
  isLogin: function () {
    var cookieLogin = $.cookie("login");
    // console.log(cookieLogin);
    if (cookieLogin == null || cookieLogin == "") {
      //弹出登录框
      return false;
    }
    return true;
  },
  loginInfo: function () {
    var url = `${mis_url}/cfd/fxlogin`;
    var options = {
      customerNumber: $("#phone").val(),
      password: $("#upwd").val(),
      platform: "GTS2",
      actId: "1",
    };
    return {
      url: url,
      options: options,
    };
  },
  loginSucc: function (data) {
    if (data?.code === 200) {
      const {
        ACCOUNT_STATUS,
        MOBILE_PHONE_NO,
        customerCode,
        customerNumber,
        phoneCode,
      } = data?.ch_msg;
      $.cookie("login", "success");
      $("#loginKuang").hide();
      $.cookie("userObject", JSON.stringify(data?.ch_msg));
      customerNo = customerNumber;
      customerTel = MOBILE_PHONE_NO;
    } else {
      $(".error-info").show().html(data.ch_msg);
    }
  },
  //是否点击过
  isClicked: function () {
    var cookieClicked = $.cookie("clicked");

    if (cookieClicked == null || cookieClicked == "") {
      return true;
    } else {
      $(".btn").addClass("grey").attr("disabled", "disabled");
    }
  },
  //获取字符长度
  getTextLength: function (text) {
    var length = 0;
    for (var i = 0; i < text.length; i++) {
      length++;
    }
    return length;
  },
  //数字减少
  reduce: function (length) {
    if (length > 50) {
      $("#area").attr("disabled", "disabled");
      return;
    }
    $(".left-count span").html(length);
  },
  //获取url中的参数
  getUrlParam: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  },
  //获取数据 开始 结束 正在进行
  getStatus: function (length = 5, draw = 1) {
    var url = `${cms_url}/api/jwt/topic/topicList`;
    // var url = "http://mis.cf860.com/public/topic/topicPageList";
    var options = {
      length: length,
      draw: draw,
    };
    $.getAjax(url, options, function (data) {
      // console.log(data);
      if (data.code === 0) {
        // $.swiperMethod(data.data);
        // $.dealList(data);
      }
    });
  },
  getData: function (flag) {
    var topicId = $.getUrlParam("topicId");
    var options;
    if (flag == "app") {
      if (appCustomerNo) {
        options = {
          topicId: topicId,
          customerNo: appCustomerNo,
        };
      } else {
        options = {
          topicId: topicId,
          customerNo: "",
        };
      }
    } else {
      if ($.cookie("customerNo")) {
        options = {
          topicId: topicId,
          customerNo: $.cookie("customerNo"),
        };
      } else {
        options = {
          topicId: topicId,
          customerNo: "",
        };
      }
    }

    var url = cms_url + "/api/jwt/topic/topicDetail";
    $.getAjax(url, options, function (data) {
      if (data.code == 0 && data.msg == "成功") {
        $("#loadingTopic").hide();
        $.editAll(data);
        // if (flag) {
        //   $.editAll(data, flag);
        // }
      }
    });
  },
  getHotCommentList: function (pageNum = 1) {
    const url = `${cms_url}/api/jwt/topic/pageByComment`;
    const topicId = $.getUrlParam("topicId");
    const options = {
      topicId,
      length: 3,
      draw: pageNum,
    };
    const succCB = (data) => {
      if (data.code === 0) {
        if (!data.data) return;
        if (Array.isArray(data.data)) {
          $.editHotCommentList(data.data);
          return;
        }
        $("#hotComment").hide();
        $(".comment-title").html('');
      }
    };
    // console.log(options.length);
    $(".comment-title").html(`&nbsp;&nbsp;所有评论(${options.length})`);
    $.getAjax(url, options, succCB);
  },
  editHotCommentList: function (data) {
    if (data.length === 0) {
      const noComments = document.querySelector("#noComment");
      noComments.classList.add("show");
      return;
    }
    const theList = document.querySelector("#hotCommentList");
    data.forEach((comment) => {
      const {
        commentsId,
        createdDate,
        customerNo,
        opType,
        remark,
        supportCount,
      } = comment;
      const generateVoteOnClick = () => {
        const cookieClicked = $.cookie("clicked_" + commentsId);
        return `onclick="$.commentsLike(${commentsId}, ${opType}, this)"`;
      };
      const generateVoteClasses = () => {
        const cookieClicked = $.cookie("clicked_" + commentsId);
        if (!cookieClicked) return opType === 2 ? "blue" : "red";
        if (opType === 1) {
          return "clicked-red";
        } else if (opType === 2) {
          return "clicked-blue";
        }
      };
      const str = `
        <div class="comment-wrapper">
          <div class="">
            <div class="avatar ${opType === 2 ? "blue" : "red"}"><span>${
        opType === 2 ? "反方" : "正方"
      }</span></div>
          </div>
          <div class="creator-details">
            <span>${String(customerNo).replace(
              /(\d{2})(\d+)(\d{4})/g,
              "$1 **** $3"
            )}</span>
            <span>${$.dateFormatComment(createdDate)}</span>
          </div>
          <div class="vote-button">
              <div class="vote-img ${generateVoteClasses()}" ${generateVoteOnClick()}>
                <img src="https://sc.cfygxz.com/source/www/super-topic/like-icon-2.png" />
              </div>
              <span>${supportCount}</span>
          </div>
          <div class="comment-content">
              ${remark}
          </div>
        </div>
      `;
      theList.innerHTML += str;
    });
  },
  // swiperMethod: function (data) {
  //   // var swiper = new Swiper(".swiper-container", {
  //   //   slidesPerView: "auto",
  //   //   spaceBetween: 30,
  //   // });
  //   const container = document.querySelector("#detail-hff");
  //   data.forEach((ele) => {
  //     // console.log(ele);
  //     const { imgUrlDetail, topicId, title } = ele;
  //     const nextTopicDom = document.createElement("div");
  //     nextTopicDom.className = "next-topic swiper-slide";
  //     const str = `
  //         <a class="item-1" href="${www_url}/cn/zt/super-topic/topic_detail.html?topicId=${topicId}">
  //           <img src="${imgUrlDetail}" />
  //         </a>
  //         <p class="topic-title">
  //           ${title}
  //         </p>
  //     `;
  //     nextTopicDom.innerHTML = str;
  //     nextTopicDom.addEventListener('mouseenter', (evt) => {
  //       const target = evt.target
  //       target.querySelector('.topic-title').classList.toggle('active')
  //     })
  //     nextTopicDom.addEventListener('mouseleave', (evt) => {
  //       console.log('leave')
  //       const target = evt.target
  //       target.querySelector('.topic-title').classList.toggle('active')
  //     })
  //     container.appendChild(nextTopicDom);
  //   });
  //   var swiper = new Swiper(".swiper-container", {
  //     slidesPerView: "auto",
  //     spaceBetween: 30,
  //   });
  // },
  //编辑数据
  editAll: function (data) {
    var imgUrl, topicTitle, stime, topicStract, topicDetail, debate;
    //接收URL中的参数booksId
    var id = $.getUrlParam("topicId");
    // var cookieClicked = $.cookie("clicked_" + data.data.topicId);
    var data = data.data;
    imgUrl = data.imgUrlDetail;
    topicTitle = data.title;
    stime = $.dateFormat(data.createTime);
    console.log(stime);
    topicStract = data.topicAbstract;
    topicDetail = data.topicDetail;
    debate = $.editDebate(data);
    $(".detail-img")
      .empty()
      .append('<img src="' + imgUrl + '" alt="">');
    $(".detail-title")
      .empty()
      .append(
        ' <div class="news-title"><img src="/toc-cf//sc.cfygxz.com/source/www/aboutUs/awards-honor/title_bar.png">&nbsp;&nbsp;' +
          topicTitle +
          '</div> <div class="news-time">发布时间: ' +
          stime +
          "</div>"
      );
    // $(".detail-stract").empty().html(topicStract);
    $(".open-title").empty().html(topicStract);
    $(".situ-content .situ-detail").empty().html(topicDetail);
    $(".compact").empty().append(debate);

    // $.swiperMethod();

    // if (cookieClicked == id && $.isLogin()) {
    //   var grey, newDebate;
    //   grey = "grey";
    //   newDebate = $.editDebate(data, grey);
    //   $(".compact").empty().append(newDebate);
    // } else {
    //   $(".compact").empty().append(debate);
    // }
  },

  // 辩论编辑
  editDebate: function (data) {
    var str = "";
    var cookieClicked = $.cookie("clicked_topic_" + data.topicId);
    const {
      title,
      supportCopy,
      supportCount,
      oppositionCopy,
      oppositionCount,
    } = data;
    const generateBtnClasses = (type) => {
      if (!cookieClicked) return "btn";
      switch (type) {
        case "1": {
          return cookieClicked === "1" ? "btn" : "btn grey";
        }
        default: {
          return cookieClicked === "2" ? "btn" : "btn grey";
        }
      }
    };
    const generateBtnOnClick = (type) => {
      switch (type) {
        case "1": {
          return cookieClicked ? "" : `onclick="$.changeVoit(1, this)"`;
        }
        default: {
          return cookieClicked ? "" : `onclick="$.changeVoit(2, this)"`;
        }
      }
    };
    str = `<p>您的观点是？</p>
        <div class="compact-content">
          <div class="compact-left">
            <div class="item-1">
              <span class="red">会: ${supportCopy}</span>
            </div>
            <div class="item-2">
              <button class="${generateBtnClasses(
                "1"
              )}" data-type="support" ${generateBtnOnClick("1")}
              }><span></span></button>
              <div class="count"><span>${supportCount}</span></div>
            </div>
          </div>
          <div class="compact-right">
            <div class="item-1">
              <span class="blue">不会: ${oppositionCopy}</span>
            </div>
            <div class="item-2">
              <button class="${generateBtnClasses(
                "2"
              )}" data-type="opposit" ${generateBtnOnClick("2")}
              ><span></span></button>
              <div class="count"><span>${oppositionCount}</span></div>
            </div>
          </div>
        </div>
    `;
    return str;
  },
  //按时间处理顺序
  //投票
  changeVoit: function (opType, obj = null) {
    // console.log("changeVoit")
    let parent;
    const userObjcet = $.cookie("userObject")
    var customerNo =
      customerNo || JSON.parse(userObjcet ? userObjcet : null)?.customerNumber;
    if (!customerNo) {
      $("#loginKuang").show();
      return;
    }
    if (obj !== null) {
      parent = obj.closest(".compact-content");
      parent?.querySelectorAll(".btn").forEach((ele, index) => {
        if (opType !== index + 1) {
          ele.classList.add("grey");
        }
        ele.setAttribute("disabled", '');
      });
    }
    var url = `${cms_url}/api/jwt/topic/topicVote`;
    var id = $.getUrlParam("topicId");
    var options = {
      customerNo: customerNo,
      topicId: id,
      opType: opType,
    };
    $.postAjax(url, options, function (data) {
      $.cookie("clicked_topic_" + id, opType);
      if (data.code == 200) {
        if (obj !== null) {
          const count = obj.parentElement.querySelector(".count span");
          if (count !== null) count.innerHTML = Number(count?.innerHTML) + 1;
        }
      } else if (data.code === 1) {
        $(".voited-popup").show();
        setTimeout(function () {
          $(".voited-popup").hide();
        }, 1500);
      }
    });
  },
  commentsLike: function (id, opType, obj = null) {
    const url = `${cms_url}/api/jwt/topic/commentsLike`;
    const cookieId = $.cookie("clicked_" + id);
    const status = cookieId ? 0 : 1;
    const options = {
      status,
      commentsId: id,
    };
    const succCB = (data) => {
      if (data.code === 0) {
        const parent = obj?.closest(".comment-wrapper");
        const count = parent.querySelector(".vote-button span");
        if (count) {
          count.innerHTML =
            status === 0
              ? Number(count.innerHTML) - 1
              : Number(count.innerHTML) + 1;
        }
        if (obj) {
          if (status === 0) {
            obj.classList.remove("clicked-blue");
            obj.classList.remove("clicked-red");
            obj.classList.add(opType === 1 ? "red" : "blue");
          } else {
            obj.classList.remove("blue");
            obj.classList.remove("red");
            obj.classList.add(opType === 1 ? "clicked-red" : "clicked-blue");
          }
        }
        if (status === 0) {
          $.cookie("clicked_" + id, null, { expires: 0 });
        } else {
          $.cookie("clicked_" + id, opType);
        }
      }
    };
    $.getAjax(url, options, succCB);
  },
  saveComments: function (text) {
    const url = cms_url + "/api/jwt/topic/saveComments";
    const id = $.getUrlParam("topicId");
    let userObject = $.cookie("userObject") || null
    userObject = JSON.parse(userObject)
    var customerNo =
      customerNo || userObject?.customerNumber;
    const options = {
      customerNo: customerNo,
      content: encodeURI(text),
      topicId: id,
    };
    const succCallback = (data) => {
      if (data.code === 0) {
        $(".talk-box .info").show();
        $("#area").val("");
        setTimeout(function () {
          $(".talk-box .info").hide();
        }, 1000);
      }
    };
    $.postAjax(url, options, succCallback);
  },
  objToKeyValue: function (obj) {
    var arr = [];
    var str = [];
    for (var name in obj) {
      //存下对象的key值
      arr.push(name);
    }
    arr.sort(); //对象key值排序

    for (var i = 0, j = arr.length; i < j; i++) {
      //拼接 key=value
      str.push(arr[i] + "=" + obj[arr[i]]);
    }

    return str.join("&"); //返回 key1=value1&key2=value2 ...
  },
});
