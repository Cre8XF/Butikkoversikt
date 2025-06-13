console.log("🟢 Annonsescript kjører");

fetch("assets/data/ads.json")
  .then((response) => response.json())
  .then((ads) => {
    const adContainer = document.getElementById("dynamicAds");

    if (!adContainer) return;

    ads.forEach((ad) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4"; // 1 på mobil, 2 på tablet, 3 på desktop

      col.innerHTML = `
        <div class="ad-banner text-center">
          <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
            <img src="${ad.image}" alt="${ad.alt}" class="img-fluid mb-2" style="max-width: 100%;" />
          </a>
          ${ad.text ? `<p class="small text-muted">${ad.text}</p>` : ""}
        </div>
      `;

      adContainer.appendChild(col);
    });
  })
  .catch((error) => console.error("❌ Feil ved lasting av annonser:", error));
