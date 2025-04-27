// generate-alle-butikker.js

// Venter til hele DOM-en er klar
window.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/data/butikker.json")
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
  const container = document.getElementById("butikk-container");
  if (!container) {
    console.error("Fant ikke container for butikker!");
    return;
  }

  container.innerHTML = "";

  butikker.forEach((butikk) => {
    const card = document.createElement("div");
    card.className = "butikkort fade-in";

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener">
        <img src="../${butikk.image}" alt="${butikk.alt}" loading="lazy">
        <h3>${butikk.name}</h3>
        <p>${butikk.description}</p>
      </a>
    `;

    container.appendChild(card);
  });
}

function settOppFilter(butikker) {
  const filter = document.getElementById("kategori-filter");
  if (!filter) {
    console.error("Fant ikke filtermeny!");
    return;
  }

  filter.addEventListener("change", (e) => {
    const valgtKategori = e.target.value;

    if (valgtKategori === "alle") {
      visButikker(butikker);
    } else {
      const filtrerte = butikker.filter(
        (butikk) => butikk.category.toLowerCase() === valgtKategori.toLowerCase()
      );
      visButikker(filtrerte);
    }
  });
}
