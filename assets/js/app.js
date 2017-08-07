var body = $('html, body');
var hamburger = $('.hamburger');
var mainNav = $('.main-nav');
var mainHeader = $('.main-header');
var headerHeight = mainHeader.outerHeight();
var controller = new ScrollMagic.Controller();

hamburger.click(function() {
  mainNav.toggleClass('nav-open');
  $(this).toggleClass('navOpen');
  mainHeader.toggleClass('open');
	body.toggleClass('body-modal-open');
	body.toggleClass('disable-scrolling');
});

$('a[href*="#"]').click(function() {
	$('.main-nav').removeClass('nav-open');
	$('.main-header').removeClass('open');
	$('.hamburger').removeClass('navOpen');
	body.removeClass('body-modal-open');
	body.removeClass('disable-scrolling');
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

// ScrollMagic

new ScrollMagic.Scene({
  triggerElement: '.mission-graphic',
  offset: '-100',
  reverse: true
}).addTo(controller)
.on('enter', function() {
  $('.mission-graphic').addClass('animated hing fadeIn');
});
