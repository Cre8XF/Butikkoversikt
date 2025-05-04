
let butikker = [];
let guider = [];

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("assets/data/butikker.json").then(res => res.json()),
    fetch("assets/data/guider.json").then(res => res.json())
  ]).then(([butikkData, guideData]) => {
    butikker = butikkData;
    guider = guideData;
  });

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");
  const tagContainer = document.getElementById("search-subcategory-tags");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    showResults(query);
  });

  function showResults(query) {
    resultsContainer.innerHTML = "";
    tagContainer.innerHTML = "";

    if (!query) return;

    const matchedButikker = butikker.filter(b =>
      b.name.toLowerCase().includes(query) ||
      b.description?.toLowerCase().includes(query) ||
      b.category?.toLowerCase().includes(query) ||
      (Array.isArray(b.subcategory) && b.subcategory.some(sc => sc.toLowerCase().includes(query))) ||
      (Array.isArray(b.tags) && b.tags.some(t => t.toLowerCase().includes(query)))
    );

    const matchedGuider = guider.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.description?.toLowerCase().includes(query) ||
      (Array.isArray(g.tags) && g.tags.some(t => t.toLowerCase().includes(query)))
    );

    const subcategoryCount = {};
    matchedButikker.forEach(b => {
      (b.subcategory || []).forEach(sc => {
        subcategoryCount[sc] = (subcategoryCount[sc] || 0) + 1;
      });
    });

    Object.entries(subcategoryCount).forEach(([subcategory, count]) => {
      const tag = document.createElement("span");
      tag.className = "subcategory-tag";
      tag.textContent = `${subcategory} (${count})`;
      tag.onclick = () => filterBySubcategory(subcategory);
      tagContainer.appendChild(tag);
    });

    renderButikker(matchedButikker);
    renderGuider(matchedGuider);
  }

  function renderButikker(butikker) {
    butikker.forEach(b => {
      const card = document.createElement("div");
      card.className = "card category-card mb-3";
      card.innerHTML = `
        <div class="row g-0 align-items-center">
          <div class="col-3 text-center">
            <img src="${b.image}" alt="${b.name}" class="img-fluid p-2" style="max-height:60px;">
          </div>
          <div class="col">
            <div class="card-body p-2">
              <h6 class="card-title mb-1"><a href="${b.url}" target="_blank" rel="noopener">${b.name}</a></h6>
              <p class="card-text small text-muted mb-0">${b.description}</p>
            </div>
          </div>
        </div>
      `;
      resultsContainer.appendChild(card);
    });
  }

  function renderGuider(guider) {
    guider.forEach(g => {
      const card = document.createElement("div");
      card.className = "card guide-card mb-3";
      card.innerHTML = `
        <div class="row g-0 align-items-center">
          <div class="col-3 text-center">
            <img src="${g.image}" alt="${g.title}" class="img-fluid p-2" style="max-height:60px;">
          </div>
          <div class="col">
            <div class="card-body p-2">
              <h6 class="card-title mb-1"><a href="${g.url}" target="_blank" rel="noopener">${g.title}</a></h6>
              <p class="card-text small text-muted mb-0">${g.description}</p>
            </div>
          </div>
        </div>
      `;
      resultsContainer.appendChild(card);
    });
  }

  function filterBySubcategory(subcat) {
    const query = subcat.toLowerCase();
    const filtered = butikker.filter(b =>
      Array.isArray(b.subcategory) && b.subcategory.some(sc => sc.toLowerCase() === query)
    );
    resultsContainer.innerHTML = "";
    renderButikker(filtered);
  }
});
