
// generate-alle-butikker-filter-dynamisk.js – med dynamisk underkategori basert på valgt kategori

window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then((response) => response.json())
    .then((data) => {
      visButikker(data);
      byggFilter(data);
    })
    .catch((error) => console.error("Feil ved lasting av butikker:", error));
});

function visButikker(butikker) {
  const container = document.getElementById("butikk-container");
  const teller = document.getElementById("butikk-teller");
  container.innerHTML = "";

  butikker.forEach((butikk) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch";

    const card = document.createElement("div");
    card.className = "store-card text-center w-100";

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
        <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="height: 120px; object-fit: contain;" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-2">${butikk.name}</h5>
          <p class="card-text small text-muted">${butikk.description || ""}</p>
        </div>
      </a>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}

function byggFilter(butikker) {
  const kategoriFilter = document.getElementById("kategori-filter");
  const underkategoriFilter = document.getElementById("underkategori-filter");

  const kategorier = [...new Set(butikker.map(b => b.category).filter(Boolean))];

  kategorier.forEach(kategori => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriFilter.appendChild(option);
  });

  function oppdaterUnderkategorier(valgtKategori) {
    underkategoriFilter.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "alle";
    defaultOption.textContent = "Alle underkategorier";
    underkategoriFilter.appendChild(defaultOption);

    const relevanteUnderkategorier = [
      ...new Set(
        butikker
          .filter(b => valgtKategori === "alle" || b.category === valgtKategori)
          .flatMap(b => b.subcategory || [])
      )
    ];

    relevanteUnderkategorier.forEach(sub => {
      const option = document.createElement("option");
      option.value = sub;
      option.textContent = sub;
      underkategoriFilter.appendChild(option);
    });
  }

  function filtrer() {
    const valgtKategori = kategoriFilter.value;
    const valgtUnderkategori = underkategoriFilter.value;

    const filtrerte = butikker.filter(b => {
      const matcherKategori = valgtKategori === "alle" || b.category === valgtKategori;
      const matcherUnderkategori = valgtUnderkategori === "alle" || (b.subcategory || []).includes(valgtUnderkategori);
      return matcherKategori && matcherUnderkategori;
    });

    visButikker(filtrerte);
  }

  kategoriFilter.addEventListener("change", () => {
    oppdaterUnderkategorier(kategoriFilter.value);
    filtrer();
  });

  underkategoriFilter.addEventListener("change", filtrer);

  // Init ved lasting
  oppdaterUnderkategorier("alle");
}
