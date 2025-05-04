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
      showResults(query);
      generateSubcategoryTags(query);
    });
  });

  function showResults(query) {
    resultsContainer.innerHTML = "";

    if (!query) return;

    const matchedButikker = butikker.filter(b =>
      b.name.toLowerCase().includes(query) ||
      b.description?.toLowerCase().includes(query) ||
      b.category?.toLowerCase().includes(query) ||
      (b.subcategory || []).some(sub => sub.toLowerCase().includes(query)) ||
      (b.tags || []).some(tag => tag.toLowerCase().includes(query))
    );

    const matchedGuider = guider.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.description?.toLowerCase().includes(query)
    );

    if (matchedButikker.length) {
      const butikkHeader = document.createElement("h5");
      butikkHeader.textContent = "Butikker";
      resultsContainer.appendChild(butikkHeader);
    }

    matchedButikker.forEach(b => {
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
    });

    if (matchedGuider.length) {
      const guideHeader = document.createElement("h5");
      guideHeader.textContent = "Guider";
      guideHeader.className = "mt-4";
      resultsContainer.appendChild(guideHeader);
    }

    matchedGuider.forEach(g => {
      const card = document.createElement("div");
      card.className = "card mb-3 p-3";
      card.innerHTML = `
        <a href="${g.url}" class="text-decoration-none text-reset">
          <h6 class="mb-1">${g.title}</h6>
          <p class="mb-0 text-muted small">${g.description}</p>
        </a>
      `;
      resultsContainer.appendChild(card);
    });
  }

  function generateSubcategoryTags(query) {
    tagContainer.innerHTML = "";
    if (!query) return;

    const matched = butikker.filter(b =>
      b.name.toLowerCase().includes(query) ||
      b.description?.toLowerCase().includes(query) ||
      b.category?.toLowerCase().includes(query) ||
      (b.subcategory || []).some(sub => sub.toLowerCase().includes(query)) ||
      (b.tags || []).some(tag => tag.toLowerCase().includes(query))
    );

    const subcategoryMap = {};
    matched.forEach(b => {
      (b.subcategory || []).forEach(sub => {
        if (!subcategoryMap[sub]) subcategoryMap[sub] = 0;
        subcategoryMap[sub]++;
      });
    });

    const tagWrapper = document.createElement("div");
    tagWrapper.className = "d-flex flex-wrap justify-content-center gap-2";

    Object.entries(subcategoryMap).forEach(([sub, count]) => {
      const tag = document.createElement("button");
      tag.className = "btn btn-outline-primary btn-sm";
      tag.textContent = `${sub} (${count})`;
      tag.addEventListener("click", () => {
        input.value = sub;
        showResults(sub.toLowerCase());
        generateBackToAllButton();
      });
      tagWrapper.appendChild(tag);
    });

    if (Object.keys(subcategoryMap).length > 0) {
      const tagTitle = document.createElement("p");
      tagTitle.className = "text-muted small mt-4 mb-2";
      tagTitle.textContent = "Underkategorier:";
      tagContainer.appendChild(tagTitle);
      tagContainer.appendChild(tagWrapper);
    }
  }

  function generateBackToAllButton() {
    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-link btn-sm mt-3";
    backBtn.innerHTML = "← Tilbake til alle treff";
    backBtn.addEventListener("click", () => {
      input.value = lastQuery;
      showResults(lastQuery);
      generateSubcategoryTags(lastQuery);
    });
    tagContainer.appendChild(backBtn);
  }
});