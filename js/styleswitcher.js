var progress = 0;

function set_progress( new_percent_value )
{
	var e = document.getElementById('progress');
	var p = Math.floor(progress * 10) / 10;

	e.style.width = progress + '%';
	e.innerHTML = 'Fortschritt: ' + p + '%';
}  // set_progress


function AddEvent( element, event_name, event_function )
{
	if (element.attachEvent) {             // Internet Explorer
		element.attachEvent( "on" + event_name, function() {event_function.call(element);} );
	}
	else if (element.addEventListener) {   // Rest of the world
		element.addEventListener(event_name, event_function, false);
	}
} // AddEvent


// MAIN PROGRAM //


AddEvent( window, 'load', function () {
	/*
	var interval = window.setInterval( function () {
		if (progress < 100) {
			progress += 5;
			set_progress( progress );
		} else {
			window.clearInterval( interval );
		}
	}, 200 );
	*/
	max = 100;
	if (typeof cnt !== 'undefined') {
		set_progress(Math.min(cnt.cnt/max, 100));
	}
	else {
		// set safe limit here
		//set_progress();	
	}
}); // onLoad


