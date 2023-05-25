//You can edit ALL of the code here
  function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
    searchEpisode();
    
  } 

  function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    rootElem.textContent = `Got ${episodeList.length} episode(s)`;

    const divContainer = document.getElementById("tvEpisode");

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

  // Adding Search level 200

function searchEpisode(episodes){

  let searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
      rootElem.textContent = "";


    let searchedEpisode = episodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
      // const searchCard = document.getElementsByClassName("episodeCard");
      // searchCard.classList.toggle("hide", !isVisible);
makePageForEpisodes(searchedEpisode);
    });
  }); 
} 
  window.onload = setup;
