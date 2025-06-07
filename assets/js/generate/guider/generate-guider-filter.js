document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("guider-container");
  const filterButtons = document.querySelectorAll("#guide-filter button");

  fetch("/assets/data/guider.json")
    .then(res => res.json())
    .then(guides => {
      renderGuides(guides);

      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          const selected = button.dataset.filter;

          filterButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          const filtered = selected === "alle" ? guides : guides.filter(g => g.kategori === selected);
          renderGuides(filtered);
        });
      });
    });

  function renderGuides(guides) {
    container.innerHTML = "";

    if (guides.length === 0) {
      container.innerHTML = '<p class="text-muted">Ingen guider funnet i denne kategorien.</p>';
      return;
    }

    guides.forEach(guide => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4 fade-in";

      col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm">
        <img 
  src="/${guide.image}" 
  class="guide-img" 
  alt="${guide.alt || guide.title}" 
  width="400" 
  height="250" 
  loading="lazy" 
  style="object-fit: contain; width: 100%; height: 160px; background-color: #fff; border-radius: 0.5rem 0.5rem 0 0;">

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${guide.title}</h5>
            <p class="card-text">${guide.description}</p>
            <p class="small text-muted mt-2">Kilde: <a href="${guide.url}" target="_blank" rel="noopener">${new URL(guide.url).hostname}</a></p>
            <a href="${guide.url}" class="btn btn-primary mt-auto" target="_blank" rel="noopener">Les guide</a>
            
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  }
});
