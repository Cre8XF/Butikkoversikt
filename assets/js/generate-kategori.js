document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const kategori = params.get("kategori");

  const tittelEl = document.getElementById("kategori-tittel");
  const container = document.getElementById("kategori-container");

  if (!kategori) {
    tittelEl.innerText = "Ingen kategori valgt.";
    return;
  }

  tittelEl.innerText = kategori;

  fetch("assets/data/butikker.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Kunne ikke hente butikkdata");
      }
      return response.json();
    })
    .then(data => {
      const filtrerte = data.filter(butikk => {
        const hovedkategori = Array.isArray(butikk.category)
          ? butikk.category.includes(kategori)
          : butikk.category === kategori;

        const underkategori = Array.isArray(butikk.subcategory)
          ? butikk.subcategory.includes(kategori)
          : butikk.subcategory === kategori;

        return hovedkategori || underkategori;
      });

      if (filtrerte.length === 0) {
        container.innerHTML = `<p class="text-muted">Fant ingen butikker i kategori: ${kategori}</p>`;
        return;
      }

      filtrerte.forEach(butikk => {
        const card = document.createElement("div");
        card.className = "col-6 col-md-3 text-center";

        card.innerHTML = `
          <div class="card store-card">
            <a href="${butikk.url}" target="_blank" rel="noopener">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid p-3" />
            </a>
            <div class="card-body">
              <h6 class="card-title fw-bold">${butikk.name}</h6>
              <p class="text-muted small">${butikk.description || ""}</p>
              <a href="${butikk.url}" class="btn btn-outline-primary btn-sm" target="_blank" rel="noopener">Besøk butikk</a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `<p class="text-danger">Klarte ikke å laste butikker.</p>`;
      console.error("Feil ved lasting av butikker:", error);
    });
});
