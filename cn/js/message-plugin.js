var cfApp = angular.module('cfApp', []);
cfApp.controller('messageCtrl', function($scope, $http) {
	$scope.onlineResponse = {};
	$scope.onlineResponse.accountname = '';
	$scope.onlineResponse.email = '';
	$scope.onlineResponse.phone = '';
	$scope.onlineResponse.content = '';
	$scope.onlineResponse.tickedReceiveInfo = 1;
	$scope.onlineResponse.type = "OPINION";
	$scope.isSuccess = false;
	$scope.isSubmitted = false;
	$scope.tickedReceiveInfo = true;

    $scope.initTracker = function() {
        var result;
        ga(function(tracker) {
            var clientId = tracker.get('clientId');
            if (typeof clientId==='undefined' || clientId===null){
                clientId = "";
            }
            result = {
                unique : tracker.get('clientId'),
                hostname : window.location.hostname,
                referrer : document.referrer,
                href : window.location.href
            }
        });
        return result;
    }

    $scope.sendNotifyMsg = function(){
        var tracker = $scope.initTracker();
        var obj = {
            "unique":tracker.unique,
            "hostname":tracker.hostname,
            "referrer":tracker.referrer,
            "href":tracker.href,
            "driverType":1,
			"dataType":"5",
            "phone":$scope.onlineResponse.phone,
            "email":$scope.onlineResponse.email
        }

        $.ajax({
            cache: false,
            type: "POST",
            url: mis_url+"/public/userLog/save",
            data: JSON.stringify(obj),
			contentType:"application/json;charset=UTF-8",
			dataType:"json",
            async: false,
            error: function(request) {
                console.log("whiteList phone check error");
            },
            success: function(data) {

            }
        });
	}


	$scope.createMessage = function() {

		if (!$scope.onlineResponseFrm.$valid) {
			return;
		}
		if(!$scope.tickedReceiveInfo){
			return;
		}
        $scope.onlineResponse.tickedReceiveInfo = 1;
		$http.post(
				mis_url + '/public/response/create.json',
            $scope.onlineResponse).success(function(data) {
			$scope.isSubmitted = true;
			$scope.isSuccess = true;
			$scope.onlineResponse = {};
			$scope.onlineResponse.tickedReceiveInfo = 1;
		}).error(function(data) {
			$scope.isSubmitted = true;
			$scope.isSuccess = false;
		});

        $scope.sendNotifyMsg();
	};
});

cfApp.directive('capitalize', function() {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, modelCtrl) {
			var capitalize = function(inputValue) {
				if (inputValue == undefined)
					inputValue = '';
				var capitalized = inputValue.toUpperCase();
				if (capitalized !== inputValue) {
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
				}
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]);
		}
	}
});
