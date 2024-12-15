document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero-section");
  const logo = document.querySelector(".navbar-brand-bg ");

  // Detect scroll event
  window.addEventListener("scroll", function () {
    // Get the bottom position of the hero section relative to the viewport
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    // Check if the user has scrolled past the hero section
    if (heroBottom <= 0) {
      logo.classList.remove("navbar-brand-bg");
      logo.classList.add("navbar-brand-sm");
    } else {
      logo.classList.remove("navbar-brand-sm");
      logo.classList.add("navbar-brand-bg");
    }
  });

  const hamMenu = document.querySelector(".ham-menu");

  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
  });
});
