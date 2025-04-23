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
        card.className = "col-6 col-md-3 d-flex";
        card.innerHTML = `
          <div class="store-showcase text-center w-100">
            <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
            <h5>${butikk.name}</h5>
            ${butikk.description ? `<p class="small text-muted">${butikk.description}</p>` : ""}
            <a href="${butikk.url}" target="_blank" class="btn btn-primary btn-sm mt-2" rel="noopener">Besøk butikk</a>
          </div>
        `;
        container.appendChild(card);
      });
    });
});