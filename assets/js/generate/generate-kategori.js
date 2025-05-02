// generate-kategorier.js for kategori.html

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const kategoriTeller = {};
      const navnMap = {}; // map for å koble normalisert navn til originalt navn

      // Tell hvor mange butikker per kategori, normalisert
      butikker.forEach(b => {
        const kat = (b.category || '').trim();
        const key = kat.toLowerCase();
        if (!key) return;
        kategoriTeller[key] = (kategoriTeller[key] || 0) + 1;
        navnMap[key] = kat; // beholder opprinnelig navn
      });

      const unikeKategorier = Object.keys(kategoriTeller).sort((a, b) => kategoriTeller[b] - kategoriTeller[a]);

      const popularContainer = document.getElementById("kategori-liste-popular");
      const moreContainer = document.getElementById("kategori-liste-more");

      const ikonMap = {
        "Klær og mote": "klaer-og-mote.png",
        "Elektronikk og data": "elektronikk-og-data.png",
        "Helse og skjønnhet": "helse-og-egenpleie.png",
        "Møbler og interiør": "mobler-og-interior.png",
        "Sport og fritid": "sport-og-fritid.png",
        "Hobby og DIY": "diy.png",
        "Barn og baby": "barn-og-baby.png",
        "Spill og underholdning": "spill-og-underholdning.png",
        "Gaver og gadgets": "gaver-og-gadgets.png",
        "Bøker og media": "boker-og-underholdning.png",
        "Reise og opplevelser": "reise-og-opplevelser.png",
        "Mat og drikke": "mat-og-drikke.png",
        "Alt-mulig butikker": "altmulig.png"
      };

      unikeKategorier.slice(0, 6).forEach(key => {
        const navn = navnMap[key];
        popularContainer.appendChild(lagKategoriKort(navn, kategoriTeller[key], ikonMap[navn]));
      });

      unikeKategorier.slice(6).forEach(key => {
        const navn = navnMap[key];
        moreContainer.appendChild(lagKategoriKort(navn, kategoriTeller[key], ikonMap[navn]));
      });

      // Toggle-knapp
      document.getElementById("toggleMore").addEventListener("click", function () {
        moreContainer.classList.toggle("d-none");
        this.textContent = moreContainer.classList.contains("d-none") ? "Vis alle kategorier" : "Skjul kategorier";
      });

      // Søkefunksjon (valgfritt)
      const sokefelt = document.getElementById("kategori-sok");
      if (sokefelt) {
        sokefelt.addEventListener("input", () => {
          const søk = sokefelt.value.toLowerCase();
          [...popularContainer.children, ...moreContainer.children].forEach(card => {
            const navn = card.querySelector(".card-title").textContent.toLowerCase();
            card.style.display = navn.includes(søk) ? "block" : "none";
          });
        });
      }
    })
    .catch(error => {
      console.error("Feil ved lasting av butikker.json:", error);
    });
});

function lagKategoriKort(kategoriNavn, antall, ikonFil) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3";

  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="assets/images/ikoner/${ikonFil || 'default.png'}" class="card-img-top" alt="${kategoriNavn}">
      <div class="card-body text-center">
        <h5 class="card-title">${kategoriNavn}</h5>
        <p class="card-text text-muted">${antall || 0} butikker</p>
        <a href="kategori-mal.html?kategori=${encodeURIComponent(kategoriNavn)}" class="btn btn-primary">Utforsk</a>
      </div>
    </div>
  `;

  return col;
}
