const query = new URLSearchParams(window.location.search).get("q") || "";
document.getElementById("search-term").textContent = query;

fetch("assets/data/butikker.json")
  .then(response => response.json())
  .then(butikker => {
    const resultContainer = document.getElementById("results");
    const lowerQuery = query.toLowerCase();

    const resultater = butikker.filter(butikk =>
      butikk.name.toLowerCase().includes(lowerQuery) ||
      (butikk.description && butikk.description.toLowerCase().includes(lowerQuery)) ||
      ((Array.isArray(butikk.tags) ? butikk.tags.join(" ") : butikk.tags || "")
        .toLowerCase()
        .includes(lowerQuery)) ||
      ((Array.isArray(butikk.category) ? butikk.category.join(" ") : butikk.category || "")
        .toLowerCase()
        .includes(lowerQuery)) ||
      ((Array.isArray(butikk.subcategory) ? butikk.subcategory.join(" ") : butikk.subcategory || "")
        .toLowerCase()
        .includes(lowerQuery))
    );
    

    if (resultater.length === 0) {
      resultContainer.innerHTML = "<p>Ingen treff.</p>";
      return;
    }

    resultater.forEach(butikk => {
      const card = document.createElement("div");
      card.className = "store-card";
      card.innerHTML = `
        <div class="store-card-img">
          <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" />
        </div>
        <div class="store-card-body">
          <h4>${butikk.name}</h4>
          <p>${butikk.description || ""}</p>
          <a href="${butikk.url}" target="_blank" rel="noopener">Besøk nettbutikken</a>
        </div>
      `;
        resultContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching or parsing butikker.json:", error);
      document.getElementById("results").innerHTML = "<p>Kunne ikke hente butikkdata.</p>";
    });
    