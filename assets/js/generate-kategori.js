document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const kategori = decodeURIComponent(params.get("kategori") || "").trim();
  const container = document.getElementById("kategori-container");
  const tittel = document.getElementById("kategori-tittel");

  if (!kategori || !container || !tittel) return;

  tittel.textContent = kategori;

  // Vis underkategori-knapper for "Klær og mote"
  if (kategori === "Klær og mote") {
    const underkatWrapper = document.getElementById("underkategorier-wrapper");
    if (underkatWrapper) {
      underkatWrapper.classList.remove("d-none");
    }
  }

  fetch("assets/data/butikker.json")
    .then((res) => res.json())
    .then((butikker) => {
      const filtrerte = butikker.filter((butikk) => {
        const hovedkategori = Array.isArray(butikk.category)
          ? butikk.category.map(k => k.toLowerCase().trim()).includes(kategori.toLowerCase().trim())
          : butikk.category?.toLowerCase().trim() === kategori.toLowerCase().trim();

        const underkategori = Array.isArray(butikk.subcategory)
          ? butikk.subcategory.map(k => k.toLowerCase().trim()).includes(kategori.toLowerCase().trim())
          : butikk.subcategory?.toLowerCase().trim() === kategori.toLowerCase().trim();

        return hovedkategori || underkategori;
      });

      if (filtrerte.length === 0) {
        container.innerHTML = `<p class="text-muted">Ingen butikker funnet i denne kategorien.</p>`;
        return;
      }

      container.innerHTML = filtrerte
        .map(
          (butikk) => `
        <div class="col-6 col-md-3">
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-center d-block store-showcase">
            <img src="${butikk.image}" alt="${butikk.alt}" class="card-logo mb-2">
            <h6>${butikk.name}</h6>
            <p class="small text-muted">${butikk.description}</p>
          </a>
        </div>
      `
        )
        .join("");
    })
    .catch((err) => {
      console.error("Feil ved lasting av butikker:", err);
      container.innerHTML = `<p class="text-danger">Det oppstod en feil ved lasting av butikker.</p>`;
    });
});
