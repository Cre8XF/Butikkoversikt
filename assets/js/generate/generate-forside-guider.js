fetch('assets/data/guider.json')
  .then(response => response.json())
  .then(data => {
    const guider = data.filter(g => g.forside);
    const container = document.getElementById('forside-guider');

    guider.forEach(guide => {
      const col = document.createElement('div');
      col.className = 'col-md-4 fade-in';

      col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm guide-card">
          <img src="${guide.image}" class="card-img-top" alt="${guide.title}" loading="lazy">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${guide.title}</h5>
            <p class="card-text">${guide.description}</p>
            <a href="guider/${guide.slug}.html" class="btn btn-primary mt-3">Les guide</a>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  })
  .catch(error => console.error('Feil ved lasting av guider:', error));
