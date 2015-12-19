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

function set_progress ( signatures ) {
	signatures = signatures || 0;
	var target = getTarget(signatures);
	var percent = signatures/target*100 + '%';
	//console.log('progress', signatures, target, percent, $('#progress'))

	//$('#progress').animate({'width': percent}, 800);
	$('#progress').css('width', percent);
	$('#progress_description').text(beautify_number(signatures) + ' Menschen sind gegen das geplante Staatsschutzgesetz'/* + beautify_number(target)*/);
}

$(function () {
	if (typeof cnt === 'undefined')
		cnt = {}
	set_progress(((cnt || {}).cnt || 0) + (cnt_paper.cnt || 0));
});


// countdown 
var _translate_twords = {
  'en': {'hs': 'hours', 'ds': 'days', 'ms': 'minutes', 'ss': 'seconds', 'h': 'hour', 'd': 'day', 'm': 'minute', 's': 'second', 'suffix': 'until the vote', 'prefix': 'New secret agency in', 'smprefix': 'Austria establishes a new intelligence agency in\<br \/\>', 'smsuffix': '.\nprevent #Staatsschutz!\nhttps://www.staatsschutz.at/en'}
  , 'de': {'hs': 'Stunden', 'ds': 'Tagen', 'ms': 'Minuten', 'ss': 'Sekunden', 'h': 'Stunde', 'd': 'Tag', 'm': 'Minute', 's': 'Sekunde', 'suffix': 'bis zur Abstimmung', 'prefix': 'Staatsschutz kommt in\<br \/\>', 'smprefix': 'Österreich bekommt einen neuen Inlandsgeheimdienst in ', 'smsuffix': '.\n#Staatsschutz verhindern!\nhttps://www.staatsschutz.at'}
  , 'fr': {'hs': 'heures', 'ds': 'jours', 'ms': 'minutes', 'ss': 'secondes', 'h': 'heure', 'd': 'jour', 'm': 'minute', 's': 'seconde', 'suffix': 'jusqu\'au vote', 'prefix': 'Vote dans', 'smprefix': 'Plus que ', 'smsuffix': ' pour sauver internet. Agissez, rendez-vous sur https://www.staatsschutz.at'}
  , 'es': {'hs': 'horas', 'ds': 'días', 'ms': 'minutos', 'ss': 'segundos', 'h': 'hora', 'd': 'día', 'm': 'minuto', 's': 'segundo', 'suffix': 'hasta el voto', 'prefix': 'Voto en', 'smprefix': 'Quedan ', 'smsuffix': ' para salvar internet. Actúa ahora en https://www.staatsschutz.at'}
};

var plenary_vote = new Date(2016, 0, 19, 13, 0);  // innenausschuss

if (plenary_vote.valueOf() - (new Date()).valueOf() <= 0) 
  plenary_vote = new Date(2016, 0, 27, 9, 0); // Plenum Jaenner 2016


function setCountdown (e, twords) {
  var ms = plenary_vote.valueOf()-(new Date()).valueOf()
    , d = Math.floor(ms/(1000*60*60*24))
    , h = Math.floor(ms/(1000*60*60)%24)
    , m = Math.floor(ms/(1000*60)%60)
    , s = Math.floor(ms/1000%60)
    , o = []
  ;
  if (ms > 0) {
    if (d > 1) {
      o.push(d + ' ' + twords['ds']);
    }
    else if (d == 1) {
      o.push(d + ' ' + twords['d']);
    }
    if (h > 1) {
      o.push(h + ' ' + twords['hs']);
    }
    else if (h == 1) {
      o.push(h + ' ' + twords['h']);
    }
    if (m > 1) {
      o.push(m + ' ' + twords['ms']);
    }
    else if (m == 1) {
      o.push(m + ' ' + twords['m']);
    }
    if (s > 1) {
      o.push(s + ' ' + twords['ss']);
    }
    else if (s == 1) {
      o.push(s + ' ' + twords['s']);
    }
    setSMLinks(o, twords, e);

    //o = o.join(' ') + ' ' + twords['suffix'];
    o = twords['prefix'] + ' ' +  o.join(' '); 
    $(e).html(o);
  }
}

function setSMLinks(o, twords, e) {
  var tweet = 
    'https://twitter.com/home?status=' 
    + encodeURIComponent((twords['smprefix']||'') + o.join(' ') + (twords['smsuffix']||''));
  $('#tweetcount').attr('href', tweet);
}

$(function () {
    var videoId = /youtube\.com\/watch\?(.*&)*v=([^&]+)/;
    $('a[href*="youtube.com/watch"]').click(function () {
        id = $(this).attr('href').match(videoId)[2];
        width = $(this).width();
        height = $(this).height();
        $(this).html('<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1" width="' + width + '" height="' + height + '" style="border: 0"></iframe>');
        return false;
    });
});

$(function () {
  try {
    var twords = _translate_twords[((window.location.pathname + '').match(/\/(\w\w)\/?$/)||[])[1]||'de'];
    var e = $('.countdown'); 
    if (e) {
      setCountdown(e, twords);
      window.setInterval(function () {
        setCountdown(e, twords);
      }, 1000);
    }
  } catch (e) {
    console.error('error in countdown', e);
  }
});

