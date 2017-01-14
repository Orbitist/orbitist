$(document).ready(function() {

	var has_touch = 'ontouchstart' in document.documentElement;
	var accX, accY, width, height, xA, yA, movement;

	if(has_touch || screen.width <= 699) {

		// (resize = function() {
    //
		// 	height = $(window).height();
		// 	width = $(window).width();
    //
		// 	$('.hero').width(width).height(height);
    //
    //
		// })();

		window.ondevicemotion = function(event) {

		    accX = -event.accelerationIncludingGravity.x * 20; // -100 to 0
		    accY = -event.accelerationIncludingGravity.y * 20;

		    xA = accX + 50;
		    yA = accY + 50;

        if (xA > 100){xA = 100};
        if (xA < 0){xA = 0};

        if (yA > 100){yA = 100};
        if (yA < 0){yA = 0};

			run();

		}

	} else {

    $( document ).on( "mousemove", function( event ) {
  		width = $(this).width();
  		height = $(this).height();

  		accX = (event.pageX / width) * 100;
  		accY = (event.pageY / height) * 100;

  		xA = accX;
  	  yA = accY;

  		run();
    });
}

  // else {
  //
	// 	$('.hero').mousemove(function(e) {
  //
	// 		width = $(this).width();
	// 		height = $(this).height();
  //
	// 		accX = (e.pageX / width) * 100;
	// 		accY = (e.pageY / height) * 100;
  //
	// 		xA = accX;
	// 	  yA = accY;
  //
	// 		run();
  //
	// 	});
  //
	// }

	function run() {

	    $('.hero').css({'background-position' : xA+'% '+yA+'%'});

	}

});
