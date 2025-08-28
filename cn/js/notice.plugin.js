var cfApp = angular.module('cfApp', []);
cfApp.controller('noticeController', function($scope, $http) {
	
	$scope.type = '';
	$scope.page = 1;
	$scope.size = 7;
	$scope.data = [];
	$scope.showLoadMore = true;
    $scope.types = [
        {key:"0",value:"所有公告"},
        {key:"1",value:"优惠活动"},
        {key:"2",value:"集团公告"},
        {key:"3",value:"交易安排"},
        {key:"4",value:"系统维护"},
        {key:"5",value:"其他公告"},
        {key:"6",value:"重要通知"},
        {key:"7",value:"存取通知"}
    ];
    $scope.type = "0";
	
	
	function init() {
        $scope.getData();
	}
	
	$scope.getData = function() {
		var url = mis_url + '/public/message/findByType?page=' + $scope.page + '&size=' + $scope.size;
		if ($scope.type) {
			url += '&type=' + $scope.type;
		}
		
		$http.get(url).then(function(response) {
			var result = response.data.data;
			for (i = 0; i < result.length; i++) {
				if (jQuery(result[i].message).text()) {
					result[i].message = jQuery(result[i].message).text().replace(/\s/g, "");
				}
			}
			
			if(response.data.data.length < 7) {
				$scope.showLoadMore = false;
			}
			$scope.data = $scope.data.concat(result);
			$scope.page++;
		});
	};
	
	$scope.onTypeChange = function() {
		$scope.data = [];
		$scope.showLoadMore = true;
		$scope.page = 1;
		$scope.getData();
	}
	
	init();
});
