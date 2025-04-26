// Oppdatert generate-index-stores.js med hover-effekt på Anbefalte butikker

fetch('assets/data/butikker.json')
  .then(response => response.json())
  .then(butikker => {
    const anbefalteContainer = document.getElementById('anbefalte-butikker');

    butikker
      .filter(butikk => butikk.anbefalt)
      .forEach(butikk => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3 d-flex';

        const card = document.createElement('div');
        card.className = 'store-card w-100 d-flex flex-column';

        card.innerHTML = `
          <img src="${butikk.bilde}" class="img-fluid rounded-top" alt="${butikk.navn}">
          <div class="p-3 d-flex flex-column flex-grow-1">
            <h5 class="fw-bold mb-2">${butikk.navn}</h5>
            <p class="small text-muted mb-3 flex-grow-1">${butikk.beskrivelse}</p>
            <a href="${butikk.lenke}" class="btn btn-primary mt-auto">Besøk butikk</a>
          </div>
        `;

        col.appendChild(card);
        anbefalteContainer.appendChild(col);
      });
  })
  .catch(error => console.error('Feil ved lasting av anbefalte butikker:', error));
