
document.addEventListener("DOMContentLoaded", () => {
  fetch("butikker.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("topp25-container");
      const topp25 = data.filter(b => b.topp25 === true);

      topp25.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        const card = document.createElement("div");
        card.className = "col-6 col-md-3 text-center";
        card.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark">
            <div class="card category-card h-100 p-3">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
              <h6>${butikk.name}</h6>
              ${butikk.description ? `<p class="small text-muted">${butikk.description}</p>` : ""}
            </div>
          </a>
        `;
        container.appendChild(card);
      });
    });
});
