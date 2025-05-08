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
                <a href='${butikk.url}' class='btn btn-primary'>Besøk butikk</a>
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

      // Henter annonser og samarbeid
      fetch('assets/data/annonser.json')
        .then(response => response.json())
        .then(annonser => {
          annonser.forEach(annonse => {
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
              <div class='card h-100 shadow-sm'>
                <img src='${annonse.image}' class='card-img-top' alt='${annonse.alt}'>
                <div class='card-body'>
                  <h5 class='card-title'>${annonse.title}</h5>
                  <p class='card-text'>${annonse.description}</p>
                  <a href='${annonse.url}' class='btn btn-primary'>Les mer</a>
                </div>
              </div>
            `;
            annonserContainer.appendChild(card);
          });
        });

    });
});
