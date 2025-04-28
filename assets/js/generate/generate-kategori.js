
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get('kategori');

  const kategoriTittel = document.getElementById('kategori-tittel');
  const kategoriContainer = document.getElementById('kategori-container');

  if (!valgtKategori || !kategoriTittel || !kategoriContainer) {
    console.error('Mangler kategori, tittel eller container');
    return;
  }

  kategoriTittel.textContent = valgtKategori;

  fetch('assets/data/butikker.json')
    .then(response => response.json())
    .then(butikker => {
      const filtrerteButikker = butikker.filter(
        (butikk) => butikk.category.toLowerCase() === valgtKategori.toLowerCase()
      );

      if (filtrerteButikker.length === 0) {
        kategoriContainer.innerHTML = '<p>Ingen butikker funnet for denne kategorien.</p>';
        return;
      }

      filtrerteButikker.forEach(butikk => {
        const card = document.createElement('div');
        card.className = 'col-6 col-md-3 mb-4';

        card.innerHTML = `
          <div class="store-card text-center w-100">
            <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-3" style="height: 120px; object-fit: contain;" loading="lazy">
              <h6 class="mb-2">${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ''}</p>
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
