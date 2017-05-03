window.fbAsyncInit = function() {
	FB.init({
		appId      : '264455320692180',
		xfbml      : true,
		version    : 'v2.9'
	});



	function onLogin(response) {
	  if (response.status == 'connected') {
	    FB.api('/me?fields=first_name', function(data) {
	    	m.game.player = data
	    	m.$applyAsync()
	    });
	  }
	}

	FB.getLoginStatus(function(response) {
	  // Check login status on load, and if the user is
	  // already logged in, go directly to the welcome message.
	  if (response.status == 'connected') {
	    onLogin(response);
	  } else {
	    // Otherwise, show Login dialog first.
	    FB.login(function(response) {
	      onLogin(response);
	    }, {scope: 'user_friends, email'});
	  }
	});






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


	m.game = {
		width: 400,
		height: 711,
	}

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

/*Directives*/
.directive('canvas', function () {
	return function (scope, element, attrs) {
		console.log(123)
		m.game.app = new PIXI.Application(m.game)
		element.append(m.game.app.view)

		var loader = PIXI.loader
		
		loader.add('sprites', 'sys/img/assets/sprites.json')
		
		loader.load(function(loader, res) {
			m.game.res = res
			m.game.sprites = {}
			/*for (res.) {

			}*/
		})


	}
})
