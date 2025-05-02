// generate-kategori-mal.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const butikkContainer = document.getElementById("butikk-container");
  const filterContainer = document.getElementById("subcategory-filter");

  if (!valgtKategori || !kategoriTittel || !butikkContainer) {
    console.error("Mangler kategori eller container");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      kategoriTittel.textContent = valgtKategori;

      const filtrerte = data.filter(b => b.category && b.category.trim().toLowerCase() === valgtKategori.trim().toLowerCase());

      const underkategorier = Array.from(new Set(
        filtrerte.flatMap(b => Array.isArray(b.subcategory) ? b.subcategory : [])
      ));

      if (underkategorier.length > 1) {
        const label = document.createElement("label");
        label.textContent = "Filtrer etter underkategori: ";
        label.setAttribute("for", "filterSelect");

        const select = document.createElement("select");
        select.id = "filterSelect";
        select.className = "form-select w-auto d-inline-block ms-2";

        const alleOption = document.createElement("option");
        alleOption.value = "";
        alleOption.textContent = "Alle";
        select.appendChild(alleOption);

        underkategorier.forEach(uk => {
          const option = document.createElement("option");
          option.value = uk;
          option.textContent = uk;
          select.appendChild(option);
        });

        filterContainer.appendChild(label);
        filterContainer.appendChild(select);

        select.addEventListener("change", () => {
          visButikker(filtrerte, select.value);
        });
      }

      visButikker(filtrerte);
    })
    .catch(err => console.error("Feil ved lasting av butikkdata:", err));
});

function visButikker(butikker, underkategori = "") {
  const container = document.getElementById("butikk-container");
  container.innerHTML = "";

  const filtrert = underkategori
    ? butikker.filter(b => b.subcategory && b.subcategory.includes(underkategori))
    : butikker;

  if (filtrert.length === 0) {
    container.innerHTML = '<p class="text-muted text-center">Ingen butikker funnet i denne kategorien.</p>';
    return;
  }

  filtrert.forEach(b => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${b.image}" class="card-img-top" alt="${b.alt || b.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${b.name}</h5>
          <p class="card-text text-muted">${b.description || ""}</p>
          <a href="${b.url}" class="btn btn-outline-primary w-100" target="_blank" rel="noopener">Besøk butikk</a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}
