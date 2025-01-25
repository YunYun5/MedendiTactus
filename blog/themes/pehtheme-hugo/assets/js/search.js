let searchIndex;
let posts;

async function loadSearchIndex() {
  const response = await fetch("/blog/index.json");
  const data = await response.json();
  posts = data.items;

  searchIndex = lunr(function () {
    this.ref("url");
    this.field("title");
    this.field("content");
    this.field("description");

    posts.forEach((post) => this.add(post));
  });
}

loadSearchIndex();

const searchInput = document.getElementById("nav-search-input");
const searchResults = document.getElementById("nav-search-results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    searchResults.innerHTML = "<li>Type at least 3 characters to search.</li>";
    return;
  }

  const results = searchIndex
    .search(query)
    .map((match) => posts.find((post) => post.url === match.ref))
    .slice(0, 3);

  if (results.length) {
    searchResults.innerHTML = results
      .map(
        (
          post,
        ) => `<li class="rounded overflow-hidden shadow bg-zinc-300 text-black hover:shadow-lg transition transform hover:scale-105 hover:bg-blue-50">
            <a href="${post.url}" class="flex items-center p-4 space-x-4">
              <img src="${post.image || "/default-image.jpg"}" alt="${post.title}" class="w-12 h-12 rounded object-cover">
              <div>
                <h3 class="font-bold text-lg">${post.title}</h3>
                <p class="text-sm text-gray-600">${post.description || ""}</p>
              </div>
            </a>
          </li>`,
      )
      .join("");
  } else {
    searchResults.innerHTML = "<li>No results found.</li>";
  }
});

// Toggle search bar
const searchButton = document.getElementById("search-button");
const search = document.getElementById("search");
const searchIcon = document.getElementById("search-icon");
const searchXIcon = document.getElementById("search-x-icon");
const menuBar = document.getElementById("hamburger-menu-bar");
const hamburgerButton = document.getElementById("hamburger-menu-button");

searchButton.addEventListener("click", () => {
  const isHidden = search.classList.contains("hidden");
  searchInput.value = "";
  searchResults.innerHTML = "";

  if (isHidden) {
    // Show the search box
    search.classList.remove("hidden");
    setTimeout(() => {
      search.classList.remove("opacity-0", "scale-95");
      search.classList.add("opacity-100", "scale-100");
    }, 10); // Slight delay to trigger the transition
    searchXIcon.classList.remove("hidden");
    searchIcon.classList.add("hidden");

    if (hamburgerButton.getAttribute("aria-expanded") === "true") {
      hamburgerButton.setAttribute("aria-expanded", false);
      menuBar.classList.toggle("-translate-y-full");
      menuBar.classList.toggle("opacity-0");
      menuBar.classList.toggle("invisible");
      setTimeout(() => {
        menuBar.classList.add("hidden");
      }, 300);
    }
  } else {
    // Hide the search box
    search.classList.add("opacity-0", "scale-95");
    search.classList.remove("opacity-100", "scale-100");
    setTimeout(() => {
      search.classList.add("hidden");
    }, 300); // Match the duration in the CSS
    searchXIcon.classList.add("hidden");
    searchIcon.classList.remove("hidden");
  }
});

// Close search box if hovering outside the <header>
const header = document.querySelector("header");
document.addEventListener("mouseover", (event) => {
  if (!header.contains(event.target) && !search.classList.contains("hidden")) {
    if (hamburgerButton.getAttribute("aria-expanded") === "true") {
      hamburgerButton.setAttribute("aria-expanded", false);
      menuBar.classList.toggle("-translate-y-full");
      menuBar.classList.toggle("opacity-0");
      menuBar.classList.toggle("invisible");
      setTimeout(() => {
        menuBar.classList.add("hidden");
      }, 300);
    }

    // Hide the search box
    search.classList.add("opacity-0", "scale-95");
    search.classList.remove("opacity-100", "scale-100");
    setTimeout(() => {
      search.classList.add("hidden");
    }, 300); // Match the duration in the CSS
    searchXIcon.classList.add("hidden");
    searchIcon.classList.remove("hidden");
    searchInput.value = "";
    searchResults.innerHTML = "";
  }
});
