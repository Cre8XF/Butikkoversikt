document.addEventListener("DOMContentLoaded", function () {
  const kategoriListe = document.getElementById("kategori-liste");
  const kategoriSok = document.getElementById("kategori-sok");

  if (!kategoriListe) {
    console.error("Fant ikke container for kategorier (#kategori-liste)");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const kategorier = {};

      data.forEach(butikk => {
        const hovedkategori = butikk.category?.trim();
        if (!hovedkategori) return;

        if (!kategorier[hovedkategori]) {
          kategorier[hovedkategori] = {
            navn: hovedkategori,
            antall: 0,
            ikon: `assets/images/ikoner/${hovedkategori.toLowerCase().replace(/ /g, "-")}.png`
          };
        }

        kategorier[hovedkategori].antall += 1;
      });

      const kategoriArray = Object.values(kategorier);

      function render(filter = "") {
        kategoriListe.innerHTML = "";

        kategoriArray
          .filter(k => k.navn.toLowerCase().includes(filter.toLowerCase()))
          .forEach(kategori => {
            const col = document.createElement("div");
            col.className = "col-6 col-md-4 col-lg-3";

            col.innerHTML = `
              <a href="kategori.html?kategori=${encodeURIComponent(kategori.navn)}" class="text-decoration-none">
                <div class="category-card text-center p-4 h-100">
                  <img src="${kategori.ikon}" alt="${kategori.navn}" class="mb-3" style="height: 80px; object-fit: contain;">
                  <h5>${kategori.navn}</h5>
                  <p class="text-muted small">${kategori.antall} butikker</p>
                </div>
              </a>
            `;

            kategoriListe.appendChild(col);
          });
      }

      render();

      if (kategoriSok) {
        kategoriSok.addEventListener("input", function () {
          render(kategoriSok.value);
        });
      }
    })
    .catch(error => {
      console.error("Feil ved lasting av butikker.json:", error);
      kategoriListe.innerHTML = `<p class="text-danger">Kunne ikke laste kategorier. Prøv igjen senere.</p>`;
    });
});
