var body = document.querySelector("html, body");
var hamburger = document.querySelector(".hamburger");
var mainNav = document.querySelector(".main-nav");
var missionCircle = document.querySelector(".mission__circle");
var technologyCircle = document.querySelectorAll(".technology__circle");
var mainHeader = document.querySelector(".main-header");
var links = document.querySelectorAll("a[href*='#']");
var headerHeight = mainHeader.offsetHeight;
var controller = new ScrollMagic.Controller();

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

document.ontouchmove = function(event) {
  var isTouchMoveAllowed = true,
    target = event.target;

  while (target !== null) {
    if (target.classList && target.classList.contains("disable-scrolling")) {
      isTouchMoveAllowed = false;
      break;
    }
    target = target.parentNode;
  }

  if (!isTouchMoveAllowed) {
    event.preventDefault();
  }
};

new ScrollMagic.Scene({
  triggerElement: missionCircle,
  offset: "-100"
})
  .addTo(controller)
  .on("enter", function() {
    missionCircle.classList.add("animated", "hinge", "fadeIn");
  });

new ScrollMagic.Scene({
  triggerElement: technologyCircle,
  offset: "-100"
})
  .addTo(controller)
  .on("enter", function() {
    technologyCircle.forEach(function(foo) {
      foo.classList.add("animated", "hinge", "fadeIn");
    });
  });

hamburger.addEventListener("click", function() {
  mainNav.classList.toggle("nav-open");
  this.classList.toggle("navOpen");
  mainHeader.classList.toggle("open");
  body.classList.toggle("body-modal-open");
  body.classList.toggle("disable-scrolling");
});

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function(event) {
    if (!mainNav.classList.contains("nav-open")) return;

    mainNav.classList.remove("nav-open");
    mainHeader.classList.remove("open");
    hamburger.classList.remove("navOpen");
    body.classList.remove("body-modal-open");
    body.classList.remove("disable-scrolling");
  });
}
