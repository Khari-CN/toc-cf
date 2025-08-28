(function($) {
    /*function mainTabs(idTab) {
        var x = $(idTab);
        var y = x.find('li');
        $(y).click(function(event) {
            var index = $(this).index();
            index += 1;
            event.preventDefault();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var z = $(this).closest(".main-tabs").next().find($("#item" + index + "-details"));
            z.fadeIn(350, "swing").removeClass('hide');
            z.siblings().removeClass('show').hide();

        });
    }*/

    function section7Tabs(idTab) {
        var x = $(idTab);
        var y = x.find('li');
        $(y).click(function(event) {
            var index = $(this).index();
            index += 1;
            event.preventDefault();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var z = $(this).closest(idTab).next().find($(".item" + index + "-details"));
            z.fadeIn(350, "swing").removeClass('hide');
            z.siblings().removeClass('show').hide();

        });
    }

    function createChart(id, x, y, title) {
        var x1 = x,
            y1 = y;
        var data = [{
                y: x1,
                color: '#ffffff',
                drilldown: {
                    data: [x1],
                    color: ['#0078b4']
                }
            }, {
                y: y1,
                color: '#ffffff',
                drilldown: {
                    data: [y1],
                    color: ['#ff9f00']
                }
            }],
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
                dataLabels: data[i].dataLabels
            });

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                versionsData.push({
                    y: data[i].drilldown.data[j],
                    color: data[i].drilldown.color[j]
                });
            }
        }
        // Create the chart
        $(id).highcharts({
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie',
                renderTo: 'histogram',
                defaultSeriesType: 'bar',
                backgroundColor: null,
                height: 300,
            },
            title: {
                text: title,
                y: 50,
                useHTML: true,
                style: {
                        fontSize: '16px',
                        fontFamily: '"Microsoft JhengHei", Verdana, sans-serif',
                        color:'#666666',

                    }
            },
            series: [{
                name: 'Versions',
                data: versionsData,
                borderWidth: 0,
                size: '95%',
                innerSize: '85%',
                allowPointSelect: true,
                enableMouseTracking: false,
                dataLabels: {
                    formatter: function() {
                        // hide data label
                        return null;
                    }
                },
                states: {
                    hover: {
                        halo: {
                            size: 0,
                            opacity: .3
                        }

                    }
                }
            }]
        });
    }

    function createRegchart(id) {
        $('#regtachart').highcharts({
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#0096DC"],
            chart: {
                type: 'column',
                marginTop: 50,
                height: 500,
            },
            title: {
                text: null,
            },
            xAxis: {
                type: 'category',
                labels: {
                    maxStaggerLines: 1,
                    useHTML: true,
                    rotation: -45,
                    style: {
                        fontSize: '16px',
                        fontFamily: '"Microsoft JhengHei", Verdana, sans-serif'
                    }
                },
                tickWidth: 0,
            },
            yAxis: {
                labels: {
                    enabled: false,
                },
                min: 0,
                title: {
                    text: null,
                },
                gridLineWidth: 0,
            },
            legend: {
                enabled: false
            },
            tooltip: {
                backgroundColor: '#FCFFC5',
                pointFormat: '信号最后更新时间 2016: <b>{point.y:.1f} %</b>',
                // useHTML: true,
                style: {
                    opacity: '1',
                }
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        overflow: 'none'
                    }
                }
            },
            series: [{
                name: 'Ratio',
                enableMouseTracking: false,
                data: [
                    ['欧元美元', 80.06],
                    ['美元日元', 10.46],
                    ['英镑美元', 6.05],
                    ['美元瑞郎', 5.59],
                    ['澳元美元', 5.50],
                    ['纽元美元', 3.10],
                    ['美元加元', 2.82],
                    ['欧元瑞郎', 2.74],
                    ['中华TECH300 (2009)', 2.55],
                    ['欧元日元', 1.86],
                    ['欧元澳元', 0.54],
                    ['英镑日元', 0.50],
                    ['中华TECH300 (2001)', 0.43],
                    ['英镑澳元', 0.42],
                    ['澳元日元', 0.37],
                    ['澳元纽元', 0.34],
                    ['纽元日元', 0.13],
                    ['加元日元', 0.09],
                    ['美元离岸人民币', 0.08],
                    ['港元离岸人民币', 0.07],
                    ['欧元英镑1', 0.06]
                ],
                colors: "#0096DC",
                dataLabels: {
                    useHTML: true,
                    enabled: true,
                    formatter: function() {
                        // pntr++;
                        var pcnt = (this.y);
                        if (pcnt == '80.06' || pcnt == '10.46' || pcnt == '6.05') {
                            return '<span class="hot"><span>' + Highcharts.numberFormat(pcnt, 2);
                        } else {
                            return Highcharts.numberFormat(pcnt, 2);
                        }
                    },
                    rotation: 0,
                    //color: '#FFFFFF',
                    align: 'center',
                    // format: '{point.y:.1f}', // one decimal
                    y: 0,
                    x: 0,
                    style: {
                        fontSize: '9px',
                        fontFamily: 'Verdana, sans-serif'
                    }

                }
            }]
        });
    }
    //  Check informations of user
    function checkInfo() {
        var phone = $('#phone'),
            phoneErr = $('#phone-err'),
            name = $('#name'),
            nameErr = $('#name-err'),
            email = $('#email'),
            emailErr = $('#email-err');

        var emailYz = /^[a-z0-9-.]{1,30}@[a-z0-9-]{1,65}\.[a-z]{2,5}$/,
        	phoneYz = /^\d{11}$/,
        	nameYz = /^[\u4E00-\u9FA5A-Z\0]+$/;

        //  check name
        name.focusout(function() {        	
            if (nameYz.test(this.value)) {
                nameErr.hide();
            } else {
                nameErr.show();
            }
        });

        //  check phone
        phone.focusout(function() {
            if (phoneYz.test(this.value)) {
                phoneErr.hide();
            } else {
                phoneErr.show();
            }
        });
        phone.focusin(function() {
            $(".area-code").css({
                "color": '#666',
            });
        });
        // check email
        email.focusout(function() {
            if (emailYz.test(this.value)) {
                emailErr.hide();
            } else {
                emailErr.show();
            }
        });
    }
    // Function to check number
    function checkNumber() {
        $("#phone").autoNumeric("init", {
            vMin: "0",
            vMax: 99999999999,
            aSep: ''
        });
    }
    // build scenes scroll magic
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            offset: 250
        }
    });


    var scene = new ScrollMagic.Scene({
            triggerElement: ".section8"
        })
        .on("enter", function() {
            // trigger animation by changing inline style.
//            createRegchart("#regtachart");
        })
        // .setClassToggle(".section1", "active")
        .addTo(controller);

    /**
     * START - ONLOAD - JS
     */
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */



    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function($) {
        // mainTabs(".item-wrapper");
        section7Tabs("#click-tabs");
        checkInfo();
        checkNumber();
//        for (i = 1; i <= 34; i++) {
//            if (i == 1 || i == 2) {
//                createChart("#chart" + i, 45, 55, "美国中华");
//            } else {
//                createChart("#chart" + i, 42, 58, "中华TECH300 (2001)");
//            }
//
//        }
//        for (j = 1; j <= 4; j++) {
//            if (j != 2) {
//                $("#item1-details .item" + j + "-details ").hide();
//            }
//        }
    });
    // createRegchart("#regtachart");
    /* OnLoad Window */
    var init = function() {};
    window.onload = init;

})(jQuery);
