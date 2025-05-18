
// generate-alle-butikker-filter-tags-enhanced-toggle.js – full støtte for dropdown og tags

let alleButikker = [];
let aktivKategoriTags = new Set();
let aktivUnderkategoriTags = new Set();

document.addEventListener("DOMContentLoaded", () => {
  const tagWrapper = document.getElementById("tag-filter-wrapper");
  const dropdownWrapper = document.getElementById("dropdown-filter-wrapper");
  const toggleBtn = document.getElementById("filterViewToggle");

  const kategoriSelect = document.getElementById("filter-category");
  const underkategoriSelect = document.getElementById("filter-subcategory");

  const kategoriTags = document.getElementById("kategori-tags");
  const underkategoriTags = document.getElementById("underkategori-tags");
  const nullstill = document.getElementById("nullstill-filter");

  fetch("assets/data/butikker.json")
    .then((res) => res.json())
    .then((data) => {
      alleButikker = data;
      byggFiltrering(data);
      visButikker(data);
    });

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

  if (kategoriSelect && underkategoriSelect) {
    kategoriSelect.addEventListener("change", applyDropdownFilters);
    underkategoriSelect.addEventListener("change", applyDropdownFilters);
  }

  if (nullstill) {
    nullstill.addEventListener("click", () => {
      aktivKategoriTags.clear();
      aktivUnderkategoriTags.clear();
      document.querySelectorAll(".filter-tag.active").forEach(tag => tag.classList.remove("active"));
      visButikker(alleButikker);
    });
  }

  function byggFiltrering(data) {
    const kategorier = [...new Set(data.map(b => b.category).filter(Boolean))];
    const underkategorier = [...new Set(data.flatMap(b => b.subcategory || []).filter(Boolean))];

    if (kategoriTags && underkategoriTags) {
      kategoriTags.innerHTML = kategorier.map(k =>
        `<button class="filter-tag" data-kategori="${k}">${k}</button>`).join("");

      underkategoriTags.innerHTML = underkategorier.map(uk =>
        `<button class="filter-tag" data-underkategori="${uk}">${uk}</button>`).join("");

      kategoriTags.querySelectorAll(".filter-tag").forEach(btn => {
        btn.addEventListener("click", () => {
          const kategori = btn.dataset.kategori;
          btn.classList.toggle("active");
          aktivKategoriTags.has(kategori) ? aktivKategoriTags.delete(kategori) : aktivKategoriTags.add(kategori);
          applyTagFilters();
        });
      });

      underkategoriTags.querySelectorAll(".filter-tag").forEach(btn => {
        btn.addEventListener("click", () => {
          const underkategori = btn.dataset.underkategori;
          btn.classList.toggle("active");
          aktivUnderkategoriTags.has(underkategori)
            ? aktivUnderkategoriTags.delete(underkategori)
            : aktivUnderkategoriTags.add(underkategori);
          applyTagFilters();
        });
      });
    }

    if (kategoriSelect && underkategoriSelect) {
      kategoriSelect.innerHTML = `<option value="">Alle kategorier</option>` + kategorier.map(k =>
        `<option value="${k}">${k}</option>`).join("");

      underkategoriSelect.innerHTML = `<option value="">Alle underkategorier</option>` + underkategorier.map(uk =>
        `<option value="${uk}">${uk}</option>`).join("");
    }
  }
});

function applyTagFilters() {
  const filtrert = alleButikker.filter(butikk => {
    const matcherKategori = aktivKategoriTags.size === 0 || aktivKategoriTags.has(butikk.category);
    const matcherUnderkategori = aktivUnderkategoriTags.size === 0 || (butikk.subcategory || []).some(uk => aktivUnderkategoriTags.has(uk));
    return matcherKategori && matcherUnderkategori;
  });
  visButikker(filtrert);
}

function applyDropdownFilters() {
  const kategori = document.getElementById("filter-category").value;
  const underkategori = document.getElementById("filter-subcategory").value;

  const filtrert = alleButikker.filter(butikk => {
    const matcherKategori = !kategori || butikk.category === kategori;
    const matcherUnderkategori = !underkategori || (butikk.subcategory || []).includes(underkategori);
    return matcherKategori && matcherUnderkategori;
  });

  visButikker(filtrert);
}

function visButikker(butikker) {
  const container = document.getElementById("butikk-container");
  const teller = document.getElementById("butikk-teller");

  container.innerHTML = "";

  butikker.forEach((butikk) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "category-card text-center";

    card.innerHTML = `
      <a href="${butikk.url}" target="_blank" rel="noopener">
        <img src="${butikk.image}" class="category-icon" alt="${butikk.alt}">
        <h6 class="mt-3 mb-2">${butikk.name}</h6>
        <p class="small text-muted">${butikk.description}</p>
      </a>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = \`Viser \${butikker.length} butikker\`;
  }
}
