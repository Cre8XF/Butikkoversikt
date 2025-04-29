document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get('kategori');
  const kategoriTittel = document.getElementById('kategori-tittel');
  const kategoriContainer = document.getElementById('kategori-container');

  // Legg inn en filter-dropdown
  const filterWrapper = document.createElement('div');
  filterWrapper.className = 'mb-4';
  filterWrapper.innerHTML = `
    <label for="underkategori-filter" class="form-label">Filtrer på underkategori:</label>
    <select id="underkategori-filter" class="form-select">
      <option value="alle">Alle underkategorier</option>
    </select>
  `;
  kategoriContainer.parentNode.insertBefore(filterWrapper, kategoriContainer);

  const underkategoriFilter = document.getElementById('underkategori-filter');

  fetch('assets/data/butikker.json')
    .then(res => res.json())
    .then(butikker => {
      // Filtrer først på hovedkategori
      const innenKategori = butikker.filter(b => 
        b.category.toLowerCase() === valgtKategori.toLowerCase()
      );

      // Finn alle unike underkategorier
      const underkategorier = Array.from(new Set(
        innenKategori
          .flatMap(b => b.subcategory || [])
          .filter(s => s)    // fjern tomme
      )).sort();

      // Fyll dropdown
      underkategorier.forEach(uk => {
        const opt = document.createElement('option');
        opt.value = uk;
        opt.textContent = uk;
        underkategoriFilter.appendChild(opt);
      });

      // Funksjon som viser butikkliste
      function visButikker(liste) {
        kategoriContainer.innerHTML = '';
        if (liste.length === 0) {
          kategoriContainer.innerHTML = '<p>Ingen butikker funnet for dette valget.</p>';
          return;
        }
        liste.forEach(butikk => {
          const card = document.createElement('div');
          card.className = 'col-6 col-md-3 mb-4';
          card.innerHTML = `
            <div class="store-card text-center w-100">
              <a href="${butikk.url}" target="_blank" rel="noopener">
                <img src="${butikk.image}" alt="${butikk.name}" class="img-fluid mb-3" style="height:120px;object-fit:contain">
                <h6>${butikk.name}</h6>
                <p class="small text-muted">${butikk.description || ''}</p>
              </a>
            </div>
          `;
          kategoriContainer.appendChild(card);
        });
      }

      // Vis alle ved oppstart
      visButikker(innenKategori);

      // Når filteret endres, filtrer på underkategori
      underkategoriFilter.addEventListener('change', () => {
        const valgtUK = underkategoriFilter.value;
        if (valgtUK === 'alle') {
          visButikker(innenKategori);
        } else {
          visButikker(
            innenKategori.filter(b => (b.subcategory || []).includes(valgtUK))
          );
        }
      });
    })
    .catch(err => {
      console.error(err);
      kategoriContainer.innerHTML = '<p>Kunne ikke laste butikker.</p>';
    });
});
