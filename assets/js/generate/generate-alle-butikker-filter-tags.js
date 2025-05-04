
// generate-alle-butikker-filter-tags.js – tagbasert multi-filter for kategori og underkategori

window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      byggTagFilter(data);
      visButikker(data);
    });
});

let aktivKategoriTags = new Set();
let aktivUnderkategoriTags = new Set();
let alleButikker = [];

function byggTagFilter(butikker) {
  alleButikker = butikker;

  const kategoriTags = document.getElementById("kategori-tags");
  const underkategoriTags = document.getElementById("underkategori-tags");

  const kategorier = [...new Set(butikker.map(b => b.category).filter(Boolean))];
  const underkategorier = [...new Set(butikker.flatMap(b => b.subcategory || []))];

  function lagTag(text, type) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "filter-tag";
    btn.addEventListener("click", () => {
      if (type === "kategori") {
        toggleTag(aktivKategoriTags, text, btn);
      } else {
        toggleTag(aktivUnderkategoriTags, text, btn);
      }
      filtrer();
    });
    return btn;
  }

  kategorier.forEach(k => kategoriTags.appendChild(lagTag(k, "kategori")));
  underkategorier.forEach(u => underkategoriTags.appendChild(lagTag(u, "underkategori")));

  // Legg til "Alle"-knapp som nullstiller filter
  const nullstill = document.getElementById("nullstill-filter");
  nullstill.addEventListener("click", () => {
    aktivKategoriTags.clear();
    aktivUnderkategoriTags.clear();
    document.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
    filtrer();
  });
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

function filtrer() {
  const filtrerte = alleButikker.filter(b => {
    const matchKategori = aktivKategoriTags.size === 0 || aktivKategoriTags.has(b.category);
    const matchUnderkategori = aktivUnderkategoriTags.size === 0 ||
      (b.subcategory || []).some(sub => aktivUnderkategoriTags.has(sub));
    return matchKategori && matchUnderkategori;
  });

  visButikker(filtrerte);
}

function visButikker(butikker) {
  const container = document.getElementById("butikk-container");
  const teller = document.getElementById("butikk-teller");
  container.innerHTML = "";

  butikker.forEach((butikk) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch";

    const card = document.createElement("div");
    card.className = "store-card text-center w-100";

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
        <img src="${butikk.image}" alt="${butikk.name}" class="card-img-top p-3" style="height: 120px; object-fit: contain;" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-2">${butikk.name}</h5>
          <p class="card-text small text-muted">${butikk.description || ""}</p>
        </div>
      </a>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}
