document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get('kategori');
  const kategoriTittel = document.getElementById('kategori-tittel');
  const kategoriContainer = document.getElementById('kategori-container');
  const kategoriIkon = document.getElementById('kategori-ikon');
  const kategoriBeskrivelse = document.getElementById('kategori-beskrivelse');

  if (!valgtKategori) return;

  fetch('assets/data/butikker.json')
    .then(r => r.json())
    .then(butikker => {
      const filtrerte = butikker.filter(b => b.category.toLowerCase() === valgtKategori.toLowerCase());

      kategoriTittel.textContent = valgtKategori;
      kategoriBeskrivelse.textContent = `Vi har ${filtrerte.length} butikker innen ${valgtKategori}.`;
      kategoriIkon.src = `assets/images/ikoner/${valgtKategori.toLowerCase().replace(/ /g, '-')}.png`;
      kategoriIkon.alt = `${valgtKategori} ikon`;

      kategoriContainer.innerHTML = '';

      filtrerte.forEach(b => {
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
    });
});