const mainHeader = document.querySelector('[data-header]');
const mainNavigation = document.querySelector('[data-navigation]');
const mobileNavigationTrigger = document.querySelector('[data-navigation-toggle]');
const mobileNavigation = document.querySelector('[data-navigation-list]');
const fadeIns = document.querySelectorAll('.gsap-fade-in');

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'max',
  onEnter: () => mainHeader.classList.add('pinned'),
  onLeaveBack: () => mainHeader.classList.remove('unpinned'),
});

/**
 * Trap focus within navigation
 */
function navigationFocus() {
  const focusableElements = mainNavigation.querySelectorAll('a[href], button');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  mainNavigation.addEventListener('keydown', function (e) {
    if (e.target === firstFocusableElement && e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (e.target === lastFocusableElement && e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  });
}

/**
 * Close navigation if escape key is pressed
 */
function handleEscape() {
  document.addEventListener('keyup', function (e) {
    const escape = e.key;

    if (escape === 'Escape' && mobileNavigation.classList.contains('open')) {
      mobileNavigationTrigger.setAttribute('aria-expanded', 'false');
      mobileNavigationTrigger.focus();
      mobileNavigation.classList.remove('open');
      mainHeader.classList.remove('main-header--navigation-open');
      mobileNavigationTrigger.innerHTML = "Open Menu";
    }
  });
}

mobileNavigationTrigger.addEventListener("click", function () {
  mainHeader.classList.toggle('main-header--navigation-open');
  mobileNavigation.classList.toggle("open")
  this.classList.toggle("nav-open");

  navigationFocus();
  handleEscape();

  if (mobileNavigation.classList.contains('open')) {
    this.setAttribute('aria-expanded', 'true');
    this.innerHTML = "Close Menu";
  } else {
    this.setAttribute('aria-expanded', 'false');
    this.innerHTML = "Open Menu";
  }
});

// Function to trigger the fade-in animation
const triggerFadeInAnimation = (element) => {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power1.out'
  });
};

// Function to setup fade-in animations on scroll
const setupFadeInAnimation = (element) => {
  // Set initial state
  gsap.set(element, { opacity: 0, y: 30 });

  // Create ScrollTrigger instance
  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top 90%',
    end: 'bottom top',
    once: true,
    onEnter: () => triggerFadeInAnimation(element)
  });

  // Handle focus for focusable child elements
  const focusableChildren = element.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusableChildren.forEach((child) => {
    child.addEventListener('focus', () => {
      if (!trigger.isActive) {
        triggerFadeInAnimation(element);
      }
    });
  });
};

// Initialize animations for fade-in elements
if (fadeIns.length > 0) {
  fadeIns.forEach(setupFadeInAnimation);
}
