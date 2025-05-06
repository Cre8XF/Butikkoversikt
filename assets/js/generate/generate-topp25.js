document.addEventListener("DOMContentLoaded", () => {
  const topp25Container = document.getElementById("topp25-butikker");
  if (!topp25Container) return;

  const visFlereBtn = document.getElementById("vis-flere-topp25");
  const visFaerreBtn = document.getElementById("vis-faerre-topp25");

  let topp25Liste = [];
  let vistAntall = 0;
  const antallVisning = 8;

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      topp25Liste = data
        .filter(b => b.topp25 && typeof b.rank === "number")
        .sort((a, b) => a.rank - b.rank);

      vistAntall = antallVisning;
      visTopp25();
    })
    .catch(err => console.error("Feil ved lasting av topp25:", err));

  function visTopp25() {
    topp25Container.innerHTML = "";

    topp25Liste.slice(0, vistAntall).forEach(butikk => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";
      col.innerHTML = `
        <div class="card top25-card h-100 d-flex flex-column text-center">
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
      topp25Container.appendChild(col);
    });

    visFlereBtn.style.display = (vistAntall >= topp25Liste.length) ? "none" : "inline-block";
    visFaerreBtn.style.display = (vistAntall > antallVisning) ? "inline-block" : "none";
  }

  visFlereBtn.addEventListener("click", () => {
    vistAntall = Math.min(vistAntall + antallVisning, topp25Liste.length);
    visTopp25();
  });

  visFaerreBtn.addEventListener("click", () => {
    vistAntall = antallVisning;
    visTopp25();
  });
});
