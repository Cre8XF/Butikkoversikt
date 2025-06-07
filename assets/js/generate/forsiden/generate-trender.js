document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(butikker => {
      const container = document.getElementById("trend-row");
      if (!container) return;

      const trendButikker = butikker.filter(b => {
        return Array.isArray(b.tags) && b.tags.some(tag =>
          ["populær", "trender", "trend", "hot"].includes(tag.toLowerCase())
        );
      }).slice(0, 4); // Maks 4 kort

      trendButikker.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-sm-6 fade-in";

        col.innerHTML = `
          <div class="card category-card h-100 border-0 shadow-sm">
            <img 
  src="${butikk.image}" 
  class="card-img-top" 
  alt="${butikk.name}" 
  width="400" 
  height="250" 
  loading="lazy" 
  style="object-fit: contain;">

            <div class="card-body text-center d-flex flex-column">
              <h5 class="card-title">${butikk.name}</h5>
              <p>${butikk.description}</p>
${butikk.eksternFrakt ? `<div class="frakt-info">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe.'}">Sender fra utlandet</span></div>` : ""}

              <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-primary mt-auto">Besøk butikk</a>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av trender:", err);
    });
});
