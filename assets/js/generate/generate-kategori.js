
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const butikkContainer = document.getElementById("butikk-container");
  const subcategoryFilterContainer = document.getElementById("subcategory-filter");

  if (!valgtKategori || !kategoriTittel || !butikkContainer) {
    console.error("Mangler kategori eller container");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const filtrerteButikker = butikker.filter(b =>
        (b.category || "").trim().toLowerCase() === valgtKategori.trim().toLowerCase()
      );

      if (filtrerteButikker.length === 0) {
        kategoriTittel.textContent = valgtKategori;
        butikkContainer.innerHTML = `<p class="text-muted">Ingen butikker funnet i denne kategorien.</p>`;
        return;
      }

      kategoriTittel.innerHTML = `
        ${valgtKategori}
        <p class="lead text-muted mt-3">Fant ${filtrerteButikker.length} butikker</p>
        <a href="kategori.html" class="btn btn-outline-primary mt-3">Tilbake til kategorier</a>`;

      const unikeSubkategorier = [...new Set(filtrerteButikker.map(b => b.subcategory).filter(s => s && s.trim() !== ""))];

      if (subcategoryFilterContainer && unikeSubkategorier.length > 0) {
        const buttonAll = document.createElement("button");
        buttonAll.className = "btn btn-outline-secondary btn-sm me-2 mb-2";
        buttonAll.textContent = "Alle";
        buttonAll.onclick = () => visButikker(filtrerteButikker);
        subcategoryFilterContainer.appendChild(buttonAll);

        unikeSubkategorier.forEach(sub => {
          const button = document.createElement("button");
          button.className = "btn btn-outline-secondary btn-sm me-2 mb-2";
          button.textContent = sub;
          button.onclick = () => {
            const filtrert = filtrerteButikker.filter(b =>
              (b.subcategory || "").trim().toLowerCase() === sub.trim().toLowerCase()
            );
            visButikker(filtrert);
          };
          subcategoryFilterContainer.appendChild(button);
        });
      }

      visButikker(filtrerteButikker);
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
      butikkContainer.innerHTML = "<p>Kunne ikke laste butikkene.</p>";
    });

  function visButikker(butikker) {
    const container = document.getElementById("butikk-container");
    container.innerHTML = "";
    butikker.forEach(butikk => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";

      col.innerHTML = `
        <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none">
          <div class="card p-3 h-100">
            <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" style="height: 100px; object-fit: contain;">
            <h6 class="fw-bold">${butikk.name}</h6>
            <p class="text-muted small">${butikk.description || ""}</p>
          </div>
        </a>
      `;
      container.appendChild(col);
    });
  }
});
