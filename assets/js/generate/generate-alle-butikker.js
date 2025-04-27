// generate-alle-butikker.js

document.addEventListener("DOMContentLoaded", () => {
  const butikkerContainer = document.getElementById("butikk-liste");
  const filterContainer = document.getElementById("kategori-filter");

  if (!butikkerContainer || !filterContainer) {
    console.error("Manglende containere for butikker eller filter!");
    return;
  }

  let butikker = [];

  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      butikker = data;
      const kategorier = new Set();

      data.forEach(butikk => {
        // Lag kort
        const card = document.createElement("div");
        card.className = "alle-butikker-kort";
        card.setAttribute("data-kategori", butikk.category);

        card.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener">
            <img src="${butikk.image}" alt="${butikk.name}" class="alle-butikker-logo">
            <h6>${butikk.name}</h6>
            <p class="small text-muted">${butikk.description}</p>
          </a>
        `;

        butikkerContainer.appendChild(card);

        if (butikk.category) {
          kategorier.add(butikk.category);
        }
      });

      // Bygg dropdown
      kategorier.forEach(kategori => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        filterContainer.appendChild(option);
      });
    })
    .catch(error => console.error("Feil ved lasting av butikker:", error));

  // Lytte på endring i dropdown
  filterContainer.addEventListener("change", (e) => {
    filtrerButikker(e.target.value);
  });

  function filtrerButikker(kategori) {
    const kort = document.querySelectorAll(".alle-butikker-kort");

    kort.forEach(k => {
      if (kategori === "alle" || k.getAttribute("data-kategori") === kategori) {
        k.style.display = "flex";
      } else {
        k.style.display = "none";
      }
    });
  }
});
