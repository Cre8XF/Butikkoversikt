document.addEventListener('DOMContentLoaded', function () {
  const kampanjeContainer = document.getElementById('kampanje-container');

  if (!kampanjeContainer) {
    console.error('Fant ikke kampanje-container.');
    return;
  }

  fetch('assets/data/kampanjer.json')
    .then(response => response.json())
    .then(kampanjer => {
      kampanjer.forEach(kampanje => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3';

        col.innerHTML = `
          <a href="${kampanje.link}" target="_blank" rel="noopener" class="d-block text-decoration-none">
            <div class="campaign-card text-center p-4 bg-white rounded shadow-sm h-100">
              <img src="${kampanje.image}" alt="${kampanje.title}" class="img-fluid mb-3" style="height: 120px; object-fit: contain;">
              <h6 class="fw-bold mb-2">${kampanje.title}</h6>
              <p class="small text-muted">${kampanje.description}</p>
            </div>
          </a>
        `;
        kampanjeContainer.appendChild(col);
      });
    })
    .catch(error => {
      console.error('Kunne ikke laste kampanjer:', error);
      kampanjeContainer.innerHTML = '<p>Kunne ikke laste kampanjer nå.</p>';
    });
});
