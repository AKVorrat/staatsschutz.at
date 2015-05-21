var progress = 0;

var steps = [50, 100, 250, 500, 750, 1000, 1500, 2500, 4000, 5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000, 50000, 100000, 250000, 8000000];
function getTarget(cnt) {
	for (var e in steps) {
		if (cnt < steps[e]) {
			return steps[e];
		}
	}
}

function set_progress( signatures )
{
	signatures = signatures || 0;
	var target = getTarget(signatures);
	var percent = Math.floor(signatures/target)*100 + '%';

	$('#progress').animate({'width': percent}, 1500).html('Fortschritt:' + percent);
	$('progress_description').html(signatures + ' Unterschriften von ' + target);
}


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


