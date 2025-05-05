// generate-kategorioversikt.js – Oppdatert og ryddet versjon

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
        // Generer ikon-navn basert på kategoritekst
        const ikonNavn = kategori
          .toLowerCase()
          .replace(/æ/g, "ae")
          .replace(/ø/g, "o")
          .replace(/å/g, "a")
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Fjern diakritiske tegn
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + ".png";

        // Bygg HTML-struktur for kort
        const kort = document.createElement("div");
        kort.className = "col-6 col-md-4 col-lg-3 kategori-kort";
        kort.setAttribute("data-kategori", kategori.toLowerCase());

        const link = document.createElement("a");
        link.href = `kategori.html?kategori=${encodeURIComponent(kategori)}`;
        link.className = "text-decoration-none text-dark";

        const card = document.createElement("div");
        card.className = "card p-4 h-100 shadow-sm d-flex flex-column justify-content-center align-items-center";

        const img = document.createElement("img");
        img.src = `assets/images/ikoner/${ikonNavn}`;
        img.alt = kategori;
        img.className = "img-fluid mb-3";
        img.style.height = "80px";
        img.style.objectFit = "contain";

        const tittel = document.createElement("h6");
        tittel.className = "fw-bold";
        tittel.textContent = kategori;

        // Sett sammen kortet
        card.appendChild(img);
        card.appendChild(tittel);
        link.appendChild(card);
        kort.appendChild(link);
        kategoriListe.appendChild(kort);
      });

      // Søke/filter-funksjon
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
