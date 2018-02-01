(function(angular) {
	'use strict';
	//创建正在热映模块　并配置了此模块的 路由 和 控制器
	angular.module('moviecat.movie_detail', ['ngRoute', 'movie.services.http'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/subject/:id', {
				templateUrl: 'movie_detail/view.html',
				controller: 'movieDetailCtrl'
			});
		}])
	.controller('movieDetailCtrl', [
		'$scope',
		'$route',
		'$routeParams',
		'httpServices',
		function($scope, $route, $routeParams, httpServices) {
			$scope.data = {};
			$scope.loading = true;
			httpServices.jsonp('https://api.douban.com//v2/movie/subject/' + $routeParams.id, {},
				function(data) {
					$scope.data = data;
					$scope.loading = false;
					$scope.$apply();
				});
		}
	]);
})(angular)