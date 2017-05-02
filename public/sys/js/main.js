window.fbAsyncInit = function() {
	FB.init({
		appId      : '264455320692180',
		xfbml      : true,
		version    : 'v2.9'
	});

// ADD ADDITIONAL FACEBOOK CODE HERE
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



angular.module('BunBun Bounce', [])

/*The master controller*/
.controller('master', function master($scope) {
	m = $scope
})

/*Turns off the ng-scope, et al. debug classes*/
.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}])


/*Directives*/
.directive('touch', function () {
	return function (scope, element, attrs) {
		element.bind('pointerdown', function () {
			try {
				scope.$apply(attrs.touch)
			} catch (e) {
				if (typeof console !== "object") console.log(e)
			}
		})
	}
})
