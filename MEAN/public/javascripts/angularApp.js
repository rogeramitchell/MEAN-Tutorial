var app = angular.module('flapperNews', ['ui-router']);

app.factory('posts', ['$http', function($http) {
	var o = {
		posts: []
	};

	o.getAll = function() {
		return $http.get('/posts').success(function(data) {
			angular.copy(data, o.posts);
		});
	};

	return o;
}]);

app.config([
	'$stateProvider',
	'$urlRouteProvider',
	function($stateProvider, $urlRouteProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl',
				resolve: {
					postPromise: ['posts', function(posts) {
						return posts.getAll();
					}]
				}
			});

			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl'
			});
		$urlRouteProvider.otherwise('home');
}]);

app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts) {
		$scope.test = 'Hello world!';
		$scope.posts = posts.posts;

		$scope.posts = [
			{title: 'post 1', upvotes: 5},
			{title: 'post 2', upvotes: 3},
			{title: 'post 3', upvotes: 14},
			{title: 'post 4', upvotes: 9},
			{title: 'post 5', upvotes: 12}
		];

		$scope.addPost = function() {
			if(!$scope.title || $scope.title === '') {return; }
			$scope.posts.push({
				title: $scope.title, 
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Simpsons did it!', upvotes: 0},
					{author: 'Susan', body: 'cool stuff!', upvotes: 0}
				]
			});
			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		};

		$scope.decrementUpvotes = function(post) {
			if(post.upvotes == 0) {return; }
			post.upvotes -= 1;
		};
	}]);

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function() {
			if($scope.body ==== '') {return; }
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};
}]);

























