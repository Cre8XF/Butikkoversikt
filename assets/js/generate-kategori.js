document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");
  const tittelEl = document.getElementById("kategori-tittel");
  const container = document.getElementById("kategori-container");

  if (!kategori) {
    tittelEl.innerText = "Ingen kategori valgt.";
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const filtrert = data.filter(b => b.category?.toLowerCase() === kategori.toLowerCase());

      if (filtrert.length === 0) {
        tittelEl.innerText = `Fant ingen butikker i kategori: ${kategori}`;
        return;
      }

      tittelEl.innerText = kategori.charAt(0).toUpperCase() + kategori.slice(1);

      // Sjekk om noen butikker har subcategory
      const harSubkategorier = filtrert.some(b => b.subcategory);

      if (harSubkategorier) {
        // Gruppér på subcategory
        const grupperte = {};
        filtrert.forEach(b => {
          const sub = b.subcategory || "Annet";
          if (!grupperte[sub]) grupperte[sub] = [];
          grupperte[sub].push(b);
        });

        Object.entries(grupperte).forEach(([subcat, butikker]) => {
          const section = document.createElement("section");
          section.className = "mb-5";
          section.innerHTML = `
            <h3 class="mb-4">${subcat}</h3>
            <div class="row g-4 justify-content-center">
              ${butikker.map(butikk => {
                const imageUrl = butikk.image?.trim() || "assets/images/logo-mangler.png";
                return `
                <div class="col-6 col-md-3 d-flex">
                  <div class="store-showcase text-center w-100">
                    <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
                    <h5>${butikk.name}</h5>
                    <p class="small text-muted">${butikk.description || ""}</p>
                    <a href="${butikk.url}" target="_blank" class="btn btn-primary btn-sm mt-2" rel="noopener">Besøk butikk</a>
                  </div>
                </div>
                `;
              }).join("")}
            </div>
          `;
          container.appendChild(section);
        });
      } else {
        // Ingen subcategory – vis alt samlet
        filtrert.forEach(butikk => {
          const imageUrl = butikk.image?.trim() || "assets/images/logo-mangler.png";
          const card = document.createElement("div");
          card.className = "col-6 col-md-3 d-flex";
          card.innerHTML = `
            <div class="store-showcase text-center w-100">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
              <h5>${butikk.name}</h5>
              <p class="small text-muted">${butikk.description || ""}</p>
              <a href="${butikk.url}" target="_blank" class="btn btn-primary btn-sm mt-2" rel="noopener">Besøk butikk</a>
            </div>
          `;
          container.appendChild(card);
        });
      }
    })
    .catch(error => {
      container.innerHTML = `<p class="text-danger">Feil ved lasting av butikker.</p>`;
      console.error(error);
    });
});
