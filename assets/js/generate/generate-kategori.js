
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
      const filtrerteButikker = data.filter(butikk => butikk.kategori === valgtKategori);

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
            <img src="\${butikk.bilde}" alt="\${butikk.navn}" class="img-fluid mb-3" style="max-height: 120px; object-fit: contain;">
            <h6 class="mb-1">\${butikk.navn}</h6>
            <p class="text-muted small">\${butikk.beskrivelse || ''}</p>
            <a href="\${butikk.lenke}" class="btn btn-primary btn-sm mt-2" target="_blank" rel="noopener noreferrer">Besøk butikk</a>
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
