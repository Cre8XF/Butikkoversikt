// generate-alle-butikker.js - Ferdig oppdatert versjon

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
    // Ytre kolonne for grid
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"; // ✅ responsivt

    // Selve kortet
    const card = document.createElement("div");
    card.className = "card text-center shadow-sm w-100"; // ✅ fyller hele kolonnen, liten skygge

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
        <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="height: 120px; object-fit: contain;" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-2">${butikk.name}</h5>
          <p class="card-text small text-muted">${butikk.description}</p>
        </div>
      </a>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });

  // Oppdatere antall butikker
  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}


function byggFilter(butikker) {
  const filter = document.getElementById("kategori-filter");
  const kategorier = [...new Set(butikker.map(b => b.category))];

  kategorier.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    filter.appendChild(option);
  });

  filter.addEventListener("change", (e) => {
    const valgt = e.target.value;
    if (valgt === "alle") {
      visButikker(butikker);
    } else {
      const filtrerte = butikker.filter(
        (butikk) => butikk.category.toLowerCase() === valgt.toLowerCase()
      );
      visButikker(filtrerte);
    }
  });
}
