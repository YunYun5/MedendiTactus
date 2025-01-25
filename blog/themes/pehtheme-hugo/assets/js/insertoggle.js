// Dynamically load the correct navbar based on screen size
function loadNavbar() {
  const hamburgerNavbar = document.getElementById("hamburger-navbar");
  const fullNavbar = document.getElementById("full-navbar");
  const hamburgerMenuBar = document.getElementById("hamburger-menu-bar");

  if (window.innerWidth < 1024) {
    // Show hamburger navbar for small screens
    hamburgerNavbar.classList.remove("hidden");
    fullNavbar.classList.add("hidden");
    document.getElementById("hamburger-menu-button").setAttribute("aria-expanded", false);
  } else {
    // Show full navbar for larger screens
    fullNavbar.classList.remove("hidden");
    hamburgerNavbar.classList.add("hidden");
    hamburgerMenuBar.classList.add("hidden");
  }

  // Turn hamburger dropdown menu off given any resizing
  if (!hamburgerMenuBar.classList.contains("hidden")) {
    hamburgerMenuBar.classList.add("hidden");
    hamburgerMenuBar.classList.add("-translate-y-full");
    hamburgerMenuBar.classList.add("opacity-0");
    hamburgerMenuBar.classList.add("invisible");
  }
}

// Toggle functionality for the hamburger menu
(function () {
  const hamburgerButton = document.getElementById("hamburger-menu-button");
  const menuBar = document.getElementById("hamburger-menu-bar");

  const searchIcon = document.getElementById("search-icon");
  const searchXIcon = document.getElementById("search-x-icon");
  const searchInput = document.getElementById("nav-search-input");
  const searchResults = document.getElementById("nav-search-results");
  const search = document.getElementById("search");

  if (hamburgerButton && menuBar) {
    // Add event listener to the hamburger button
    hamburgerButton.addEventListener("click", function () {
      const isHidden = menuBar.classList.contains("hidden");
      hamburgerButton.setAttribute("aria-expanded", isHidden); // Update aria-expanded attribute
      if (isHidden) {
        menuBar.classList.remove("hidden");
        setTimeout(() => {
          menuBar.classList.toggle("-translate-y-full");
          menuBar.classList.toggle("opacity-0");
          menuBar.classList.toggle("invisible");
          searchXIcon.classList.add("hidden");
          searchIcon.classList.remove("hidden");
          // Hide the search box
          search.classList.add("opacity-0", "scale-95");
          search.classList.remove("opacity-100", "scale-100");
          setTimeout(() => {
            search.classList.add("hidden");
          }, 300); // Match the duration in the CSS
          searchXIcon.classList.add("hidden");
          searchIcon.classList.remove("hidden");
        }, 50);
      } else if (!isHidden) {
        menuBar.classList.toggle("-translate-y-full");
        menuBar.classList.toggle("opacity-0");
        menuBar.classList.toggle("invisible");
        setTimeout(() => {
          menuBar.classList.add("hidden");
        }, 300);
      }
    });
  } else {
    console.error("Hamburger menu button or menu bar not found in the DOM.");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      // Add the scrolled styles
      logo.classList.remove("max-h-[100px]", "max-w-[350px]");
      logo.classList.add("max-h-[50px]", "max-w-[175px]");
    } else {
      // Revert to the original styles
      logo.classList.remove("max-h-[50px]", "max-w-[175px]");
      logo.classList.add("max-h-[100px]", "max-w-[350px]");
    }
  });
});

// Run on initial load to set the correct navbar version
document.addEventListener("DOMContentLoaded", loadNavbar);

// Listen for resize events to dynamically switch the navbar
window.addEventListener("resize", loadNavbar);
