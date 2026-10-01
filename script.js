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
