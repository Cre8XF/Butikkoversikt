document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/data/kampanjer.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Feil ved lasting av kampanjer.json');
      }
      return response.json();
    })
    .then(kampanjer => {
      const container = document.getElementById('kampanje-list');
      container.innerHTML = '';

      kampanjer.forEach(kampanje => {
        const col = document.createElement('div');
        col.className = 'col';

        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm';

        const img = document.createElement('img');
        img.src = kampanje.image;
        img.alt = kampanje.title;
        img.className = 'card-img-top';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = kampanje.title;

        const store = document.createElement('p');
        store.className = 'text-muted small';
        store.textContent = kampanje.store ? kampanje.store : 'Ukjent butikk';

        const expiry = document.createElement('p');
        expiry.className = 'text-muted small';
        expiry.textContent = kampanje.expiry ? `Gyldig til: ${kampanje.expiry}` : 'Ukjent utløpsdato';

        const description = document.createElement('p');
        description.className = 'card-text';
        description.textContent = kampanje.description;

        const button = document.createElement('a');
        button.href = kampanje.url;
        button.target = '_blank';
        button.className = 'btn btn-primary mt-2';
        button.textContent = 'Se tilbud';

        cardBody.appendChild(title);
        cardBody.appendChild(store);
        cardBody.appendChild(expiry);
        cardBody.appendChild(description);
        cardBody.appendChild(button);

        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
      });
    })
    .catch(error => {
      console.error('Feil ved lasting av kampanjer:', error);
      document.getElementById('kampanje-list').innerHTML = '<p>Kunne ikke laste kampanjer. Prøv igjen senere.</p>';
    });
});
