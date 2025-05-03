console.log("✅ generate-forside-guider.js er lastet og kjører!");


window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("forside-guider");
  if (!container) return;

  fetch("assets/data/guider.json")
    .then(res => res.json())
    .then(guides => {
      const selected = guides.filter(g => g.forside === true).slice(0, 3);

      selected.forEach(guide => {
        const html = `
          <div class="col-md-4 fade-in">
            <div class="card guide-card h-100 border-0 shadow-sm">
              <img src="${guider.image}" class="card-img-top" alt="${guider.title}" loading="lazy">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${guider.title}</h5>
                  <p class="card-text">${guider.description}</p>
                </div>
                <a href="guider/${guider.slug}.html" class="btn btn-primary mt-3">Les guide</a>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
      });
    })
    .catch(err => console.error("❌ Feil ved lasting av guider:", err));
});
