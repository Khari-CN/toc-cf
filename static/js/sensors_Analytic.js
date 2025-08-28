/**
 * 神策全埋点
 * @author frank
 * 2018.05.22
 */
//神策初始化数据,默认全埋点，可以自定义事件，如果想要不需要请重新声明heatmap属性
//全埋点只支持a、input、buttun标签(当前配置：元素含有class="sensors-data"才采集元素信息，input标签含有class="sensors-content"才采集input的内容)，参考 heatmap属性的设置
(function(para) {
    var p = para.sdk_url,
        n = para.name,
        w = window,
        d = document,
        s = 'script',
        x = null,
        y = null;
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function(a) { return function() {
            (w[n]._q = w[n]._q || []).push([a, arguments]); } };
    var ifs = ['track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'getAppStatus'];
    for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        x.setAttribute('charset', 'UTF-8');
        y.parentNode.insertBefore(x, y);
        w[n].para = para;
    }
})({
    sdk_url: '//sc.cfygxz.com/source/account/js/sensorsdata.min.js',
    heatmap_url: '//sc.cfygxz.com/source/account/js/heatmap.min.js',
    name: 'sa',
    web_url: 'https://shc.cfd139.com/',
    server_url: 'https://shc.cfd139.com:8100/sa?project=default',
    //如果只想采集所有页面的仅交互按钮的数据，可以使用这种配置方式 heatmap:{}
    heatmap: {
        //是否开启点击图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
        clickmap: 'default',
        //是否开启触达注意力图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
        scroll_notice_map: 'not_collect',
        //设置成 true 后，我们会自动给 a 标签绑定一个 sa.trackLink() 方法（详见本页 3.3 ）。
        //如果是单页面 a 标签不涉及页面跳转或者 a 标签的点击是下载功能，建议不要打开。默认 false 。
        isTrackLink: true,
        //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
        loadTimeout: 3000,
        //返回真会采集当前页面的数据，返回假表示不采集当前页面,设置这个函数后，内容为空的话，是返回假的。不设置函数默认是采集所有页面
        collect_url: function() {
            //全部采集，不采用配置页面地址的方式，需要采集则引入此js
            return true;
            //如果只采集首页
            /*if (location.href === 'xxx.com/index.html' || location.href === 'xxx.com/') {
                return true;
            }*/
        },
        //采集元素信息
        collect_element: function(element_target) {
            // 如果这个元素有sensors-data类的时候，采集元素信息
            if (element_target.classList.contains('sensors-disabled')) {
                return false;
            } else {
                return true;
            }
        },
        //考虑到用户隐私，这里可以设置input里的内容是否采集
        //如果返回真，表示采集input内容，返回假表示不采集input内容,默认不采集
        collect_input: function(element_target) {
            return false;
            // 如果这个元素有sensors-content类的时候，采集input内容
            /*if(element_target.classList.contains('sensors-content')){
                return true;
            }*/
        },
        //假如要在 $WebClick 事件增加自定义属性，可以通过（a，button，input）这三类标签的特征来判断是否要增加
        custom_property: function(element_target) {
            //比如您需要给有 data=test 属性的标签的点击事件增加自定义属性 name:'aa' ，则代码如下
            //此方法可以自定义事件属性
            /*if(element_target.getAttribute('data') === 'sensors'){
                return {
                    saName:element_target.getAttribute('saName')
                }
            }*/
            return { PType: "CFD" };
        },
        // 设置触达图的有效停留时间，默认超过4秒以上算有效停留
        scroll_delay_time: 4000
    },
    //是否在根域下设置cookie
    cross_subdomain: true,
    //是否打印日志
    show_log: true,
    //是否使用客户端时间
    use_client_time: false
});
sa.registerPage({ PType: "CFD" });
sa.quick('autoTrack');
//默认事件的收集，例如如果需要采集页面浏览事件（即 PageView）
//自动生成cookie作为标识，如果需要自定义用户标识id,加载js后先调用sa.login(user_id)，这样后续的事件才会使用这个更改后的 userid;
//sa.store.getDistinctId();获取 Cookie 中的 distinct_id(用户标识)
//sa.identify(id): 这个 id 仅对当前页面有效。该方法应用较多。
//sa.identify(id, true): 会把这个 id 一直保存下来使用，永久有效。该方法应用较多。
//sa.identify(): 重新生成一个新的 cookie_id，该方法一般情况不使用
//sa.logout();  取消当前 login 的 id，改成最初自动生成的 cookie_id
//sa.logout(true); 取消当前 login 的 id，重新生成一个新的 cookie_id
//sa.track('event',{$lib_detail:'类名##函数名##文件名##行号'});
//Sensors Analytics SDK 初始化成功后，即可以通过 sa.track(event_name[, properties][, callback]) 记录事件
//event_name: string，必选。表示要追踪的事件名。
//properties: object，可选。表示这个事件的属性。
//callback: function，可选。表示已经发送完数据之后的回调。
//sa.track('ViewProduct', {
//         ProductId: '123456',
//         ProductCatalog: "Laptop Computer",
//         ProductName: "MacBook Pro",
//         ProductPrice: 123.45
//     });

//sa.register({gender:"male"})如果某个事件的属性，在所有事件中都会出现，可以通过 register 系列方法将该属性设置为事件公共属性
//sa.registerPage(object) 建议使用,sa.registerPage({current_url: location.href,referrer: document.referrer});
//sa.track('button_A_click') 这时候，这个 button_A_click 事件，就会带有current_url和referrer这些属性。且仅对当前页面有效。
//sa.clearAllRegister(object) 清空 register 的 cookie 里的内容,需要在 sdk 初始化之后马上调用。