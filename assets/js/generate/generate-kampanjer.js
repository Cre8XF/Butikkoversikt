document.addEventListener('DOMContentLoaded', function () {
  let kampanjerData = [];
  const container = document.getElementById('kampanje-list');
  const categoryFilter = document.getElementById('filterKategori');
  const sortFilter = document.getElementById('sortering');
  const bannerContainer = document.getElementById('annonse-banner');

  function populateCategories() {
    const categories = [...new Set(kampanjerData.map(k => k.category))];
    categoryFilter.innerHTML = '<option value="alle">Alle kategorier</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function renderKampanjer(kampanjer) {
    container.innerHTML = '';

    kampanjer.forEach(kampanje => {
      const col = document.createElement('div');
      col.className = 'col';

      const card = document.createElement('div');
      card.className = 'card h-100 shadow-sm fade-in';
      card.style.transition = 'all 0.3s ease-in-out';

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

      setTimeout(() => {
        card.style.opacity = 1;
      }, 100);

      container.appendChild(col);
    });
  }

  function renderAnnonser(annonser) {
    bannerContainer.innerHTML = `
      <div id="annonseCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${annonser.map((annonse, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <a href="${annonse.url}" target="_blank">
                <img src="${annonse.image}" class="d-block w-100" alt="${annonse.alt}">
              </a>
            </div>
          `).join('')}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#annonseCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#annonseCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }

  function filterAndSort() {
    let filteredKampanjer = [...kampanjerData];

    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'alle') {
      filteredKampanjer = filteredKampanjer.filter(kampanje => kampanje.category === selectedCategory);
    }

    const sortOrder = sortFilter.value;
    if (sortOrder === 'nyeste') {
      filteredKampanjer.sort((a, b) => new Date(b.expiry) - new Date(a.expiry));
    } else if (sortOrder === 'eldste') {
      filteredKampanjer.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    }

    renderKampanjer(filteredKampanjer);
  }

  fetch('assets/data/kampanjer.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Feil ved lasting av kampanjer.json');
      }
      return response.json();
    })
    .then(kampanjer => {
      kampanjerData = kampanjer;
      populateCategories();
      renderKampanjer(kampanjerData);
    })
    .catch(error => {
      console.error('Feil ved lasting av kampanjer:', error);
      container.innerHTML = '<p>Kunne ikke laste kampanjer. Prøv igjen senere.</p>';
    });

  fetch('assets/data/annonser.json')
    .then(response => response.json())
    .then(renderAnnonser)
    .catch(error => console.error('Feil ved lasting av annonser:', error));

  categoryFilter.addEventListener('change', filterAndSort);
  sortFilter.addEventListener('change', filterAndSort);
});
