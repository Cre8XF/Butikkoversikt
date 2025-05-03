// ✅ generate-topp25.js
// Viser butikker merket med "topp25": true fra butikker.json

const topp25Container = document.getElementById("topp25-butikker");

fetch("assets/data/butikker.json")
  .then(res => res.json())
  .then(data => {
    const topp25 = data.filter(butikk => butikk.topp25);

    topp25.forEach(butikk => {
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
      topp25Container.appendChild(col);
    });
  })
  .catch(err => console.error("Feil ved lasting av topp25:", err));
