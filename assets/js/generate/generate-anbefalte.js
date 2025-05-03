const antallViste = 8; // Antall butikker som vises per visning
let butikker = []; // Alle butikker
let vistAntall = 0; // Hvor mange er vist
let butikkRow = document.getElementById("butikk-row");

// 1. Hent butikker fra JSON
fetch('assets/data/butikker.json')
  .then(res => res.json())
  .then(data => {
    butikker = data.filter(butikk => butikk.forside);
    visButikker(); // Vis første batch
  })
  .catch(err => console.error("Feil ved lasting av butikker:", err));

// 2. Funksjon for å vise butikker
function visButikker() {
  butikkRow.innerHTML = ""; // Nullstill før ny visning

  const visningsBatch = butikker.slice(0, vistAntall);

  visningsBatch.forEach(butikk => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card category-card h-100 d-flex flex-column text-center">
        <a href="${butikk.url}" target="_blank" rel="noopener">
          <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="max-height:80px; object-fit:contain;">
        </a>
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h6 class="card-title">${butikk.name}</h6>
            <p class="card-text small text-muted">${butikk.description}</p>
          </div>
          <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary mt-3">Besøk butikk</a>
        </div>
      </div>
    `;
    butikkRow.appendChild(col);
  });

  // Skjul/vis knapper
  document.getElementById("vis-flere-butikker").style.display = (vistAntall >= butikker.length) ? "none" : "inline-block";
  document.getElementById("vis-færre-butikker").style.display = (vistAntall > antallViste) ? "inline-block" : "none";
}

// 3. Lytt på knappene
document.getElementById("vis-flere-butikker").addEventListener("click", () => {
  vistAntall = Math.min(vistAntall + antallViste, butikker.length);
  visButikker();
});

document.getElementById("vis-færre-butikker").addEventListener("click", () => {
  vistAntall = antallViste;
  visButikker();
});
