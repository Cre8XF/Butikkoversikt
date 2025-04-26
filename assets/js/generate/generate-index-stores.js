document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  fetch("assets/data/butikker.json")
    .then((response) => {
      console.log("Fetch response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data hentet fra butikker.json:", data);

      const anbefalteContainer = document.getElementById("anbefalte-butikker");

      if (!anbefalteContainer) {
        console.error("Container for anbefalte butikker ikke funnet!");
        return;
      }

      let count = 0;

      data.forEach((butikk) => {
        console.log("Sjekker butikk:", butikk);

        if (butikk.forside === true) {
          console.log("✅ Forside-butikk funnet:", butikk.name);
          count++;

          const col = document.createElement("div");
          col.className = "col";

          const card = document.createElement("div");
          card.className = "category-card text-center";

          card.innerHTML = `
            <a href="${butikk.url}" target="_blank" rel="noopener">
              <img src="${butikk.image}" class="category-icon" alt="${butikk.alt}">
              <h6 class="mt-3 mb-2">${butikk.name}</h6>
              <p class="small text-muted">${butikk.description}</p>
            </a>
          `;

          col.appendChild(card);
          anbefalteContainer.appendChild(col);
        }
      });

      console.log(`Totalt forsidebutikker lagt til: ${count}`);
    })
    .catch((error) => {
      console.error("Feil ved lasting av forsidebutikker:", error);
    });
});
