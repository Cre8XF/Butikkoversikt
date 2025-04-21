document.addEventListener("DOMContentLoaded", () => {
  fetch("butikker.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("forsideAnbefalte");
      const anbefalte = data.filter(butikk => butikk.forside === true);

      anbefalte.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
            <div class="featured-store-card text-center p-3">
              <img src="${butikk.image}" alt="${butikk.alt}" class="img-fluid mb-3" loading="lazy" onerror="this.src='assets/images/logo-mangler.png'" />
              <h5 class="fw-bold">${butikk.name}</h5>
              <p class="small text-muted">${butikk.description || ''}</p>
              <div><span class="btn btn-primary btn-sm mt-2">Besøk butikk</span></div>
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
