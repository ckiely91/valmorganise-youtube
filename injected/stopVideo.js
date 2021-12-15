(function() {
	console.log('stopping video');
	var player = document.getElementById("player").querySelector("video");
	if (player) {
		player.pause();
	}
})();