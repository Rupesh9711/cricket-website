const apiKey = "dce689c9-13e9-4355-ac96-9ce137cc1046";

async function loadMatches() {
  try {
    const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
    const data = await response.json();

    console.log("Raw API response:", data);

if (!data.data || data.data.length === 0) {
  console.warn("API returned no match data.");
}

    const matches = data.data || [];
    const liveList = document.getElementById("matchesList");
    const completedList = document.getElementById("completedMatches");

    liveList.innerHTML = "";
    completedList.innerHTML = "";

    matches.forEach(match => {
      const div = document.createElement("div");
      div.className = "match-card";
      div.innerHTML = `<h3>${match.name}</h3><p>Status: ${match.status}</p>`;

      div.onclick = () => {
        localStorage.setItem("selectedMatch", JSON.stringify(match));
        window.location.href = "match.html";
      };

      const status = match.status.toLowerCase();
      if (status.includes("won") || status.includes("draw") || status.includes("completed")) {
        completedList.appendChild(div);
      } else {
        liveList.appendChild(div);
      }
    });

    if (liveList.innerHTML === "") liveList.innerHTML = "<p>No live matches</p>";
    if (completedList.innerHTML === "") completedList.innerHTML = "<p>No completed matches</p>";

  } catch (err) {
    document.getElementById("matchesList").innerText = "Failed to load matches.";
    console.error(err);
  }
}

loadMatches();
