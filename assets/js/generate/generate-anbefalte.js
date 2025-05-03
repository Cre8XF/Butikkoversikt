const antallViste = 8; // Hvor mange butikker vises først
let butikker = []; // Lagrer alle butikkene
let vistAntall = 0; // Teller hvor mange som er vist
let butikkRow = document.getElementById("butikk-row");

// 1. Hente butikker fra JSON
fetch('assets/data/butikker.json')
  .then(response => response.json())
  .then(data => {
    butikker = data.filter(butikk => butikk.forside); // Kun forside: true
    visFlereButikker();
  })
  .catch(error => {
    console.error("Feil ved lasting av butikker:", error);
  });

// 2. Funksjon for å vise flere butikker
function visFlereButikker() {
  const nesteBatch = butikker.slice(vistAntall, vistAntall + antallViste);
  
  nesteBatch.forEach(butikk => {
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

  vistAntall += nesteBatch.length;

  if (vistAntall >= butikker.length) {
    document.getElementById("vis-flere-butikker").style.display = "none";
  }
}

// 3. Lytte på knappen
document.getElementById("vis-flere-butikker").addEventListener("click", visFlereButikker);
