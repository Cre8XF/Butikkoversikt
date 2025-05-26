const query = new URLSearchParams(window.location.search).get("q") || "";
// Dynamisk metadata for SEO og deling
document.title = `Søkeresultater for "${query}" – Butikkoversikt.no`;
document.querySelector('meta[name="description"]')?.setAttribute(
  "content",
  `Se nettbutikker, kategorier og guider relatert til "${query}" på Butikkoversikt.no.`
);
document.getElementById("search-term").textContent = query;

fetch("assets/data/butikker.json")
  .then(response => response.json())
  .then(butikker => {
    const resultContainer = document.getElementById("results");
    const lowerQuery = query.toLowerCase();

    const resultater = butikker.filter(butikk => {
      const name = (butikk.name || "").toLowerCase();
      const description = (butikk.description || "").toLowerCase();
      const tags = Array.isArray(butikk.tags) ? butikk.tags.map(t => t.toLowerCase()) : [];
      const category = (butikk.category || "").toLowerCase();
      const subcategories = Array.isArray(butikk.subcategory) ? butikk.subcategory.map(s => s.toLowerCase()) : [];

      return (
        name.includes(lowerQuery) ||
        tags.some(tag => tag === lowerQuery || tag.includes(lowerQuery)) ||
        subcategories.some(sub => sub === lowerQuery || sub.includes(lowerQuery)) ||
        category.includes(lowerQuery) ||
        description.includes(lowerQuery)
      );
    });

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
    ${butikk.affiliate ? `<span class="affiliate-badge">💰 Gir provisjon</span>` : ""}
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
    console.error("Feil ved henting av butikker:", error);
    document.getElementById("results").innerHTML = "<p>Kunne ikke laste søkeresultater.</p>";
  });
