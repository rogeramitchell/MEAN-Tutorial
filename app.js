var app = angular.module('flapperNews', []);

app.factory('posts', [function() {
	var o = {
		posts: []
	};
	return o;
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
				upvotes: 0
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