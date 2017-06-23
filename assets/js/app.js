var hamburger = $('.hamburger');
var mainNavigation = $('.main-nav');
var headerHeight = $('.main-header').outerHeight();

hamburger.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
	$('.main-header').toggleClass('open');
	if ($('.main-header').hasClass('open')) {
		$('.main-header').removeClass('unpinned');
	}
});

// if ($('.main-header').hasClass('open')) {
// 	console.log('scrolled');
// }

$('.main-header').headroom({
  offset    : headerHeight,
  tolerance   : { up:10, down:10 },
  classes : {
    pinned   : "pinned",
    unpinned : "unpinned",
    top      : "onTop",
    bottom   : "onBottom",
    notTop   : "scrolled"
  },
  onTop : function() {
    $('.main-header').removeClass('pinned');
  }
});
