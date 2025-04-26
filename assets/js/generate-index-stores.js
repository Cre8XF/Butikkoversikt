// Oppdatert generate-index-stores.js for å hente Anbefalte butikker basert på "forside": true

fetch('assets/data/butikker.json')
  .then(response => response.json())
  .then(butikker => {
    const anbefalteContainer = document.getElementById('anbefalte-butikker');

    butikker
      .filter(butikk => butikk.forside) // <-- riktig nå!
      .forEach(butikk => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3 d-flex';

        const card = document.createElement('div');
        card.className = 'store-card w-100 d-flex flex-column';

        card.innerHTML = `
          <img src="${butikk.image}" class="img-fluid rounded-top" alt="${butikk.alt}">
          <div class="p-3 d-flex flex-column flex-grow-1">
            <h5 class="fw-bold mb-2">${butikk.name}</h5>
            <p class="small text-muted mb-3 flex-grow-1">${butikk.description}</p>
            <a href="${butikk.url}" class="btn btn-primary mt-auto" target="_blank" rel="noopener">Besøk butikk</a>
          </div>
        `;

        col.appendChild(card);
        anbefalteContainer.appendChild(col);
      });
  })
  .catch(error => console.error('Feil ved lasting av anbefalte butikker:', error));
