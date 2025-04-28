document.addEventListener('DOMContentLoaded', function() {
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

  // Sett kategori-tittel
  kategoriTittel.textContent = valgtKategori;

  // Beskrivelser og ikoner
  const kategoriData = {
    "Apotek": {
      ikon: "assets/images/ikoner/apotek.png",
      beskrivelse: "Utforsk apotekbutikker med alt innen helse og egenpleie."
    },
    "Barn og baby": {
      ikon: "assets/images/ikoner/barn og baby.png",
      beskrivelse: "Alt du trenger til barn og baby – klær, leker og utstyr."
    },
    "Bøker og underholdning": {
      ikon: "assets/images/ikoner/bøker og underholdning.png",
      beskrivelse: "Oppdag bøker, filmer, spill og underholdning for alle aldre."
    },
    "Elektronikk og data": {
      ikon: "assets/images/ikoner/elektronikk og data.png",
      beskrivelse: "De nyeste produktene innen teknologi og elektronikk."
    },
    "Fritid og gaver": {
      ikon: "assets/images/ikoner/fritid og gaver.png",
      beskrivelse: "Perfekte gaver og produkter for hobby og fritid."
    },
    "Gaming og tilbehør": {
      ikon: "assets/images/ikoner/gaming og tilbehør.png",
      beskrivelse: "Alt du trenger til gamingopplevelsen din."
    },
    "Helse og egenpleie": {
      ikon: "assets/images/ikoner/helse og egenpleie.png",
      beskrivelse: "Produkter for personlig helse og velvære."
    },
    "Klær og mote": {
      ikon: "assets/images/ikoner/klær og mote.png",
      beskrivelse: "Trendy klær, sko og tilbehør for enhver stil."
    },
    "Møbler og interiør": {
      ikon: "assets/images/ikoner/møbler og interiør.png",
      beskrivelse: "Innred hjemmet ditt med stil og komfort."
    },
    "Sport og fritid": {
      ikon: "assets/images/ikoner/sport og fritid.png",
      beskrivelse: "Treningsutstyr, sportsartikler og friluftsutstyr."
    }
  };

  // Hvis data finnes for valgt kategori, sett ikon og beskrivelse
  if (kategoriData[valgtKategori]) {
    kategoriIkon.src = kategoriData[valgtKategori].ikon;
    kategoriIkon.alt = valgtKategori + " ikon";
    kategoriBeskrivelse.textContent = kategoriData[valgtKategori].beskrivelse;
  }

  // Hent butikker
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
