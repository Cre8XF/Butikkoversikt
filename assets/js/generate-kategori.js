
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");
  const tittelEl = document.getElementById("kategori-tittel");
  const container = document.getElementById("kategori-container");
  const underkategoriContainer = document.getElementById("underkategori-knapper");

  if (!kategori) {
    tittelEl.innerText = "Ingen kategori valgt.";
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const filtrert = data.filter(b => {
        const cat = Array.isArray(b.category) ? b.category : [b.category];
        return cat.map(c => c.toLowerCase()).includes(kategori.toLowerCase());
      });

      if (filtrert.length === 0) {
        tittelEl.innerText = `Fant ingen butikker i kategori: ${kategori}`;
        return;
      }

      tittelEl.innerText = kategori.charAt(0).toUpperCase() + kategori.slice(1);

      // Finn unike underkategorier for denne hovedkategorien
      const underkategorier = [...new Set(
        filtrert.map(b => b.subcategory).filter(Boolean)
      )];

      if (underkategorier.length > 0 && underkategoriContainer) {
        underkategoriContainer.innerHTML = '<div class="row justify-content-center mb-4">'
          + underkategorier.map(uk => `
            <div class="col-auto">
              <a href="kategori-mal.html?kategori=${encodeURIComponent(kategori)}&underkategori=${encodeURIComponent(uk)}" class="btn btn-outline-primary btn-sm m-1">${uk}</a>
            </div>
          `).join('') + '</div>';
      }

      const valgtUnderkategori = urlParams.get("underkategori");

      filtrert
        .filter(b => !valgtUnderkategori || b.subcategory === valgtUnderkategori)
        .forEach(butikk => {
          const imageUrl = butikk.image && butikk.image.trim() !== ""
            ? butikk.image
            : "assets/images/logo-mangler.png";

          const card = document.createElement("div");
          card.className = "col-6 col-md-3 d-flex";
          card.innerHTML = `
            <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark w-100">
              <div class="card store-card text-center shadow-sm p-3">
                <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
                <h6>${butikk.name}</h6>
                ${butikk.description ? `<p class="small text-muted">${butikk.description}</p>` : ""}
              </div>
            </a>
          `;
          container.appendChild(card);
        });
    })
    .catch(err => {
      console.error("Feil ved lasting av butikkdata:", err);
      tittelEl.innerText = "Klarte ikke å laste butikker.";
    });
});
