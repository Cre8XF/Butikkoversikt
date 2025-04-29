// Oppdatert generate-kategori.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get('kategori');

  const kategoriTittel = document.getElementById('kategori-tittel');
  const kategoriBeskrivelse = document.getElementById('kategori-beskrivelse');
  const kategoriIkon = document.getElementById('kategori-ikon');
  const kategoriContainer = document.getElementById('kategori-container');
  const underkategoriWrapper = document.getElementById('underkategori-wrapper');

  if (!valgtKategori) {
    console.error('Ingen kategori oppgitt i URL');
    return;
  }

  kategoriTittel.textContent = decodeURIComponent(valgtKategori);

  fetch('assets/data/butikker.json')
    .then(r => r.json())
    .then(butikker => {
      const alleIMinKategori = butikker.filter(
        b => b.category.toLowerCase() === valgtKategori.toLowerCase()
      );

      // Sett en enkel beskrivelse basert på valgt kategori (kan utvides)
      kategoriBeskrivelse.textContent = `Oppdag spennende nettbutikker innen ${valgtKategori.toLowerCase()} hos oss.`;

      // Sett ikon hvis finnes
     const ikonNavn = valgtKategori
      .toLowerCase()
      .replace(/\s/g, '-') // mellomrom til bindestrek
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '') // fjern diakritiske tegn
      .replace(/[^a-z0-9\-]/g, ''); // fjern evt. spesialtegn

      kategoriIkon.src = `assets/images/ikoner/${ikonNavn}.png`;
      kategoriIkon.alt = `${valgtKategori} ikon`;


      const underkategorier = Array.from(new Set(
        alleIMinKategori.flatMap(b => b.subcategory || [])
      )).filter(s => s);

      if (underkategorier.length) {
        // Bygg dropdown
        const wrapper = document.createElement('div');
        wrapper.className = 'row mb-4';
        wrapper.innerHTML = `
          <div class="col-md-6 mx-auto">
            <select id="underkategori-velger" class="form-select">
              <option value="">Alle underkategorier</option>
              ${underkategorier.map(uk => `<option value="${uk}">${uk}</option>`).join('')}
            </select>
          </div>
        `;

        underkategoriWrapper.appendChild(wrapper);

        // Event: filtrer ved valg i select
        document.getElementById('underkategori-velger').addEventListener('change', (e) => {
          const valgt = e.target.value;
          if (valgt) {
            const filtrert = alleIMinKategori.filter(b => (b.subcategory || []).includes(valgt));
            renderButikker(filtrert);
          } else {
            renderButikker(alleIMinKategori);
          }
        });
      }

      renderButikker(alleIMinKategori);
    })
    .catch(err => {
      console.error('Feil ved lasting av butikker:', err);
      kategoriContainer.innerHTML = '<p>Kunne ikke laste butikker.</p>';
    });

  function renderButikker(butikkliste) {
    kategoriContainer.innerHTML = '';
    if (butikkliste.length === 0) {
      kategoriContainer.innerHTML = '<p>Ingen butikker funnet i denne kategorien.</p>';
      return;
    }

    butikkliste.forEach(b => {
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
