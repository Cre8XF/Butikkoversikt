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
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    
      const link = document.createElement("a");
      link.href = butikk.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.className = "store-card";
    
      link.innerHTML = `
        <div class="store-card-img">
          <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" />
        </div>
        <div class="store-card-body">
          <h4>${butikk.name}</h4>
          <p>${butikk.description || ""}</p>
          ${
            butikk.eksternFrakt
              ? `<div class="frakt-info">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe.'}">Sender fra utlandet</span></div>`
              : ""
          }
        </div>
      `;
    
      col.appendChild(link);
      resultContainer.appendChild(col);
    });
    
    
    })
    .catch(error => {
      console.error("Error fetching or parsing butikker.json:", error);
      document.getElementById("results").innerHTML = "<p>Kunne ikke hente butikkdata.</p>";
    });
    