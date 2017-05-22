

//Handle the facebook stuff
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
}

;(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


inputs = {
	down: false
}

$(document)

angular.module('BunBun Bounce', [])

/*The master controller*/
.controller('master', function master($scope) {
	m = $scope

	m.maps = [
		{
			startX: 'center',
			startY: 62,
			objects: [
				{sprite: 'ground_grass_small.png', x: 'center', y: 62 }
			]
		}
	]

	m.game = {
		width: 400,
		height: 711,
		transparent: true
	}

	m.startNewGame = function (map) {
		m.game.map = m.prepareMap(m.maps[map || 0])
		m.player = m.newPlayer(m.game.map)
	}

	m.newPlayer = function (map) {

		var player = {
			x: map.startX,
			y: map.startY,
			jumping: false,
			moving: false,
			direction: true,
			sprites: {
				stand: new PIXI.Sprite(m.game.res['bunny1_stand.png'].texture),
				ready: new PIXI.Sprite(m.game.res['bunny1_ready.png'].texture),
				jump: new PIXI.Sprite(m.game.res['bunny1_jump.png'].texture),
				hurt: new PIXI.Sprite(m.game.res['bunny1_hurt.png'].texture),
				walk1: new PIXI.Sprite(m.game.res['bunny1_walk1.png'].texture),
				walk2: new PIXI.Sprite(m.game.res['bunny1_walk2.png'].texture),
			} 
		}
		
		player.sprite = 'stand'

		player.x = (map.startX  == 'center' ? (m.game.width / 2) - (player.sprites[player.sprite].width / 2) : map.startX)

		for (var i in player.sprites) {
			player.sprites[i].alpha = 0
			map.stage.addChild(player.sprites[i])
		}

		player.sprites[player.sprite].alpha = 1

		return player

	}

	m.prepareMap = function (map) {
		map = JSON.parse(JSON.stringify(map))
		map.stage = new PIXI.Container()
		for (var i in map.objects) {
			map.objects[i].sprite = new PIXI.Sprite(m.game.res[map.objects[i].sprite].texture)
			map.objects[i].x = (map.objects[i].x  == 'center' ? (m.game.width / 2) - (map.objects[i].sprite.width / 2) : map.objects[i].x)
			console.log(map.objects[i].x)
			//map.objects[i].Y = map.objects[i].y
			map.stage.addChild(map.objects[i].sprite)
		}
		return map
	}

	m.playerUpdate = function () {
		/*Update which sprite to use*/
		if (!!m.player.jumping) m.player.sprite = 'jump'
		else m.player.sprite = 'stand'

		/*Update sprite positions and visibility*/
		for (var i in m.player.sprites) {
			if (m.player.sprite != i) m.player.sprites[i].alpha = 0
			else m.player.sprites[i].alpha = 1
			m.player.sprites[m.player.sprite].y = ((m.game.height) - m.player.y) - m.player.sprites[m.player.sprite].height
			m.player.sprites[m.player.sprite].x = (m.player.x)

		}
	}

	m.loop = function () {

		if (m.game && m.game.map && m.game.map.stage) {

			/*Game objects and stage*/
			for (var i in m.game.map.objects) {
				m.game.map.objects[i].sprite.y = m.game.height - m.game.map.objects[i].y
				m.game.map.objects[i].sprite.x = m.game.map.objects[i].x

			}

			/*Player*/
			m.playerUpdate()

			m.game.app.render(m.game.map.stage)
		}
		requestAnimationFrame(m.loop)
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

		m.game.app = new PIXI.autoDetectRenderer(m.game)

		m.game.stage = new PIXI.Container()

		element.append(m.game.app.view)

		var loader = PIXI.loader
		
		loader.add([
			'sys/img/assets/bg_layer1.png',
			'sys/img/assets/bg_layer2.png',
			'sys/img/assets/bg_layer3.png',
			'sys/img/assets/bg_layer4.png',
			'sys/img/assets/bronze_1.png',
			'sys/img/assets/bronze_2.png',
			'sys/img/assets/bronze_3.png',
			'sys/img/assets/bronze_4.png',
			'sys/img/assets/bubble.png',
			'sys/img/assets/bunny1_hurt.png',
			'sys/img/assets/bunny1_jump.png',
			'sys/img/assets/bunny1_ready.png',
			'sys/img/assets/bunny1_stand.png',
			'sys/img/assets/bunny1_walk1.png',
			'sys/img/assets/bunny1_walk2.png',
			'sys/img/assets/bunny2_hurt.png',
			'sys/img/assets/bunny2_jump.png',
			'sys/img/assets/bunny2_ready.png',
			'sys/img/assets/bunny2_stand.png',
			'sys/img/assets/bunny2_walk1.png',
			'sys/img/assets/bunny2_walk2.png',
			'sys/img/assets/cactus.png',
			'sys/img/assets/carrot.png',
			'sys/img/assets/carrots.png',
			'sys/img/assets/carrot_gold.png',
			'sys/img/assets/cloud.png',
			'sys/img/assets/coin_bronze.png',
			'sys/img/assets/coin_gold.png',
			'sys/img/assets/coin_silver.png',
			'sys/img/assets/flame.png',
			'sys/img/assets/flyMan_fly.png',
			'sys/img/assets/flyMan_jump.png',
			'sys/img/assets/flyMan_stand.png',
			'sys/img/assets/flyMan_still_fly.png',
			'sys/img/assets/flyMan_still_jump.png',
			'sys/img/assets/flyMan_still_stand.png',
			'sys/img/assets/gold_1.png',
			'sys/img/assets/gold_2.png',
			'sys/img/assets/gold_3.png',
			'sys/img/assets/gold_4.png',
			'sys/img/assets/grass1.png',
			'sys/img/assets/grass2.png',
			'sys/img/assets/grass_brown1.png',
			'sys/img/assets/grass_brown2.png',
			'sys/img/assets/ground_cake.png',
			'sys/img/assets/ground_cake_broken.png',
			'sys/img/assets/ground_cake_small.png',
			'sys/img/assets/ground_cake_small_broken.png',
			'sys/img/assets/ground_grass.png',
			'sys/img/assets/ground_grass_broken.png',
			'sys/img/assets/ground_grass_small.png',
			'sys/img/assets/ground_grass_small_broken.png',
			'sys/img/assets/ground_sand.png',
			'sys/img/assets/ground_sand_broken.png',
			'sys/img/assets/ground_sand_small.png',
			'sys/img/assets/ground_sand_small_broken.png',
			'sys/img/assets/ground_snow.png',
			'sys/img/assets/ground_snow_broken.png',
			'sys/img/assets/ground_snow_small.png',
			'sys/img/assets/ground_snow_small_broken.png',
			'sys/img/assets/ground_stone.png',
			'sys/img/assets/ground_stone_broken.png',
			'sys/img/assets/ground_stone_small.png',
			'sys/img/assets/ground_stone_small_broken.png',
			'sys/img/assets/ground_wood.png',
			'sys/img/assets/ground_wood_broken.png',
			'sys/img/assets/ground_wood_small.png',
			'sys/img/assets/ground_wood_small_broken.png',
			'sys/img/assets/jetpack.png',
			'sys/img/assets/jetpack_item.png',
			'sys/img/assets/lifes.png',
			'sys/img/assets/lighting_blue.png',
			'sys/img/assets/lighting_yellow.png',
			'sys/img/assets/mushroom_brown.png',
			'sys/img/assets/mushroom_red.png',
			'sys/img/assets/particle_beige.png',
			'sys/img/assets/particle_blue.png',
			'sys/img/assets/particle_brown.png',
			'sys/img/assets/particle_darkBrown.png',
			'sys/img/assets/particle_darkGrey.png',
			'sys/img/assets/particle_green.png',
			'sys/img/assets/particle_grey.png',
			'sys/img/assets/particle_pink.png',
			'sys/img/assets/portal_orange.png',
			'sys/img/assets/portal_orangeParticle.png',
			'sys/img/assets/portal_yellow.png',
			'sys/img/assets/portal_yellowParticle.png',
			'sys/img/assets/powerup_bubble.png',
			'sys/img/assets/powerup_bunny.png',
			'sys/img/assets/powerup_empty.png',
			'sys/img/assets/powerup_jetpack.png',
			'sys/img/assets/powerup_wings.png',
			'sys/img/assets/silver_1.png',
			'sys/img/assets/silver_2.png',
			'sys/img/assets/silver_3.png',
			'sys/img/assets/silver_4.png',
			'sys/img/assets/smoke.png',
			'sys/img/assets/spikeBall1.png',
			'sys/img/assets/spikeBall_2.png',
			'sys/img/assets/spikeMan_jump.png',
			'sys/img/assets/spikeMan_stand.png',
			'sys/img/assets/spikeMan_walk1.png',
			'sys/img/assets/spikeMan_walk2.png',
			'sys/img/assets/spikes_bottom.png',
			'sys/img/assets/spikes_top.png',
			'sys/img/assets/spike_bottom.png',
			'sys/img/assets/spike_top.png',
			'sys/img/assets/spring.png',
			'sys/img/assets/springMan_hurt.png',
			'sys/img/assets/springMan_stand.png',
			'sys/img/assets/spring_in.png',
			'sys/img/assets/spring_out.png',
			'sys/img/assets/sun1.png',
			'sys/img/assets/sun2.png',
			'sys/img/assets/wingMan1.png',
			'sys/img/assets/wingMan2.png',
			'sys/img/assets/wingMan3.png',
			'sys/img/assets/wingMan4.png',
			'sys/img/assets/wingMan5.png',
			'sys/img/assets/wing_left.png',
			'sys/img/assets/wing_right.png'
		])
		
		loader.load()
		loader.once('complete', function(loader, res) {
			m.game.res = {}
			for (var i in res) {
				m.game.res[i.replace('sys/img/assets/', '')] = res[i]
			}


			m.startNewGame()
			m.loop()
		})


	}
})
