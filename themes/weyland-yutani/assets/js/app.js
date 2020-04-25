var body = document.querySelector("html, body");
var hamburger = document.querySelector(".hamburger");
var mainNav = document.querySelector(".main-nav");
var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var lazyImg = document.querySelectorAll("img");
var missionGraphic = document.querySelector(".mission__graphic");
var technologyItem = document.querySelectorAll(".technology__grid-item");
var careerItem = document.querySelectorAll(".careers__item");

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

var controller = new ScrollMagic.Controller();

if (lazyImg) {
  lazyImg.forEach(function (el) {
    var LazyScene = new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 1,
      offset: -300,
      duration: 0,
      reverse: false
    })
      .on('enter', function () {
        if (el.getAttribute('data-src')) {
          el.src = el.getAttribute('data-src')
        }
        if (el.getAttribute('data-srcset')) {
          el.setAttribute('srcset', el.getAttribute('data-srcset'))
        }
      })
      .addTo(controller);
  });
}

if (missionGraphic) {
  var missionTL = gsap.timeline();

  missionTL.from(missionGraphic, {duration: 1.25, opacity: 0});

  var missionTrigger = new ScrollMagic.Scene({
    triggerElement: missionGraphic,
    triggerHook: 0.8,
    duration: 0,
  }).setTween(missionTL).addTo(controller);
}

if (technologyItem) {
  var technologyTL = gsap.timeline();

  technologyTL.from(technologyItem, {duration: 1.25, opacity: 0, stagger: 0.25});

  var technologyTrigger = new ScrollMagic.Scene({
    triggerElement: technologyItem,
    triggerHook: 0.8,
    duration: 0,
  }).setTween(technologyTL).addTo(controller);
}

if (careerItem) {
  var careerTL = gsap.timeline();

  careerTL.from(careerItem, {duration: 1.25, opacity: 0, stagger: 0.25});

  var careerTrigger = new ScrollMagic.Scene({
    triggerElement: careerItem,
    triggerHook: 0.8,
    duration: 0,
  }).setTween(careerTL).addTo(controller);
}
