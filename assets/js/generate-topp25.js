document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("topp25-container");
      const teller = document.getElementById("teller");

      const topp25 = data.filter(b => b.topp25 === true);

      // Oppdater teller hvis finnes
      if (teller) {
        teller.textContent = `(${topp25.length})`;
      }

      topp25.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        const card = document.createElement("div");
        card.className = "col-6 col-md-3 d-flex store-card"; // Nå med store-card klasse
        card.innerHTML = `
          <div class="store-showcase text-center w-100 p-3">
            <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
            <h5>${butikk.name}</h5>
            ${butikk.description ? `<p class="small text-muted">${butikk.description}</p>` : ""}
            <a href="${butikk.url}" target="_blank" class="btn btn-primary btn-sm mt-2" rel="noopener">Besøk butikk</a>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av Topp 25:", err);
    });
});
