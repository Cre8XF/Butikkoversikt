document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("kategorioversikt-container");
  const kategoriListe = document.getElementById("kategorioversikt-liste");

  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const kategorier = {};

      data.forEach(butikk => {
        // Sørg for at subcategory alltid er et array
        let subcats = butikk.subcategory;
        if (!Array.isArray(subcats)) {
          subcats = typeof subcats === "string" ? [subcats] : [];
        }

        const hovedkategori = butikk.category || "Ukjent";

        if (!kategorier[hovedkategori]) {
          kategorier[hovedkategori] = {
            navn: hovedkategori,
            butikker: [],
            underkategorier: new Set()
          };
        }

        kategorier[hovedkategori].butikker.push(butikk);
        subcats.forEach(sc => kategorier[hovedkategori].underkategorier.add(sc));
      });

      // Bygg HTML
      Object.values(kategorier).forEach(kat => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";

        const underkatTekst = Array.from(kat.underkategorier).join(", ") || "Ingen underkategorier";

        col.innerHTML = `
          <a href="kategori.html?kategori=${encodeURIComponent(kat.navn)}" class="text-decoration-none">
            <div class="category-card text-center p-4 h-100">
              <img src="assets/images/ikoner/${kat.navn.toLowerCase().replace(/ /g, "-")}.png" alt="${kat.navn}" class="mb-3" style="height: 80px; object-fit: contain;">
              <h5 class="fw-semibold">${kat.navn}</h5>
              <p class="small text-muted">${underkatTekst}</p>
            </div>
          </a>
        `;
        kategoriListe.appendChild(col);
      });
    })
    .catch(error => {
      console.error("Feil ved lasting av butikker.json:", error);
      container.innerHTML = "<p class='text-danger'>Kunne ikke laste kategorioversikt.</p>";
    });
});