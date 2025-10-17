const API_KEY = "caf0968750f2f8fc263e75f84b1d1e87";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const resultsContainer = document.querySelector(".results");
const nextPageButton = document.getElementById("next-page");

let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  fetchPopularShows(currentPage);
});

nextPageButton.addEventListener("click", () => {
  currentPage++;
  fetchPopularShows(currentPage);
});

async function fetchPopularShows(page) {
  try {
    const response = await fetch(
      `${API_URL}/tv/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    displayShows(data.results);
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    alert("Failed to fetch TV shows. Please try again later.");
  }
}

function displayShows(shows) {
  resultsContainer.innerHTML = "";

  shows.forEach((show) => {
    const card = document.createElement("div");
    card.classList.add("movie");

    const poster = document.createElement("img");
    poster.src = show.poster_path
      ? `${IMAGE_BASE_URL}${show.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";
    poster.alt = show.name;

    const title = document.createElement("h2");
    title.textContent = show.name;

    const watchButton = document.createElement("button");
    watchButton.textContent = "Watch Now";
    watchButton.classList.add("watch-btn");
    watchButton.addEventListener("click", () => {
      window.location.href = `tv-player.html?tmdbid=${show.id}`;
    });

    card.appendChild(poster);
    card.appendChild(title);
    card.appendChild(watchButton);

    resultsContainer.appendChild(card);
  });
}


