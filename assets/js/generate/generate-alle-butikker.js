// generate-alle-butikker.js - Ferdig og riktig

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
  container.innerHTML = "";

  butikker.forEach((butikk) => {
    // Lag en col
    const col = document.createElement("div");
    col.className = "col";

    // Lag kortet
    const card = document.createElement("div");
    card.className = "card text-center fade-in";

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener">
        <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${butikk.name}</h5>
          <p class="card-text small text-muted">${butikk.description}</p>
        </div>
      </a>
    `;

    // Sett kortet inni col, og col inni containeren
    col.appendChild(card);
    container.appendChild(col);
  });
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
      const filtrerte = butikker.filter(b => b.category === valgt);
      visButikker(filtrerte);
    }
  });
}
