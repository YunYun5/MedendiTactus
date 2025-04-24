document.addEventListener("DOMContentLoaded", function () {
  const helpSection = document.getElementById("help-section");
  const showMoreButtons = helpSection.querySelectorAll('[data-bs-toggle="collapse"]');

  showMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = document.querySelector(this.getAttribute("href"));

      // Toggle the button text based on the collapse state
      target.addEventListener("shown.bs.collapse", () => {
        this.textContent = "Show Less";
      });

      target.addEventListener("hidden.bs.collapse", () => {
        this.textContent = "Show More";
      });
    });
  });

  const navbar = document.querySelector(".navbar");
  const navItems = document.querySelectorAll(".nav-item");
  const heroSection = document.querySelector(".hero-gradient");
  const logo = document.querySelector(".navbar-brand-bg ");

  const whiteLogoSrc = "assets/images/Medendi-Logo-White.webp";
  const blackLogoSrc = "assets/images/Medendi-Logo-Black.webp";

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
});

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".animate-slide-left, .animate-slide-right");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("played")) {
          entry.target.style.animationPlayState = "running"; // Play the animation

          entry.target.addEventListener(
            "animationend",
            () => {
              entry.target.classList.add("played"); // Mark as played
              entry.target.classList.remove("animate-slide-left", "animate-slide-right"); // Remove animation classes
            },
            { once: true },
          ); // Ensure the event listener is called only once

          observer.unobserve(entry.target); // Stop observing the element
        }
      });
    },
    { threshold: 0.1 },
  ); // Trigger when 10% of the element is visible

  animateElements.forEach((el) => {
    el.style.animationPlayState = "paused"; // Start paused
    observer.observe(el); // Observe the element
  });
});
