(function(angular) {
	angular.module('movie.services.http', [])
		.service('httpServices', ['$document', '$window', function($document, $window) {
			this.jsonp = function(url, data, callback) {
				//3.创建回调函数
				var cbFunName = 'cb' + Math.floor((Math.random() * 10000) + 1);

				//angular中的$window与window对象一样,但$document和document不一样，$document[0]=document
				$window[cbFunName] = function(data) {
					callback(data);
					//6.从html中删除添加的那个jsonp
					document.body.removeChild(scriptEle);
				};
				//1.接收参数，并解析为url
				var datas = '';
				for (var key in data) {
					datas += key + '=' + data[key] + '&'
				}
				//2.拼接url
				var url = url + '?' + datas + 'callback=' + cbFunName;
				//4.创建script标签
				var scriptEle = $document[0].createElement('script');
				scriptEle.src = url;
				//5.添加到html中
				$document[0].body.appendChild(scriptEle);
			}
		}])
})(angular)