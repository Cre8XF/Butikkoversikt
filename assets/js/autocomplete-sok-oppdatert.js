
// autocomplete-sok.js – forbedret søk basert på tags og filtrerte kategorier

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("autocompleteInput");
  if (!searchInput) {
    console.warn("autocompleteInput ikke funnet i DOM");
    return;
  }

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

  function renderGroupedSuggestions(butikker, kategorier, subkategorier, guider) {
    suggestionsContainer.innerHTML = "";

    const addGroup = (title, list) => {
      if (list.length === 0) return;
      const header = document.createElement("li");
      header.className = "list-group-item disabled fw-bold small bg-light";
      header.textContent = title;
      suggestionsContainer.appendChild(header);

      list.forEach(entry => {
        const el = document.createElement("a");
        el.href = entry.url || "#";
        el.className = "list-group-item list-group-item-action d-flex align-items-center gap-2";
        el.innerHTML = `<span>${entry.icon}</span><span>${entry.name}</span>`;
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

    const queryNormalized = normalize(query);

    const matchedButikker = butikker.filter(b =>
      matchFields(b, query, ["name", "description", "tags", "category", "subcategory"])
    );

    const butikktreff = matchedButikker.map(b => ({
      name: b.name,
      url: b.url,
      icon: "🛒"
    }));

    const kategoritreff = [...new Set(
      matchedButikker.map(b => b.category).filter(Boolean)
    )].map(cat => ({
      name: cat,
      url: `kategori.html?kategori=${encodeURIComponent(cat)}`,
      icon: "🏷️"
    }));

    const matchedSub = new Set();
    const subkategoritreff = [];

    matchedButikker.forEach(b => {
      const subs = b.subcategory || [];
      const cats = b.category || [];
      subs.forEach(sub => {
        if (!matchedSub.has(sub)) {
          matchedSub.add(sub);
          const parentCat = cats[0] || "kategori";
          subkategoritreff.push({
            name: sub,
            url: `kategori.html?kategori=${encodeURIComponent(parentCat)}#${encodeURIComponent(sub)}`,
            icon: "📁"
          });
        }
      });
    });

    const guidetreff = guider
      .filter(g => matchFields(g, query, ["title", "description", "tags"]))
      .map(g => ({ name: g.title, url: g.url, icon: "📘" }));

    renderGroupedSuggestions(
      butikktreff.slice(0, 5),
      kategoritreff.slice(0, 3),
      subkategoritreff.slice(0, 4),
      guidetreff.slice(0, 3)
    );
  }

  fetchSearchData().then(() => {
    searchInput.addEventListener("input", handleSearchInput);
  });
});
