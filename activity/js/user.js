$(function () {
    // var apiUrl = "http://mis.ebit.com/ebit/api";
    var apiUrl = "http://192.168.35.83:8484/ebit/api";
    var url_validate_phone = apiUrl + "/account/validatePhone";
    var url_send_sms_code = apiUrl + "/account/sendSmsCode";
    var url_validate_sms_code = apiUrl + "/account/validateCode";
    var url_submit = apiUrl + "/account/submit";

    var messageInfo = {
        info: function (id1, msg) {
            $('.' + id1 + '-tip').html(' <span><em></em>' + msg + '</span>');
            $('.' + id1 + '-f1').addClass("error").removeClass("yellow");
        },
        success: function (id1) {
            $('.' + id1 + '-tip span').hide();
            $('.' + id1 + '-f1').removeClass("yellow").addClass("success");
        },
        alert: function (id1, msg) {
            $('.' + id1 + '-tip').html(' <span style="color:#399b04">' + msg + '</span>');
            $('.' + id1 + '-f1').addClass("yellow");
        }
    }

    $.validatePhoneAjax = function (phone) {
        var result;
        jQuery.ajax({
            type: "POST",
            url: url_validate_phone,
            data: {phone: phone},
            async: false,
            success: function (resp) {
                result = resp;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                result = {
                    code: -1,
                    msg: "服务器出错、请联系<a href='javascript:;' onclick='openLive800()'>在线客服</a>"
                };
                console.log(textStatus + errorThrown);
            }
        });
        return result;
    }

    // 验证手机号
    $.validatePhone = function (phone, div) {
        var regPhone = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        if (!phone) {//为空
            messageInfo.info(div, "手机号码不能为空!");
            return false;
        }
        if (!regPhone.test(phone)) {//格式不正确
            messageInfo.info(div, "请输入正确的手机号格式");
            return false;
        }
        var rs = $.validatePhoneAjax(phone);
        if (!rs.success) {
            messageInfo.info(div, rs.info);
            return false;
        }
        console.info(rs);
        //suc
        messageInfo.success(div);
        this.phonePd = true;
        return true;
    }

    //发送验证码
    $.sendSmsCode = function (phone, div) {
        jQuery.ajax({
            type: "POST",
            url: url_send_sms_code,
            data: {phone: phone},
            async: false,
            success: function (resp) {
                if (resp.success) {
                    messageInfo.alert(div,"发送成功，请查收！");
                    $(".btn-phonecode").hide();
                    $('.re-btn').show();
                    $(".btn-phonecode").addClass("disabled");
                    var second= 60;
                    var interval = setInterval(function() {
                        if (second > 0) {
                            second--;
                            $("#secendhtml").html(second + 'S');
                        } else {
                            $(".btn-phonecode").show();
                            $('.re-btn').hide();
                            $(".voice-check").show();
                            $(".btn-phonecode").removeClass('disabled');
                            clearInterval(interval);
                        }
                    }, 1000);
                } else {
                    messageInfo.info(div, "验证码发送失败,请联系<a href='javascript:;' onclick='openLive800()'>在线客服</a>");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                messageInfo.info(div, "服务器出错,请联系<a href='javascript:;' onclick='openLive800()'>在线客服</a>");
                console.log(textStatus + errorThrown);
            }
        });
    }

    //验证验证码
    $.validateSmsCode = function (phone, code, div) {
        if (code == null || code == "") {
            messageInfo.info(div, "验证码不能为空");
            return false;
        }
        var pd = false;
        jQuery.ajax({
            type: "POST",
            url: url_validate_sms_code,
            data: {phone: phone, code: code},
            async: false,
            success: function (resp) {
                if (resp.success) {
                    messageInfo.success(div);
                    pd = true;
                    return;
                }
                messageInfo.info(div, "验证码错误!!");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                messageInfo.info(div, "服务器出错,请联系<a href='javascript:;' onclick='openLive800()'>在线客服</a>");
                console.log(textStatus + errorThrown);
            }
        });
        return pd;
    }

    //验证
    $.validatePassword = function (upwd, div) {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/;
        if (!upwd) {//为空
            messageInfo.info(div, "密码不能为空!");
            return false;
        } else if (!regex.test(upwd)) {//格式不正确
            messageInfo.info(div, "密码为5-16位字符，必须包含字母和数字!");
            return false;
        } else {
            messageInfo.success(div);
            return true;
        }
    }

    //提交开户请求
    $.submitForm = function () {
        var phone = $("#phone").val();
        var upwd = $("#upwd").val();
        var yanZ = $("#yanZ").val();
        var pd1 = $.validatePhone(phone, "phone");
        var pd2 = $.validatePassword(upwd, "upwd");
        var pd3 = $.validateSmsCode(phone, yanZ, "yanZ");
        if (pd1 && pd2 && pd3) {
            var param = {phone: phone, pwd: upwd, channel: "0"};
            $.post(url_submit, param, function (resp) {
                if (resp.success) {
                   $(".popup").show();
                }else{
                    $(".popup").empty().html('<img src="images/activity01/ebit-s.png" alt="">').show()
                }
            })
        }
    }

    //init event
    $.init = function () {
        $("#phone").blur(function () {
            $.validatePhone($("#phone").val(), "phone");
        })
        $("#upwd").blur(function () {
            $.validatePassword($("#upwd").val(), "upwd");
        })
        $("#yanZ").blur(function () {
            $.validateSmsCode($("#phone").val(), $("#yanZ").val(), "yanZ");
        })
        $("#btn-phonecode").click(function () {


            $.sendSmsCode($("#phone").val(), "yanZ");
        });
        $("#submitBtn").click($.submitForm);
    }

    $.init();
})