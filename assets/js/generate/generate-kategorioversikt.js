document.addEventListener("DOMContentLoaded", () => {
  const kategoriListe = document.getElementById("kategori-liste");
  const kategoriSok = document.getElementById("kategori-sok");

  if (!kategoriListe || !kategoriSok) {
    console.error("Mangler elementer for kategorioversikt");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(butikker => {
      const hovedkategorier = Array.from(new Set(butikker.map(b => b.category))).filter(Boolean);

      hovedkategorier.forEach(kategori => {
        const ikonNavn = kategori
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + ".png";

        const kort = document.createElement("div");
        kort.className = "col-6 col-md-4 col-lg-3 kategori-kort";
        kort.setAttribute("data-kategori", kategori.toLowerCase());

        kort.innerHTML = `
          <a href="kategori-mal.html?kategori=${encodeURIComponent(kategori)}" class="text-decoration-none text-dark">
            <div class="card p-4 h-100 shadow-sm d-flex flex-column justify-content-center align-items-center">
              <img src="assets/images/ikoner/${ikonNavn}" alt="${kategori}" class="img-fluid mb-3" style="height: 80px; object-fit: contain;">
              <h6 class="fw-bold">${kategori}</h6>
            </div>
          </a>
        `;

        kategoriListe.appendChild(kort);
      });

      kategoriSok.addEventListener("input", () => {
        const sok = kategoriSok.value.toLowerCase();
        document.querySelectorAll(".kategori-kort").forEach(kort => {
          const vis = kort.getAttribute("data-kategori").includes(sok);
          kort.classList.toggle("d-none", !vis);
        });
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av kategorier:", err);
      kategoriListe.innerHTML = "<p>Kunne ikke laste kategoriene.</p>";
    });
});
