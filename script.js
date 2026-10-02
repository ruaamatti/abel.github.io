// Keep the mobile menu usable for touch, keyboard, and assistive technology.
const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

if (menuButton && siteNavigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    siteNavigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu"
    );
    siteNavigation.classList.toggle("is-open", !isExpanded);
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });
}

// Reveal a short note in place of each video that has not been produced yet.
document.querySelectorAll("[data-preview-button]").forEach((button) => {
  const preview = document.getElementById(button.getAttribute("aria-controls"));
  if (!preview) return;

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    preview.hidden = isExpanded;
  });
});

// Change these settings to enable reveals, adjust timing, or choose which
// page elements enter from the bottom, left, or right.
const revealSettings = {
  enabled: true,
  duration: 2000,
  stagger: 85,
  threshold: 0.14,
  directions: {
    up: [
      ".home-hero .hero-copy",
      ".page-heading",
      ".section-heading",
      ".sample-notice",
      ".leaderboard-main > .section-last .table-scroll",
    ],
    "from-left": [
      ".purpose-layout > div",
      ".info-card:nth-child(odd)",
      ".team-card:nth-child(odd)",
      ".progress-card:nth-child(odd)",
      ".video-card:nth-child(odd)",
      ".rule-section:nth-of-type(odd)",
      ".performer-card:nth-child(odd)",
      ".resource-card:nth-child(odd)",
      ".faq-item:nth-child(odd)",
    ],
    "from-right": [
      ".hero-mark",
      ".purpose-copy",
      ".info-card:nth-child(even)",
      ".team-card:nth-child(even)",
      ".progress-card:nth-child(even)",
      ".video-card:nth-child(even)",
      ".rule-section:nth-of-type(even)",
      ".performer-card:nth-child(even)",
      ".resource-card:nth-child(even)",
      ".faq-item:nth-child(even)",
    ],
  },
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  revealSettings.enabled &&
  !prefersReducedMotion &&
  "IntersectionObserver" in window
) {
  const revealElements = new Set();

  Object.entries(revealSettings.directions).forEach(([direction, selectors]) => {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        if (revealElements.has(element)) return;

        revealElements.add(element);
        element.classList.add("reveal", `reveal--${direction}`);
        element.style.setProperty(
          "--reveal-duration",
          `${revealSettings.duration}ms`
        );
        element.style.setProperty(
          "--reveal-delay",
          `${index * revealSettings.stagger}ms`
        );
      });
    });
  });

  if (revealElements.size > 0) {
    document.documentElement.classList.add("has-reveal-animations");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: revealSettings.threshold }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }
}
function getNumber(id) { 

  return Number(document.getElementById(id).value) || 0; 

} 
function calculateDerbyScore() { 

  let score = 100; 

 

  const reported = getNumber('reported-count'); 

  const clicked = getNumber('clicked-count'); 

  const training = getNumber('training-count'); 

  const streak = getNumber('streak-count'); 

  const first = getNumber('first-count'); 

  const second = getNumber('second-count'); 

  const third = getNumber('third-count'); 

  const fourth = getNumber('fourth-count'); 

  const fifth = getNumber('fifth-count'); 

 

  score += reported * 20; 

  score -= clicked * 25; 

  score += training * 10; 

  score += streak * 5; 

  score += first * 24; 

  score += second * 19; 

  score += third * 14; 

  score += fourth * 9; 

  score += fifth * 4; 

 

  document.getElementById('score-total').textContent = score; 

} 

 

document 

  .getElementById('calculate-score') 

  .addEventListener('click', calculateDerbyScore); 
