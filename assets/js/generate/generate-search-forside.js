
// ✅ generate-search-forside.js uten konflikt med globale variabler
let søkData = {
  butikker: [],
  guider: []
};

document.addEventListener("DOMContentLoaded", () => {
  const søkInput = document.getElementById("search-input");
const resultContainer = document.getElementById("search-results");


  // Last inn data fra JSON-filer
  Promise.all([
    fetch("assets/data/butikker.json").then(res => res.json()),
    fetch("assets/data/guider.json").then(res => res.json())
  ])
    .then(([butikkData, guideData]) => {
      søkData.butikker = butikkData;
      søkData.guider = guideData;
    })
    .catch(err => {
      console.error("Feil ved lasting av data for søk:", err);
    });
  // Lytt til input
  søkInput.addEventListener("input", () => {
    const søkeord = søkInput.value.toLowerCase().trim();
    resultContainer.innerHTML = "";

    if (søkeord === "") return;

    const butikkTreff = søkData.butikker.filter(b =>
      b.name.toLowerCase().includes(søkeord) ||
      (b.description && b.description.toLowerCase().includes(søkeord)) ||
      (b.kategori && b.kategori.toLowerCase().includes(søkeord))
    );

    const guideTreff = søkData.guider.filter(g =>
      g.title.toLowerCase().includes(søkeord) ||
      (g.description && g.description.toLowerCase().includes(søkeord))
    );

    if (butikkTreff.length === 0 && guideTreff.length === 0) {
      resultContainer.innerHTML = "<p>Ingen treff.</p>";
      return;
    }

    // Vis butikk-treff
    if (butikkTreff.length > 0) {
      const butikkHeader = document.createElement("h5");
      butikkHeader.textContent = "Butikker:";
      resultContainer.appendChild(butikkHeader);

      butikkTreff.forEach(b => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
          <div class="card-body">
            <h6 class="card-title">${b.name}</h6>
            <p class="card-text">${b.description || ""}</p>
            <a href="${b.url}" class="btn btn-primary btn-sm" target="_blank">Besøk</a>
          </div>
        `;
        resultContainer.appendChild(card);
      });
    }

    // Vis guide-treff
    if (guideTreff.length > 0) {
      const guideHeader = document.createElement("h5");
      guideHeader.textContent = "Guider:";
      resultContainer.appendChild(guideHeader);

      guideTreff.forEach(g => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
          <div class="card-body">
            <h6 class="card-title">${g.title}</h6>
            <p class="card-text">${g.description || ""}</p>
            <a href="${g.url}" class="btn btn-primary btn-sm">Les guide</a>
          </div>
        `;
        resultContainer.appendChild(card);
      });
    }
  });
});


