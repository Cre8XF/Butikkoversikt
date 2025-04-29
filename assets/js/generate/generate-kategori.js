// generate-kategori.js (Oppdatert versjon)

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get('kategori');
  const kategoriTittel = document.getElementById('kategori-tittel');
  const kategoriContainer = document.getElementById('kategori-container');
  const kategoriIkon = document.getElementById('kategori-ikon');
  const kategoriBeskrivelse = document.getElementById('kategori-beskrivelse');

  if (!valgtKategori || !kategoriTittel || !kategoriContainer) {
    console.error('Mangler kategori, tittel eller container');
    return;
  }

  fetch('assets/data/butikker.json')
    .then(r => r.json())
    .then(butikker => {
      // Filtrer butikker basert på kategori
      const innenKategori = butikker.filter(b =>
        b.category.toLowerCase() === valgtKategori.toLowerCase()
      );

      // Oppdater Hero (tittel, beskrivelse, ikon)
      kategoriTittel.textContent = valgtKategori;

      // Prøv hente riktig ikon - fallback hvis mangler
      const ikonNavn = valgtKategori.toLowerCase().replace(/\s+/g, '-') + '.png';
      const ikonPath = `assets/images/ikoner/${ikonNavn}`;
      kategoriIkon.src = ikonPath;
      kategoriIkon.alt = valgtKategori;

      // Sett beskrivelse
      kategoriBeskrivelse.textContent = `Utforsk nettbutikker innen ${valgtKategori.toLowerCase()} hos oss.`;

      // Render butikkortene
      renderButikker(innenKategori);
    })
    .catch(err => {
      console.error('Kunne ikke laste butikker.json:', err);
      kategoriContainer.innerHTML = '<p>Kunne ikke laste butikker.</p>';
    });

  // Funksjon for å vise kortene
  function renderButikker(butikkListe) {
    kategoriContainer.innerHTML = '';
    if (butikkListe.length === 0) {
      kategoriContainer.innerHTML = '<p>Ingen butikker funnet for denne kategorien.</p>';
      return;
    }

    butikkListe.forEach(b => {
      const col = document.createElement('div');
      col.className = 'col-6 col-md-3 mb-4';

      col.innerHTML = `
        <div class="store-card text-center w-100">
          <a href="${b.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
            <img src="${b.image}" alt="${b.alt || b.name}" class="img-fluid mb-3" style="height:120px;object-fit:contain" loading="lazy">
            <h6 class="mb-2">${b.name}</h6>
            <p class="small text-muted">${b.description || ''}</p>
          </a>
        </div>
      `;

      kategoriContainer.appendChild(col);
    });
  }
});
