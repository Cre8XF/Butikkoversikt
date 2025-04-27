// generate-alle-butikker.js

// Når dokumentet er klart
document.addEventListener("DOMContentLoaded", () => {
  const butikkerContainer = document.getElementById("butikk-liste");
  const filterContainer = document.getElementById("kategori-filter");

  if (!butikkerContainer || !filterContainer) {
    console.error("Manglende containere for butikker eller filter!");
    return;
  }

  // Hent butikkdata
  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const kategorier = new Set();

      data.forEach(butikk => {
        // Opprett kort for hver butikk
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

        // Legg kategori til filteret
        if (butikk.category) {
          kategorier.add(butikk.category);
        }
      });

      // Lag filterknapper
      kategorier.forEach(kategori => {
       const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        filterContainer.appendChild(option);


        knapp.addEventListener("click", () => {
          filtrerButikker(kategori);
        });

        filterContainer.appendChild(knapp);
      });

      // Legg til "Alle"-knapp
      const alleKnapp = document.createElement("button");
      alleKnapp.className = "filter-knapp";
      alleKnapp.textContent = "Alle";
      alleKnapp.addEventListener("click", () => filtrerButikker("alle"));
      filterContainer.insertBefore(alleKnapp, filterContainer.firstChild);
    })
    .catch(error => console.error("Feil ved lasting av butikker:", error));

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
