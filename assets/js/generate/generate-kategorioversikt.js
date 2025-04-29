// generate-kategorioversikt.js

document.addEventListener("DOMContentLoaded", () => {
  const kategoriListe = document.getElementById("kategori-liste");
  const kategoriSok = document.getElementById("kategori-sok");

  if (!kategoriListe || !kategoriSok) {
    console.error("Mangler kategori-liste eller søkefelt");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const hovedkategorier = Array.from(new Set(butikker.map(b => b.category))).filter(Boolean);

      function visKategorier(filter = "") {
        kategoriListe.innerHTML = "";

        hovedkategorier
          .filter(k => k.toLowerCase().includes(filter.toLowerCase()))
          .forEach(kategori => {
            const col = document.createElement("div");
            col.className = "col-6 col-md-3 mb-4";

            const ikonNavn = kategori.toLowerCase().replace(/ /g, '-') + '.png';

            col.innerHTML = `
              <div class="category-card text-center w-100">
                <a href="kategori-mal.html?kategori=${encodeURIComponent(kategori)}" class="text-decoration-none text-dark">
                  <img src="assets/images/ikoner/${ikonNavn}" alt="${kategori}" class="img-fluid mb-3" style="height: 100px; object-fit: contain;" loading="lazy">
                  <h6 class="mb-2">${kategori}</h6>
                </a>
              </div>
            `;

            kategoriListe.appendChild(col);
          });
      }

      visKategorier();

      kategoriSok.addEventListener("input", (e) => {
        visKategorier(e.target.value);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
      kategoriListe.innerHTML = "<p>Kunne ikke laste kategorier.</p>";
    });
});
