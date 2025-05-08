document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("populaere-butikker");
  if (!container) return;

  const visFlereBtn = document.getElementById("vis-flere-populaere");
  const visFaerreBtn = document.getElementById("vis-færre-populaere");

  let butikkListe = [];
  let vistAntall = 0;
  const antallVisning = 8;

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      butikkListe = data
        .filter(b => b.topp25 && typeof b.rank === "number")
        .sort((a, b) => a.rank - b.rank);

      vistAntall = antallVisning;
      visButikker();
    })
    .catch(err => console.error("Feil ved lasting av populære butikker:", err));

  function visButikker() {
    container.innerHTML = "";

    butikkListe.slice(0, vistAntall).forEach(b => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";
      col.innerHTML = `
        <div class="card store-card h-100 d-flex flex-column text-center fade-in">
          <a href="${b.url}" target="_blank" rel="noopener">
            <img src="${b.image}" alt="${b.name}" class="card-img-top p-3" style="max-height:80px; object-fit:contain;">
          </a>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h6 class="card-title">${b.name}</h6>
              <p class="card-text small text-muted">${b.description || ""}</p>
            </div>
            <a href="${b.url}" target="_blank" rel="noopener" class="btn btn-primary mt-3">Besøk butikk</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    visFlereBtn.style.display = (vistAntall >= butikkListe.length) ? "none" : "inline-block";
    visFaerreBtn.style.display = (vistAntall > antallVisning) ? "inline-block" : "none";
  }

  if (visFlereBtn) {
    visFlereBtn.addEventListener("click", () => {
      vistAntall = Math.min(vistAntall + antallVisning, butikkListe.length);
      visButikker();
    });
  }

  if (visFaerreBtn) {
    visFaerreBtn.addEventListener("click", () => {
      vistAntall = antallVisning;
      visButikker();
    });
  }
});
