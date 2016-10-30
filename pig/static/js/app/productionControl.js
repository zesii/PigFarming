var app = angular
	.module(
		'productionControl', ['ngRoute'],
		function($httpProvider) { // ngRoute引入路由依赖
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

			$httpProvider.defaults.transformRequest = [function(data) {
				var param = function(obj) {
					var query = '';
					var name, value, fullSubName, subName, subValue, innerObj, i;

					for(name in obj) {
						value = obj[name];

						if(value instanceof Array) {
							for(i = 0; i < value.length; ++i) {
								subValue = value[i];
								fullSubName = name + '[' + i + ']';
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += param(innerObj) + '&';
							}
						} else if(value instanceof Object) {
							for(subName in value) {
								subValue = value[subName];
								fullSubName = name + '[' + subName +
									']';
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += param(innerObj) + '&';
							}
						} else if(value !== undefined &&
							value !== null) {
							query += encodeURIComponent(name) + '=' +
								encodeURIComponent(value) + '&';
						}
					}

					return query.length ? query.substr(0,
						query.length - 1) : query;
				};

				return angular.isObject(data) &&
					String(data) !== '[object File]' ? param(data) :
					data;
			}];
		});

app.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeSuccess', function(evt, next, previous) {
		console.log('路由跳转成功');
		$rootScope.$broadcast('reGetData');
	});
}]);

// 路由配置
app
	.config([
		'$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when(
					'/pigFarmManagement', {
						templateUrl: '/static/html/productionControl/articalList.html',
						controller: 'productionControlController'
					})
				.when(
					'/BreedManagement', {
						templateUrl: '/static/html/productionControl/articalList.html',
						controller: 'productionControlController'
					})
				.when(
					'/feedManagement', {
						templateUrl: '/static/html/productionControl/articalList.html',
						controller: 'productionControlController'
					})
				.when(
					'/dailyManagement', {
						templateUrl: '/static/html/productionControl/articalList.html',
						controller: 'productionControlController'
					})
				.when(
					'/articalDetail', {
						templateUrl: '/static/html/productionControl/articalDetail.html',
						controller: 'productionControlController'
					})
                .when(
					'/chartPage', {
						templateUrl: '/static/html/productionControl/chartPage.html',
						controller: 'productionControlController'
					})
		}
	]);
app.constant('baseUrl', '/static/');
app.factory('services', ['$http', 'baseUrl', function($http, baseUrl) {
	var services = {};
	services.add = function(data) {
		console.log("请求数据"+JSON.stringify(data));
		return $http({
			method: 'get',
			url: '/pig/',
			params: data
		});
	};

    //获取K线图所需的数据
	services.getData = function(){
		return $http({
			method: 'get',
			url: '/pig/getData/'
		});
	}

	return services;
}]);

app.controller('productionControlController', [
	'$scope',
	'services',
	'$location',
	function($scope, services, $location) {
		// 养殖
		var productionControl = $scope;

		// 获取欠款合同
		productionControl.add = function() {
			services.add({
                'a':2,
                'b':3
            }).success(function(data) {
				console.log("返回数据"+data);
				productionControl.value1 = data;
			});
		};
		// 获取逾期合同

		// 初始化页面信息
		function initData() {
			console.log("初始化页面信息");

			if($location.path().indexOf('/pigFarmManagement') == 0) { // 如果是合同列表页
				productionControl.articals = [{
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/pigs.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 ，水涨起来了，太阳小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/pigs.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一起来了，水涨起来了，太阳了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/pigs.jpg"
				}];
			} else if($location.path().indexOf('/BreedManagement') == 0) {
				productionControl.articals = [{
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p2.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p2.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p2.jpg"
				}];
			} else if($location.path().indexOf('/feedManagement') == 0) {
				productionControl.articals = [{
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p3.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p3.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p3.jpg"
				}];
			} else if($location.path().indexOf('/dailyManagement') == 0) {
				productionControl.articals = [{
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p4.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p4.jpg"
				}, {
					title: "生产现状",
					releaseTime: "2016-10-15",
					abstrat: "盼望着，盼望着，东风来了，春天的脚步近了。 一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。 小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。",
					imgUrl: "../../images/p4.jpg"
				}];
			} else if($location.path().indexOf('/articalDetail') == 0) {
				productionControl.artical = {
					title: "半仙他哥的养猪计划",
					releaseTime: "2016-10-15",
					clickTimes: 3000,
					detail: "一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土地里钻出来， 嫩嫩的， 绿绿的。 园子里， 田野里， 瞧去， 一大片一大片满是的。 "
				}
			} else if($location.path().indexOf('/chartPage') == 0) {
				services.getData().success(function(data) {
                    console.log(data);
					var dataArray = data;
					var initData = {
						title:'Monthly Average Temperature',
						subtitle:'Source: WorldClimate.com',
						//xScale:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','lyy', 'Nov', 'Dec'],
						yTitle:'Temperature (°C)',
						valueSuffix:'°C',
						series: {name:'Beijing',data:dataArray
//						[
//							[1370217600000,0.7495],
//							[1370304000000,0.7455],
//							[1370476800000,0.7635],
//							[1370563200000,0.7655],
//							[1370736000000,0.7395],
//							[1370822400000,0.7595],
//							[1370908800000,0.7295],
//							[1370995200000,0.7595]
//						]
						}
					}
					var chart = new Chart(initData);
					chart.init();
				});

		    }
		}
		initData();

	}
]);

// 合同状态过滤器
/*
app.filter('conState', function() {
	return function(input) {
		var state = "";
		if(input == "0")
			state = "在建";
		else if(input == "1")
			state = "竣工";
		else if(input == "2")
			state = "停建";
		return state;
	}
});*/