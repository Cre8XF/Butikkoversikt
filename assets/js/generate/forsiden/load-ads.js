// Dynamisk lasting av annonser fra JSON
console.log("🟢 Annonsescript kjører");
fetch("assets/data/ads.json")
  .then((response) => response.json())
  .then((ads) => {
    const adContainer = document.getElementById("dynamicAds");

    if (!adContainer) return;

    ads.forEach((ad) => {
      const adElement = document.createElement("div");
      adElement.classList.add("ad-banner", "mb-4");

      adElement.innerHTML = `
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
          <img src="${ad.image}" alt="${ad.alt}" />
        </a>
      `;

      adContainer.appendChild(adElement);
    });
  })
  .catch((error) => console.error("Feil ved lasting av annonser:", error));