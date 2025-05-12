document.addEventListener("DOMContentLoaded", () => {
  const kategoriMeny = document.getElementById("kategoriMeny");
  const kategoriContainer = document.getElementById("kategoriContainer");
  const OFFSET = 180; // Juster denne verdien for å kontrollere hvor langt ned siden scroller

  if (!kategoriMeny || !kategoriContainer) {
    console.error("❌ Kategori-meny eller container ikke funnet");
    return;
  }

  // Hent butikkene fra JSON
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(butikker => {
      // Finn unike kategorier
      const hovedkategorier = Array.from(new Set(butikker.map(b => b.category))).filter(Boolean);

      // Generer navigasjonsknapper
      hovedkategorier.forEach(kategori => {
        const knapp = document.createElement("a");
        knapp.href = `#${kategori.toLowerCase().replace(/ /g, "-")}`;
        knapp.className = "btn btn-outline-primary kategori-knapp";
        knapp.textContent = kategori;
        kategoriMeny.appendChild(knapp);
      });

      // Smooth scroll med offset og aktiv markering
      document.querySelectorAll(".kategori-knapp").forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelectorAll(".kategori-knapp").forEach(a => a.classList.remove("active"));
          this.classList.add("active");

          const targetElement = document.querySelector(this.getAttribute("href"));
          const yOffset = -OFFSET; 
          const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        });
      });

      // Generer kategoriseksjoner
      hovedkategorier.forEach(kategori => {
        const seksjon = document.createElement("div");
        seksjon.id = kategori.toLowerCase().replace(/ /g, "-");
        seksjon.className = "kategori-seksjon";

        const overskrift = document.createElement("h2");
        overskrift.textContent = kategori;
        seksjon.appendChild(overskrift);

        const row = document.createElement("div");
        row.className = "row g-3";

        const filteredStores = butikker.filter(butikk => butikk.category === kategori);

        filteredStores.forEach(butikk => {
          const col = document.createElement("div");
          col.className = "col-md-3";

          col.innerHTML = `
            <div class="card store-card h-100 shadow-sm">
              <a href="${butikk.url}" target="_blank" rel="noopener">
                <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="max-height:100px; object-fit:contain;">
              </a>
              <div class="card-body">
                <h6 class="card-title mb-1">${butikk.name}</h6>
                <p class="small text-muted">${butikk.description}</p>
              </div>
            </div>
          `;
          row.appendChild(col);
        });

        seksjon.appendChild(row);
        kategoriContainer.appendChild(seksjon);
      });
    })
    .catch(error => {
      console.error("🚨 Feil ved henting av butikker:", error);
      kategoriContainer.innerHTML = "<p>Kunne ikke laste kategoriene.</p>";
    });
});
