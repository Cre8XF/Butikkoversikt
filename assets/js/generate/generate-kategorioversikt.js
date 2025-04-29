document.addEventListener("DOMContentLoaded", () => {
  const liste = document.getElementById("kategori-liste");
  const sok = document.getElementById("kategori-sok");

  if (!liste) {
    console.error("Fant ikke container for kategorier (#kategori-liste)");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error("butikker.json er ikke et array");
      }

      const kategorier = {};

      data.forEach(butikk => {
        const hovedkategori = butikk.category?.trim();
        if (!hovedkategori) return;

        if (!kategorier[hovedkategori]) {
          kategorier[hovedkategori] = {
            navn: hovedkategori,
            antall: 0,
            ikonsrc: `assets/images/ikoner/${hovedkategori.toLowerCase().replace(/ /g, "-")}.png`
          };
        }

        kategorier[hovedkategori].antall += 1;
      });

      const kategoriArray = Object.values(kategorier);

      // Tegn kategori-kort
      function render(filter = "") {
        liste.innerHTML = "";
        kategoriArray
          .filter(k => k.navn.toLowerCase().includes(filter.toLowerCase()))
          .forEach(kategori => {
            const col = document.createElement("div");
            col.className = "col-6 col-md-4 col-lg-3";

            col.innerHTML = `
              <a href="kategori.html?kategori=${encodeURIComponent(kategori.navn)}" class="text-decoration-none">
                <div class="card p-4 text-center h-100">
                  <img src="${kategori.ikonsrc}" alt="${kategori.navn}" class="mb-3" style="height: 80px; object-fit: contain;">
                  <h5>${kategori.navn}</h5>
                  <p class="text-muted small">${kategori.antall} butikker</p>
                </div>
              </a>
            `;
            liste.appendChild(col);
          });
      }

      render();

      if (sok) {
        sok.addEventListener("input", () => {
          render(sok.value);
        });
      }
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
      if (liste) {
        liste.innerHTML = `<p class="text-danger">Kunne ikke laste kategorier. Prøv igjen senere.</p>`;
      }
    });
});
