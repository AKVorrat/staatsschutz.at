$(function () {
    var videoId = /youtube\.com\/watch\?(.*&)*v=([^&]+)/;
    $('a.loadEmbed').click(function () {
        id = $(this).attr('href').match(videoId)[2];
        $(this).html('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1" style="border: none;" allowfullscreen="1"></iframe></div>');
        return false;
    });
});

$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
})
