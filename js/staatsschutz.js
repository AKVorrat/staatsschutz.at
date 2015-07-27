var steps = [50, 100, 250, 500, 750, 1000, 1500, 2500, 4000, 5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000, 50000, 100000, 250000, 8000000];
function getTarget(cnt) {
	for (var e in steps) {
		if (cnt < steps[e]) {
			return steps[e];
		}
	}
}

function beautify_number (nr) {
	var l, s = '';
	nr = nr + '' || '';
	l = nr.length;

	for (var i = nr.length; i>0; i-=3) {
		s = nr.substring(i, i-3) + '.' + s;
	}

	return s.substring(0, s.length-1);
}

function set_progress( signatures )
{
	signatures = beautify_number(signatures || 0);
	var target = beautify_number(getTarget(signatures));
	var percent = signatures/target*100 + '%';
	//console.log('progress', signatures, target, percent, $('#progress'))

	$('#progress').animate({'width': percent}, 800);
	$('#progress_description').text(signatures + ' Unterschriften von ' + target);
}

$(function () {
	set_progress((cnt.cnt || 0) + (cnt_paper.cnt || 0));
});



