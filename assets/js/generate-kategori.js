document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");
  const tittelEl = document.getElementById("kategori-tittel");
  const container = document.getElementById("kategori-container");
  const underkategoriEl = document.getElementById("underkategori-valg");

  if (!kategori) {
    tittelEl.innerText = "Ingen kategori valgt.";
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(butikker => {
      // Filtrering for både kategori og underkategori
      const filtrerte = butikker.filter(butikk => {
        const iKategori = Array.isArray(butikk.category)
          ? butikk.category.includes(kategori)
          : butikk.category === kategori;

        const iUnderkategori = Array.isArray(butikk.subcategory)
          ? butikk.subcategory.includes(kategori)
          : butikk.subcategory === kategori;

        return iKategori || iUnderkategori;
      });

      if (filtrerte.length === 0) {
        tittelEl.innerText = `Fant ingen butikker i kategori: ${kategori}`;
        return;
      }

      // Sett tittel
      tittelEl.innerText = kategori.charAt(0).toUpperCase() + kategori.slice(1);

      // Lag knapper for underkategorier (dersom aktuelt)
      const underkategorier = [
        "Dameklær",
        "Herreklær",
        "Tilbehør og sko"
      ];

      if (kategori === "Klær og mote") {
        underkategoriEl.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center mb-4">
            ${underkategorier.map(navn => `
              <a href="kategori-mal.html?kategori=${encodeURIComponent(navn)}" class="btn btn-outline-primary m-1">${navn}</a>
            `).join("")}
          </div>
        `;
      } else {
        underkategoriEl.innerHTML = "";
      }

      filtrerte.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== ""
          ? butikk.image
          : "assets/images/logo-mangler.png";

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
