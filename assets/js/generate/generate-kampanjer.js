// generate-kategori.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const butikkContainer = document.getElementById("butikk-container");

  if (!valgtKategori || !kategoriTittel || !butikkContainer) {
    console.error("Mangler kategori eller container");
    return;
  }

  fetch("/assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const filtrerteButikker = butikker.filter(b =>
        b.category?.toLowerCase() === valgtKategori.toLowerCase()
      );

      kategoriTittel.innerHTML = `
        ${valgtKategori}
        <p class="lead text-muted mt-3">Fant ${filtrerteButikker.length} butikker</p>
        <a href="kategori.html?oversikt=true" class="btn btn-outline-primary mt-3">Tilbake til kategorier</a>
      `;

      if (filtrerteButikker.length === 0) {
        butikkContainer.innerHTML = `<p class="text-muted">Ingen butikker funnet i denne kategorien.</p>`;
        return;
      }

      butikkContainer.innerHTML = "";

      filtrerteButikker.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none">
            <div class="card p-3 h-100">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" style="height: 100px; object-fit: contain;">
              <h6 class="fw-bold">${butikk.name}</h6>
              <p class="text-muted small">${butikk.subcategory ? `(${butikk.subcategory})` : ""}</p>
              <p class="text-muted small">${butikk.description || ""}</p>
            </div>
          </a>
        `;
        butikkContainer.appendChild(col);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
      butikkContainer.innerHTML = "<p>Kunne ikke laste butikkene.</p>";
    });
});
