document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("forsideAnbefalte");
      const anbefalte = data.filter(butikk => butikk.forside === true);

      anbefalte.forEach((butikk, index) => {
        const col = document.createElement("div");
        col.className = `col-6 col-md-3${index >= 8 ? " extra-store" : ""}`;

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
            <div class="card store-card">

              <img src="${butikk.image}" alt="${butikk.alt}" class="img-fluid mb-2" loading="lazy"
                onerror="this.src='assets/images/logo-mangler.png'" />
              <h6>${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ''}</p>
            </div>
          </a>
        `;
        container.appendChild(col);
      });

      // Toggle-knapp for å vise/fjerne ekstra kort
      const toggleBtn = document.getElementById("toggleStoresBtn");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
          container.classList.toggle("show-all");
          this.textContent = container.classList.contains("show-all") ? "Vis færre" : "Vis alle";
        });
      }
    })
    .catch(error => {
      console.error("Feil ved lasting av butikkdata:", error);
    });
});
