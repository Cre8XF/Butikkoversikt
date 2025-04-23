document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("topp25-container");
      const topp25 = data.filter(b => b.topp25 === true);

      topp25.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        const card = document.createElement("div");
        card.className = "col-12 col-md-6 col-lg-4";
        card.innerHTML = `
          <div class="store-showcase">
            <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="card-logo" loading="lazy" />
            <h5>${butikk.name}</h5>
            ${butikk.description ? `<p>${butikk.description}</p>` : ""}
            <a href="${butikk.url}" target="_blank" rel="noopener sponsored">Besøk butikk</a>
          </div>
        `;
        container.appendChild(card);
      });
    });
});
