document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const valgtKategori = urlParams.get("kategori");
  const tittelEl = document.getElementById("kategori-tittel");
  const container = document.getElementById("kategori-container");

  // Underkategori-definisjon
  const underkategoriMap = {
    "Klær og mote": ["Dameklær", "Herreklær", "Tilbehør og sko"]
  };

  // Sett tittel
  if (!valgtKategori) {
    tittelEl.innerText = "Ingen kategori valgt.";
    return;
  }

  // Hent butikkdata
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const filtrert = data.filter(butikk => {
        const hovedkat = Array.isArray(butikk.category)
          ? butikk.category.map(k => k.toLowerCase())
          : [butikk.category?.toLowerCase()];

        const underkat = Array.isArray(butikk.subcategory)
          ? butikk.subcategory.map(k => k.toLowerCase())
          : [butikk.subcategory?.toLowerCase()];

        return hovedkat.includes(valgtKategori.toLowerCase()) ||
               underkat.includes(valgtKategori.toLowerCase());
      });

      // Sett riktig tittel
      tittelEl.innerText = valgtKategori;

      // Hvis underkategorier finnes
      if (underkategoriMap[valgtKategori]) {
        const underkatDiv = document.createElement("div");
        underkatDiv.className = "text-center mb-4";
        underkatDiv.innerHTML = `
          <h6>Underkategorier</h6>
          <div class="d-flex justify-content-center flex-wrap gap-2 mt-2">
            ${underkategoriMap[valgtKategori]
              .map(
                navn =>
                  `<a href="kategori-mal.html?kategori=${encodeURIComponent(navn)}" class="btn btn-outline-primary btn-sm">${navn}</a>`
              )
              .join("")}
          </div>
        `;
        container.before(underkatDiv);
      }

      if (filtrert.length === 0) {
        container.innerHTML = `<p>Fant ingen butikker i kategori: <strong>${valgtKategori}</strong></p>`;
        return;
      }

      filtrert.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "/assets/images/logo-mangler.png";

        const card = document.createElement("div");
        card.className = "col-6 col-md-3 text-center";
        card.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark">
            <div class="card store-card">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
              <h6>${butikk.name}</h6>
              ${butikk.description ? `<p class="small text-muted">${butikk.description}</p>` : ""}
            </div>
          </a>
        `;
        container.appendChild(card);
      });
    });
});
