document.addEventListener("DOMContentLoaded", () => {
  fetch("butikker.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("forsideAnbefalte");
      const anbefalte = data.filter(butikk => butikk.forside === true);

      anbefalte.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";

        const rating = butikk.rating || 4; // fallback rating
        const stars = "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
        const kategori = butikk.kategori || "Kategori";

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
            <div class="card anbefalt-card h-100 text-center p-3 d-flex flex-column justify-content-between">
              <div>
                <img src="${butikk.image}" alt="${butikk.alt}" class="img-fluid mb-2" loading="lazy" onerror="this.src='assets/images/logo-mangler.png'" />
                <h6 class="fw-semibold">${butikk.name}</h6>
                <p class="small text-muted mb-1">${butikk.description || ""}</p>
                <span class="badge bg-secondary small">#${kategori}</span>
              </div>
              <div class="mt-2">
                <div class="rating text-warning mb-2" style="font-size: 0.9rem;">${stars}</div>
                <button class="btn btn-outline-primary btn-sm">Besøk butikk</button>
              </div>
            </div>
          </a>
        `;

        container.appendChild(col);
      });
    })
    .catch(error => {
      console.error("Feil ved lasting av butikkdata:", error);
    });
});
