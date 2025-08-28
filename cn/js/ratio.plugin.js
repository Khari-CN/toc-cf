var cfApp = angular.module("cfApp", []);
cfApp.controller(
  "positionCtrl",
  function ($scope, $http, $timeout, $filter, $log) {
    // const
    var commodity = [
      "BF",
      "BG",
      "BH",
      "BJ",
      "BK",
      "BM",
      "BN",
      "BQ",
      "BU",
      "BV",
      "BX",
      "BZ",
      "CLF",
      "CLG",
      "CLH",
      "CLJ",
      "CLK",
      "CLM",
      "CLN",
      "CLQ",
      "CLU",
      "CLV",
      "CLX",
      "CLZ",
      "UKOil",
      "USOil",
    ];
    var exchange = [
      "AUDJPY",
      "AUDNZD",
      "AUDUSD",
      "CADJPY",
      "EURAUD",
      "EURCHF",
      "EURGBP",
      "EURJPY",
      "EURUSD",
      "GBPAUD",
      "GBPCHF",
      "GBPJPY",
      "GBPUSD",
      "NZDJPY",
      "NZDUSD",
      "USDCAD",
      "USDCHF",
      "USDCNH",
      "USDJPY",
      "HKDCNH",
    ];
    var stock = [
      "China",
      "A50",
      "CHINA300",
      "DJ30",
      "FTSE",
      "CHINA",
      "A50",
      "HK50",
      "JPN225",
      "SP500",
      "Tech100",
    ];
    var metal = ["XAGUSD", "XAUUSD", "XAUCNH", "XAGCNH"];
    var exchangeGroup = {};
    exchangeGroup.dollar = [
      "AUDUSD",
      "USDJPY",
      "EURUSD",
      "GBPUSD",
      "NZDUSD",
      "USDCAD",
      "USDCHF",
    ];
    exchangeGroup.cnh = ["USDCNH", "HKDCNH"];

    // variables
    var wealthyStock = [];
    $scope.updatedDate;

    $scope.commodity = [];
    $scope.exchange = $scope.exchange || {};
    $scope.stock = [];
    $scope.metal = [];
    $scope.date = new Date();
    $scope.tabs = [true, false, false, false];

    function init() {
      $scope.getData();
      $scope.getWealthy();
    }

    $scope.getWealthy = function () {
      $http
        .get(mis_url + "/public/stock/interestRatio")
        //'http://localhost:7000/public/stock/wealthy')
        .then(function (response) {
          var data = response.data;
          var charData = [];
          var min = 0;
          for (i = 0; i < data.length; i++) {
            var barData = [];
            if (data[i].symbol == "OTHERS") {
              barData.push("其他");
            } else {
              barData.push(data[i].name);
            }
            barData.push(data[i].percent);
            charData.push(barData);
            if (i === 6 && min == 0) {
              min = data[i].percent;
            }
          }
          createRegchart(charData, min);

          // build scenes scroll magic
          var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
              offset: 250,
            },
          });

          var scene = new ScrollMagic.Scene({
            triggerElement: ".section8",
          })
            .on("enter", function () {
              // trigger animation by changing inline style.
              createRegchart(charData, min);
            })
            // .setClassToggle(".section1", "active")
            .addTo(controller);
        });
    };

    $scope.getData = function () {
      $http.get(mis_url + "/public/stock/cf").then(function (response) {
        $scope.updatedDate = new Date(response.data.result.updatedTimestamp);
        $scope.commodity = [];
        $scope.exchange.dollar = [];
        $scope.exchange.cnh = [];
        $scope.exchange.other = [];
        $scope.stock = [];
        $scope.metal = [];

        var data = response.data.result.stocks;
        for (i = 0; i < data.length; i++) {
          if (data[i].type == 1 && data[i].endTimestamp < $scope.date) {
            continue;
          }
          var symbol = data[i].symbol;
          if (isCommodity(symbol)) {
            $scope.commodity.push(data[i]);
          } else if (isExchange(symbol)) {
            if (isExchangeDollar(symbol)) {
              $scope.exchange.dollar.push(data[i]);
            } else if (isExchangeCNH(symbol)) {
              $scope.exchange.cnh.push(data[i]);
            } else {
              $scope.exchange.other.push(data[i]);
            }
          } else if (isStock(symbol)) {
            $scope.stock.push(data[i]);
          } else if (isMetal(symbol)) {
            $scope.metal.push(data[i]);
          }
        }

        $scope.buy = response.data.result.goodBuyPercent;
        $scope.sell = response.data.result.goodSellPercent;
        $scope.updatedDate = response.data.result.updatedTimestamp;

        //					$timeout($scope.getData, 5000);
      });
    };

    $scope.changeTab = function (index) {
      $scope.tabs = [false, false, false, false];
      $scope.tabs[index] = true;
    };

    function isCommodity(symbol) {
      symbol = symbol.trim();
      //		return commodity.indexOf(symbol) !== -1"UKOil","USOil"
      //			|| commodity.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
      //			|| commodity.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1;
      return symbol.indexOf("UKOil") == 0 || symbol.indexOf("USOil") == 0;
    }

    function isExchange(symbol) {
      symbol = symbol.trim();
      return (
        exchange.indexOf(symbol) !== -1 ||
        exchange.indexOf(symbol.substring(0, symbol.length - 1)) !== -1 ||
        exchange.indexOf(symbol.substring(0, symbol.indexOf("("))) !== -1
      );
    }

    function isExchangeDollar(symbol) {
      symbol = symbol.trim();
      return (
        exchangeGroup.dollar.indexOf(symbol) !== -1 ||
        exchangeGroup.dollar.indexOf(symbol.substring(0, symbol.length - 1)) !==
          -1 ||
        exchangeGroup.dollar.indexOf(
          symbol.substring(0, symbol.indexOf("("))
        ) !== -1
      );
    }

    function isExchangeCNH(symbol) {
      symbol = symbol.trim();
      return (
        exchangeGroup.cnh.indexOf(symbol) !== -1 ||
        exchangeGroup.cnh.indexOf(symbol.substring(0, symbol.length - 1)) !==
          -1 ||
        exchangeGroup.cnh.indexOf(symbol.substring(0, symbol.indexOf("("))) !==
          -1
      );
    }

    function isStock(symbol) {
      symbol = symbol.trim();
      return (
        stock.indexOf(symbol) !== -1 ||
        stock.indexOf(symbol.substring(0, symbol.length - 1)) !== -1 ||
        stock.indexOf(symbol.substring(0, symbol.indexOf("("))) !== -1
      );
    }

    function isMetal(symbol) {
      symbol = symbol.trim();
      return (
        metal.indexOf(symbol) !== -1 ||
        metal.indexOf(symbol.substring(0, symbol.length - 1)) !== -1 ||
        metal.indexOf(symbol.substring(0, symbol.indexOf("("))) !== -1
      );
    }

    //create bar chart

    function createRegchart(data, min) {
      var cnt = 0;
      $("#regtachart").highcharts({
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        colors: ["#0096DC"],
        chart: {
          type: "column",
          marginTop: 50,
          height: 500,
        },
        title: {
          text: null,
        },
        xAxis: {
          type: "category",
          labels: {
            maxStaggerLines: 1,
            useHTML: true,
            rotation: -45,
            style: {
              fontSize: "16px",
              fontFamily: '"Microsoft JhengHei", Verdana, sans-serif',
            },
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
          enabled: false,
        },
        tooltip: {
          backgroundColor: "#FCFFC5",
          pointFormat: "信号最后更新时间 2016: <b>{point.y:.1f} %</b>",
          // useHTML: true,
          style: {
            opacity: "1",
          },
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
              crop: false,
              overflow: "none",
            },
          },
        },
        series: [
          {
            name: "Ratio",
            enableMouseTracking: false,
            data: data,
            colors: "#0096DC",
            dataLabels: {
              useHTML: true,
              enabled: true,
              formatter: function () {
                // pntr++;
                var pcnt = this.y;
                if (cnt < 7 && pcnt >= min) {
                  cnt++;
                  return (
                    '<span class="hot"><span>' +
                    Highcharts.numberFormat(pcnt, 2)
                  );
                } else {
                  return Highcharts.numberFormat(pcnt, 2);
                }
              },
              rotation: 0,
              //color: '#FFFFFF',
              align: "center",
              // format: '{point.y:.1f}', // one decimal
              y: 0,
              x: 0,
              style: {
                fontSize: "9px",
                fontFamily: "Verdana, sans-serif",
              },
            },
          },
        ],
      });
    }

    // end bar chart

    init();
  }
);

cfApp.directive("cfPie", function () {
  return {
    restrict: "E",
    scope: {
      data: "@",
      buy: "@",
      sell: "@",
    },
    template:
      '<div id="container{{symbol}}"></div><div class="figures">{{(value>0?"+":"")}}{{value|number :0}}</div><div class="gloss"><a ng-class="cClass" >{{text}}</a></div><div class="percent">' +
      '<span class="add">多 {{buyRatio}}%</span><span class="subt">空 {{sellRatio}}%</span>' +
      "</div>",
    link: function (scope, element, attrs) {
      scope.value;
      scope.cClass = "";
      scope.text = "";
      scope.symbol;

      scope.pieData = JSON.parse(scope.data);
      scope.symbol = scope.pieData.symbol.replace("(", "").replace(")", "");

      var stock = scope.pieData;
      /*if(stock.recSellRatios>0){
                scope.buyRatio = (stock.buyRatios * (1. - stock.reliableRatios)) + (stock.recBuyRatios * stock.reliableRatios);
                scope.buyRatio = round(scope.buyRatio*100,0);
                scope.sellRatio = 100 - scope.buyRatio;
            }else{
                scope.buyRatio = round(stock.buyRatios*100,0);
                scope.sellRatio = round(stock.sellRatios*100,0);
            }*/
      scope.buyRatio = round((stock.buyRatios * 0.5 + 0.25) * 100, 0);
      scope.sellRatio = round((stock.sellRatios * 0.5 + 0.25) * 100, 0);
      scope.value = scope.buyRatio - scope.sellRatio;

      if (scope.value < 0) {
        scope.text = "看多";
        scope.cClass = "cap2";
      } else if (scope.value > 0) {
        scope.text = "看空";
        scope.cClass = "cap3";
      } else {
        scope.text = "持平";
        scope.cClass = "cap1";
      }

      function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
      }

      scope.$watch("pieData", function (newValue, oldValue) {
        createChart(
          "#container" + scope.symbol,
          scope.sellRatio,
          scope.buyRatio,
          scope.pieData.name
        );
      });

      //create chart
      function createChart(id, x, y, title) {
        var x1 = x,
          y1 = y;
        var data = [
            {
              y: x1,
              color: "#ffffff",
              drilldown: {
                data: [x1],
                color: [""].map(function () {
                    return {
                      linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0.5,
                        y2: 0.5,
                        x3: 1,
                        y3: 1,
                      },
                      stops: [
                        [0, "#3ca1fe"],
                        [0.5, "#2f94f0"],
                        [1, "#1c80dc"],
                      ],
                    };
                  }),
              },
            },
            {
              y: y1,
              color: "#ffffff",
              drilldown: {
                data: [y1],
                //for linearGradient pie color
                color: [""].map(function () {
                  return {
                    linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0.5,
                      y2: 0.5,
                      x3: 1,
                      y3: 1,
                    },
                    stops: [
                      [0, "#fe941c"],
                      [0.5, "#fdae3d"],  
                      [1, "#fec245"],
                    ],
                  };
                }),
              },
            },
          ],
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
            dataLabels: data[i].dataLabels,
          });

          // add version data
          drillDataLen = data[i].drilldown.data.length;
          for (j = 0; j < drillDataLen; j += 1) {
            versionsData.push({
              y: data[i].drilldown.data[j],
              color: data[i].drilldown.color[j],
            });
          }
        }
        // Create the chart
        var chart = $(id).highcharts({
          exporting: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          chart: {
            type: "pie",
            renderTo: "histogram",
            defaultSeriesType: "bar",
            backgroundColor: null,
            height: 300,
          },
          title: {
            text: title,
            y: 50,
            useHTML: true,
            style: {
              fontSize: "1.8em",
              fontFamily: '"Microsoft JhengHei"',
              color: "#000000",
              fontWeight: "700",
            },
          },
          series: [
            {
              name: "Versions",
              data: versionsData,
              borderWidth: 0,
              size: "95%",
              innerSize: "85%",
              allowPointSelect: true,
              enableMouseTracking: false,
              dataLabels: {
                formatter: function () {
                  // hide data label
                  return null;
                },
              },
              states: {
                hover: {
                  halo: {
                    size: 0,
                    opacity: 0.3,
                  },
                },
              },
            },
          ],
        });
      }
      //end function createChart
    },
  };
});
