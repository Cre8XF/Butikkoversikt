document.addEventListener('DOMContentLoaded', function() {
  // Hent kategori fra URL
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get('kategori');

  const kategoriTittel = document.getElementById('kategori-tittel');
  const kategoriContainer = document.getElementById('kategori-container');

  if (!valgtKategori || !kategoriTittel || !kategoriContainer) {
    console.error('Mangler kategori, tittel eller container');
    return;
  }

  // Sett tittel
  kategoriTittel.textContent = valgtKategori;

  // Hent butikker
  fetch('assets/data/butikker.json')
    .then(response => response.json())
    .then(data => {
      // Filtrer butikker som matcher valgt kategori
      const filtrerteButikker = data.filter(butikk => butikk.category === valgtKategori);

      if (filtrerteButikker.length === 0) {
        kategoriContainer.innerHTML = '<p>Ingen butikker funnet for denne kategorien.</p>';
        return;
      }

      // Bygg kort for hver butikk
      filtrerteButikker.forEach(butikk => {
        const card = document.createElement('div');
        card.className = 'col-6 col-md-3 mb-4';

        card.innerHTML = `
          <div class="store-card text-center w-100">
            <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
              <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="height: 120px; object-fit: contain;" loading="lazy">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title mb-2">${butikk.name}</h5>
                <p class="card-text small text-muted">${butikk.description || ''}</p>
              </div>
            </a>
          </div>
        `;
        kategoriContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Feil ved henting av butikker:', error);
      kategoriContainer.innerHTML = '<p>Kunne ikke laste butikker.</p>';
    });
});
