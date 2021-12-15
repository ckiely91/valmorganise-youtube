(function() {
	console.log('starting video');
	var player = document.getElementById("player").querySelector("video");
	if (player) {
		player.play();
	}
})();