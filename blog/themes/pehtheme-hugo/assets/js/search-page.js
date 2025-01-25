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

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    searchResults.innerHTML = "<li>Type at least 3 characters to search.</li>";
    return;
  }

  const results = searchIndex.search(query).map((match) => posts.find((post) => post.url === match.ref));

  if (results.length) {
    searchResults.innerHTML = results
      .map(
        (
          post,
        ) => `<li class="rounded overflow-hidden shadow bg-zinc-300 text-black hover:shadow-lg transition transform hover:scale-105 hover:bg-blue-50">
            <a href="${post.url}" class="flex items-center p-4 space-x-4">
              <img src="${post.image || "/default-image.jpg"}" alt="${post.title}" class="w-24 h-24 rounded object-cover">
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
