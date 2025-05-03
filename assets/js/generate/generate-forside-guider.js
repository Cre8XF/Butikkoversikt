window.addEventListener("DOMContentLoaded", () => {
  fetch("../assets/data/guider.json")
    .then(res => res.json())
    .then(guides => {
      const container = document.getElementById("forside-guider");
      if (!container) return;

      const utvalgte = guides.filter(g => g.forside === true).slice(0, 3);

      utvalgte.forEach(guide => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-sm-6";

        col.innerHTML = `
          <div class="card category-card h-100 border-0 shadow-sm">
            <img src="${guide.image}" class="card-img-top" alt="${guide.title}" loading="lazy">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${guide.title}</h5>
              <p class="card-text">${guide.description}</p>
              <a href="guider/${guide.slug}.html" class="btn btn-primary mt-auto">Les guide</a>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av guider:", err);
    });
});
