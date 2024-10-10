document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navItems = document.querySelectorAll(".nav-item");
  const heroSection = document.querySelector(".hero-section");
  const logo = document.querySelector(".navbar-brand-bg ");

  const whiteLogoSrc = "assets/images/Medendi-Logo-White.png";
  const blackLogoSrc = "assets/images/Medendi-Logo-Black.png";

  // Detect scroll event
  window.addEventListener("scroll", function () {
    // Get the bottom position of the hero section relative to the viewport
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    // Check if the user has scrolled past the hero section
    if (heroBottom <= 0) {
      navbar.classList.add("navbar-scrolled");
      logo.classList.remove("navbar-brand-bg");
      logo.classList.add("navbar-brand-sm");
      logo.src = blackLogoSrc;
      navItems.forEach((navItem) => {
        navItem.classList.remove("text-white");
        navItem.classList.add("text-black");
      });
    } else {
      navbar.classList.remove("navbar-scrolled");
      logo.src = whiteLogoSrc;
      logo.classList.remove("navbar-brand-sm");
      logo.classList.add("navbar-brand-bg");
      navItems.forEach((navItem) => {
        navItem.classList.remove("text-black");
        navItem.classList.add("text-white");
      });
    }
  });

  const collapseToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');

  collapseToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const arrowIcon = this.querySelector("svg");
      const target = document.querySelector(this.getAttribute("href"));

      target.addEventListener("shown.bs.collapse", () => {
        arrowIcon.classList.add("rotated");
      });

      target.addEventListener("hidden.bs.collapse", () => {
        arrowIcon.classList.remove("rotated");
      });
    });
  });
});
