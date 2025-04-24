fetch('butikker.json')
  .then(response => response.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const kategori = params.get('kategori');
    const tittelEl = document.getElementById('kategoriTittel');
    const containerEl = document.getElementById('butikkContainer');
    const underkategoriEl = document.getElementById('underkategorier');

    if (!kategori || !tittelEl || !containerEl || !underkategoriEl) {
      console.warn("Mangler element eller kategori");
      return;
    }

    tittelEl.innerText = kategori;

    // Sett opp underkategorier kun for "Klær og mote"
    if (kategori === "Klær og mote") {
      const underkategorier = ["Dameklær", "Herreklær", "Tilbehør og sko"];
      underkategoriEl.innerHTML = `
        <div class="d-flex flex-wrap justify-content-center mb-4">
          ${underkategorier
            .map(
              navn => `
              <a href="kategori-mal.html?kategori=${encodeURIComponent(navn)}" 
                 class="btn btn-primary m-1">${navn}</a>
            `
            )
            .join("")}
        </div>
      `;
    } else {
      underkategoriEl.innerHTML = "";
    }

    // Filtrer butikker
    const filtrerte = data.filter(butikk => {
      if (butikk.subcategory === kategori) return true;
      if (Array.isArray(butikk.category)) {
        return butikk.category.includes(kategori);
      } else {
        return butikk.category === kategori;
      }
    });

    // Render butikker
    if (filtrerte.length === 0) {
      containerEl.innerHTML = `<p class="text-center text-muted">Fant ingen butikker i kategori: ${kategori}</p>`;
    } else {
      containerEl.innerHTML = filtrerte
        .map(
          butikk => `
        <div class="col-6 col-md-3 mb-4">
          <div class="card store-card text-center h-100">
            <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none p-3 d-block">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="card-logo mb-2" />
              <h6 class="mb-1">${butikk.name}</h6>
              <p class="small text-muted">${butikk.description}</p>
              <span class="btn btn-outline-primary btn-sm mt-auto">Besøk butikk</span>
            </a>
          </div>
        </div>
      `
        )
        .join("");
    }
  })
  .catch(error => {
    console.error("Feil ved lasting av butikker:", error);
    const el = document.getElementById('butikkContainer');
    if (el) {
      el.innerHTML = `<p class="text-danger text-center">Klarte ikke å laste butikker.</p>`;
    }
  });
