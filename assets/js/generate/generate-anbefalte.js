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
      <div class="card store-showcase text-center w-100 h-100">
        <a href="${butikk.url}" target="_blank" rel="noopener">
          <img src="${butikk.image}" alt="${butikk.name}" class="mb-3" style="max-height:80px;object-fit:contain;">
          <h6>${butikk.name}</h6>
          <p class="text-muted small">${butikk.description}</p>
        </a>
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
