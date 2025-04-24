
document.addEventListener("DOMContentLoaded", () => {
  const kategoriContainer = document.getElementById("kategori-container");
  const tittelElement = document.getElementById("kategori-tittel");
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");

  if (!kategori) {
    tittelElement.innerText = "Ingen kategori valgt.";
    return;
  }

  fetch("butikker.json")
    .then((response) => response.json())
    .then((butikker) => {
      const filtrerte = butikker.filter((butikk) => {
        const kategorier = Array.isArray(butikk.category)
          ? butikk.category
          : [butikk.category];
        return kategorier.includes(kategori);
      });

      // Vis tittel
      tittelElement.innerText = kategori;

      // Vis underkategori-knapper hvis vi er på hovedkategori-nivå
      const underkategoriMap = {
        "Klær og mote": ["Dameklær", "Herreklær", "Tilbehør og sko"],
        "Elektronikk": ["Gaming og elektronikk"],
        "Bøker og underholdning": ["Spill og underholdning"]
      };

      if (underkategoriMap[kategori]) {
        const underkategoriDiv = document.createElement("div");
        underkategoriDiv.className = "d-flex justify-content-center gap-3 mb-4";
        underkategoriMap[kategori].forEach((under) => {
          const link = document.createElement("a");
          link.href = `kategori-mal.html?kategori=${encodeURIComponent(under)}`;
          link.className = "btn btn-primary";
          link.innerText = under;
          underkategoriDiv.appendChild(link);
        });
        tittelElement.parentNode.insertBefore(underkategoriDiv, tittelElement.nextSibling);
      }

      if (filtrerte.length === 0) {
        kategoriContainer.innerHTML =
          '<div class="col-12 text-center"><p class="text-muted">Fant ingen butikker i denne kategorien.</p></div>';
        return;
      }

      kategoriContainer.innerHTML = "";

      filtrerte.forEach((butikk) => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";
        col.innerHTML = `
          <div class="card category-card h-100 text-center">
            <img src="${butikk.image}" class="card-img-top mx-auto mt-3 p-3" alt="${butikk.alt}" style="max-height: 100px; object-fit: contain;">
            <div class="card-body">
              <h6 class="card-title fw-bold">${butikk.name}</h6>
              <p class="card-text small text-muted">${butikk.description}</p>
              <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="btn btn-outline-primary btn-sm">Besøk butikk</a>
            </div>
          </div>
        `;
        kategoriContainer.appendChild(col);
      });
    });
});
