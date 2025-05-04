// ✅ generate-search-forside.js med gruppert visning og ny stil

let søkData = {
  butikker: [],
  guider: []
};

document.addEventListener("DOMContentLoaded", () => {
  const søkInput = document.getElementById("search-input");
  const resultContainer = document.getElementById("search-results");

  Promise.all([
    fetch("assets/data/butikker.json").then(res => res.json()),
    fetch("assets/data/guider.json").then(res => res.json())
  ])
    .then(([butikkData, guideData]) => {
      søkData.butikker = butikkData;
      søkData.guider = guideData;
    })
    .catch(err => {
      console.error("Feil ved lasting av data for søk:", err);
    });

  søkInput.addEventListener("input", () => {
    const søkeord = søkInput.value.toLowerCase().trim();
    resultContainer.innerHTML = "";
    if (!søkeord) return;

    const matched = søkData.butikker.filter(b =>
      (b.name + b.category + (b.subcategory || []).join(" ") + b.description + (b.tags || []).join(" ")).toLowerCase().includes(søkeord)
    );

    const guider = søkData.guider.filter(g =>
      (g.title + g.description + (g.tags || []).join(" ")).toLowerCase().includes(søkeord)
    );

    if (matched.length > 0) {
      const grupper = {};
      matched.forEach(b => {
        const kat = b.category || "Annet";
        const sub = (b.subcategory && b.subcategory[0]) || "Generelt";
        grupper[kat] = grupper[kat] || {};
        grupper[kat][sub] = grupper[kat][sub] || [];
        grupper[kat][sub].push(b);
      });

      Object.entries(grupper).forEach(([kategori, underkat]) => {
        const katDiv = document.createElement("div");
        katDiv.className = "sok-kategori";
        katDiv.innerHTML = `<strong>📁 ${kategori}</strong>`;
        resultContainer.appendChild(katDiv);

        Object.entries(underkat).forEach(([sub, butikker]) => {
          const subDiv = document.createElement("div");
          subDiv.className = "sok-underkategori";
          subDiv.innerHTML = `<strong>📌 ${sub}</strong>`;
          resultContainer.appendChild(subDiv);

          butikker.slice(0, 4).forEach(butikk => {
            const kort = document.createElement("div");
            kort.className = "sok-kort";
            kort.innerHTML = `
              <h6>${butikk.name}</h6>
              <p class="small text-muted">${butikk.description}</p>
              <a href="${butikk.url}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Besøk</a>
            `;
            resultContainer.appendChild(kort);
          });

          if (butikker.length > 4) {
            const flere = document.createElement("p");
            flere.className = "small text-muted mb-4 ms-3";
            flere.textContent = `... og ${butikker.length - 4} flere`;
            resultContainer.appendChild(flere);
          }
        });
      });
    }

    if (guider.length > 0) {
      const guideHeader = document.createElement("div");
      guideHeader.className = "sok-guider";
      guideHeader.innerHTML = `<h5 class="mt-4">📘 Guider:</h5>`;
      resultContainer.appendChild(guideHeader);

      guider.slice(0, 3).forEach(guide => {
        const guideKort = document.createElement("div");
        guideKort.className = "sok-kort";
        guideKort.innerHTML = `
          <h6>${guide.title}</h6>
          <p class="small text-muted">${guide.description}</p>
          <a href="${guide.url}" class="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener">Les mer</a>
        `;
        resultContainer.appendChild(guideKort);
      });

      if (guider.length > 3) {
        const flere = document.createElement("p");
        flere.className = "small text-muted mb-4 ms-3";
        flere.textContent = `... og ${guider.length - 3} flere guider`;
        resultContainer.appendChild(flere);
      }
    }
  });
});
