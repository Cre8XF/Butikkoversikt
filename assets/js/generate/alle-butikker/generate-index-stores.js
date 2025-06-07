document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  fetch("assets/data/butikker.json")
    .then((response) => {
      console.log("Fetch response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data hentet fra butikker.json:", data);

      const anbefalteContainer = document.getElementById("ukens-anbefalte");

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
          const lenke = (butikk.affiliate && butikk.affiliateUrl && butikk.affiliateUrl.trim() !== "")
  ? butikk.affiliateUrl
  : butikk.url;
          const col = document.createElement("div");
          col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

          const card = document.createElement("a");
          card.href = lenke;
          card.target = "_blank";
          card.rel = "noopener";
          card.className = "store-card";

          // Legg til fraktinfo hvis aktuelt
          const fraktInfo = butikk.eksternFrakt
            ? `<div class="frakt-info">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe'}">Sender fra utlandet</span></div>`
            : "";

            card.innerHTML = `
            <div class="store-card-img">
             <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" width="400" height="250" loading="lazy">
            </div>
            <div class="store-card-body">
              <h4>${butikk.name}</h4>
              <p>${butikk.description || ""}</p>
          
              ${(butikk.affiliate && butikk.affiliateUrl) || butikk.eksternFrakt ? `
                <div class="store-tags mt-2 small text-muted d-flex flex-column gap-1">
                  ${butikk.affiliate && butikk.affiliateUrl ? `<div>🔗 Affiliatebutikk</div>` : ""}
                  ${butikk.eksternFrakt ? `<div>🌍 Sender fra utlandet</div>` : ""}
                </div>
              ` : ""}
              
            </div>
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
