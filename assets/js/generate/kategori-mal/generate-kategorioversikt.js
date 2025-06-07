document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      visKategorier(data);
      visButikker(data);

      const knappContainer = document.getElementById("kategori-filter-knapper");
      if (knappContainer) {
        knappContainer.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") {
            const valgt = e.target.dataset.kategori;
            document.querySelectorAll("#kategori-filter-knapper button").forEach(btn =>
              btn.classList.remove("active")
            );
            e.target.classList.add("active");

            const filtrert = valgt === "alle"
              ? data
              : data.filter(b => b.category === valgt);

            visButikker(filtrert);
          }
        });
      }
    });

  function visKategorier(butikker) {
    const container = document.getElementById("kategori-filter-knapper");
    const kategorier = [...new Set(butikker.map(b => b.category).filter(Boolean))];

    const alleKnapp = document.createElement("button");
    alleKnapp.textContent = "Alle";
    alleKnapp.dataset.kategori = "alle";
    alleKnapp.className = "btn btn-outline-secondary me-2 active";
    container.appendChild(alleKnapp);

    kategorier.forEach(kat => {
      const btn = document.createElement("button");
      btn.textContent = kat;
      btn.dataset.kategori = kat;
      btn.className = "btn btn-outline-primary me-2 mb-2";
      container.appendChild(btn);
    });
  }

  function visButikker(butikker) {
    const container = document.getElementById("kategoriContainer");
    container.innerHTML = "";

    butikker.forEach(butikk => {
      const lenke = (butikk.affiliate && butikk.affiliateUrl && butikk.affiliateUrl.trim() !== "")
  ? butikk.affiliateUrl
  : butikk.url;  // 👈 NY linje
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    
      const card = document.createElement("a");
      card.href = lenke;  // 👈 OPPDATERT
      card.target = "_blank";
      card.rel = "noopener";
      card.className = "store-card";
    
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
      container.appendChild(col);
    });
    

    const teller = document.getElementById("butikk-teller");
    if (teller) {
      teller.textContent = `Viser ${butikker.length} butikker`;
    }
  }
});
