document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("forsideAnbefalte");
      const anbefalte = data.filter(butikk => butikk.forside === true);

      anbefalte.forEach((butikk, index) => {
        const col = document.createElement("div");
        col.className = `col-12 col-md-6 col-lg-4${index >= 8 ? " extra-store" : ""}`;

        const imageUrl = butikk.image && butikk.image.trim() !== ""
          ? butikk.image
          : "assets/images/logo-mangler.png";

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark">
            <div class="store-showcase text-center h-100">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="card-logo mb-2" loading="lazy" />
              <h5>${butikk.name}</h5>
              <p class="small text-muted">${butikk.description || ''}</p>
              <span class="btn btn-outline-primary mt-2">Besøk butikk</span>
            </div>
          </a>
        `;
        container.appendChild(col);
      });

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
