(function(angular) {
	'use strict';
	// Declare app level module which depends on views, and components
	angular.module('moviecat', [
			'ngRoute',
			'moviecat.movie_detail',
			'moviecat.movie_list'
			// 'moviecat.in_theaters',
			// 'moviecat.coming_soon',
			// 'moviecat.top250'
		])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({
				redirectTo: '/in_theaters/1'
			})
		}])
		.controller('navCtrl',['$scope','$location',function($scope,$location){
			$scope.$location = $location; //在$scope中再暴露一个变量用来存储$location对象，这样就可以监视它了
			$scope.$watch('$location.path()', function(now) {
				if(now.startsWith('/in')){
					$scope.type = 'in';
				}else if(now.startsWith('/com')){
					$scope.type = 'com';
				}else if(now.startsWith('/top')){
					$scope.type = 'top';
				}else if(now.startsWith('/us')){
					$scope.type = 'us';
				}else{
					$scope.type = '';
				}
			});
		}])
		.controller('searchCtrl',['$scope','$route',function($scope,$route){
			$scope.input = '';
			$scope.search = function(){
				$route.updateParams({
					category:'search',
					q:$scope.input
				})
			}
		}])
		;
})(angular)