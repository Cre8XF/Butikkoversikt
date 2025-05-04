// generate-alle-butikker-filter-tags-enhanced-full.js – full støtte for tags/dropdowns + visningsbytte

window.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then((res) => res.json())
    .then((data) => {
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

  const kategorier = [
    ...new Set(butikker.map((b) => b.category).filter(Boolean)),
  ];

  function lagTag(text, type) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className =
      "filter-tag " + (type === "kategori" ? "kategori" : "underkategori");
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

  kategorier.forEach((k) => kategoriTags.appendChild(lagTag(k, "kategori")));

  function oppdaterUnderkategoriTags() {
    underkategoriTags.innerHTML = "";
    const relevanteButikker =
      aktivKategoriTags.size > 0
        ? alleButikker.filter((b) => aktivKategoriTags.has(b.category))
        : alleButikker;

    const underkategorier = [
      ...new Set(relevanteButikker.flatMap((b) => b.subcategory || [])),
    ];

    underkategorier.forEach((sub) => {
      const tag = lagTag(sub, "underkategori");
      underkategoriTags.appendChild(tag);
    });
  }

  nullstill.addEventListener("click", () => {
    aktivKategoriTags.clear();
    aktivUnderkategoriTags.clear();
    document
      .querySelectorAll(".filter-tag")
      .forEach((tag) => tag.classList.remove("active"));
    oppdaterUnderkategoriTags();
    filtrer();
  });

  oppdaterUnderkategoriTags();
}

function byggDropdownFilter(butikker) {
  const kategoriSelect = document.getElementById("kategori-filter");
  const underkategoriSelect = document.getElementById("underkategori-filter");

  const kategorier = [
    ...new Set(butikker.map((b) => b.category).filter(Boolean)),
  ];

  kategorier.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    kategoriSelect.appendChild(opt);
  });

  kategoriSelect.addEventListener("change", () => {
    const valgtKategori = kategoriSelect.value;
    const subOptions = new Set(
      alleButikker
        .filter((b) => valgtKategori === "alle" || b.category === valgtKategori)
        .flatMap((b) => b.subcategory || [])
    );

    underkategoriSelect.innerHTML =
      "<option value='alle'>Alle underkategorier</option>";
    [...subOptions].forEach((sub) => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = sub;
      underkategoriSelect.appendChild(opt);
    });

    filtrerDropdown();
  });

  underkategoriSelect.addEventListener("change", filtrerDropdown);
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
  const filtrerte = alleButikker.filter((b) => {
    const matchKategori =
      aktivKategoriTags.size === 0 || aktivKategoriTags.has(b.category);
    const matchUnderkategori =
      aktivUnderkategoriTags.size === 0 ||
      (b.subcategory || []).some((sub) => aktivUnderkategoriTags.has(sub));
    return matchKategori && matchUnderkategori;
  });

  visButikker(filtrerte);
}

function filtrerDropdown() {
  const k = document.getElementById("kategori-filter").value;
  const u = document.getElementById("underkategori-filter").value;

  const filtrerte = alleButikker.filter((b) => {
    const matchKategori = k === "alle" || b.category === k;
    const matchUnderkategori =
      u === "alle" || (b.subcategory || []).includes(u);
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
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex";

    const card = document.createElement("div");
    card.className = "card category-card h-100 d-flex flex-column text-center";

    const imgLink = document.createElement("a");
    imgLink.href = butikk.url;
    imgLink.target = "_blank";
    imgLink.rel = "noopener";

    const img = document.createElement("img");
    img.src = butikk.image;
    img.alt = butikk.name;
    img.className = "card-img-top p-3";
    img.loading = "lazy";
    img.style.height = "120px";
    img.style.objectFit = "contain";

    imgLink.appendChild(img);
    card.appendChild(imgLink);

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column justify-content-between";

    const bodyInner = document.createElement("div");
    const title = document.createElement("h6");
    title.className = "card-title";
    title.textContent = butikk.name;

    const desc = document.createElement("p");
    desc.className = "card-text small text-muted";
    desc.textContent = butikk.description || "";

    bodyInner.appendChild(title);
    bodyInner.appendChild(desc);

    const btn = document.createElement("a");
    btn.href = butikk.url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.className = "btn btn-primary mt-3";
    btn.textContent = "Besøk";

    body.appendChild(bodyInner);
    body.appendChild(btn);

    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}
