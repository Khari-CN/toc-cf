var cfApp = angular.module('cfApp', []);
cfApp.controller('cfpiController', function($scope, $http) {
	$scope.onlineResponse = {};
	$scope.onlineResponse.accountname = '';
	$scope.onlineResponse.email = '';
	$scope.onlineResponse.phone = '';
	$scope.onlineResponse.content = '参考'+ CF_TEXT+'多空综合指标教学';
	$scope.onlineResponse.tickedReceiveInfo = 1;
	$scope.onlineResponse.type =  "SUBSCRIPTION";	
	$scope.showError = false;
	$scope.showSuccess = false;
	$scope.showButton = true;
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
            "dataType":"4",
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
	
	$scope.submit = function() {	
		if(isValidated()) {

            if(!$scope.tickedReceiveInfo){
                return;
            }

			$scope.showButton = false;

            $scope.onlineResponse.tickedReceiveInfo = 1;

			$http.post(mis_url + '/public/response/create.json', $scope.onlineResponse)
			.success(function(data) {
				$scope.showError = false;
				$scope.showSuccess = true;
				$scope.onlineResponse.accountname = '';
				$scope.onlineResponse.email = '';
				$scope.onlineResponse.phone = '';

			})
			.error(function (data) {
				$scope.showError = true;
				$scope.showSuccess = false;				
			});
            $scope.sendNotifyMsg();
		}
		return false;
    };
    
    function isValidated() {
    	if(!$scope.onlineResponse.accountname) {
    		$('#name-err').show();
    		return false;
    	} 
    	
    	if(!$scope.onlineResponse.phone) {
    		$('#phone-err').show();
    		return false;
    	} 
    	
    	if(!$scope.onlineResponse.email) {
    		$('#email-err').show();
    		return false;
    	} 
    	
    	if($('#name-err').is(":visible") || $('#phone-err').is(":visible") || $('#email-err').is(":visible")) {
    		return false;
    	}
    	return true;
    }
});
