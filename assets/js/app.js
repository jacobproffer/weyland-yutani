const hamburger = $('.hamburger');
const mainNavigation = $('.main-nav');

hamburger.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
});
