var body = document.querySelector("html, body");
var hamburger = document.querySelector(".hamburger");
var mainNav = document.querySelector(".main-nav");
var mainHeader = document.querySelector(".main-header");
var links = document.querySelectorAll("a[href*='#']");
var headerHeight = mainHeader.offsetHeight;

var headroom = new Headroom(mainHeader, {
  offset: headerHeight,
  tolerance: { up: 10, down: 10 },
  classes: {
    pinned: "pinned",
    unpinned: "unpinned",
    top: "onTop",
    bottom: "onBottom",
    notTop: "scrolled"
  },
  onUnpin: function() {
    if (mainHeader.classList.contains("open")) {
      mainHeader.classList.remove("unpinned");
    }
  },
  onTop: function() {
    mainHeader.classList.remove("pinned");
  }
});

headroom.init();

hamburger.addEventListener("click", function() {
  mainNav.classList.toggle("nav-open");
  this.classList.toggle("nav-open");
  mainHeader.classList.toggle("open");
});
