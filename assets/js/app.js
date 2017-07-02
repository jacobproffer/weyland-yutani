var body = $('html, body');
var hamburger = $('.hamburger');
var mainNav = $('.main-nav');
var mainHeader = $('.main-header');
var headerHeight = mainHeader.outerHeight();

hamburger.click(function() {
  mainNav.toggleClass('nav-open');
  $(this).toggleClass('navOpen');
  mainHeader.toggleClass('open');
	body.addClass('disable-scrolling');
});

$('a[href*="#"]').click(function() {
  if ( $('.main-header').hasClass('open') ) {
    $('.main-nav').removeClass('nav-open');
    $('.main-header').removeClass('open');
    $('.hamburger').removeClass('navOpen');
		body.removeClass('disable-scrolling');
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

// Test

document.ontouchmove = function ( event ) {

    var isTouchMoveAllowed = true, target = event.target;

    while ( target !== null ) {
        if ( target.classList && target.classList.contains( 'disable-scrolling' ) ) {
            isTouchMoveAllowed = false;
            break;
        }
        target = target.parentNode;
    }

    if ( !isTouchMoveAllowed ) {
        event.preventDefault();
    }

};
