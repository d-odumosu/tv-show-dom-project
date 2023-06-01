// const rootElem = document.getElementById("root");
const divContainer = document.getElementById("tvEpisode");

async function Setup() {
  const allEpisodes = await fetchEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisode(allEpisodes);
  selectEpisode(allEpisodes);
}

async function fetchEpisodes() {
  const response = await fetch("https://api.tvmaze.com/shows/82/episodes", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Failed to fetch episodes");
  }
}

function makePageForEpisodes(episodeList) {
  divContainer.textContent = ""; // Clear previous episodes
  episodeList.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episodeCard");
    episodeDiv.innerHTML = `
      <h2>${episode.name} S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}</h2>
      <img src="${episode.image.medium}">
      <span>${episode.summary}</span>
    `;
    divContainer.appendChild(episodeDiv);
  });
}

function searchEpisode(episodes) {
  let searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    let searchedEpisode = episodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
    });
    makePageForEpisodes(searchedEpisode);
  });
}

function selectEpisode(episodes) {
  const select = document.getElementById("select");
  select.innerHTML = ""; // Clear previous options

  const defaultOption = document.createElement("option");
  defaultOption.innerText = "Select an episode";
  select.appendChild(defaultOption);

  episodes.forEach((episode) => {
    const optionForEp = document.createElement("option");
    optionForEp.value = episode.name;
    optionForEp.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    select.appendChild(optionForEp);
  });

  select.addEventListener("change", (e) => {
    let value = e.target.value;
    let filteredEpisode = episodes.filter((episode) => {
      if (value === defaultOption.innerText) {
        return true;
      } else {
        return episode.name.includes(value) || episode.summary.includes(value);
      }
    });
    makePageForEpisodes(filteredEpisode);
  });
}

//

window.onload = Setup;
