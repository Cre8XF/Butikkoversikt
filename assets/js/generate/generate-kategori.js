// generate-kategorier.js for kategori.html

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(r => r.json())
    .then(butikker => {
      const kategoriTeller = {};

      // Tell hvor mange butikker per kategori
      butikker.forEach(b => {
        const kat = b.category;
        if (!kat) return;
        kategoriTeller[kat] = (kategoriTeller[kat] || 0) + 1;
      });

      const unikeKategorier = Object.keys(kategoriTeller).sort((a, b) => kategoriTeller[b] - kategoriTeller[a]);

      const popularContainer = document.getElementById("kategori-liste-popular");
      const moreContainer = document.getElementById("kategori-liste-more");

      const ikonMap = {
        "Klær og mote": "klaer.png",
        "Elektronikk og data": "elektronikk.png",
        "Helse og skjønnhet": "helse.png",
        "Møbler og interiør": "interior.png",
        "Sport og fritid": "sport.png",
        "Hobby og DIY": "diy.png",
        "Barn og baby": "barn.png",
        "Spill og underholdning": "spill.png",
        "Gaver og gadgets": "gaver.png",
        "Bøker og media": "boker.png",
        "Reise og opplevelser": "reise.png",
        "Mat og drikke": "mat.png",
        "Alt-mulig butikker": "altmulig.png"
      };

      unikeKategorier.slice(0, 6).forEach(kat => {
        popularContainer.appendChild(lagKategoriKort(kat, kategoriTeller[kat], ikonMap[kat]));
      });

      unikeKategorier.slice(6).forEach(kat => {
        moreContainer.appendChild(lagKategoriKort(kat, kategoriTeller[kat], ikonMap[kat]));
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
        <p class="card-text text-muted">${antall} butikker</p>
        <a href="kategori-mal.html?kategori=${encodeURIComponent(kategoriNavn)}" class="btn btn-primary">Utforsk</a>
      </div>
    </div>
  `;

  return col;
}
