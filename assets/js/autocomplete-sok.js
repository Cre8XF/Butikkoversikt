
// autocomplete-sok.js – forbedret søk med riktig kategori for underkategorier

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

    const subkategoriMap = new Map();

    matchedButikker.forEach(b => {
      const subs = b.subcategory || [];
      const cat = b.category;
      subs.forEach(sub => {
        const key = normalize(sub);
        if (!subkategoriMap.has(key)) {
          subkategoriMap.set(key, {
            name: sub,
            url: `kategori.html?kategori=${encodeURIComponent(cat)}#${encodeURIComponent(sub)}`,
            icon: "📁"
          });
        } else {
          const existing = subkategoriMap.get(key);
          if (normalize(cat).includes(queryNormalized)) {
            subkategoriMap.set(key, {
              name: sub,
              url: `kategori.html?kategori=${encodeURIComponent(cat)}#${encodeURIComponent(sub)}`,
              icon: "📁"
            });
          }
        }
      });
    });

    const subkategoritreff = Array.from(subkategoriMap.values());

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
    // Legg til ENTER-funksjon for full oversikt
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // hindrer evt. form submission
        const søk = searchInput.value.trim();
        if (søk.length > 0) {
          window.location.href = `sokeresultater.html?q=${encodeURIComponent(søk)}`;
        }
      }
    });
    const visAlleWrapper = document.getElementById("seAlleTreffWrapper");
const visAlleKnapp = document.getElementById("visAlleTreff");

// Skjul knappen ved lasting
visAlleWrapper.style.display = "none";

// Reager på input i søkefeltet
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query.length >= 2) {
    visAlleKnapp.textContent = `🔎 klikk her for å se alle treff for “${query}”`;
    visAlleWrapper.style.display = "block";
  } else {
    visAlleWrapper.style.display = "none";
  }
});

// Naviger til resultatside ved klikk
visAlleKnapp?.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    window.location.href = `sokeresultater.html?q=${encodeURIComponent(query)}`;
  }
});

// <-- Add this closing brace to end the DOMContentLoaded event listener function
});
