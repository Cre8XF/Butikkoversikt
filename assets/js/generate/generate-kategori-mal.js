// generate-kategori-mal.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const valgtKategori = params.get("kategori");

  const kategoriTittel = document.getElementById("kategori-tittel");
  const butikkContainer = document.getElementById("butikk-container");
  const filterContainer = document.getElementById("subcategory-filter");

  if (!valgtKategori || !kategoriTittel || !butikkContainer) {
    console.error("Mangler kategori eller container");
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      kategoriTittel.textContent = valgtKategori;

      const filtrerte = data.filter(b => b.category && b.category.trim().toLowerCase() === valgtKategori.trim().toLowerCase());

      const underkategorier = Array.from(new Set(
        filtrerte.flatMap(b => Array.isArray(b.subcategory) ? b.subcategory : [])
      ));

      if (underkategorier.length > 1) {
        const label = document.createElement("label");
        label.textContent = "Filtrer etter underkategori: ";
        label.setAttribute("for", "filterSelect");

        const select = document.createElement("select");
        select.id = "filterSelect";
        select.className = "form-select w-auto d-inline-block ms-2";

        const alleOption = document.createElement("option");
        alleOption.value = "";
        alleOption.textContent = "Alle";
        select.appendChild(alleOption);

        underkategorier.forEach(uk => {
          const option = document.createElement("option");
          option.value = uk;
          option.textContent = uk;
          select.appendChild(option);
        });

        filterContainer.appendChild(label);
        filterContainer.appendChild(select);

        select.addEventListener("change", () => {
          visButikker(filtrerte, select.value);
        });
      }

      visButikker(filtrerte);
    })
    .catch(err => console.error("Feil ved lasting av butikkdata:", err));
});

function visButikker(butikker, underkategori = "") {
  const container = document.getElementById("butikk-container");
  container.innerHTML = "";

  const filtrert = underkategori
    ? butikker.filter(b => b.subcategory && b.subcategory.includes(underkategori))
    : butikker;

  if (filtrert.length === 0) {
    container.innerHTML = '<p class="text-muted text-center">Ingen butikker funnet i denne kategorien.</p>';
    return;
  }

  filtrert.forEach(b => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${b.image}" class="card-img-top" alt="${b.alt || b.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${b.name}</h5>
          <p class="card-text text-muted">${b.description || ""}</p>
          <a href="${b.url}" class="btn btn-outline-primary w-100" target="_blank" rel="noopener">Besøk butikk</a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// --- Dynamisk SEO <head>-innhold ---
const seoData = {
  "Klær og mote": {
    title: "Klær og mote – Beste nettbutikker | Butikkoversikt.no",
    description: "Utforsk de beste nettbutikkene innen klær og mote – dameklær, herreklær, sko og mer.",
    keywords: "klær, mote, nettbutikker, dameklær, herreklær, sko, shopping"
  },
  "Elektronikk og data": {
    title: "Elektronikk og data – Nettbutikker i Norge | Butikkoversikt.no",
    description: "Finn nettbutikker innen mobil, data, lyd og elektronikk. Smart tech på ett sted.",
    keywords: "elektronikk, pc, mobil, lyd, nettbutikker, teknologi"
  },
  "Helse og skjønnhet": {
    title: "Helse og skjønnhet – Apotek, sminke og velvære | Butikkoversikt.no",
    description: "Oppdag nettbutikker for hudpleie, apotek, naturlige produkter og egenpleie.",
    keywords: "helse, skjønnhet, apotek, sminke, hudpleie, naturlig"
  },
  "Sport og fritid": {
    title: "Sport og fritid – Trening, friluft og utstyr | Butikkoversikt.no",
    description: "Finn nettbutikker for friluft, trening, jakt, sykkel og sportsutstyr.",
    keywords: "sport, friluft, trening, jakt, sykkel, nettbutikker"
  },
    "Barn og baby": {
  title: "Barn og baby – Nettbutikker for barn, babyutstyr og klær | Butikkoversikt.no",
  description: "Finn populære nettbutikker for babyutstyr, leker, klær og barnevogner.",
  keywords: "baby, barn, barneklær, babyutstyr, barnevogn, leker"
},
"Møbler og interiør": {
  title: "Møbler og interiør – Interiørbutikker i Norge | Butikkoversikt.no",
  description: "Utforsk nettbutikker med møbler, dekor, tekstiler og belysning for hjemmet.",
  keywords: "interiør, møbler, hjem, dekor, belysning, tekstil"
},
"Hobby og DIY": {
  title: "Hobby og DIY – Kreative nettbutikker | Butikkoversikt.no",
  description: "Kreative nettbutikker for håndarbeid, tegning, maling og DIY-prosjekter.",
  keywords: "hobby, DIY, håndarbeid, maling, tegning, kreativ"
},
"Reise og opplevelser": {
  title: "Reise og opplevelser – Nettbutikker med utstyr og tips | Butikkoversikt.no",
  description: "Nettbutikker med reiseutstyr, kofferter, festivaltilbehør og gaveidéer.",
  keywords: "reise, opplevelser, kofferter, festival, kart, ferie"
},
"Gaver og gadgets": {
  title: "Gaver og gadgets – Morsomme og personlige gaver | Butikkoversikt.no",
  description: "Se nettbutikker med gadgets, personlige gaver og gaveidéer til alle anledninger.",
  keywords: "gaver, gadgets, personlig gave, morsomme produkter, gaveidé"
},
"Bøker og media": {
  title: "Bøker og media – Bokhandlere på nett | Butikkoversikt.no",
  description: "Oppdag nettbutikker for bøker, tegneserier, lydbøker og medier for alle aldre.",
  keywords: "bøker, media, lydbøker, tegneserier, barnebøker, bokhandel"
},
"Spill og underholdning": {
  title: "Spill og underholdning – Gaming og brettspill | Butikkoversikt.no",
  description: "Finn butikker med spill, gamingutstyr, figurer og popkultur-produkter.",
  keywords: "spill, gaming, brettspill, popkultur, figurer, underholdning"
},
"Mat og drikke": {
  title: "Mat og drikke – Nettbutikker med mat, snacks og kaffe | Butikkoversikt.no",
  description: "Se utvalget av nettbutikker som tilbyr matvarer, kaffe, te og delikatesser.",
  keywords: "mat, drikke, kaffe, te, delikatesser, snacks, nettbutikk"
},
"Alt-mulig butikker": {
  title: "Alt-mulig butikker – Internasjonale nettbutikker med alt mulig | Butikkoversikt.no",
  description: "Oppdag globale nettbutikker som Temu, AliExpress og Wish med rimelige varer.",
  keywords: "aliexpress, temu, wish, alt-mulig, rimelig, internasjonal, dropshipping"
}

};

const kategori = new URLSearchParams(window.location.search).get("kategori");
const seo = seoData[kategori];

if (seo) {
  document.title = seo.title;

  const metaDesc = document.createElement("meta");
  metaDesc.name = "description";
  metaDesc.content = seo.description;
  document.head.appendChild(metaDesc);

  const metaKeywords = document.createElement("meta");
  metaKeywords.name = "keywords";
  metaKeywords.content = seo.keywords;
  document.head.appendChild(metaKeywords);
}
else {
  console.error("Ingen SEO-data funnet for denne kategorien.");
}

