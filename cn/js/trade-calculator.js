var _ = {
  /**
   * 根据条件筛选数组中的数据
   * @param list 数组
   * @param where json对象
   * @returns {Array}
   */
  where: function (list, where) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
      var tmp = list[i];
      var dy = true; //
      for (x in where) {
        if (tmp[x] !== where[x]) {
          dy = false;
        }
      }
      if (dy) {
        result.push(tmp);
      }
    }
    return result;
  },
};
var loadInfo = {
  open: function () {
    $(".loadid").addClass("lazyload");
  },
  close: function () {
    $(".loadid").removeClass("lazyload");
  },
};

function add(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e;
}

function sub(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e;
}

function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {}
  try {
    c += e.split(".")[1].length;
  } catch (f) {}
  return (
    (Number(d.replace(".", "")) * Number(e.replace(".", ""))) / Math.pow(10, c)
  );
}

function div(a, b) {
  var c,
    d,
    e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {}
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {}
  return (
    (c = Number(a.toString().replace(".", ""))),
    (d = Number(b.toString().replace(".", ""))),
    mul(c / d, Math.pow(10, f - e))
  );
}
/**加*/
Number.prototype.add = function (arg) {
  return add(this, arg);
};
/**剪*/
Number.prototype.sub = function (arg) {
  return sub(this, arg);
};
/**乘*/
Number.prototype.mul = function (arg) {
  return mul(this, arg);
};
/**除*/
Number.prototype.div = function (arg) {
  return div(this, arg);
};
var ngApp = angular.module("myApp", []);
ngApp.controller(
  "myController",
  async function ($scope, $http, $timeout, $filter, $log) {
    /**计算结果初始化*/
    $scope.sumInfo = {
      sum1: 0.1,
      sum2: 0.1,
      sum3: 0.01,
      sum3: 0.01,
    };

    $scope.jyType = "0"; //买卖方向model

    $scope.baseProducts = [
      { key: "1", value: "商品" },
      { key: "2", value: "外汇" },
      { key: "3", value: "指数" },
      // {key:"4",value:"虚拟货币"},
      { key: "5", value: "美股" },
      { key: "6", value: "港股" },
      { key: "7", value: "农产品" },
    ];

    $scope.product1 = "XAUUSD";
    $scope.product2 = "XAUUSD";
    $scope.product3 = "XAUUSD";
    $scope.product4 = "XAUUSD";
    $scope.count1 = 0.01;
    $scope.count2 = 0.01;
    $scope.count3 = 0.01;
    $scope.count4 = 0.01;
    $scope.kprice = 0.01;
    $scope.pprice = 0.01;
    $scope.kprice4 = 0.01;
    $scope.pprice4 = 1;
    $scope.type1 = "1";
    $scope.type2 = "1";
    $scope.type3 = "1";
    $scope.type4 = "1";
    $scope.fetchKey = [
      {
        key: "data1",
        path: "pointData.json",
      },
      {
        key: "data2",
        path: "margin.json",
      },
      {
        key: "data3",
        path: "profit.json",
      },
      {
        key: "data4",
        path: "longOvernightInterest.json",
      },
      {
        key: "data5",
        path: "shortOvernightInterest.json",
      },
    ];
    $scope.data = {};

    $scope.init = async function () {
      for (let i = 0; i < $scope.fetchKey.length; i++) {
        const file = $scope.fetchKey[i];
        const res = await $http.get(`${window.location.origin}/static/data/${file.path}`);
        $scope.data[file.key] = res.data;
      }

      console.log("data", $scope.data)
    };
    await $scope.init();

    $scope.typeChanged = function (str) {
      // console.log("产品",str);
      // if( str == "USOil" || str == 'UKOil'){
      //     $(".choise").text("输入0.01至20间数值");
      // }else{
      //     $(".choise").text("输入0.01至100间数值");
      // }

      $(".choise").text("输入0.01至100间数值");
    };
    $scope.countFocused = function (type) {
      var resultArray = _.where($scope.data.data2, {
        key: $scope.product2,
      });
      var obj = resultArray[0];

      if (type == "one") {
        // console.log("点值");
        resultArray = _.where($scope.data.data2, { key: $scope.product1 });
        obj = resultArray[0];
      }

      // if( obj.key == "USOil" || obj.key == 'UKOil'){
      //     $(".choise").text("输入0.01至20间数值");
      // }else{
      //     $(".choise").text("输入0.01至100间数值");
      // }
      $(".choise").text("输入0.01至100间数值");
    };
    $scope.countChanged = function (str, type) {
      // var resultArray,obj;
      var resultArray = _.where($scope.data.data2, {
        key: $scope.product2,
      });
      var obj = resultArray[0];

      if (type == "one") {
        // console.log("点值");
        resultArray = _.where($scope.data.data2, { key: $scope.product1 });
        obj = resultArray[0];
      }
      // }else if ( type == "two"){
      //     console.log("保证");

      //     // resultArray = _.where($scope.data.data2, {key: $scope.product2});
      //     // obj = resultArray[0];
      // }

      // console.log("objKey",obj.key);

      var reg =
        /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;
      var reg20 =
        /^[0]\.([1-9]{1,2}|[0-9][1-9])$|^[1-9](\.\d{1,2}){0,1}$|^([1][0-9])(\.\d{1,2}){0,1}$|^20(\.[0]{1,2}){0,1}$/;

      if (str != null && str != "") {
        // if( obj.key == "USOil" || obj.key == 'UKOil'){
        //     // $(".choise").text("输入0.01至20间数值");
        //     if(!reg20.test(str)){
        //         //alert("请输入0.01至20之间的的数值")
        //         return false;
        //     }

        // }else{
        //     // $(".choise").text("输入0.01至100间数值");
        //     if (!reg.test(str)) {
        //         //alert("请输入0.01至100之间的的数值");
        //         return false;
        //     }
        // }

        if (!reg.test(str)) {
          // //alert("请输入0.01至100之间的的数值");
          return false;
        }
      }
      return true;
    };

    /**获取即时报价数据*/
    $scope.getMarketPrice2 = function (productCode, callBack) {
      loadInfo.open();
      $http
        .post(api_url + "/public/marketprice/cf.json", {})
        .success(function (data) {
          loadInfo.close();
          var obj = _.where(data, { symbol: productCode });
          //console.log(obj)
          if (obj.length > 0) {
            obj = obj[0];
            var d = new Date(obj.time);
            d.setHours(d.getHours() + 8);
            $scope.time = d;
            if (callBack) {
              callBack(obj.ask);
            }
          }
        });
    };

    $scope.getMarketPrice = function (productCode, callBack) {
      loadInfo.open();
      $http
        .post(api_url + "/public/marketprice/cf.json", {})
        .success(function (data) {
          loadInfo.close();
          var obj = _.where(data, { symbol: productCode });
          if (obj.length > 0) {
            obj = obj[0];
            var result = (obj.ask + obj.bid) / 2;
            var d = new Date(obj.time);
            d.setHours(d.getHours() + 8);
            $scope.time = d;
            if (callBack) {
              callBack(result);
            }
          }
        });
    };

    $scope.setResult = function (type, source) {
      var sum = eval(source);
      if (sum) {
        if (type === "one") {
          $scope.sumInfo.sum1 = sum.toFixed(2);
        } else if (type === "two") {
          $scope.sumInfo.sum2 = sum.toFixed(2);
        } else if (type === "fore") {
          $scope.sumInfo.sum4 = sum.toFixed(2);
          if ($scope.sumInfo.sum4 == "0.00") {
            $scope.sumInfo.sum4 = 0.01;
          }
        } else {
          $scope.sumInfo.sum3 = sum.toFixed(2);
        }
      } else {
        $scope.sumInfo.sum4 = sum.toFixed(2);
      }
    };

    /**计算按钮点击(ask+bid)/2等于及时报价*/
    $scope.calculate = function (type, nprice) {
      if (type === "one") {
        //点值计算器
        if (!$scope.count1) {
          return;
        }
        if (!$scope.countChanged($scope.count1)) {
          return;
        }
        var resultArray = _.where($scope.data.data1, {
          key: $scope.product1,
        });
        if (resultArray.length > 0) {
          var obj = resultArray[0];
          var source = obj.value.replace("count", $scope.count1);
          if (obj.marketPrice) {
            var price = $scope.getMarketPrice(
              obj.marketPrice,
              function (price) {
                source = source.replace("price", price);
                $scope.setResult(type, source);
              }
            );
          } else {
            $scope.setResult(type, source);
          }
        }
      } else if (type === "two") {
        if (!$scope.count2) {
          return;
        }
        if (!$scope.countChanged($scope.count2)) {
          return;
        }
        var resultArray = _.where($scope.data.data2, {
          key: $scope.product2,
        });
        if (resultArray.length > 0) {
          var obj = resultArray[0];
          var sum;
          var source = obj.value;
          if (obj.key == "XAUUSD") {
            if ($scope.count2 > 0 && $scope.count2 <= 5) {
              source = 500;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 5 && $scope.count2 <= 50) {
              source = 1000;
              sum = source * ($scope.count2 - 5) + 2500;
            } else {
              source = 2000;
              sum = source * ($scope.count2 - 50) + 47500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "XAGUSD") {
            if ($scope.count2 > 0 && $scope.count2 <= 3) {
              source = 500;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 3 && $scope.count2 <= 15) {
              source = 1000;
              sum = source * ($scope.count2 - 3) + 1500;
            } else {
              source = 2000;
              sum = source * ($scope.count2 - 15) + 13500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "USOil" || obj.key == "UKOil") {
            if ($scope.count2 > 0 && $scope.count2 <= 5) {
              source = 200;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 5 && $scope.count2 <= 20) {
              source = 500;
              sum = source * ($scope.count2 - 5) + 1000;
            } else if ($scope.count2 > 20 && $scope.count2 <= 50) {
              source = 1000;
              sum = source * ($scope.count2 - 20) + 8500;
            } else {
              source = 2000;
              sum = source * ($scope.count2 - 50) + 38500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "BABA" ||
            obj.key == "FB" ||
            obj.key == "GS" ||
            obj.key == "BIDU"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 750;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 1500;
              sum = source * ($scope.count2 - 10) + 7500;
            } else {
              source = 3000;
              sum = source * ($scope.count2 - 30) + 37500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "AAPL" || obj.key == "PAD") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 1000;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 2000;
              sum = source * ($scope.count2 - 10) + 10000;
            } else {
              source = 4000;
              sum = source * ($scope.count2 - 30) + 50000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "JD") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 100;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 200;
              sum = source * ($scope.count2 - 10) + 1000;
            } else {
              source = 400;
              sum = source * ($scope.count2 - 30) + 5000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "SBUX" ||
            obj.key == "COPPER" ||
            obj.key == "Iron"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 300;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 600;
              sum = source * ($scope.count2 - 10) + 3000;
            } else {
              source = 1200;
              sum = source * ($scope.count2 - 30) + 15000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "TSLA") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 2000;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 4000;
              sum = source * ($scope.count2 - 10) + 20000;
            } else {
              source = 8000;
              sum = source * ($scope.count2 - 30) + 100000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "KO") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 250;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 500;
              sum = source * ($scope.count2 - 10) + 2500;
            } else {
              source = 1000;
              sum = source * ($scope.count2 - 30) + 12500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "USDINDEX") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 250;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 20) {
              source = 500;
              sum = source * ($scope.count2 - 10) + 2500;
            } else {
              source = 1000;
              sum = source * ($scope.count2 - 30) + 7500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "DIS" || obj.key == "MSFT") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 600;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 1200;
              sum = source * ($scope.count2 - 10) + 6000;
            } else {
              source = 2400;
              sum = source * ($scope.count2 - 30) + 30000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "PDD" || obj.key == "CTRP") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 200;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 400;
              sum = source * ($scope.count2 - 10) + 2000;
            } else {
              source = 800;
              sum = source * ($scope.count2 - 30) + 10000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "NTES") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 1500;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 3000;
              sum = source * ($scope.count2 - 10) + 15000;
            } else {
              source = 6000;
              sum = source * ($scope.count2 - 30) + 75000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "AABA") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 350;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 700;
              sum = source * ($scope.count2 - 10) + 3500;
            } else {
              source = 1400;
              sum = source * ($scope.count2 - 30) + 17500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "00700.HK") {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 1500;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 3000;
              sum = (source * ($scope.count2 - 20) + 30000) / 7.8;
            } else {
              source = 6000;
              sum = (source * ($scope.count2 - 60) + 150000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "00388.HK" || obj.key == "00011.HK") {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 1000;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 2000;
              sum = (source * ($scope.count2 - 20) + 20000) / 7.8;
            } else {
              source = 4000;
              sum = (source * ($scope.count2 - 60) + 100000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "00005.HK" ||
            obj.key == "01299.HK" ||
            obj.key == "00941.HK" ||
            obj.key == "02318.HK"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 350;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 700;
              sum = (source * ($scope.count2 - 20) + 7000) / 7.8;
            } else {
              source = 1400;
              sum = (source * ($scope.count2 - 60) + 35000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "01810.HK" ||
            obj.key == "00144.HK" ||
            obj.key == "00165.HK" ||
            obj.key == "00285.HK"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 100;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 200;
              sum = (source * ($scope.count2 - 20) + 2000) / 7.8;
            } else {
              source = 400;
              sum = (source * ($scope.count2 - 60) + 10000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "00267.HK" ||
            obj.key == "00390.HK" ||
            obj.key == "00992.HK" ||
            obj.key == "01929.HK" ||
            obj.key == "00762.HK"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 50;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 100;
              sum = (source * ($scope.count2 - 20) + 1000) / 7.8;
            } else {
              source = 200;
              sum = (source * ($scope.count2 - 60) + 5000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "00728.HK" || obj.key == "01638.HK") {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 20;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 40;
              sum = (source * ($scope.count2 - 20) + 400) / 7.8;
            } else {
              source = 80;
              sum = (source * ($scope.count2 - 60) + 2000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "03968.HK" ||
            obj.key == "03333.HK" ||
            obj.key == "00763.HK" ||
            obj.key == "02388.HK"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 20) {
              source = 200;
              sum = (source * $scope.count2) / 7.8;
            } else if ($scope.count2 > 20 && $scope.count2 <= 60) {
              source = 400;
              sum = (source * ($scope.count2 - 20) + 4000) / 7.8;
            } else {
              source = 800;
              sum = (source * ($scope.count2 - 60) + 20000) / 7.8;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "SOYBEAN" ||
            obj.key == "COCOA" ||
            obj.key == "CORN" ||
            obj.key == "WHEAT" ||
            obj.key == "PLT" ||
            obj.key == "COFFEE" ||
            obj.key == "SUGAR" ||
            obj.key == "STI" ||
            obj.key == "AS200"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 500;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 1000;
              sum = source * ($scope.count2 - 10) + 5000;
            } else {
              source = 2000;
              sum = source * ($scope.count2 - 30) + 25000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "COTTON") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 400;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 30) {
              source = 800;
              sum = source * ($scope.count2 - 10) + 4000;
            } else {
              source = 1600;
              sum = source * ($scope.count2 - 30) + 20000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "HK50" ||
            obj.key == "A50" ||
            obj.key == "A50" ||
            obj.key == "CHINA300" ||
            obj.key == "JPN225"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 200;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 20) {
              source = 500;
              sum = source * ($scope.count2 - 10) + 2000;
            } else {
              source = 1000;
              sum = source * ($scope.count2 - 20) + 7000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "DJ30" ||
            obj.key == "SP500" ||
            obj.key == "TECH100" ||
            obj.key == "FRA40" ||
            obj.key == "GRE30"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 500;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 20) {
              source = 1000;
              sum = source * ($scope.count2 - 10) + 5000;
            } else {
              source = 2000;
              sum = source * ($scope.count2 - 20) + 15000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (obj.key == "UK100" || obj.key == "USDINDEX") {
            if ($scope.count2 > 0 && $scope.count2 <= 10) {
              source = 250;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 20) {
              source = 500;
              sum = source * ($scope.count2 - 10) + 2500;
            } else {
              source = 1000;
              sum = source * ($scope.count2 - 20) + 7500;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else if (
            obj.key == "GBPNZD" ||
            obj.key == "GBPCAD" ||
            obj.key == "EURNZD" ||
            obj.key == "EURCAD" ||
            obj.key == "AUDCAD" ||
            obj.key == "AUDCHF" ||
            obj.key == "NZDCAD" ||
            obj.key == "NZDCHF" ||
            obj.key == "CADCHF"
          ) {
            if ($scope.count2 > 0 && $scope.count2 <= 30) {
              source = 400;
              sum = source * $scope.count2;
            } else if ($scope.count2 > 10 && $scope.count2 <= 60) {
              source = 600;
              sum = source * ($scope.count2 - 30) + 12000;
            } else {
              source = 800;
              sum = source * ($scope.count2 - 60) + 30000;
            }
            $scope.sumInfo.sum2 = sum.toFixed(2);
          } else {
            sum = source * $scope.count2;
            $scope.sumInfo.sum2 = sum.toFixed(2);
          }
          //$scope.sumInfo.sum2 = sum.toFixed(2);
        }
      } else if (type === "fore") {
        //three
        console.log("in this");
        if (!$scope.pprice4 || !$scope.kprice4 || !$scope.count4) {
          return;
        }
        console.log("2");
        if (!$scope.countChanged($scope.count4)) {
          return;
        }
        console.log("3");
        if ($scope.jyType == "1") {
          //等于1时、更改方向
          var resultArray = _.where($scope.data.data5, {
            key: $scope.product4,
          });
        } else {
          var resultArray = _.where($scope.data.data4, {
            key: $scope.product4,
          });
        }
        if (resultArray.length > 0) {
          var obj = resultArray[0];
          var source = obj.value.replace("count", $scope.count4);
          source = source.replace("numCont", $scope.pprice4);
          source = source.replace("kcPrice", $scope.kprice4);
          //當交易產品為離岸人民幣黃金時, 利息單位為人民幣
          if (obj.key == "GAUCNH") {
            $scope.sumInfo.currency = "人民币";
          } else {
            $scope.sumInfo.currency = obj.currency || "美元";
          }
          $scope.setResult(type, source);
        } else {
          $scope.sumInfo.currency = "美元";
        }
      } else {
        //three
        if (!$scope.pprice || !$scope.kprice || !$scope.count3) {
          return;
        }
        if (!$scope.countChanged($scope.count3)) {
          return;
        }
        var resultArray = _.where($scope.data.data3, {
          key: $scope.product3,
        });
        if (resultArray.length > 0) {
          var obj = resultArray[0];
          var source = obj.value.replace("count", $scope.count3);

          if ($scope.jyType == "1") {
            //等于1时、更改方向
            source = source.replace("pc", $scope.kprice);
            source = source.replace("kc", $scope.pprice);
          } else {
            source = source.replace("pc", $scope.pprice);
            source = source.replace("kc", $scope.kprice);
          }
          if (obj.marketPrice) {
            var price;
            if (nprice) {
              price = nprice;
              source = source.replace("price", price);
            } else {
              $scope.getMarketPrice(obj.marketPrice, function (price) {
                source = source.replace("price", price);
                $scope.setResult(type, source);
              });
            }
          } else {
            $scope.setResult(type, source);
          }
        }
      }
    };

    $scope.product3Changed = function () {
      $scope.getMarketPrice2($scope.product3, function (price) {
        if (!price) {
          price = 0;
        }
        $scope.kprice = price; //开仓价

        var resultArray = _.where($scope.data.data3, {
          key: $scope.product3,
        });
        if (resultArray.length > 0) {
          var obj = resultArray[0];
          $scope.pprice = price.add(obj.fl.mul(5));
          //                    $scope.pprice =(price+(obj.fl*5));
        }
        $scope.calculate("three");
      });
    };

    $scope.product4Changed = function () {
      $scope.getMarketPrice2($scope.product4, function (price) {
        if (!price) {
          price = 0;
        }
        $scope.kprice4 = price; //开仓价

        var resultArray = _.where($scope.data.data4, {
          key: $scope.product4,
        });

        $scope.calculate("fore");
      });
    };

    $scope.spChanged = function (index) {
      if (index == 1) {
        if ($scope.type1 === "1") {
          $scope.product1 = "XAUUSD";
        } else if ($scope.type1 === "2") {
          $scope.product1 = "EURUSD";
        } else if ($scope.type1 === "3") {
          $scope.product1 = "HK50";
        } else if ($scope.type1 === "4") {
          $scope.product1 = "BTCUSD";
        } else if ($scope.type1 === "5") {
          $scope.product1 = "BABA";
        } else if ($scope.type1 === "6") {
          $scope.product1 = "00700.HK";
        } else {
          $scope.product1 = "SOYBEAN";
        }
        $scope.calculate("one");
      } else if (index == 2) {
        if ($scope.type2 === "1") {
          $scope.product2 = "XAUUSD";
        } else if ($scope.type2 === "2") {
          $scope.product2 = "EURUSD";
        } else if ($scope.type2 === "3") {
          $scope.product2 = "HK50";
        } else if ($scope.type2 === "4") {
          $scope.product2 = "BTCUSD";
        } else if ($scope.type2 === "5") {
          $scope.product2 = "BABA";
        } else if ($scope.type2 === "6") {
          $scope.product2 = "00700.HK";
        } else {
          $scope.product2 = "SOYBEAN";
        }
        $scope.calculate("two");
      } else if (index == 4) {
        $(".thisChange").text("开仓价格");
        if ($scope.type4 === "1") {
          $scope.product4 = "XAUUSD";
        } else if ($scope.type4 === "2") {
          $(".thisChange").text("昨收价格");
          $scope.product4 = "EURUSD";
        } else if ($scope.type4 === "3") {
          $scope.product4 = "HK50";
        } else if ($scope.type4 === "4") {
          $scope.product4 = "BTCUSD";
        } else if ($scope.type4 === "5") {
          $scope.product4 = "BABA";
        } else if ($scope.type4 === "6") {
          $scope.product4 = "00700.HK";
        } else {
          $scope.product4 = "SOYBEAN";
        }
        $scope.product4Changed();
      } else {
        if ($scope.type3 === "1") {
          $scope.product3 = "XAUUSD";
        } else if ($scope.type3 === "2") {
          $scope.product3 = "EURUSD";
        } else if ($scope.type3 === "3") {
          $scope.product3 = "HK50";
        } else if ($scope.type3 === "4") {
          $scope.product3 = "BTCUSD";
        } else if ($scope.type3 === "5") {
          $scope.product3 = "BABA";
        } else if ($scope.type3 === "6") {
          $scope.product3 = "00700.HK";
        } else {
          $scope.product3 = "SOYBEAN";
        }
        $scope.product3Changed();
      }
    };
    $scope.product4Changed();
    $scope.product3Changed();
    $scope.spChanged(1);
    $scope.spChanged(2);
  }
);

$(document).ready(function () {
  // var ok1=false;
  // var resultArray = _.where($scope.data.data2, {key: $scope.product2});
  // var obj = resultArray[0];
  // console.log("objKey",obj.key);

  $("#input2").focus(function () {
    console.log($("#inputPro").val());
  });

  $('input[name="exchange"]')
    .focus(function () {
      // $(this).next().text('输入0.01至100间数值').addClass('state1');
      $(this).next().addClass("state1");
      if (
        $(this)
          .val()
          .search(/^(0|[1-9]|[1-9]\d|100)(\.\d{1,2}|\.{0})$/) == -1
      ) {
        // $(this).next().text('输入0.01至100间数值').removeClass('state1').addClass('state3');
        $(this).next().removeClass("state1").addClass("state3");
      } else {
        // $(this).next().text('输入0.01至100间数值').removeClass('state3').addClass('state1');
        $(this).next().removeClass("state3").addClass("state1");
      }
    })
    .blur(function () {
      if (
        $(this)
          .val()
          .search(/^(0|[1-9]|[1-9]\d|100)(\.\d{1,2}|\.{0})$/) == -1
      ) {
        // $(this).next().text('输入0.01至100间数值').removeClass('state1').addClass('state3');
        $(this).next().removeClass("state1").addClass("state3");
      } else {
        // $(this).next().text('输入0.01至100间数值').removeClass('state3').addClass('state1');
        $(this).next().removeClass("state3").addClass("state1");
        ok4 = true;
      }
    });
  $('input[name="exchange4"]')
    .focus(function () {
      $(this).next().text("输入1至360间数值").addClass("state1");
      if (
        $(this)
          .val()
          .search(/[1-9]{1}[0-9]{0,2}/) == -1
      ) {
        $(this)
          .next()
          .text("输入1至360间数值")
          .removeClass("state1")
          .addClass("state3");
      } else {
        $(this)
          .next()
          .text("输入1至360间数值")
          .removeClass("state3")
          .addClass("state1");
      }
    })
    .blur(function () {
      if (
        $(this)
          .val()
          .search(/[1-9]{1}[0-9]{0,2}/) == -1
      ) {
        $(this)
          .next()
          .text("输入1至360间数值")
          .removeClass("state1")
          .addClass("state3");
      } else {
        $(this)
          .next()
          .text("输入1至360间数值")
          .removeClass("state3")
          .addClass("state1");
        ok4 = true;
      }
    });
  $(".Btn").click(function () {
    if (ok1) {
      $("form").submit();
    } else {
      return false;
    }
  });
});

$(document).ready(function () {
  $(".select").click(function () {
    $(this).addClass("selectactive");
    $(this).siblings().removeClass("selectactive");
  });
});

// <!--判断用户访问机型-->

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
    return false;
  }
}
$(function () {
  if (CheckIsIOS()) {
    $(".ios").show();
    $(".Android").hide();
  }
  if (CheckIsAndroid()) {
    $(".ios").hide();
    $(".Android").show();
  }
});

// <!--手机端出现二维码扫一扫-->

$(function () {
  $(".clickico .Lookcode").click(
    function () {
      $(this).siblings(".code_big").stop(true, true).slideDown(500);
    },
    function () {
      $(this).siblings(".code_big").stop(true, true).slideUp("fast");
    }
  );
});

// <!--交易产品栏对应的产品-->

$(function () {
  $(".sel").change(function () {
    ////alert($(this).get(0).selectedIndex);
    var index = $(this).get(0).selectedIndex;
    $(".sss-" + index)
      .show()
      .siblings(".sss")
      .hide();
  });
});

// <!--input获取焦点 placeholder消失-->
onfocus = "this.placeholder=''"; /*点击的时候文本设置为空*/
onblur = "this.placeholder='0.01'"; /*离开的时候文本显示出来*/

// <!--点数交易判断只能输入0.01至100之间的数值-->

$(document).ready(function () {
  $(".Btninput.one.a").click(function () {
    var exchange1 = $("#input1").val();
    if (exchange1 != null && exchange1 != "") {
      if (exchange1 > 0) {
        return true;
      } else {
        //alert("输入有误，请输入大于0的值");
        return false;
      }
    }
  });
});

$(document).ready(function () {
  $(".Btninput.one.c").click(function () {
    var exchange1 = $("#input5").val();
    if (exchange1 != null && exchange1 != "") {
      if (exchange1 > 0) {
        return true;
      } else {
        //alert("输入有误，请输入大于0的值");
        return false;
      }
    }
  });
});

$(document).ready(function () {
  $(".Btninput.one.c").click(function () {
    var exchange1 = $("#input6").val();
    if (exchange1 != null && exchange1 != "") {
      if (exchange1 > 0) {
        return true;
      } else {
        //alert("输入有误，请输入大于0的值");
        return false;
      }
    }
  });
});

$(document).ready(function () {
  $(".Btninput.one.c").click(function () {
    var exchange1 = $("#exchange1").val();
    if (exchange1 != null && exchange1 != "") {
      if (exchange1 > 0) {
        return true;
      } else {
        //alert("输入有误，请输入大于0的值");
        return false;
      }
    }
  });
});

$(document).ready(function () {
  $(".Btninput.one.c").click(function () {
    var exchange2 = $("#exchange2").val();
    if (exchange2 != null && exchange2 != "") {
      if (exchange2 > 0) {
        return true;
      } else {
        //alert("输入有误，请输入大于0的值");
        return false;
      }
    }
  });
});
