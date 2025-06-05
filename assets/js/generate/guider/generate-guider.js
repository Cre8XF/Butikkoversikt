document.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/data/guider.json")
    .then(response => response.json())
    .then(guides => {
      const container = document.getElementById("guider-container");

      guides.forEach(guide => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4 fade-in";

        const link = guide.url || "#";
        const target = guide.url ? "_blank" : "_self";
        const rel = guide.url ? "noopener" : "";

        col.innerHTML = `
          <div class="card h-100 border-0 shadow-sm">
            <img src="/${guide.image}" class="card-img-top" alt="${guide.alt || guide.title}" loading="lazy">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${guide.title}</h5>
              <p class="card-text">${guide.description}</p>
              <a href="${link}" target="${target}" rel="${rel}" class="btn btn-primary mt-auto">Les guide</a>
            </div>
          </div>
        `;

        container.appendChild(col);
      });

      // Fade-in animasjon
      const fadeEls = document.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      fadeEls.forEach(el => observer.observe(el));
    })
    .catch(err => {
      console.error("Feil ved lasting av guider:", err);
    });
});
