// generate-alle-butikker.js inline versjon

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
    const kort = document.createElement("div");
    kort.className = "butikkort fade-in";
    kort.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener">
        <img src="${butikk.image}" alt="${butikk.name}" loading="lazy">
        <h3>${butikk.name}</h3>
        <p>${butikk.description}</p>
      </a>
    `;
    container.appendChild(kort);
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