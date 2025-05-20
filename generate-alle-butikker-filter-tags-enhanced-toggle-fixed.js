// generate-alle-butikker-filter-tags-enhanced-toggle.js – forbedret med dropdown-støtte

window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      byggTagFilter(data);
      byggDropdownFilter(data);
      visButikker(data);
    });

  // Visningsbytte
  const toggleBtn = document.getElementById("filterViewToggle");
  const tagWrapper = document.getElementById("tag-filter-wrapper");
  const dropdownWrapper = document.getElementById("dropdown-filter-wrapper");

  if (toggleBtn && tagWrapper && dropdownWrapper) {
    toggleBtn.addEventListener("click", () => {
      const brukerDropdown = dropdownWrapper.style.display !== "none";
      if (brukerDropdown) {
        dropdownWrapper.style.display = "none";
        tagWrapper.style.display = "block";
        toggleBtn.textContent = "Bytt til dropdown-visning";
      } else {
        dropdownWrapper.style.display = "block";
        tagWrapper.style.display = "none";
        toggleBtn.textContent = "Bytt til tag-visning";
      }
    });
  }
});

let aktivKategoriTags = new Set();
let aktivUnderkategoriTags = new Set();
let alleButikker = [];

function byggTagFilter(butikker) {
  alleButikker = butikker;
  const kategoriTags = document.getElementById("kategori-tags");
  const underkategoriTags = document.getElementById("underkategori-tags");
  const nullstill = document.getElementById("nullstill-filter");

  const kategorier = [...new Set(butikker.map(b => b.category).filter(Boolean))];

  function lagTag(text, type) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "filter-tag " + (type === "kategori" ? "kategori" : "underkategori");
    btn.addEventListener("click", () => {
      if (type === "kategori") {
        toggleTag(aktivKategoriTags, text, btn);
        oppdaterUnderkategoriTags();
      } else {
        toggleTag(aktivUnderkategoriTags, text, btn);
      }
      applyTagFilters(); // ✅ bruker riktig filtreringsfunksjon
    });
    return btn;
  }
  

  kategorier.forEach(k => kategoriTags.appendChild(lagTag(k, "kategori")));

  function oppdaterUnderkategoriTags() {
    underkategoriTags.innerHTML = "";
    const relevanteButikker = aktivKategoriTags.size > 0
      ? alleButikker.filter(b => aktivKategoriTags.has(b.category))
      : alleButikker;

    const underkategorier = [...new Set(
      relevanteButikker.flatMap(b => b.subcategory || [])
    )];

    underkategorier.forEach(sub => {
      const tag = lagTag(sub, "underkategori");
      underkategoriTags.appendChild(tag);
    });
  }

  nullstill.addEventListener("click", () => {
    aktivKategoriTags.clear();
    aktivUnderkategoriTags.clear();
    document.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
    oppdaterUnderkategoriTags();
    visButikker(alleButikker); // ✅ Riktig funksjon
  });

  oppdaterUnderkategoriTags();
}

function byggDropdownFilter(butikker) {
  const catSelect = document.getElementById("filter-category");
  const subSelect = document.getElementById("filter-subcategory");

  const kategorier = [...new Set(butikker.map(b => b.category).filter(Boolean))];
  kategorier.forEach(kat => {
    const opt = document.createElement("option");
    opt.value = kat;
    opt.textContent = kat;
    catSelect.appendChild(opt);
  });

  function oppdaterSubdropdown(valgtKategori) {
    subSelect.innerHTML = '<option value="alle">Alle underkategorier</option>';
    const relevanteButikker = valgtKategori === "alle"
      ? butikker
      : butikker.filter(b => b.category === valgtKategori);
    const underkategorier = [...new Set(relevanteButikker.flatMap(b => b.subcategory || []))];
    underkategorier.forEach(uk => {
      const opt = document.createElement("option");
      opt.value = uk;
      opt.textContent = uk;
      subSelect.appendChild(opt);
    });
  }

  catSelect.addEventListener("change", () => {
    oppdaterSubdropdown(catSelect.value);
    filtrerDropdown();
  });

  subSelect.addEventListener("change", () => {
    filtrerDropdown();
  });

  oppdaterSubdropdown("alle");
}

function filtrerDropdown() {
  const cat = document.getElementById("filter-category").value;
  const sub = document.getElementById("filter-subcategory").value;

  const filtrerte = alleButikker.filter(b => {
    const matchKategori = cat === "alle" || b.category === cat;
    const matchUnderkategori = sub === "alle" || (b.subcategory || []).includes(sub);
    return matchKategori && matchUnderkategori;
  });

  visButikker(filtrerte);
}

function toggleTag(set, value, btn) {
  if (set.has(value)) {
    set.delete(value);
    btn.classList.remove("active");
  } else {
    set.add(value);
    btn.classList.add("active");
  }
}

function visButikker(butikker) {
  const container = document.getElementById("butikk-container");
  const teller = document.getElementById("butikk-teller");
  container.innerHTML = "";

  butikker.forEach((butikk) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

    const card = document.createElement("a");
    card.href = butikk.url;
    card.target = "_blank";
    card.rel = "noopener";
    card.className = "store-card";

    card.innerHTML = `
  <div class="store-card-img">
    <img src="${butikk.image}" alt="${butikk.alt || butikk.name}">
  </div>
  <div class="store-card-body">
    <h4>${butikk.name}</h4>
    <p>${butikk.description || ""}</p>
    ${
      butikk.eksternFrakt
        ? `<div class="frakt-info">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe.'}">Sender fra utlandet</span></div>`
        : ""
    }
  </div>
`;


    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}


function applyTagFilters() {
  const filtrert = alleButikker.filter(butikk => {
    const matcherKategori =
      aktivKategoriTags.size === 0 || aktivKategoriTags.has(butikk.category);
    const matcherUnderkategori =
      aktivUnderkategoriTags.size === 0 ||
      (butikk.subcategory || []).some(uk => aktivUnderkategoriTags.has(uk));
    return matcherKategori && matcherUnderkategori;
  });

  visButikker(filtrert);
}
