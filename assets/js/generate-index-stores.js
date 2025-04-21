document.addEventListener("DOMContentLoaded", () => {
  fetch("butikker.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("forsideAnbefalte");
      if (!container) return;

      const anbefalte = data.filter(butikk => butikk.forside === true);

      anbefalte.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
            <div class="anbefalt-card h-100 text-center p-3 d-flex flex-column justify-content-between shadow-sm rounded-3 hover-shadow">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy"
                   onerror="this.src='assets/images/logo-mangler.png'" />
              <h6 class="fw-semibold">${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ''}</p>
            </div>
          </a>
        `;
        container.appendChild(col);
      });
    })
    .catch(error => {
      console.error("Feil ved lasting av anbefalte butikker:", error);
    });
});
