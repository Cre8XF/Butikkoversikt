document.addEventListener("DOMContentLoaded", () => {
  fetch("butikker.json")
    .then((response) => response.json())
    .then((data) => {
      const anbefalteContainer = document.getElementById("anbefalte-butikker");

      if (!anbefalteContainer) {
        console.error("Container for anbefalte butikker ikke funnet!");
        return;
      }

      data.forEach((butikk) => {
        if (anbefltebutikker) {
          // Lag en kolonne
          const col = document.createElement("div");
          col.className = "col";

          // Lag kortet
          const card = document.createElement("div");
          card.className = "category-card text-center";

          card.innerHTML = `
            <a href="${butikk.url}" target="_blank" rel="noopener">
              <img src="${butikk.image}" class="category-icon" alt="${butikk.alt}">
              <h6 class="mt-3 mb-2">${butikk.name}</h6>
              <p class="small text-muted">${butikk.description}</p>
            </a>
          `;

          // Sett kortet inn i kolonnen
          col.appendChild(card);

          // Sett kolonnen inn i raden
          anbefalteContainer.appendChild(col);
        }
      });
    })
    .catch((error) => {
      console.error("Feil ved lasting av anbefalte butikker:", error);
    });
});
