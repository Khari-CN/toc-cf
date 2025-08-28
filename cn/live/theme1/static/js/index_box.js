/**
 * 直播间弹框操作类
 *
 */
var box = {
    verifyCodeIntMap: {},
    toRoomId: null,
    enable: true, //是否使用store
    storeInfoKey: "storeInfo_VerifyCodeTime",
    /**
     * 方法入口
     */
    init: function() {
        this.setEvent();

    },
    /**
     * 设置事件
     */
    setEvent: function() {
        //我的账户按钮事件
        $("#myCount").click(function () {
            common.openPopup('.blackbg,.userInfo');
        });
        /* 用户信息清空昵称*/
        $("#saveBefore").click(function () {
            $(this).hide();
            $(this).next().show();
            $("#modifyNickneer").removeAttr("readonly").empty().focus();
        });
        /* 初次清空昵称*/
        $("#clearname").click(function () {
            $("#modifyfirst").empty()
        });

        $('.popup_box .pop_close,.formbtn[t=close]').click(function() {
            if($(this).parent().hasClass("banner-popup")){
                $(this).parent().hide();
            }else{
                $(this).parent().parent().parent().hide();
            }
            if ($('div.popup_box:visible').length == 0 ) {
                $(".blackbg").hide();
            }
            $(".blackbg form").each(function() {
                this.reset();
            });
        });
        //广告弹窗关闭
        $('.popup_banner .pop_close').click(function() {
            $(".popup_banner").hide()
            $(".bannerblackbg").hide();
        });
        /**
         * 资料下载上一页按钮事件
         */
        $('#prev').click(function() {
            var currPage = parseInt($('#page b').text()),
                prev = 0;
            if (currPage > 1) {
                prev = currPage - 1;
                box.setDownloadPPT(prev, box.getDownloadSort());
            } else {
                return false;
            }
        });
        /**
         * 资料下载下一页按钮事件
         */
        $('#next').click(function() {
            var currPage = parseInt($('#page b').text()),
                next = 0;
            if (currPage < parseInt($('#page span').text())) {
                next = currPage + 1;
                box.setDownloadPPT(next, box.getDownloadSort());
            } else {
                return false;
            }
        });
        /**
         * 资料下载排序按钮事件
         */
        $('.infodown .ranknavbar a.rankbtn').click(function() {
            $('.infodown .ranknavbar a.rankbtn').removeClass('on');
            $(this).addClass('on');
            box.setDownloadPPT(1, box.getDownloadSort());
        });
        /**
         * 在结果中搜索按钮事件
         */
        $('.infodown .ranknavbar .search_bar .sbtn').click(function() {
            var keyword = $('.infodown .ranknavbar .search_bar .sinp').val();
            if (common.isBlank(keyword)) {
                $('.infodown .downtable table tbody tr').show();
            } else {
                $('.infodown .downtable table tbody tr').hide();
                $('.infodown .downtable table tbody tr').each(function() {
                    if ($(this).find('td.sname').text().indexOf(keyword) != -1) {
                        $(this).show();
                    }
                });
            }
        });

        //登录相关事件
        this.loginEvent();
        //修改头像事件
        this.modifyAvatarEvent();
    },

    /**
     * 设置或获取强制登录标志
     * @param [isForceLogin]
     * @returns {*}
     */
    forceLogin: function(isForceLogin) {
        var storeObj = LoginAuto.get();
        if (typeof isForceLogin == "boolean") {
            if (storeObj) {
                storeObj.forceLogin = isForceLogin;
                return LoginAuto.set(storeObj) && isForceLogin;
            }
        } else {
            return storeObj && (storeObj.forceLogin == true);
        }
        return false;
    },
    /**
     * 登录相关事件
     */
    loginEvent: function() {
        /**
         * 登陆事件
         */
        $("#loginForm_sub").click(function () {
            if (!box.checkFormInput()) {
                return;
            }
            var url = mm_url + "/api/fxLogin";
            var options = {
                customerNumber:$("#loginForm_mb").val().trim(),
                password:$("#loginForm_pwd").val().trim(),
                platform:"GTS2",
                groupType:"cfstudio",
                groupId:"cfstudio_50"
            };
            common.getJson(url,options,function (data) {
                if(data == ""){
                    //mis后台为调用成功
                    alert("网站正在升级，请稍后再试");
                    return;
                }
                var msg = JSON.parse(data).data;
                if(msg == null){
                    var result = JSON.parse(data).ch_msg;
                    $(".login-info").empty().html(result).show();
                    return;
                }
                if (msg.isOK) {
                    indexJS.userInfo = msg.userInfo;
                    //补充直播间需要的用户信息
                    indexJS.addUserInfortion();
                    //保存用户信息到后台redis
                    box.saveUser(indexJS.userInfo);
                    // 登陆之后 设置 cookie为空，不再显示登录弹窗
                    $.cookie("loginCookie",'ok');
                } else {
                    var errorMessage = meg.error.errmsg;
                    $(".login-info").empty().html(errorMessage).show()
                }
            })
        });
        /**
         * 注销
         */
        $("#outLogin").click(function () {
            var url = mm_url + "/api/logout";
            common.getJson(url,null,function(data){
                if(data == "退出失败") {
                    alert("退出登录失败");
                    return;
                }
                $.cookie("loginCookie",'');
                indexJS.initVistor();
                $(".myCount").addClass("dn")
                $(".userInfo,.blackbg").hide();
                $(".login-btn").show();
                $(".login-info").empty()

            })
        });
        $(".passImg").click(function () {
            if($(this).hasClass("active")){
                $(this).removeClass("active")
                $("#loginForm_pwd").attr("type","text")
            }else{
                $(this).addClass("active")
                $("#loginForm_pwd").attr("type","password")
            }

        });
        /**
         * 按钮按回车键事件
         */
        // $("#loginForm input[name=verifyCode],#setNkForm input[name=nickname],#loginForm input[name=password]").keydown(function(e) {
        //     if (e.keyCode == 13) {
        //         $(this).parents("form").find(".set_submit").click();
        //         return false;
        //     }
        // });
    },
    /**
     * 昵称保存按钮事件
     */
    modifyNickname:function(idName){
       if(!box.checkNickname(idName) ) {
           return
        };
        var url = mm_url + "/api/modifyNickname";
        var options = {
            mobilePhone:indexJS.userInfo.mobilePhone,
            groupType:indexJS.userInfo.groupType,
            nickname:$("#"+idName+"").val()
        };
        common.getJson(url,options,function (data) {
            console.log(JSON.parse(data).data)
            if(!JSON.parse(data).data.isOK){
                alert("昵称修改失败");
                return;
            }
            indexJS.userInfo.nickname = options.nickname;
            $("#modifyNickneer").val(options.nickname).attr("readonly","readonly");
            $("#changeUseraName").html(options.nickname);
            //修改成功则初始化用户信息
            if(idName == "modifyfirst"){
                $(".nickname-change,.blackbg").hide();
            }else{
                $("#saveName").hide();
                $("#saveBefore").show();
                setTimeout(function () {
                    $(".errormodifyNickneer").removeClass('red').show().html("保存成功");
                    setTimeout(function () {
                        $(".errormodifyNickneer").hide();
                    },3000);
                })

            }
            box.saveUser(indexJS.userInfo);
        });
    },
    checkNickname:function(idName){
        var nickVal = $("#" + idName).val();
       return  box.validateNick(nickVal,idName)
    },
    /**
     * 保存用户信息
     * @param userInfo
     */
    saveUser:function(userInfo){
        var url = mm_url + "/api/saveUser";
        userInfo = JSON.stringify(userInfo);
        common.getJson(url,{userInfo:userInfo},function(data){
            console.log(data);
            if(data == "保存失败"){
                alert("用户信息保存异常，请退出重新登录");
            }
        })
    },
    /**
     * 验证昵称
     * @param nickVal
     * @param idName
     */
    validateNick:function(nickVal,idName){
        var reg =/^(?!\d+$)[\d\u4e00-\u9fa50-9a-zA-Z_\-]{2,10}$/;
        if(!nickVal){
            $(".error"+idName+"").removeClass("dn").addClass('red').empty().html("昵称不能为空");
            return false;
        }
        else if(!reg.test(nickVal)){
            $(".error"+idName+"").removeClass("dn").addClass('red').empty().html("格式不正确,请重新输入");
            return  false;
        }
        else{
          $(".error"+idName+"").empty();
            return true;
        }
    },
    /**
     * 检查页面输入
     */
    checkFormInput: function() {
        var isTrue = true;
        var params = {
            mobilePhone: $("#loginForm_mb").val(),
            password: $("#loginForm_pwd").val()
        };
        if (common.isBlank(params.mobilePhone)) {
            isTrue = false;
            $(".login-info").html("手机号码不能为空！").show()
        }   else if ( common.isBlank(params.password)) {
            isTrue = false;
            $(".login-info").html("密码不能为空！").show()
        }
        return isTrue;
    },
    /**
     * 弹出登录框
     */
    openLgBox: function(closeable, showTip, lgTime) {
        if (closeable === false) {
            $(".login .pop_close").hide();
        } else {
            $(".login .pop_close").show();
        }
        if (showTip) {
            $("#login_tip").show();
        } else {
            $("#login_tip").hide();
        }
        $(".popup_box").hide();
        common.openPopup('.blackbg,.login');
    },
    /**
     * 修改头像事件
     */
    modifyAvatarEvent: function() {
        $("#files").change(function () {
            var formdata=new FormData( );
            formdata.append("file" , $("#files")[0].files[0]);
            formdata.append("fileDir" , 'pic/headerat/front');
            formdata.append("fileType" , 'avatar');
            $.ajax({
                type:"post",
                url:zhibo_api_url +'/upload/uploadFile',
                data:formdata,
                cache : false,
                processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                contentType : false, // 不设置Content-type请求头
                success : function(data){
                    var newUrl = data.data[0].fileDomain + data.data[0].filePath ;
                    box.modifyAvatar(newUrl);
                }
            })
        })
    },
    //   修改头像
    modifyAvatar:function (newUrl) {
        var url = mm_url + "/api/modifyAvatar";
        var  options ={
            userId:indexJS.userInfo.userId,
            groupType:indexJS.userInfo.groupType,
            clientGroup:indexJS.userInfo.clientGroup,
            ip:indexJS.userInfo.ip,
            avatar:newUrl
        };
       common.getJson(url,options,function (data) {
            var newData = JSON.parse(data);
            if(newData.data.isOK){
                //修改成功则初始化用户信息
                indexJS.userInfo.avatar = newUrl;
                box.saveUser(indexJS.userInfo);
                $(".teachImg img").attr("src",newUrl);
                $("#myCount img").attr("src",""+ newUrl +"");

            }
        });

    },
    /**
     * 课件下载
     */
    setDownloadPPT: function(currPage, sort) {
        if (common.isBlank(sort)) {
            sort = '{"sequence":"desc","publishStartDate":"desc"}';
        }
        indexJS.getArticleList("download", indexJS.userInfo.groupId, 1, currPage, 5, sort, null, function(dataList) {
            $('#totalRecords').text('共' + dataList.totalRecords);
            $('#page b').text(dataList.pageNo);
            $('#page span').text(Math.ceil(dataList.totalRecords / 5));
            if (dataList && dataList.result == 0) {
                var data = dataList.data,
                    row = null;
                var pptHtml = [],
                    pptFormat = box.formatHtml('download');
                var $panel = $('.downtable table tbody');
                $panel.html("");
                for (var i in data) {
                    pptHtml = [];
                    row = data[i].detailList[0];
                    var suffix = data[i].mediaUrl.substring(data[i].mediaUrl.lastIndexOf('.') + 1).toLowerCase();
                    var name = row.title + '.' + suffix;
                    var publishDate = common.formatterDate(data[i].publishStartDate, '-').replace('-', '/').replace('-', '/');
                    pptHtml.push(pptFormat.formatStr(suffix, row.title, (row.authorInfo ? row.authorInfo.name : ''), publishDate, data[i].point, (common.isBlank(data[i].downloads) ? 0 : data[i].downloads), name, data[i]._id, row.remark, (common.isBlank(row.remark) ? ' style="display:none;"' : '')));
                    pptHtml = $(pptHtml.join(""));
                    $(pptHtml).find('a.downbtn').data("file_url", data[i].mediaUrl);
                    $panel.append(pptHtml);
                }
                box.setDownloads();
            }
        });
    },
    /**
     * 设置下载次数
     */
    setDownloads: function() {
        $('.downtable table tbody a.downbtn').click(function() {
            var _this = $(this);
            var params = { groupType: indexJS.userInfo.groupType, item: 'used_download', remark: '下载' + _this.attr('dn'), val: -parseInt(_this.attr('p')), tag: 'download_' + _this.attr('_id') };
            common.getJson('/addPointsInfo', { params: JSON.stringify(params) }, function(result) {
                if (result.isOK) {
                    common.getJson(indexJS.apiUrl + '/common/modifyArticle', { id: _this.attr('_id'), 'type': 'downloads' }, function(data) {
                        if (data.isOK) {
                            if (common.isValid(result.msg) && typeof result.msg.change == 'number') {
                                box.showMsg('消费' + (-result.msg.change) + '积分');
                            }
                            _this.parent().prev().text(data.num);
                        }
                    });
                    if ($.inArray(_this.attr('sufix'), ['pdf', 'png', 'jpg', 'jpeg', 'gif']) > -1) {
                        window.open(_this.data("file_url"));
                    } else {
                        window.location.href = _this.data("file_url");
                    }
                } else {
                    box.showMsg(result.msg);
                    return false;
                }
            });
        });
    },
    /**
     * 获取资料下载排序
     * @returns {string}
     */
    getDownloadSort: function() {
        var sort = '';
        switch ($('.infodown .ranknavbar a.on').attr('sort')) {
            case 'point':
                sort = '{"point":"desc"}';
                break;
            case 'uptime':
                sort = '{"createDate":"desc"}';
                break;
        }
        return sort;
    },
    /**
     * 根据内容域模块名返回内容模板
     * @param region 内容域模块名
     * @returns {string}
     */
    formatHtml: function(region) {
        var formatHtmlArr = [];
        switch (region) {
            case 'download':
                formatHtmlArr.push('<tr>');
                formatHtmlArr.push('    <td>{0}</td>');
                formatHtmlArr.push('    <td class="sname">{1}');
                formatHtmlArr.push('        <div class="arr"{9}><i></i><i class="i2"></i></div>');
                formatHtmlArr.push('        <div class="cmbox"{9}>');
                formatHtmlArr.push('            <div class="cont">');
                formatHtmlArr.push('                <b>推荐理由：</b>');
                formatHtmlArr.push('                <p>{8}</p>');
                formatHtmlArr.push('            </div>');
                formatHtmlArr.push('        </div>');
                formatHtmlArr.push('    </td>');
                formatHtmlArr.push('    <td>{2}</td>');
                formatHtmlArr.push('    <td>{3}</td>');
                formatHtmlArr.push('    <td>{4}积分</td>');
                formatHtmlArr.push('    <td>{5}</td>');
                formatHtmlArr.push('    <td><a href="javascript:void(0);" target="download" dn="{6}" p="{4}" _id="{7}" class="downbtn" sufix="{0}" onclick="_gaq.push([\'_trackEvent\', \'cf_studio\', \'资料-{6}\', \'pop\', 1, true]);">下载</a></td>');
                formatHtmlArr.push('</tr>');
                break;
            case 'signin':
                formatHtmlArr.push('<li>');
                formatHtmlArr.push('     <div class="himg"><img src="{0}" alt=""></div>');
                formatHtmlArr.push('     <span>{1}</span>');
                formatHtmlArr.push('</li>');
                break;
        }
        return formatHtmlArr.join('');
    },
};