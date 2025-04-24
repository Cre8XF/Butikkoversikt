document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("kategori-container");
  const tittel = document.getElementById("kategori-tittel");
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");

  const underkategoriMap = {
    "Klær og mote": ["Dameklær", "Herreklær", "Tilbehør og sko"],
    "Elektronikk": ["Gaming-PC", "Mobil og tilbehør", "Lyd og bilde"],
    "Bøker og underholdning": ["Spill og konsoller", "Filmer og bøker", "Merchandise"]
  };

  tittel.textContent = kategori
    ? decodeURIComponent(kategori)
    : "Vi henter butikker i denne kategorien...";

  try {
    const response = await fetch('assets/data/butikker.json') ;
    const butikker = await response.json();

    const filtrerte = butikker.filter(butikk => {
      if (!kategori) return false;
      return Array.isArray(butikk.category)
        ? butikk.category.includes(kategori)
        : butikk.category === kategori;
    });

    if (filtrerte.length === 0) {
      container.innerHTML = `<p class="text-center text-muted">Fant ingen butikker i kategori: ${kategori}</p>`;
    } else {
      filtrerte.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        col.innerHTML = `
          <div class="category-card h-100">
            <img src="${butikk.image}" alt="${butikk.alt}" class="card-logo mb-3">
            <h5 class="fw-bold">${butikk.name}</h5>
            <p class="text-muted small">${butikk.description}</p>
            <a href="${butikk.url}" class="btn btn-outline-primary mt-auto" target="_blank" rel="noopener">Besøk butikk</a>
          </div>
        `;
        container.appendChild(col);
      });
    }

    // Vis underkategori-knapper hvis det finnes for valgt hovedkategori
    if (underkategoriMap[kategori]) {
      const underkatContainer = document.createElement("div");
      underkatContainer.className = "text-center my-4";
      underkatContainer.innerHTML = `<h5>Underkategorier</h5>`;
      underkategoriMap[kategori].forEach(uk => {
        const btn = document.createElement("a");
        btn.href = `kategori-mal.html?kategori=${encodeURIComponent(uk)}`;
        btn.className = "btn btn-primary mx-1 my-2";
        btn.textContent = uk;
        underkatContainer.appendChild(btn);
      });
      tittel.parentElement.insertBefore(underkatContainer, container);
    }
  } catch (error) {
    console.error("Feil ved lasting av butikker:", error);
    container.innerHTML = `<p class="text-danger text-center">Klarte ikke å laste butikker.</p>`;
  }
});
