let brukteFilterknapp = false;

document.addEventListener("DOMContentLoaded", () => {
  const kategoriMeny = document.getElementById("kategoriMeny");
  const kategoriContainer = document.getElementById("kategoriContainer");
  const OFFSET = 320; // Juster denne verdien for å kontrollere hvor langt ned siden scroller

  if (!kategoriMeny || !kategoriContainer) {
    console.error("❌ Kategori-meny eller container ikke funnet");
    return;
  }

  const kategoriIkoner = {
    "Klær og mote": "fa-shirt",
    "Helse og egenpleie": "fa-heart",
    "Bøker og media": "fa-book",
    "Barn og baby": "fa-baby",
    "Elektronikk og data": "fa-tv",
    "Sport og fritid": "fa-football",
    "Møbler og interiør": "fa-couch",
    "Spill og underholdning": "fa-gamepad",
    "Mat og drikke": "fa-utensils",
    "Gaver og gadgets": "fa-gift",
    "Hobby og DIY": "fa-hammer",
    "Reise og opplevelser": "fa-plane",
    "Alt-mulig butikker": "fa-boxes"
  };
  

  // Hent butikkene fra JSON
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(butikker => {
      // Finn unike kategorier
      const hovedkategorier = Array.from(new Set(butikker.map(b => b.category))).filter(Boolean);

      // Generer navigasjonsknapper
      const knappWrapper = document.createElement("div");
      knappWrapper.className = "d-flex flex-wrap gap-2 justify-content-center mb-4";

      hovedkategorier.forEach(kategori => {
        const knapp = document.createElement("a");
        knapp.href = `#${kategori.toLowerCase().replace(/ /g, "-")}`;
        knapp.className = "btn btn-outline-primary kategori-knapp d-flex align-items-center gap-2";

        const ikonKlasse = kategoriIkoner[kategori] || "fa-tag";
        knapp.innerHTML = `<i class=\"fas ${ikonKlasse}\"></i> ${kategori}`;

        knappWrapper.appendChild(knapp);
      });

      kategoriMeny.appendChild(knappWrapper);

      // Scroll til toppen når knappen trykkes
const scrollTopButton = document.getElementById("scrollTopButton");
if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

      // Smooth scroll med offset og aktiv markering
      document.querySelectorAll(".kategori-knapp").forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelectorAll(".kategori-knapp").forEach(a => a.classList.remove("active"));
          this.classList.add("active");

          const targetElement = document.querySelector(this.getAttribute("href"));
          if (targetElement) {
            const yOffset = -OFFSET;
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
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
          col.setAttribute("data-category", butikk.category);


          const dataTags = butikk.tags ? butikk.tags.join(", ").toLowerCase() : "";

          col.innerHTML = `
  <div class="card store-card h-100 shadow-sm" data-tags="${dataTags}">
    <a href="${butikk.url}" target="_blank" rel="noopener">
      <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="max-height:100px; object-fit:contain;">
    </a>
    <div class="card-body">
      <h6 class="card-title mb-1">${butikk.name}</h6>
      <p class="small text-muted mb-2">${butikk.description || ""}</p>
      ${butikk.eksternFrakt ? `<div class="frakt-info">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe.'}">Sender fra utlandet</span></div>` : ""}
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
// 🔼 Scroll til toppen

// 🔽 Vis/skjul «Til toppen»-knappen ved scroll
window.addEventListener("scroll", () => {
  const scrollTopButton = document.getElementById("scrollTopButton");
  if (scrollTopButton) {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add("show");
    } else {
      scrollTopButton.classList.remove("show");
    }
  }
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-filter');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offset = window.innerWidth < 768 ? 100 : 120;
        const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
  
        // Lukk offcanvas på mobil
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobilFilter'));
        offcanvas?.hide();
      }
    });
  });
  
});
