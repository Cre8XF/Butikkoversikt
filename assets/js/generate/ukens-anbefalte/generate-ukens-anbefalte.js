document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/data/butikker.json')
    .then(response => response.json())
    .then(data => {
      const anbefalteContainer = document.getElementById('anbefalte-butikker');
      const kampanjerContainer = document.getElementById('utvalgte-kampanjer');
      const annonserContainer = document.getElementById('annonser-samarbeid');

      // Fyller anbefalte butikker
      data.forEach(butikk => {
        if (butikk.ukensAnbefalte) {
          const card = document.createElement('div');
          card.className = 'col';
          card.innerHTML = `
  <div class='card h-100 shadow-sm'>
    <img src='${butikk.image}' class='card-img-top' alt='${butikk.alt}'>
    <div class='card-body'>
      <h5 class='card-title'>${butikk.name}</h5>
      <p class='card-text'>${butikk.description}</p>
      ${butikk.eksternFrakt ? `<div class="frakt-info mt-2">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe.'}">Sender fra utlandet</span></div>` : ""}
      <a href='${butikk.url}' class='btn btn-primary mt-2'>Besøk butikk</a>
    </div>
  </div>
`;

          anbefalteContainer.appendChild(card);
        }
      });

      // Henter kampanjer
      fetch('assets/data/kampanjer.json')
        .then(response => response.json())
        .then(kampanjer => {
          kampanjer.forEach(kampanje => {
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
              <div class='card h-100 shadow-sm'>
                <img src='${kampanje.image}' class='card-img-top' alt='${kampanje.alt}'>
                <div class='card-body'>
                  <h5 class='card-title'>${kampanje.title}</h5>
                  <p class='card-text'>${kampanje.description}</p>
                  <a href='${kampanje.url}' class='btn btn-primary'>Se tilbud</a>
                </div>
              </div>
            `;
            kampanjerContainer.appendChild(card);
          });
        });

      // Henter annonser og oppretter slideshow
      fetch('assets/data/annonser.json')
        .then(response => response.json())
        .then(annonser => {
          const sliderContainer = document.createElement('div');
          sliderContainer.className = 'carousel slide';
          sliderContainer.id = 'annonseCarousel';
          sliderContainer.setAttribute('data-bs-ride', 'carousel');

          const innerDiv = document.createElement('div');
          innerDiv.className = 'carousel-inner';

          annonser.forEach((annonse, index) => {
            const item = document.createElement('div');
            item.className = index === 0 ? 'carousel-item active' : 'carousel-item';
            item.innerHTML = `
              <a href='${annonse.url ? annonse.url : '#'}' target='_blank'>
                <img src='${annonse.image}' class='d-block w-100' alt='${annonse.alt}'>
              </a>
            `;
            innerDiv.appendChild(item);
          });

          sliderContainer.appendChild(innerDiv);

          // Piler for navigering
          sliderContainer.innerHTML += `
            <button class="carousel-control-prev" type="button" data-bs-target="#annonseCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#annonseCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          `;

          annonserContainer.appendChild(sliderContainer);
        });

    });
});
