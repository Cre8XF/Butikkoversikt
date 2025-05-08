document.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 generate-anbefalte.js ble kjørt");

  const antallViste = 8; // Antall butikker som vises per visning
  let butikker = []; // Alle anbefalte butikker
  let vistAntall = 0; // Hvor mange vises
  let butikkContainer = document.getElementById("populaere-butikker");

  // 1. Hent og filtrer anbefalte butikker
  fetch('assets/data/butikker.json')
    .then(res => res.json())
    .then(data => {
      butikker = data.filter(butikk => butikk.anbefalt);
      vistAntall = antallViste;
      visButikker();
    })
    .catch(err => console.error("Feil ved lasting av anbefalte butikker:", err));

  // 2. Vis anbefalte butikker
  function visButikker() {
    butikkContainer.innerHTML = "";

    const batch = butikker.slice(0, vistAntall);

    batch.forEach(butikk => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";

      col.innerHTML = `
        <div class="card store-card h-100 d-flex flex-column text-center shadow-sm">
          <a href="${butikk.url}" target="_blank" rel="noopener">
            <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="max-height:80px; object-fit:contain;">
          </a>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h6 class="card-title mb-1">${butikk.name}</h6>
              ${butikk.category ? `<p class="small text-muted mb-1">${butikk.category}</p>` : ''}
              <p class="card-text small text-muted">${butikk.description || ''}</p>
            </div>
            <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary mt-3">Besøk nettbutikken</a>
          </div>
        </div>
      `;
      butikkContainer.appendChild(col);
    });

    // Oppdater vis/skjul av knapper
    document.getElementById("vis-flere-populaere").style.display =
      (vistAntall >= butikker.length) ? "none" : "inline-block";

    document.getElementById("vis-færre-populaere").style.display =
      (vistAntall > antallViste) ? "inline-block" : "none";
  }

  // 3. Knapper
  document.getElementById("vis-flere-populaere").addEventListener("click", () => {
    vistAntall = Math.min(vistAntall + antallViste, butikker.length);
    visButikker();
  });

  document.getElementById("vis-færre-populaere").addEventListener("click", () => {
    vistAntall = antallViste;
    visButikker();
  });
});
