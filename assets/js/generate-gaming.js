document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("gaming-container");
      const gamingButikker = data.filter(b => b.gaming === true);

      gamingButikker.forEach(butikk => {
        const card = document.createElement("div");
        card.className = "col-6 col-md-3 text-center";

        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        card.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark">
            <div class="store-showcase h-100">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="card-logo mb-2" loading="lazy" />
              <h6>${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ""}</p>
              <span class="btn btn-outline-primary mt-2">Besøk butikk</span>
            </div>
          </a>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error("Feil ved lasting av gaming-butikker:", error));
});
