window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/guider.json")
    .then(res => res.json())
    .then(guides => {
      const container = document.getElementById("forside-guider");
      if (!container) return;

      const selected = guides.filter(g => g.forside === true).slice(0, 3);

      selected.forEach(guide => {
        const html = `
          <div class="col-md-4 fade-in">
            <div class="card guide-card h-100 border-0 shadow-sm">
              <img src="${guide.image}" class="card-img-top" alt="${guide.title}" loading="lazy">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${guide.title}</h5>
                  <p class="card-text">${guide.description}</p>
                </div>
                <a href="guider/${guide.slug}.html" class="btn btn-primary mt-3">Les guide</a>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
      });
    })
    .catch(err => console.error("❌ Feil ved lasting av guider:", err));
});
