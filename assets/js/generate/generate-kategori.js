// generate-kategori.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const butikkContainer = document.getElementById("butikk-container");
  const filterContainer = document.getElementById("filter-container");

  if (!valgtKategori || !kategoriTittel || !butikkContainer || !filterContainer) {
    console.error("Mangler kategori eller container");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const filtrerteButikker = butikker.filter(b => (b.category || "").trim().toLowerCase() === valgtKategori.trim().toLowerCase());

      if (filtrerteButikker.length === 0) {
        kategoriTittel.textContent = valgtKategori;
        butikkContainer.innerHTML = '<p class="text-muted">Ingen butikker funnet i denne kategorien.</p>';
        return;
      }

      // Hent unike underkategorier
      const underkategorier = new Set();
      filtrerteButikker.forEach(b => {
        const subcats = Array.isArray(b.subcategory) ? b.subcategory : [b.subcategory];
        subcats.forEach(sc => {
          if (sc && sc.trim()) {
            underkategorier.add(sc.trim());
          }
        });
      });

      // Lag filterknapper
      const filterButtons = document.createElement("div");
      filterButtons.className = "mb-4 d-flex flex-wrap gap-2 justify-content-center";

      const alleBtn = document.createElement("button");
      alleBtn.className = "btn btn-warning";
      alleBtn.textContent = "Alle";
      alleBtn.addEventListener("click", () => renderButikker(filtrerteButikker));
      filterButtons.appendChild(alleBtn);

      underkategorier.forEach(subcat => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-warning";
        btn.textContent = subcat;
        btn.addEventListener("click", () => {
          const filtrert = filtrerteButikker.filter(b => {
            const subcats = Array.isArray(b.subcategory) ? b.subcategory : [b.subcategory];
            return subcats.includes(subcat);
          });
          renderButikker(filtrert);
        });
        filterButtons.appendChild(btn);
      });

      filterContainer.appendChild(filterButtons);

      kategoriTittel.innerHTML = `${valgtKategori}<p class="lead text-muted mt-3">Fant ${filtrerteButikker.length} butikker</p>
      <a href="kategori.html" class="btn btn-outline-primary mt-3">Tilbake til kategorier</a>`;

      renderButikker(filtrerteButikker);
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
      butikkContainer.innerHTML = '<p class="text-muted">Kunne ikke laste butikkene.</p>';
    });

  function renderButikker(liste) {
    butikkContainer.innerHTML = "";
    liste.forEach(butikk => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";

      col.innerHTML = `
        <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none">
          <div class="card p-3 h-100">
            <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2">
            <h6 class="fw-bold">${butikk.name}</h6>
            <p class="text-muted small">${butikk.description || ""}</p>
          </div>
        </a>
      `;
      butikkContainer.appendChild(col);
    });
  }
});
