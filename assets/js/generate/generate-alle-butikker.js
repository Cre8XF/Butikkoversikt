// generate-alle-butikker.js - Oppdatert og fikset versjon

window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then((response) => response.json())
    .then((data) => {
      visButikker(data);
      settOppFilter(data);
    })
    .catch((error) => {
      console.error("Feil ved lasting av butikker:", error);
    });
});

function visButikker(butikker) {
  const butikkerContainer = document.getElementById("butikk-container");
  if (!butikkerContainer) {
    console.error("Fant ikke container for butikker!");
    return;
  }

  butikkerContainer.innerHTML = "";

  butikker.forEach((butikk) => {
    const card = document.createElement("div");
    card.className = "butikkort fade-in";

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener">
        <img src="${butikk.image}" alt="${butikk.alt}" loading="lazy">
        <h3>${butikk.name}</h3>
        <p>${butikk.description}</p>
      </a>
    `;

    butikkerContainer.appendChild(card);
  });
}

function settOppFilter(butikker) {
  const filterContainer = document.getElementById("kategori-filter");
  if (!filterContainer) {
    console.error("Fant ikke filter-container!");
    return;
  }

  filterContainer.addEventListener("change", (e) => {
    const valgtKategori = e.target.value;

    if (valgtKategori === "alle") {
      visButikker(butikker);
    } else {
      const filtrerte = butikker.filter((butikk) => butikk.category.toLowerCase() === valgtKategori.toLowerCase());
      visButikker(filtrerte);
    }
  });
}
