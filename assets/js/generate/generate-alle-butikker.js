// generate-alle-butikker.js - komplett oppdatert versjon

document.addEventListener("DOMContentLoaded", () => {
  const butikkerContainer = document.getElementById("butikk-liste");
  const filterContainer = document.getElementById("kategori-filter");

  if (!butikkerContainer || !filterContainer) {
    console.error("Manglende containere for butikker eller filter!");
    return;
  }

  let butikker = [];

  fetch("assets/json/butikker.json")
    .then(response => response.json())
    .then(data => {
      butikker = data;

      const kategorier = new Set();

      data.forEach(butikk => {
        if (butikk.category) {
          kategorier.add(butikk.category);
        }
      });

      // Bygg filterdropdown
      kategorier.forEach(kategori => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        filterContainer.appendChild(option);
      });

      // Initial visning av alle butikker
      visButikker("alle");
    })
    .catch(error => console.error("Feil ved lasting av butikker:", error));

  // Lytt til filter-endringer
  filterContainer.addEventListener("change", (e) => {
    visButikker(e.target.value);
  });

  function visButikker(kategori) {
    butikkerContainer.innerHTML = ""; // Tøm liste først

    let filtrert = butikker;
    if (kategori !== "alle") {
      filtrert = butikker.filter(b => b.category === kategori);
    }

    if (filtrert.length === 0) {
      butikkerContainer.innerHTML = "<p class='text-center text-muted py-5'>Ingen butikker funnet i valgt kategori.</p>";
      return;
    }

    filtrert.forEach(butikk => {
      const kort = document.createElement("div");
      kort.className = "alle-butikker-kort";
      kort.innerHTML = `
        <a href="${butikk.url}" target="_blank" rel="noopener">
          <div class="kort-innhold">
            <img src="${butikk.image}" alt="${butikk.name}" class="alle-butikker-logo">
            <h6 class="mt-3 mb-1">${butikk.name}</h6>
            <p class="small text-muted">${butikk.description}</p>
          </div>
        </a>
      `;

      butikkerContainer.appendChild(kort);
    });
  }
});
