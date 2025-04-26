// Oppdatert generate-index-stores.js for hover-effekt på Anbefalte butikker

fetch('assets/data/butikker.json')
  .then(response => response.json())
  .then(butikker => {
    const anbefalteContainer = document.getElementById('anbefalte-butikker');
    butikker.filter(butikk => butikk.anbefalt).forEach(butikk => {
      const col = document.createElement('div');
      col.className = 'col-6 col-md-3 d-flex';

      const kort = document.createElement('div');
      kort.className = 'store-card w-100';
      kort.innerHTML = `
        <img src="${butikk.bilde}" class="img-fluid rounded-top" alt="${butikk.navn}">
        <div class="p-3 d-flex flex-column justify-content-between h-100">
          <h5 class="fw-bold mb-2">${butikk.navn}</h5>
          <p class="small text-muted flex-grow-1">${butikk.beskrivelse}</p>
          <a href="${butikk.lenke}" class="btn btn-primary mt-2">Besøk</a>
        </div>
      `;

      col.appendChild(kort);
      anbefalteContainer.appendChild(col);
    });
  })
  .catch(error => console.error('Feil ved lasting av anbefalte butikker:', error));


