const rootElem = document.getElementById("root");
const divContainer = document.getElementById("tvEpisode");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisode(allEpisodes);
  selectEpisode(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episodeCard");
    episodeDiv.innerHTML = `
      <h2>${episode.name}
      S${episode.season.toString().padStart(2, "0")}E${episode.number
      .toString()
      .padStart(2, "0")} </h2>
        <img src = "${episode.image.medium}">
        <span>${episode.summary}</span>
      `;
    divContainer.appendChild(episodeDiv);
  });
}

//   // Adding Search level 200
function searchEpisode(episodes) {
  let searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    divContainer.textContent = "";
    let searchedEpisode = episodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
    });
    makePageForEpisodes(searchedEpisode);
  });
}
// Adding level 300

function selectEpisode(episodes) {
  const select = document.getElementById("select");
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
    divContainer.textContent = "";
    let filteredEpisode = episodes.filter((episode) => {
      if (episode.name.includes(value) || episode.summary.includes(value)) {
        return episode;
      } else if (value === defaultOption.innerText) {
        return episodes;
      }
    });
    makePageForEpisodes(filteredEpisode);
  });
}
// Adding level 350

window.onload = setup;
