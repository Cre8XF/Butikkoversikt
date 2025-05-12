
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");
  const tagContainer = document.getElementById("search-subcategory-tags");

  let butikker = [];
  let guider = [];
  let lastQuery = "";

  if (!input || !resultsContainer || !tagContainer) {
    console.error("Et eller flere søkeelementer mangler i DOM");
    return;
  }

  // === Init data and listeners ===
  Promise.all([
    fetch("assets/data/butikker.json").then(res => res.json()),
    fetch("assets/data/guider.json").then(res => res.json())
  ])
  .then(([butikkData, guideData]) => {
    butikker = butikkData;
    guider = guideData;

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();
      lastQuery = query;
      updateSearch(query);
    });
  });

  function updateSearch(query) {
    renderResults(query);
    renderTags(query);
  }

  // === Search filter logic ===
  function filterMatches(query, data) {
    return data.filter(item =>
      (item.name || item.title).toLowerCase().includes(query) ||
      (item.description || "").toLowerCase().includes(query) ||
      (item.category || "").toLowerCase().includes(query) ||
      (item.subcategory || []).some(sub => sub.toLowerCase().includes(query)) ||
      (item.tags || []).some(tag => tag.toLowerCase().includes(query))
    );
  }

  // === Render results ===
  function renderResults(query) {
    resultsContainer.innerHTML = "";
    if (!query) return;

    const matchedButikker = filterMatches(query, butikker);
    const matchedGuider = filterMatches(query, guider);

    if (matchedButikker.length) {
      appendHeader("Butikker");
      matchedButikker.forEach(renderButikkCard);
    }

    if (matchedGuider.length) {
      appendHeader("Guider", "mt-4");
      matchedGuider.forEach(renderGuideCard);
    }
  }

  function appendHeader(text, extraClass = "") {
    const header = document.createElement("h5");
    header.textContent = text;
    if (extraClass) header.className = extraClass;
    resultsContainer.appendChild(header);
  }

  function renderButikkCard(b) {
    const card = document.createElement("div");
    card.className = "card mb-3 p-3";
    card.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${b.image}" alt="${b.name}" style="width: 60px; height: 60px; object-fit: contain;">
        <div>
          <h6 class="mb-1">${b.name}</h6>
          <p class="mb-0 text-muted small">${b.description}</p>
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  }

  function renderGuideCard(g) {
    const card = document.createElement("div");
    card.className = "card mb-3 p-3";
    card.innerHTML = `
      <a href="${g.url}" class="text-decoration-none text-reset">
        <h6 class="mb-1">${g.title}</h6>
        <p class="mb-0 text-muted small">${g.description}</p>
      </a>
    `;
    resultsContainer.appendChild(card);
  }

  // === Render tag filters ===
  function renderTags(query) {
    tagContainer.innerHTML = "";
    if (!query) return;

    const matched = filterMatches(query, butikker);
    const subcategoryMap = {};

    matched.forEach(b => {
      (b.subcategory || []).forEach(sub => {
        subcategoryMap[sub] = (subcategoryMap[sub] || 0) + 1;
      });
    });

    if (Object.keys(subcategoryMap).length === 0) return;

    const tagTitle = document.createElement("p");
    tagTitle.className = "text-muted small mt-4 mb-2";
    tagTitle.textContent = "Underkategorier:";
    tagContainer.appendChild(tagTitle);

    const tagWrapper = document.createElement("div");
    tagWrapper.className = "d-flex flex-wrap justify-content-center gap-2";

    Object.entries(subcategoryMap).forEach(([sub, count]) => {
      const tag = document.createElement("button");
      tag.className = "btn btn-outline-primary btn-sm";
      tag.textContent = `${sub} (${count})`;
      tag.addEventListener("click", () => {
        input.value = sub;
        updateSearch(sub.toLowerCase());
        renderBackButton();
      });
      tagWrapper.appendChild(tag);
    });

    tagContainer.appendChild(tagWrapper);
  }

  // === Back to all button ===
  function renderBackButton() {
    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-link btn-sm mt-3";
    backBtn.innerHTML = "← Tilbake til alle treff";
    backBtn.addEventListener("click", () => {
      input.value = lastQuery;
      updateSearch(lastQuery);
    });
    tagContainer.appendChild(backBtn);
  }
});
