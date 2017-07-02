var body = $('html, body');
var hamburger = $('.hamburger');
var mainNav = $('.main-nav');
var mainHeader = $('.main-header');
var headerHeight = mainHeader.outerHeight();

hamburger.click(function() {
  mainNav.toggleClass('nav-open');
  $(this).toggleClass('navOpen');
  mainHeader.toggleClass('open');
  body.toggleClass('body-modal-open');
  if ( mainNav.hasClass('nav-open')) {
    body.bind('touchmove', function(e) {
      if (!$(e.target).parents().hasClass('nav-open')) {
        e.preventDefault();
      }
    });
  } else {
    body.unbind('touchmove');
  }
});

$('a[href*="#"]').click(function() {
  if ( $('.main-header').hasClass('open') ) {
    $('.main-nav').removeClass('nav-open');
    $('.main-header').removeClass('open');
    $('.hamburger').removeClass('navOpen');
		if ( ! mainNav.hasClass('nav-open') ) {
			body.unbind('touchmove');
		}
  }
});

mainHeader.headroom({
  offset    : headerHeight,
  tolerance   : { up:10, down:10 },
  classes : {
    pinned   : "pinned",
    unpinned : "unpinned",
    top      : "onTop",
    bottom   : "onBottom",
    notTop   : "scrolled"
  },
	onUnpin : function() {
		if ( mainHeader.hasClass('open') ) {
			mainHeader.removeClass('unpinned');
		}
	},
  onTop : function() {
    mainHeader.removeClass('pinned');
  }
});
