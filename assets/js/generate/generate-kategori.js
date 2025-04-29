document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const kategoriContainer = document.getElementById("kategori-container");

  if (!valgtKategori || !kategoriTittel || !kategoriContainer) {
    console.error("Mangler kategori eller container");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const filtrerteButikker = butikker.filter(b => 
        b.category?.toLowerCase() === valgtKategori.toLowerCase()
      );

      kategoriTittel.textContent = valgtKategori;

      kategoriContainer.innerHTML = "";
      filtrerteButikker.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3 mb-4";

        col.innerHTML = `
          <div class="store-card text-center w-100">
            <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-3" style="height: 120px; object-fit: contain;" loading="lazy">
              <h6 class="mb-2">${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ""}</p>
            </a>
          </div>
        `;
        kategoriContainer.appendChild(col);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
      kategoriContainer.innerHTML = "<p>Kunne ikke laste butikker.</p>";
    });
});
