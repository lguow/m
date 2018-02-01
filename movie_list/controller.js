(function(angular) {
	'use strict';
	//创建正在热映模块　并配置了此模块的 路由 和 控制器
	angular.module('moviecat.movie_list', ['ngRoute', 'movie.services.http'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'movieListCtrl'
		});
	}])

	.controller('movieListCtrl', [
		'$scope',
		'$route',
		'$routeParams',
		'httpServices',
		function($scope, $route, $routeParams, httpServices) {
			//控制器　分两步：1.设计暴露的数据;　2.设计暴露的行为
			var count = 10; //每一页条数
			var page = parseInt($routeParams.page); //接收的当前第几页
			var start = (page - 1) * count; //当前页开始id
			$scope.subjects = [];
			$scope.title = '';
			$scope.message = '';
			$scope.total = null;
			$scope.totalPages = '';
			//$routeParams 有两个数据来源　1.$routeProvider.when('/:category/:page', ...匹配出来的
			//2.地址中？号后面的
			httpServices.jsonp('https://api.douban.com/v2/movie/'+$routeParams.category, {
					start: start,
					count: count,
					q:$routeParams.q 
				},
				function(data) {
					$scope.subjects = data.subjects;
					$scope.title = data.title;
					$scope.total = data.total;
					$scope.totalPages = Math.ceil($scope.total / count);
					if (page >= 1 && page <= $scope.totalPages) {
						$scope.currentPage = page
					} else {
						$scope.total = 0;
						$scope.currentPage = 0;
					}
					$scope.$apply();
				});
			//分页
			$scope.go = function(page) {
				//修改路由
				if (page >= 1 && page <= $scope.totalPages) {
					$route.updateParams({
						page: page
					})
				}

			}
		}
	]);
})(angular)

