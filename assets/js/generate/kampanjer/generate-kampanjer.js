document.addEventListener('DOMContentLoaded', function () {
  let kampanjerData = [];
  const container = document.getElementById('kampanje-list');
  const bannerContainer = document.getElementById('annonse-banner');
  const filterButtons = document.querySelectorAll('#kampanje-filter button');

  function renderKampanjer(kampanjer) {
    container.innerHTML = '';

    kampanjer.forEach(kampanje => {
      const col = document.createElement('div');
      col.className = 'col';

      const card = document.createElement('a');
      card.href = kampanje.url;
      card.target = "_blank";
      card.rel = "noopener";
      card.className = 'store-card text-decoration-none fade-in';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'store-card-img';

      const img = document.createElement('img');
      img.src = kampanje.image;
      img.alt = kampanje.title;
      img.width = 400;
      img.height = 250;
      img.loading = 'lazy';

      imageWrapper.appendChild(img);

      const body = document.createElement('div');
      body.className = 'store-card-body';

      const title = document.createElement('h4');
      title.textContent = kampanje.title;

      const desc = document.createElement('p');
      desc.textContent = kampanje.description || "";

      body.appendChild(title);
      body.appendChild(desc);

      card.appendChild(imageWrapper);
      card.appendChild(body);
      col.appendChild(card);
      container.appendChild(col);

      // Fade-in
      setTimeout(() => {
        card.style.opacity = 1;
      }, 100);
    });
  }

  function renderAnnonser(annonser) {
    bannerContainer.innerHTML = `
      <div id="annonseCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${annonser.map((annonse, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <a href="${annonse.url}" target="_blank" rel="noopener">
                <img 
                  src="${annonse.image}" 
                  class="d-block w-100" 
                  alt="${annonse.alt}" 
                  width="800" 
                  height="300" 
                  loading="lazy">
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

  fetch('assets/data/kampanjer.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Feil ved lasting av kampanjer.json');
      }
      return response.json();
    })
    .then(kampanjer => {
      kampanjerData = kampanjer;
      renderKampanjer(kampanjerData);

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const selected = button.dataset.filter;

          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          const filtered = selected === 'alle'
            ? kampanjerData
            : kampanjerData.filter(k => k.category === selected);

          renderKampanjer(filtered);
        });
      });
    })
    .catch(error => {
      console.error('Feil ved lasting av kampanjer:', error);
      container.innerHTML = '<p>Kunne ikke laste kampanjer. Prøv igjen senere.</p>';
    });

  fetch('assets/data/annonser.json')
    .then(response => response.json())
    .then(renderAnnonser)
    .catch(error => console.error('Feil ved lasting av annonser:', error));
});
