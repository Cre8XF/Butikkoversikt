
// Ny søkefunksjon med underkategori-tagger og visning av resultater

let butikker = [];
let guider = [];
let aktiveTag = null;

const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const tagContainer = document.getElementById("search-subcategory-tags");

Promise.all([
  fetch("assets/data/butikker.json").then(res => res.json()),
  fetch("assets/data/guider.json").then(res => res.json())
]).then(([butikkData, guideData]) => {
  butikker = butikkData;
  guider = guideData;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) {
      tagContainer.innerHTML = "";
      resultsContainer.innerHTML = "";
      return;
    }
    visUnderkategoriTagger(query);
  });
});

function visUnderkategoriTagger(query) {
  const matchendeButikker = butikker.filter(b =>
    b.name.toLowerCase().includes(query) ||
    b.description.toLowerCase().includes(query) ||
    (b.tags && b.tags.some(tag => tag.toLowerCase().includes(query)))
  );

  const grupper = {};
  matchendeButikker.forEach(b => {
    if (Array.isArray(b.subcategory)) {
      b.subcategory.forEach(sc => {
        grupper[sc] = (grupper[sc] || 0) + 1;
      });
    } else if (b.subcategory) {
      grupper[b.subcategory] = (grupper[b.subcategory] || 0) + 1;
    }
  });

  tagContainer.innerHTML = "";
  Object.entries(grupper).forEach(([subcategory, antall]) => {
    const tag = document.createElement("button");
    tag.className = "tag";
    tag.textContent = `${subcategory} (${antall})`;
    tag.addEventListener("click", () => visResultaterForSubkategori(subcategory, matchendeButikker));
    tagContainer.appendChild(tag);
  });

  // Nullstill resultater om ny søk er skrevet
  resultsContainer.innerHTML = "";
}

function visResultaterForSubkategori(subcategory, liste) {
  aktiveTag = subcategory;
  const resultater = liste.filter(b => Array.isArray(b.subcategory)
    ? b.subcategory.includes(subcategory)
    : b.subcategory === subcategory);

  resultsContainer.innerHTML = "";

  resultater.forEach(b => {
    const div = document.createElement("div");
    div.className = "search-card";
    div.innerHTML = `
      <div class="search-card-body">
        <img src="${b.image}" alt="${b.name}" class="search-thumb" />
        <div>
          <h5>${b.name}</h5>
          <p class="small text-muted">${b.description}</p>
          <a href="${b.url}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Besøk butikk</a>
        </div>
      </div>
    `;
    resultsContainer.appendChild(div);
  });
}
