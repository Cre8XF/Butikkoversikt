document.addEventListener("DOMContentLoaded", () => {
  const kategoriMeny = document.getElementById("kategoriMeny");
  const butikkContainer = document.getElementById("butikk-container");
  const kategoriTittel = document.getElementById("kategori-tittel");

  if (!kategoriMeny || !butikkContainer || !kategoriTittel) {
    console.error("❌ Elementer mangler: kategoriMeny, butikkContainer eller kategoriTittel");
    return;
  }

  // Hent data fra JSON
  fetch('assets/data/butikker.json')
    .then(res => res.json())
    .then(data => {
      const urlParams = new URLSearchParams(window.location.search);
      const valgtKategori = urlParams.get("kategori");

      if (valgtKategori) {
        kategoriTittel.textContent = valgtKategori.replace(/-/g, " ");
        genererKategoriNavigasjon(data, valgtKategori);
        genererButikkKort(data, valgtKategori);
      } else {
        kategoriTittel.textContent = "Alle Kategorier";
        genererKategoriNavigasjon(data);
        genererButikkKort(data);
      }
    })
    .catch(err => console.error("🚨 Feil ved lasting av butikker:", err));

  // Generer navigasjonsmeny
  function genererKategoriNavigasjon(butikker, valgtKategori = null) {
    const kategorier = [...new Set(butikker.map(b => b.category))];
    kategorier.forEach(kategori => {
      const link = document.createElement("a");
      link.href = `?kategori=${kategori.toLowerCase().replace(/ /g, "-")}`;
      link.className = "btn btn-outline-primary me-2 mb-2";
      link.textContent = kategori;

      if (valgtKategori === kategori.toLowerCase().replace(/ /g, "-")) {
        link.classList.add("active");
      }

      kategoriMeny.appendChild(link);
    });
  }

  // Generer butikkort
  function genererButikkKort(butikker, valgtKategori = null) {
    butikkContainer.innerHTML = "";

    const filtrerteButikker = valgtKategori
      ? butikker.filter(b => b.category.toLowerCase().replace(/ /g, "-") === valgtKategori)
      : butikker;

    if (filtrerteButikker.length === 0) {
      butikkContainer.innerHTML = "<p class='text-center text-muted'>Ingen butikker funnet i denne kategorien.</p>";
      return;
    }

    filtrerteButikker.forEach(butikk => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
  <div class="category-store-card shadow-sm">
    <a href="${butikk.url}" target="_blank" rel="noopener">
      <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="max-height:150px; object-fit:contain;">
    </a>
    <div class="card-body">
      <h5 class="card-title mb-1">${butikk.name}</h5>
      <p class="small text-muted">${butikk.description}</p>
      <a href="${butikk.url}" class="btn btn-primary w-100 mt-2">Besøk Butikk</a>
    </div>
  </div>
`;


      butikkContainer.appendChild(col);
    });
  }
});
