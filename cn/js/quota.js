(function() {
	// 返回顶部
	function goTop() {
		var backtop = document.querySelector(".backtop"), timer = null;

		backtop.onclick = function() {
			timer = setInterval(
					function() {
						var scrollTop = document.documentElement.scrollTop
								|| document.body.scrollTop, speed = Math
								.ceil(scrollTop / 8);
						if (scrollTop > 0) {
							document.documentElement.scrollTop = document.body.scrollTop = scrollTop
									- speed;
						} else {
							clearInterval(timer);
						}
					}, 30);
		}
	}
	// 添加类
	function addClass(obj, cls) {
		if (!this.hasClass(obj, cls))
			obj.className += " " + cls;
	}
	// 删除类
	function removeClass(obj, cls) {
		if (hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, '');
		}
	}
	// 判断是否含有类
	function hasClass(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
	// Fuction Click Tabs
	function clickTabbs(idTab) {
		var x = $(idTab);
		// console.log(x);
		var y = x.find('li');
		$(y).click(
				function(event) {
					event.preventDefault();
					var index = $(this).index();
					index += 1;
					if (index == 5) {
						console.log("5");
						$(this).siblings().removeClass('active');
						$(this).addClass('active');
						var z = $(this).closest(".quote-nav").next().find(
								$(".quote-container"));
						z.fadeIn(350, "swing");
						z.siblings().removeClass('hide');
					} else {
						event.preventDefault();
						$(this).siblings().removeClass('active');
						$(this).addClass('active');
						var z = $(this).closest(".quote-nav").next().find(
								$("#content" + index));
						z.fadeIn(350, "swing").removeClass('hide');
						z.siblings().removeClass('show').hide();
					}

				});
	}

	$(document).ready(function() {
		goTop();
		clickTabbs(".quote-nav");
	});
})(jQuery);

// angular js
var cfApp = angular.module('cfApp', []);
cfApp.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});

cfApp.filter('limitTo', function ($filter) {
    return function (input, places) {
    	var fraction = places - input.toString().replace("-", "").split(".")[0].length;
        if (isNaN(input) || fraction < 1) return input;        
                
        var factor = "1" + Array(+(fraction > 0 && fraction + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});

cfApp.controller('quoteCtrl', function($scope, $http, $timeout,$filter,$log) {

	// const
    $scope.quote = {};
    $scope.quote.commodity = ["NGAS","BF","BG","BH","BJ","BK","BM","BN","BQ","BU","BV","BX","BZ","CLF","CLG","CLH","CLJ","CLK","CLM","CLN","CLQ","CLU","CLV","CLX","CLZ","UKOil","USOil" ];
    $scope.quote.exchange = [ "AUDJPY","AUDNZD","AUDUSD","CADJPY","EURAUD","EURCHF","EURGBP","EURJPY","EURUSD","GBPAUD","GBPCHF","GBPJPY","GBPUSD","NZDJPY","NZDUSD","USDCAD","USDCHF","USDCNH","USDJPY","HKDCNH" ];
    $scope.quote.stock = [ "FRA40","GER30","UK100","China","A50","CHINA300","DJ30","FTSE","CHINA","A50","HK50","JPN225","SP500","Tech100" ];
    $scope.quote.metal = [ "XAGUSD","XAUUSD","XAUCNH","XAGCNH" ];
    var digits={"NGAS":{"pip":"2","digit":"4"},"FRA40":{"pip":"1","digit":"1"},"GER30":{"pip":"1","digit":"1"},"UK100":{"pip":"1","digit":"1"},"AUDJPY":{"pip":"2","digit":"3"},"CLV":{"pip":"2","digit":"3"},"CHINA300":{"pip":"1","digit":"1"},"HKDCNH":{"pip":"4","digit":"5"},"BQ":{"pip":"2","digit":"3"},"JPN225":{"pip":"0","digit":"1"},"USDX":{"pip":"1","digit":"2"},"EURUSD":{"pip":"4","digit":"5"},"NZDJPY":{"pip":"2","digit":"3"},"CLX":{"pip":"2","digit":"3"},"USDCNY":{"pip":"4","digit":"5"},"BU":{"pip":"2","digit":"3"},"HK50":{"pip":"0","digit":"1"},"USOil":{"pip":"2","digit":"3"},"FTSE CHINA A50":{"pip":"1","digit":"1"},"USDJPY":{"pip":"2","digit":"3"},"CADJPY":{"pip":"2","digit":"3"},"CLZ":{"pip":"2","digit":"3"},"XAUUSD":{"pip":"2","digit":"2"},"USDHKD":{"pip":"4","digit":"5"},"BV":{"pip":"2","digit":"3"},"UKOil":{"pip":"2","digit":"3"},"Tech100":{"pip":"2","digit":"3"},"China A50":{"pip":"0","digit":"1"},"GBPUSD":{"pip":"4","digit":"5"},"EURGBP":{"pip":"4","digit":"5"},"XAGUSD":{"pip":"2","digit":"3"},"BX":{"pip":"2","digit":"3"},"USDCHF":{"pip":"4","digit":"5"},"EURCHF":{"pip":"4","digit":"5"},"BZ":{"pip":"2","digit":"3"},"AUDUSD":{"pip":"4","digit":"5"},"EURAUD":{"pip":"4","digit":"5"},"SP500":{"pip":"2","digit":"3"},"NZDUSD":{"pip":"4","digit":"5"},"CLM":{"pip":"2","digit":"3"},"GBPCHF":{"pip":"4","digit":"5"},"USDCAD":{"pip":"4","digit":"5"},"CLN":{"pip":"2","digit":"3"},"GBPAUD":{"pip":"4","digit":"5"},"DJ30":{"pip":"0","digit":"1"},"EURJPY":{"pip":"2","digit":"3"},"CLQ":{"pip":"2","digit":"3"},"AUDNZD":{"pip":"4","digit":"5"},"BM":{"pip":"2","digit":"3"},"GBPJPY":{"pip":"2","digit":"3"},"CLU":{"pip":"2","digit":"3"},"USDCNH":{"pip":"4","digit":"5"},"BN":{"pip":"2","digit":"3"},"CLWTI":{"pip":"1","digit":"2"},"CLF":{"pip":"2","digit":"3"},"CLG":{"pip":"2","digit":"3"},"CLH":{"pip":"2","digit":"3"},"CLJ":{"pip":"2","digit":"3"},"CLK":{"pip":"2","digit":"3"},"BF":{"pip":"2","digit":"3"},"BG":{"pip":"2","digit":"3"},"BH":{"pip":"2","digit":"3"},"BJ":{"pip":"2","digit":"3"},"BK":{"pip":"2","digit":"3"},"XAUCNH":{"pip":"2","digit":"2"},"XAGCNH":{"pip":"0","digit":"0"}};

	var wealthyStock = [];

	// variables
	$scope.updatedDate;
	$scope.data;
	var oldData = [];
	

	$scope.init = function() {
		$scope.getData();
		$scope.getWealthy();	
	};
	
	$scope.getWealthy = function() {
		$http.get(
				api_url + '/public/stock/wealthy')
				.then(function(response) {
			wealthyStock = response.data;
		});
	}

	$scope.getData = function() {

		$http.get(
				api_url	+ '/public/marketprice/cf.json').then(
				function(response) {
					oldData = $scope.data || [];
					$scope.updatedDate = new Date();
					$scope.data = response.data;
					
					for(i=0;i<$scope.data.length;i++){
						var m = $scope.data[i].symbol.match(/([a-z\s+A-Z]{2,}\d{2,})|([a-zA-Z]{2,})/);						
						 if (m != null){
							 if(digits[m[0]]==null){
								//  console.log( $scope.data[i].name);
								 continue;
							 }
//							 console.log( $scope.data[i].name + " "+digits[m[0]].digit);
							 
							 var pip = digits[m[0]].pip;		
							 $scope.data[i].spread =  Math.abs(($scope.data[i].bid-$scope.data[i].ask))*Math.pow(10, pip);
							 
							 var digit = digits[m[0]].digit;		
							 $scope.data[i].bid =  $scope.data[i].bid.toFixed(digit);
							 $scope.data[i].ask =  $scope.data[i].ask.toFixed(digit);
							 $scope.data[i].change =  $scope.data[i].change.toFixed(digit);
							 $scope.data[i].high =  $scope.data[i].high.toFixed(digit);
							 $scope.data[i].start = $scope.data[i].start.toFixed(digit);
							 $scope.data[i].low = $scope.data[i].low.toFixed(digit);
							 $scope.data[i].preclose =  $scope.data[i].preclose.toFixed(digit);
							 
							
							 
						 }

						 
						// wealthy
						if (isWealthy($scope.data[i].symbol)) {
							$scope.data[i].wealthyCSSClass = "blink";
						} else {
							$scope.data[i].wealthyCSSClass = "";
						}

						if (["SP500", "USDCNH","XAGCNH", "NGAS"].includes($scope.data[i].symbol)) {
							console.log("here1")
							$scope.data[i].listClass = "last"
						} else {
							$scope.data[i].listClass = ""
						}
					}
					
					checkDiff();
					$timeout($scope.getData, 5000);
				});
	};

	$scope.getCssClass = function(row) {
		if (row.change < 0.) {
			return "down";
		}
		if (row.change > 0.) {
			return "up";
		}
		return "";
	};

	$scope.isCommodity = function(symbol) {
		symbol = symbol.trim();
		return $scope.quote.commodity.indexOf(symbol) !== -1
			|| $scope.quote.commodity.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
			|| $scope.quote.commodity.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1;
	};

	$scope.isExchange = function(symbol) {
		symbol = symbol.trim();
		return $scope.quote.exchange.indexOf(symbol) !== -1
			|| $scope.quote.exchange.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
			|| $scope.quote.exchange.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1;		
	};

	$scope.isStock = function(symbol) {
		symbol = symbol.trim();
		return $scope.quote.stock.indexOf(symbol) !== -1
			|| $scope.quote.stock.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
			|| $scope.quote.stock.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1;	
		
	};

	$scope.isMetal = function(symbol) {
		symbol = symbol.trim();
		return $scope.quote.metal.indexOf(symbol) !== -1
			|| $scope.quote.metal.indexOf(symbol.substring(0, symbol.length - 1)) !== -1
			|| $scope.quote.metal.indexOf(symbol.substring(0, symbol.indexOf('('))) !== -1;		
	};
	
	function isWealthy(symbol) {
		return wealthyStock.indexOf(symbol.trim()) !== -1;
	};

	// init data
	$scope.init();
	function checkDiff() {
		var length = oldData.length;
		if ($scope.data.length < length) {
			length = $scope.data.length;
		}

		for (var i = 0; i < length; i++) {

			// bid
			if ($scope.data[i].bid === oldData[i].bid) {
				$scope.data[i].bidCSSClass = "equal";
			} else if ($scope.data[i].bid > oldData[i].bid) {
				$scope.data[i].bidCSSClass = "up";
			} else {
				$scope.data[i].bidCSSClass = "down";
			}
			
			// ask
			if ($scope.data[i].ask === oldData[i].ask) {
				$scope.data[i].askCSSClass = "equal";
			} else if ($scope.data[i].ask > oldData[i].ask) {
				$scope.data[i].askCSSClass = "up";
			} else {
				$scope.data[i].askCSSClass = "down";
			}
			
			// change
			if ($scope.data[i].change === 0) {
				$scope.data[i].changeCSSClass = "equal";
			} else if ($scope.data[i].change > 0) {
				$scope.data[i].changeCSSClass = "up-i";
			} else {
				$scope.data[i].changeCSSClass = "down-i";
			}
			
			// amplitude
			if ($scope.data[i].amplitude === 0) {
				$scope.data[i].amplitudeCSSClass = "equal";
			} else if ($scope.data[i].amplitude > 0) {
				$scope.data[i].amplitudeCSSClass = "up-i";
			} else {
				$scope.data[i].amplitudeCSSClass = "down-i";
			}
		}
	}
	;

});
// end angular js

