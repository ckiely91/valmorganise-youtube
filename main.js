function stopVideo() {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL("injected/stopVideo.js");
	s.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
}

function startVideo() {
	var q = document.createElement('script');
	q.src = chrome.extension.getURL("injected/startVideo.js");
	q.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(q);
}

function afterNavigate() {
    if ('/watch' === location.pathname) {
        console.log("Watch page!");
        main();
    }
}
(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);
// After page load
afterNavigate();

function main() {
	stopVideo();

	$.get(chrome.extension.getURL('/main.html'), function(data) {
	    $($.parseHTML(data)).appendTo('body');

	    var videoUrl = chrome.extension.getURL('/resources/valmorgan.mp4');
	    var $video = $('#valVideoContainer video'); 
	    $video.attr('src', videoUrl).bind("ended", function() {
	    	$video.animate({opacity: 0}, 1000, function() {
	    		var slide1 = $('#valSlide1');
	    		slide1.css('display', 'block').animate({opacity: 1}, function() {
	    			setTimeout(function() {
	    				$('#valModal').animate({opacity: 0}, 2000, function() {
					  		$('#valModal').remove();
					  		startVideo();
					  	});
	    			}, 4000);
	    		});
	    	});
		});
	});
}