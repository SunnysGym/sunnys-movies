const API_KEY = "caf0968750f2f8fc263e75f84b1d1e87";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const main = document.querySelector("main");

function attachSearchHandlers() {
  const discoverButton = document.getElementById("discover");
  const searchInput = document.getElementById("search");
  if (!discoverButton || !searchInput) return;
  discoverButton.onclick = () => {
    const query = (searchInput.value || "").trim();
    if (!query) {
      alert("Please enter a search term.");
      return;
    }
    searchAll(query);
  };
}

attachSearchHandlers();

async function searchAll(query) {
  try {
    const response = await fetch(`${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    const items = (data.results || []).filter((r) => r.media_type === "movie" || r.media_type === "tv");
    displayResults(items);
  } catch (error) {
    console.error("Error fetching results:", error);
    alert("Failed to fetch results. Please try again later.");
  }
}

function displayResults(items) {
  const resultsContainer = document.createElement("div");
  resultsContainer.classList.add("results");

  items.forEach((item) => {
    const isMovie = item.media_type === "movie";
    const card = document.createElement("div");
    card.classList.add("movie");

    const poster = document.createElement("img");
    poster.src = item.poster_path
      ? `${IMAGE_BASE_URL}${item.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";
    poster.alt = isMovie ? item.title : item.name;

    const titleEl = document.createElement("h2");
    titleEl.textContent = isMovie ? item.title : item.name;

    const watchButton = document.createElement("button");
    watchButton.textContent = "Watch Now";
    watchButton.classList.add("watch-btn");
    watchButton.addEventListener("click", () => {
      if (isMovie) {
        window.location.href = `player.html?tmdbid=${item.id}`;
      } else {
        window.location.href = `tv-player.html?tmdbid=${item.id}`;
      }
    });

    card.appendChild(poster);
    card.appendChild(titleEl);
    card.appendChild(watchButton);

    resultsContainer.appendChild(card);
  });

  // Clear previous results and add new ones
  main.innerHTML = `<h1>sunny's movie's</h1><p>free movies just for you</p><input id="search" placeholder="Search for a movie or tv show..."><button id="discover">Discover</button>`;
  main.appendChild(resultsContainer);
  attachSearchHandlers();
}
