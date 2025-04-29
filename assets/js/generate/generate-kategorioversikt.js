// generate-kategorioversikt.js

// Når siden lastes
document.addEventListener('DOMContentLoaded', () => {
  const kategoriListe = document.getElementById('kategori-liste');
  const sokInput = document.getElementById('kategori-sok');

  fetch('assets/data/butikker.json')
    .then(response => response.json())
    .then(butikker => {
      const kategorier = new Map();

      // Samle kategorier
      butikker.forEach(butikk => {
        const kategori = butikk.category;
        if (!kategorier.has(kategori)) {
          kategorier.set(kategori, {
            name: kategori,
            underkategorier: new Set(),
            image: `assets/images/ikoner/${kategori.toLowerCase().replace(/\s/g, '-').replace(/[\u00C0-\u00FF]/g, '')}.png`
          });
        }

        // Legg til underkategorier
        (butikk.subcategory || []).forEach(underkat => {
          kategorier.get(kategori).underkategorier.add(underkat);
        });
      });

      const kategorierArray = Array.from(kategorier.values());
      renderKategorier(kategorierArray);

      // Live søk
      sokInput.addEventListener('input', () => {
        const term = sokInput.value.toLowerCase();
        const filtrerte = kategorierArray.filter(k => k.name.toLowerCase().includes(term));
        renderKategorier(filtrerte);
      });
    })
    .catch(error => {
      console.error('Feil ved lasting av butikker.json:', error);
      kategoriListe.innerHTML = '<p>Kunne ikke laste kategorier.</p>';
    });

  // Funksjon for å vise kategorier
  function renderKategorier(kategorier) {
    kategoriListe.innerHTML = '';

    kategorier.forEach(kat => {
      const col = document.createElement('div');
      col.className = 'col-6 col-md-4 col-lg-3';

      col.innerHTML = `
        <div class="card h-100 text-center p-3">
          <img src="${kat.image}" alt="${kat.name}" class="mb-3" style="height: 80px; object-fit: contain;">
          <h5 class="mb-2">${kat.name}</h5>
          <div class="small text-muted mb-3">
            ${kat.underkategorier.size > 0 ? Array.from(kat.underkategorier).join(', ') : 'Ingen underkategorier'}
          </div>
          <a href="kategori.html?kategori=${encodeURIComponent(kat.name)}" class="btn btn-outline-primary btn-sm">Utforsk</a>
        </div>
      `;
      kategoriListe.appendChild(col);
    });
  }
});
