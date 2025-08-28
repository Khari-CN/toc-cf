var cfApp = angular.module('cfApp', []);
cfApp.controller('noticeDetailsController', function($scope, $http, $location, $sce) {
	
	$scope.data;
	$scope.others;
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
	
	
	function init() {
        $scope.getData();
	}
	
	$scope.getData = function() {
		$('html, body').animate({ scrollTop: $('.main-content').offset().top }, 'slow');
		var url =mis_url + '/public/message/' + $location.url().substring(1);
		$http.get(url).then(function(response) {
			$scope.data = response.data;
			$scope.data.message = $sce.trustAsHtml($scope.data.message);
		});
		
		url = mis_url + '/public/message/others/' + $location.url().substring(1);
		$http.get(url).then(function(response) {
			$scope.others = response.data;
		});
	};
		
	init();
});
