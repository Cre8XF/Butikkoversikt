// generate-alle-butikker-filter-tags-enhanced-toggle.js – med tag/dropdown-visningsbytte

window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      byggTagFilter(data);
      visButikker(data);
    });

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
      filtrer();
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
    filtrer();
  });

  oppdaterUnderkategoriTags();
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
    const lenke = butikk.affiliateUrl?.trim() || butikk.url;  // 👈 NY linje
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

    const card = document.createElement("a");
    card.href = lenke;
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

    ${(butikk.affiliate && butikk.affiliateUrl) || butikk.eksternFrakt ? `
      <div class="store-tags mt-2 small text-muted d-flex flex-column gap-1">
        ${butikk.affiliate && butikk.affiliateUrl ? `<div>🔗 Affiliatebutikk</div>` : ""}
        ${butikk.eksternFrakt ? `<div>🌍 Sender fra utlandet</div>` : ""}
      </div>
    ` : ""}
    
  </div>
`;



    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}
