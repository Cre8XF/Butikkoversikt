document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const butikkContainer = document.getElementById("butikk-container");
  const filterContainer = document.getElementById("subcategory-filter");

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

      // Vis tittel og antall
      kategoriTittel.innerHTML = `
        ${valgtKategori}
        <p class="lead text-muted mt-3">Fant ${filtrerteButikker.length} butikker</p>
        <a href="kategori.html" class="btn btn-outline-primary mt-3">Tilbake til kategorier</a>
      `;

      // Samle alle unike underkategorier (flatmap støtter både enkeltstreng og array)
      const underkategorier = [...new Set(
        filtrerteButikker.flatMap(b => Array.isArray(b.subcategory) ? b.subcategory : [b.subcategory])
      )];

      // Lag filterknapper
      filterContainer.innerHTML = `
        <button class="btn btn-warning btn-sm me-2 mb-2" data-filter="Alle">Alle</button>
        ${underkategorier.map(sub =>
          `<button class="btn btn-warning btn-sm me-2 mb-2" data-filter="${sub}">${sub}</button>`
        ).join("")}
      `;

      // Håndter filtrering ved klikk
      filterContainer.addEventListener("click", e => {
        if (!e.target.matches("button[data-filter]")) return;

        const valgt = e.target.getAttribute("data-filter");

        const synlige = valgt === "Alle"
          ? filtrerteButikker
          : filtrerteButikker.filter(b => {
              const subs = Array.isArray(b.subcategory) ? b.subcategory : [b.subcategory];
              return subs.includes(valgt);
            });

        visButikker(synlige);
      });

      // Start med alle butikker
      visButikker(filtrerteButikker);

      function visButikker(liste) {
        butikkContainer.innerHTML = "";
        liste.forEach(butikk => {
          const col = document.createElement("div");
          col.className = "col-6 col-md-4 col-lg-3";
          col.innerHTML = `
            <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none">
              <div class="card p-3 h-100">
                <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-3" loading="lazy">
                <h6 class="fw-bold">${butikk.name}</h6>
                <p class="text-muted small">${butikk.description || ""}</p>
              </div>
            </a>
          `;
          butikkContainer.appendChild(col);
        });
      }
    })
    .catch(error => {
      console.error("Feil ved lasting av butikker.json:", error);
      butikkContainer.innerHTML = "<p class='text-danger'>Kunne ikke laste butikkene.</p>";
    });
});
