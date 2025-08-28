var bankAdress = {摩根大通:"01",加拿大丰业银行:"02",德国商业银行:"03",巴克莱资本:"04",德意志银行:"05",美银美林银行:"06",法国兴业银行:"07",野村证券:"08",汇丰银行:"09"};
$.extend({
    JsonAjax: function (url, options, callbackSuc, callbackErr) {
        $.extend(options, {_r: Math.random()});
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            data: options,
            dataType: "json",
            success: function (data) {
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function (data) {
                console.log("请求失败，url :" + url);
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    postAjax: function (url, options, callbackSuc, callbackErr) {
        $.extend(options, {url: Math.random()});
        $.ajaxk("POST", url, options, callbackSuc, callbackErr);
    },
    getAjax: function (url, callbackSuc, callbackErr) {
        $.extend(options, {url: Math.random()});
        $.ajaxk("GET", url, "", callbackSuc, callbackErr);
    },
    countDown:function () {
        var url = mis_url+"/public/nonfram/getOperation";
        // console.log("test")
        $.JsonAjax(url,null,function(data) {
            if (data.code == 200) {
                var data =data.ch_msg;
                for (var i=0;i<data.length;i++){
                    var nowTime = data[i].nowTime;
                    // var publishTime = new Date(1699018200000);
                    var publishTime = new Date(data[i].publishTime);
                    var years = publishTime.getFullYear();
                    var month = publishTime.getMonth();
                    var days = publishTime.getDate();
                    var hours = publishTime.getHours();
                    var minutes = publishTime.getMinutes();
                    var seconds = publishTime.getSeconds();
                }
                function timeElapse(pTime) {
                    var ntime =Date(nowTime);
                    var second = (Date.parse(pTime) - Date.parse(ntime)) / 1000;
                    if (second<=0){
                        var day='00';
                        var hour='00';
                        var minute='00';
                        var second='00';
                    }else {
                        var day = Math.floor(second / (3600 * 24));
                        second = second % (3600 * 24);
                        var hour = Math.floor(second / 3600);
                        if (hour < 10) {hour = "0" + hour}
                        second = second % 3600;
                        var minute = Math.floor(second / 60);
                        if (minute < 10) {minute = "0" + minute}
                        second = second % 60;
                        if (second < 10) {second = "0" + second}
                    }
                    var a = '' +
                        '<div class="time"><span class="digit">'+ day + '</span>' +
                        '<p>天</p></div>' +
                        '<div class="time"><span class="digit">'+ hour + '</span>' +
                        '<p>时</p></div>' +
                        '<div class="time"><span class="digit">' + minute + '</span>' +
                        '<p>分</p></div>' +
                        '<div class="time"><span class="digit">' + second + "</span>" +
                        "<p>秒</p></div>";
                    $("#elapseClock").html(a)
                }
                var together = new Date(nowTime);
                together.setFullYear(years, month, days);
                together.setHours(hours);
                together.setMinutes(minutes);
                together.setSeconds(seconds);
                together.setMilliseconds(0);
                timeElapse(together);
                setInterval(function () {
                    timeElapse(together);
                }, 500);
            }
        })
    },
    highCharts:function () {
        var url = mis_url+"/public/nonfram/getData";
        $.JsonAjax(url,null,function(data) {
            if (data.code == 200) {
                var data = data.ch_msg;
                var arrTime = "",arrNonfarm="",arrAdp="";
                for (var i = 0; i < data.length; i++) {
                    arrTime += data[i].publishTime+ ",";
                    arrTime = arrTime.replace(/-/g, "/").replace(/\/0/g,"/");
                    arrNonfarm += data[i].nonfarmCount + ",";
                    arrAdp += data[i].adpCount + ",";
                };
                arrTime = arrTime.substring(0, arrTime.length - 1);
                arrNonfarm = arrNonfarm.substring(0, arrNonfarm.length - 1);
                arrAdp = arrAdp.substring(0, arrAdp.length - 1);
                var arrsTime = arrTime.split(",");
                var arrsNonfarm = arrNonfarm.split(",");
                var arrsAdp = arrAdp.split(",");
                arrsTime=arrsTime.reverse();
                arrsNonfarm = arrsNonfarm.map(Number).reverse();
                arrsAdp = arrsAdp.map(Number).reverse();
                var chart = Highcharts.chart('container', {
                    chart: {
                        type: 'column',
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    legend: {
                        verticalAlign: 'top',
                        itemStyle: {
                            fontSize: '1.2em', 
                            fontFamily:'Microsoft JhengHei'
                        },
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    credits: {
                        text: "",
                        href: ""
                    },
                    xAxis: {
                        categories: arrsTime,
                        crosshair: true,
                        labels: {
                            style: {
                                fontSize: '13px',
                                fontFamily:'Microsoft JhengHei'
                            },
                            y: 37
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        },
                        labels: {
                            style: {
                                fontSize: '15px',
                                fontFamily:'Microsoft JhengHei',
                                fontWeight:'bold'
                            }
                        },
                        gridLineWidth: 1,
                        gridLineDashStyle:'Solid',
                        gridLineColor: '#ffffff'
                    },
                    /*数据点提示框*/
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        formatter: function () {
                            var s = '<b>' + this.x + '</b>';
                            $.each(this.points, function () {
                                s += '<br/>' + this.series.name + ': ' +
                                    this.y + '万人';
                            });
                            return s;
                        }
                    },
                    plotOptions: {
                        column: {
                            borderWidth: 0
                        }
                    },
                    series: [{
                        color:'#3391e7',
                        borderRadius:10,
                        pointWidth: 18,
                        name: '非农数据',
                        data: arrsNonfarm
                    }, {
                        color:'#094b87',
                        borderRadius:10,
                        pointWidth: 18,
                        name: 'ADP数据',
                        data: arrsAdp
                    }]
                });
            }
        })
        $(".highcharts-legend-item > rect").attr('rx' , 8);
        $(".highcharts-legend-item > rect").attr('height' , 16);
        $(".highcharts-legend-item > rect").attr('ry',8);
        $(".highcharts-axis > path").attr('stroke','#b2b1b1');
    },
    mapCon:function () {
        var url = mis_url+"/public/nonfram/getProspects";
        $.JsonAjax(url,null,function(data) {
            if (data.code == 200) {
                var data = data.ch_msg;
                var html="";
                for (var i=0;i<data.length;i++) {
                    var sp_b=data[i].title.substring(0,data[i].title.length-6);
                    var sp_l=data[i].title.substring(data[i].title.length-6,data[i].title.length);
                    $("#map-tit").html("<span class='bold'>"+sp_b+"</span>"+sp_l);
                    var nonfarmData={};
                    nonfarmData =JSON.parse(data[i].nonfarmData);
                    for  (var i=0;i<nonfarmData.length;i++){
                        if (nonfarmData[i].rate==null||nonfarmData[i].rate==""||nonfarmData[i].num==null||nonfarmData[i].num==""){
                            nonfarmData[i].rate="--";
                            nonfarmData[i].num="--"
                        }
                        html+=[
                            "<div class='location'><div class='item left"+bankAdress[nonfarmData[i].name]+"'>",
                            "   <span>"+nonfarmData[i].name+"</span>",
                            "   <p>"+nonfarmData[i].rate+"%失业率</p>",
                            "   <p>"+nonfarmData[i].num+"万人</p>",
                            "</div><div class='dot left"+bankAdress[nonfarmData[i].name]+"'></div></div>"
                        ].join("")
                    }
                    $(".map .list").empty().append(html);
                }
            }
        })
    },
    tableCon:function () {
        var url = mis_url+"/public/nonfram/getHistory";
        $.JsonAjax(url, null, function (data) {
            if (data.code == 200) {
                var data = data.ch_msg;
                var html = ""
                for (var i = 0; i < data.length; i++) {
                    var lastValue_1 = data[i].lastValue > data[i].value ? ">" : "<";
                    var lastValue_2 = data[i].value > data[i].predictValue ? ">" : "<";
                    var value=data[i].value==""?"暂无":data[i].value;
                    var predictValue=data[i].predictValue==""?"暂无":data[i].predictValue;
                    var lik="利空",lid="利多";
                    if (value=="暂无"||predictValue=="暂无"){
                        lastValue_1="";
                        lastValue_2="";
                        lik="暂无";
                        lid="暂无";
                    }
                    if (i==0) {
                        html = [
                            "<tr>",
                            "<td rowspan='8' class='first'><span>美国非农</span><span>就业人数</span></td>",
                            "<td><span>"+data[i].publishTime+"</span></td>",
                            "<td class='yellow'><span>"+data[i].lastValue+"</span></td>",
                            "<td><span>"+lastValue_1+"</span></td>",
                            "<td class='red'><span>"+value+"</span></td>",
                            "<td><span>"+lastValue_2+"</span></td>",
                            "<td class='green'><span>"+predictValue+"</span></td>",
                            "<td><span class='green'>"+lik+data[i].lik+"</span><span class='red'>"+lid+data[i].lid+"</span></td>",
                            "</tr>",
                        ].join("");
                    }else {
                        html += [
                            "<tr>",
                            "<td><span>"+data[i].publishTime+"</span></td>",
                            "<td class='yellow'><span>"+data[i].lastValue+"</span></td>",
                            "<td><span>"+lastValue_1+"</span></td>",
                            "<td class='red'><span>"+value+"</span></td>",
                            "<td><span>"+lastValue_2+"</span></td>",
                            "<td class='green'><span>"+predictValue+"</span></td>",
                            "<td><span class='green'>"+lik+data[i].lik+"</span><span class='red'>"+lid+data[i].lid+"</span></td>",
                            "</tr>",
                        ].join("");
                    }

                }
                $(".tab-con tbody").empty().append(html);
            }
        })
    }
});