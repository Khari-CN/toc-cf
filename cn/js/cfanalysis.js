var countBiUtil = {};
countBiUtil.utm_source = "utm_source";
countBiUtil.utm_medium = "utm_medium";
countBiUtil.utm_campaign = "utm_campaign";
countBiUtil.utm_content = "utm_content";

countBiUtil.utm_term = "utm_term";
countBiUtil.CF_COOKIE_USERID = "CF_COOKIE_USERID";
countBiUtil.GA_KEY = "_ga";
/**
 * 根据key匹配查找
 * @param key
 * @param url
 * @returns {*}
 */
countBiUtil.url = function (key) {
	value="";
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");  
	var r = window.location.search.substr(1).match(reg);  
	if (r != null) value= unescape(r[2]); 
	return value; 

}
/**

 * 获取sessionid
 */
countBiUtil.getSessionId = function (key) {
	var ob =countBiUtil.getSession(key);
	if(ob) return ob;
	else return UUID.prototype.createUUID();

}

/**

 * 获取sessionid
 */
countBiUtil.getSession = function (key) {
   var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
   if(arr=document.cookie.match(reg)) return unescape(arr[2]);
}

//写cookies
countBiUtil.setCookie = function (key)
{
	var userid = "F" + UUID.prototype.createUUID();
	var domain =www_url.replace("//www.","");
	document.cookie = key + "="+ escape (userid) + "; domain="+domain;
	return userid;
}

countBiUtil.getUserId = function (key)
{
	var od = countBiUtil.getSession(key);
	if(od) return od;
	else	return countBiUtil.setCookie(key);
}



/**
 * UUID 生成算法
 * @constructor
 */
function UUID() {
    this.id = this.createUUID()
}
UUID.prototype.valueOf = function () {
    return this.id
};
UUID.prototype.toString = function () {
    return this.id
};
UUID.prototype.createUUID = function () {
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    var dc = new Date();
    var t = dc.getTime() - dg.getTime();
    var tl = UUID.getIntegerBits(t, 0, 31);
    var tm = UUID.getIntegerBits(t, 32, 47);
    var thv = UUID.getIntegerBits(t, 48, 59) + '1';
    var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
        + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
        + UUID.getIntegerBits(UUID.rand(8191), 0, 7)
        + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
        + UUID.getIntegerBits(UUID.rand(8191), 0, 15);
    return tl + tm + thv + csar + csl + n
};
UUID.getIntegerBits = function (val, start, end) {
    var base16 = UUID.returnBase(val, 16);
    var quadArray = new Array();
    var quadString = '';
    var i = 0;
    for (i = 0; i < base16.length; i++) {
        quadArray.push(base16.substring(i, i + 1))
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
        if (!quadArray[i] || quadArray[i] == '')
            quadString += '0';
        else
            quadString += quadArray[i]
    }
    return quadString
};
UUID.returnBase = function (number, base) {
    return (number).toString(base).toUpperCase()
};
UUID.rand = function (max) {
    return Math.floor(Math.random() * (max + 1))
};

//
//function myAlert(behaviorType,advisoryType,eventAction,platformType)
//{
//  if(behaviorType==1)
//  {
//      if (platformType==0) 
//      {
//      alert("pc访问"); 
//      }else if(platformType==1) 
//      {
//         alert("手机站访问");  
//      }
//     
//  }
// else if(behaviorType==2)
//  {
//      if (advisoryType==1) 
//      {
//         alert("QQ咨询");  
//      }else if(advisoryType==2) 
//      {
//         alert("live800");  
//      }
//  }
//  else if(behaviorType==3)
//  {
//     alert("模拟开户"); 
//  }
//  else if(behaviorType==4)
//  {
//     alert("真实开户"); 
//  }
//   else if(eventAction=='cfd_pc')
//  {
//     alert("cfd下载"); 
//  }
//   else if(eventAction=='rone_pc')
//  {
//     alert("真实开户提交资料按钮"); 
//  }
//     else if(eventAction=='rfinish_pc')
//  {
//     alert("真实开户完成开户按钮"); 
//  }
//    else if(eventAction=='rmoney_pc')
//  {
//     alert("真实开户立即完成按钮"); 
//  }
//    else if(eventAction=='dfinish_pc')
//  {
//     alert("模拟开户完成开户按钮"); 
//  }
//}

/**
 * 集团BI统计介入
 * @param behaviorType    行为类型 访问(1)、咨询(2)、模拟开户(3)、真实开户(4)、首次入金(5) 、事件（6） 等等
 * @param platformType    0和空代表pc访问，1代表手机m站访问
 * @param advisoryType    咨询类型 qq或者live800 1表示qq 2表示live800   不需要填空""
 * @param behaviorDetail  当behaviorType类型为（3或4）时间需要  提供该字段：行为明细及开户帐号 例如：86002652 不需要填空""
 * @param eventCategory   通常是用户与之互动的对象(例如 'Video'),当behaviorType类型为6时间需要该字段 不需要填空""
 * @param eventAction     互动类型(例如 'play'),当behaviorType类型为6时间需要该字段 不需要填空""
 *
 */
countBiUtil.gwanalysis = function (behaviorType, platformType, advisoryType, behaviorDetail, eventCategory, eventAction) {

// myAlert(behaviorType,advisoryType,eventAction,platformType);

    console.log("*****************countBiUtil.gwanalysis*************************");

    var _maq = _maq || [];
    if (behaviorType) {
        _maq.push(['_setBehaviorType', behaviorType]);
    }
    if (platformType) {
        _maq.push(['_setPlatformType', platformType]);
    }
    if (advisoryType) {
        _maq.push(['_setAdvisoryType', advisoryType]);
    }
    if (behaviorDetail) {
        _maq.push(['_setBehaviorDetail', behaviorDetail]);
    }
    if (eventCategory) {
        _maq.push(['_setEventCategory', eventCategory]);
    }
    if (eventAction) {
        _maq.push(['_setEventAction', eventAction]);
    }

    _maq.push(['_setPlatformName', '']);
    _maq.push(['_setSessionId', countBiUtil.getSessionId(countBiUtil.GA_KEY)]);
    _maq.push(['_setUserId', countBiUtil.getUserId(countBiUtil.CF_COOKIE_USERID)]);
    <!--访问上一url地址-->
    /*if (document.referrer) {
     _maq.push(['_setPrevUrl', document.referrer]);
     }*/
    <!--关键词-->
    if (countBiUtil.url(countBiUtil.utm_term)) {
        _maq.push(['_setUtmctr', countBiUtil.url(countBiUtil.utm_term)]);
    }

    <!--广告系列-->
	var utmccn=countBiUtil.url(countBiUtil.utm_campaign);
	utmccn=utmccn==''?'(direct)':utmccn;
	console.info(utmccn);
	_maq.push(['_setUtmccn', utmccn]);
	
    
    <!--广告组-->
   if (countBiUtil.url(countBiUtil.utm_content)) {
        _maq.push(['_setUtmccn', countBiUtil.url(countBiUtil.utm_content)]);
    }
   
    <!--广告媒介-->
	var utmcmd=countBiUtil.url(countBiUtil.utm_medium);
	utmcmd=utmcmd==''?'(none)':utmcmd;
	console.info(utmcmd);
	_maq.push(['_setUtmcmd', utmcmd]);
	
	
    <!--广告来源-->
	var utmcsr=countBiUtil.url(countBiUtil.utm_source);
	utmcsr=utmcsr==''?'(direct)':utmcsr;
	console.info(utmcsr);
	_maq.push(['_setUtmcsr', utmcsr]);
	
	
    <!--日志类型类型-->
    _maq.push(['_setlogType', '1']);
    <!--事业部-->
    _maq.push(['_setBusinessPlatform', '4']);
    <!--业务平台-->
    //_maq.push(['_setAccountPlatform', 'GTS2']);
    //console.log(window.location.href);
    //console.log(_maq);
    //console.log(countBiUtil.getSessionId());
    setGWAnalysisParams(_maq);
}

$(function () {
    if("true"===countBiUtil.url("bdlp")){
        $(".bdlp").hide();
    }
})


/**
 * 集团BI统计介入
 * @param behaviorType    行为类型 访问(1)、咨询(2)、模拟开户(3)、真实开户(4)、首次入金(5) 、事件（6） 等等
 * @param platformType    0和空代表pc访问，1代表手机m站访问
 * @param advisoryType    咨询类型 qq或者live800 1表示qq 2表示live800   不需要填空""
 * @param behaviorDetail  当behaviorType类型为（3或4）时间需要  提供该字段：行为明细及开户帐号 例如：86002652 不需要填空""
 * @param eventCategory   通常是用户与之互动的对象(例如 'Video'),当behaviorType类型为6时间需要该字段 不需要填空""
 * @param eventAction     互动类型(例如 'play'),当behaviorType类型为6时间需要该字段 不需要填空""
 */
//countBiUtil.gwanalysis = function (behaviorType, platformType,advisoryType,behaviorDetail,eventCategory,eventAction) {
//访问调用示例
//countBiUtil.gwanalysis('1', '0', '', '', '', '');
//咨询调用示例
//countBiUtil.gwanalysis('2', '0', '', '2', '', '');
//模拟开户调用示例
//countBiUtil.gwanalysis('3', '0', '', '84014735', '', '');
//真实开户调用示例
//countBiUtil.gwanalysis('4', '0', '', '84014735', '', '');
//事件调用示例
//countBiUtil.gwanalysis('6', '0', '', '', 'video', 'play');








