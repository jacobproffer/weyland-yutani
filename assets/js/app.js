var hamburger = $('.hamburger');
var body = $('body');
var mainNavigation = $('.main-nav');
var mainHeader = $('.main-header');
var headerHeight = mainHeader.outerHeight();

hamburger.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
	mainHeader.toggleClass('open');
	body.toggleClass('body-modal-open');
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
