
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then((res) => res.json())
    .then((data) => {
      const gamingData = data.filter((butikk) =>
        Array.isArray(butikk.category) &&
        butikk.category.includes("Gaming & Gadgets") &&
        Array.isArray(butikk.subcategory)
      );

      const mapping = {
        "Gaming og elektronikk": "gaming-elektronikk",
        "Gadgets og gaver": "gadgets-gaver",
        "Spill og underholdning": "spill-underholdning"
      };

      gamingData.forEach((butikk) => {
        const containerId = mapping[butikk.subcategory[0]] || null;
        if (!containerId) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        const card = document.createElement("div");
        card.className = "col-6 col-md-3 text-center";
        card.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark d-block store-showcase">
            <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2 card-logo" loading="lazy" />
            <h6>${butikk.name}</h6>
            <p class="small text-muted">${butikk.description || ""}</p>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Feil ved lasting av Gaming & Gadgets-data:", error);
    });
});
