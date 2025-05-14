// autocomplete-sok.js – Kombinert fungerende + sortert versjon

const searchInput = document.getElementById("autocompleteInput");
const suggestionsContainer = document.createElement("ul");
suggestionsContainer.className = "autocomplete-items list-group position-absolute w-100";
searchInput.parentNode.appendChild(suggestionsContainer);

let butikker = [];
let guider = [];

async function fetchSearchData() {
  try {
    const [butikkerRes, guiderRes] = await Promise.all([
      fetch("assets/data/butikker.json"),
      fetch("assets/data/guider.json"),
    ]);

    if (!butikkerRes.ok || !guiderRes.ok) throw new Error("Feil ved lasting av JSON-data");

    butikker = await butikkerRes.json();
    guider = await guiderRes.json();
  } catch (err) {
    console.error("Klarte ikke å hente søkedata:", err);
  }
}

function normalize(text) {
  return (text || "").toString().toLowerCase().trim();
}

function matchFields(item, query, fields) {
  const q = normalize(query);
  return fields.some((field) => {
    const val = item[field];
    if (Array.isArray(val)) return val.some(v => normalize(v).includes(q));
    return normalize(val).includes(q);
  });
}

function sortByRelevance(query, items, fields) {
  return items.map(item => {
    let score = 0;
    const q = normalize(query);
    fields.forEach(field => {
      const value = item[field];
      if (typeof value === 'string' && value.toLowerCase().includes(q)) score++;
      if (Array.isArray(value)) {
        score += value.filter(v => typeof v === 'string' && v.toLowerCase().includes(q)).length;
      }
    });
    return { item, score };
  }).filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

function renderGroupedSuggestions(butikker, kategorier, subkategorier, guider) {
  suggestionsContainer.innerHTML = "";

  const addGroup = (title, list, icon) => {
    if (list.length === 0) return;
    const header = document.createElement("li");
    header.className = "list-group-item disabled fw-bold small bg-light";
    header.textContent = title;
    suggestionsContainer.appendChild(header);

    list.forEach(entry => {
      const el = document.createElement("a");
      el.className = "list-group-item list-group-item-action d-flex align-items-center gap-2";
      el.href = entry.url || "#";
      el.innerHTML = `<span>${entry.icon || icon}</span><span>${entry.name}</span>`;
      suggestionsContainer.appendChild(el);
    });
  };

  addGroup("🛒 Butikker", butikker);
  addGroup("🏷️ Kategorier", kategorier);
  addGroup("📁 Underkategorier", subkategorier);
  addGroup("📘 Guider", guider);

  if (
    butikker.length + kategorier.length + subkategorier.length + guider.length === 0
  ) {
    suggestionsContainer.innerHTML = `<li class='list-group-item disabled'>Ingen treff</li>`;
  }
}

function handleSearchInput(e) {
  const query = e.target.value;
  if (!query) {
    suggestionsContainer.innerHTML = "";
    return;
  }

  const butikktreff = sortByRelevance(query, butikker, ["name", "description", "tags", "category", "subcategory"])
    .map(b => ({ name: b.name, url: b.url, icon: "🛒" }));

  const kategoritreff = [...new Set(
    butikker.flatMap(b => b.category || [])
      .filter(k => normalize(k).includes(normalize(query)))
  )].map(k => ({ name: k, url: `kategori.html?kategori=${encodeURIComponent(k)}`, icon: "🏷️" }));

  const subkategoritreff = [];

const queryNormalized = normalize(query);
const matchedSubcategories = new Set();

butikker.forEach(b => {
  const mainCategories = b.category || [];
  const subCategories = b.subcategory || [];

  subCategories.forEach(sub => {
    if (normalize(sub).includes(queryNormalized) && !matchedSubcategories.has(sub)) {
      matchedSubcategories.add(sub);
      const main = mainCategories[0] || "kategori"; // fallback hvis tom
      subkategoritreff.push({
        name: sub,
        url: `kategori.html?kategori=${encodeURIComponent(main)}#${encodeURIComponent(sub)}`,
        icon: "📁"
      });
    }
  });
});

  const guidetreff = sortByRelevance(query, guider, ["title", "description", "tags"])
    .map(g => ({ name: g.title, url: g.url, icon: "📘" }));

  const limited = (arr, max) => arr.slice(0, max);
  renderGroupedSuggestions(
    limited(butikktreff, 5),
    limited(kategoritreff, 3),
    limited(subkategoritreff, 3),
    limited(guidetreff, 3)
  );
}

fetchSearchData().then(() => {
  searchInput?.addEventListener("input", handleSearchInput);
});