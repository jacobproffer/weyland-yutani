var body = document.querySelector("html, body");
var hamburger = document.querySelector(".hamburger");
var mainNav = document.querySelector(".main-nav");
var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var lazyImg = document.querySelectorAll("img");
var missionGraphic = document.querySelector(".mission__graphic");
var technologyItem = document.querySelectorAll(".technology__grid-item");
var careerItem = document.querySelectorAll(".careers__item");
var listItem = document.querySelectorAll(".list-article");

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

/**
 * Handles accessible tab functionality.
 *
 * @param {HTMLElement} buttons Tab buttons.
 * @param {HTMLElement} button Tab button.
 * @param {HTMLElement} panels Tab panels.
 * @return {undefined}
 */
function handleTabs(buttons, button, panels) {
  let tabList = buttons;
  let tabs = Array.from(button);
  let tabPanels = panels;
  let focusedTabIndex = 0;

  function selectTab(index) {
    const activeTab = tabs[index];

    if (!tabs) return;

    // Deactivate all tabs
    tabs.forEach(function (tab) {
      tab.setAttribute('aria-selected', false);
      tab.setAttribute('tabindex', -1);
    });

    // Activate only the requested tab and set focus to it
    activeTab.setAttribute('aria-selected', true);
    activeTab.setAttribute('tabindex', 0);
    activeTab.focus();
    focusedTabIndex = index;

    // Hide all tabpanels
    tabPanels.forEach(function (tabPanel) {
      tabPanel.classList.remove('is-visible');
    });

    // Show only the tabpanel for the requested tab
    let nextTabpanel = document.querySelector(
      '#' + activeTab.getAttribute('aria-controls')
    );

    if (nextTabpanel !== null) {
      nextTabpanel.classList.add('is-visible');
    }
  }

  function focusFirstTab() {
    focusedTabIndex = 0;
    tabs[focusedTabIndex].focus();
  }

  function focusLastTab() {
    focusedTabIndex = tabs.length - 1;
    tabs[focusedTabIndex].focus();
  }

  function focusPreviousTab() {
    if (focusedTabIndex > 0) {
      focusedTabIndex -= 1;
    } else {
      focusedTabIndex = tabs.length - 1;
    }

    tabs[focusedTabIndex].focus();
  }

  function focusNextTab() {
    if (focusedTabIndex < tabs.length - 1) {
      focusedTabIndex += 1;
    } else {
      focusedTabIndex = 0;
    }

    tabs[focusedTabIndex].focus();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      let nextTabIndex = Array.prototype.slice.call(tabs).indexOf(e.target);

      if (nextTabIndex !== null) {
        selectTab(nextTabIndex);
      }
    });
  });

  if (tabList) {
    // Select previous or next tabs using Left and Right arrow keys
    tabList.addEventListener('keydown', function (e) {
      // eslint-disable-next-line default-case
      switch (e.key) {
      case 'ArrowLeft':
        focusPreviousTab();
        break;
      case 'ArrowRight':
        focusNextTab();
        break;
      case 'Home':
        e.preventDefault();
        focusFirstTab();
        break;
      case 'End':
        e.preventDefault();
        focusLastTab();
        break;
      }
    });
  }
}

hamburger.addEventListener("click", function() {
  mainNav.classList.toggle("nav-open");
  this.classList.toggle("nav-open");
  mainHeader.classList.toggle("open");

  if (mainNav.classList.contains("nav-open")) {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }
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

if (listItem) {
  var listTL = gsap.timeline();

  listTL.from(listItem, {duration: 1.25, opacity: 0, stagger: 0.25});

  var listTrigger = new ScrollMagic.Scene({
    triggerElement: listItem,
    triggerHook: 0.8,
    duration: 0,
  }).setTween(listTL).addTo(controller);
}

const tabPatterns = document.querySelectorAll('[data-tab-pattern]');

if (tabPatterns) {
  const tabPatternsArray = Array.from(tabPatterns);

  tabPatternsArray.forEach(function (tabPattern) {
    const tabList = tabPattern.querySelector('[data-tablist]');
    const tabNodeList = tabPattern.querySelectorAll('[data-tab]');
    const tabPanels = tabPattern.querySelectorAll('[data-tab-panel]');

    handleTabs(tabList, tabNodeList, tabPanels);
  });
}
