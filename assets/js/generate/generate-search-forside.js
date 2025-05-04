document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const resultContainer = document.getElementById("search-results");

  let butikker = [];
  let guider = [];

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      butikker = data;
    });

  fetch("assets/data/guider.json")
    .then(res => res.json())
    .then(data => {
      guider = data;
    });

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    resultContainer.innerHTML = "";

    if (query.length === 0) return;

    const matched = butikker.filter(b =>
      b.name.toLowerCase().includes(query) ||
      b.description.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query) ||
      (b.subcategory && b.subcategory.some(sub => sub.toLowerCase().includes(query)))
    );

    const matchedGuider = guider.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query)
    );

    if (matched.length === 0 && matchedGuider.length === 0) {
      resultContainer.innerHTML = "<p>Ingen treff funnet.</p>";
      return;
    }

    const grouped = {};

    matched.forEach(b => {
      if (!grouped[b.category]) grouped[b.category] = {};
      if (b.subcategory && b.subcategory.length) {
        b.subcategory.forEach(sub => {
          if (!grouped[b.category][sub]) grouped[b.category][sub] = [];
          grouped[b.category][sub].push(b);
        });
      } else {
        if (!grouped[b.category]["Uten underkategori"]) grouped[b.category]["Uten underkategori"] = [];
        grouped[b.category]["Uten underkategori"].push(b);
      }
    });

    const wrapper = document.createElement("div");
    wrapper.className = "result-wrapper";

    for (const kategori in grouped) {
      const kategoriDiv = document.createElement("div");
      kategoriDiv.className = "result-kategori";
      kategoriDiv.innerHTML = `<h4><i class="bi bi-folder2-open me-2"></i>${kategori}</h4>`;

      for (const sub in grouped[kategori]) {
        const subDiv = document.createElement("div");
        subDiv.className = "result-subkategori";
        subDiv.innerHTML = `<h5><i class="bi bi-tag-fill me-2 text-muted"></i>${sub} (${grouped[kategori][sub].length})</h5>`;

        grouped[kategori][sub].forEach(butikk => {
          const resultKort = document.createElement("div");
          resultKort.className = "result-kort";
          resultKort.innerHTML = `
            <strong><i class="bi bi-shop me-1 text-primary"></i> ${butikk.name}</strong>
            <br>
            <p class="text-muted small">${butikk.description}</p>
            <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Besøk</a>
          `;
          subDiv.appendChild(resultKort);
        });

        kategoriDiv.appendChild(subDiv);
      }

      wrapper.appendChild(kategoriDiv);
    }

    if (matchedGuider.length) {
      const guiderDiv = document.createElement("div");
      guiderDiv.className = "result-kategori mt-5";
      guiderDiv.innerHTML = `<h4>Guider</h4>`;

      matchedGuider.forEach(guide => {
        const guideDiv = document.createElement("div");
        guideDiv.className = "guide-box mb-4 p-4 bg-light rounded shadow-sm";
        guideDiv.innerHTML = `
          <h5>Guide: ${guide.title}</h5>
          <p class="text-muted">${guide.description}</p>
          <a href="${guide.url}" class="btn btn-outline-primary btn-sm">Les guide</a>
        `;
        guiderDiv.appendChild(guideDiv);
      });

      wrapper.appendChild(guiderDiv);
    }

    resultContainer.appendChild(wrapper);
  });
});