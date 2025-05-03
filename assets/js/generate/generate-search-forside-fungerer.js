// ✅ Forbedret søk med kategori + underkategori + guider + vis begrenset antall
document.addEventListener("DOMContentLoaded", () => {
  const søkInput = document.getElementById("search-input");
  const resultContainer = document.getElementById("search-results");

  let butikker = [];
  let guider = [];

  Promise.all([
    fetch("assets/data/butikker.json").then(res => res.json()),
    fetch("assets/data/guider.json").then(res => res.json())
  ])
    .then(([butikkData, guideData]) => {
      butikker = butikkData;
      guider = guideData;
    })
    .catch(err => {
      console.error("Feil ved lasting av søkedata:", err);
    });

  søkInput.addEventListener("input", () => {
    const query = søkInput.value.toLowerCase().trim();
    resultContainer.innerHTML = "";
    if (!query) return;

    const matcher = (text) => text && text.toLowerCase().includes(query);

    // Filtrer relevante butikker
    const relevanteButikker = butikker.filter(b =>
      matcher(b.name) ||
      matcher(b.description) ||
      matcher(b.category) ||
      (b.subcategory && b.subcategory.some(sc => matcher(sc))) ||
      (b.tags && b.tags.some(t => matcher(t)))
    );

    // Grupper etter category > subcategory
    const grupperte = {};
    relevanteButikker.forEach(b => {
      const kategori = b.category || "Uten kategori";
      const underkategorier = b.subcategory || ["Uten underkategori"];
      if (!grupperte[kategori]) grupperte[kategori] = {};

      underkategorier.forEach(sub => {
        if (!grupperte[kategori][sub]) grupperte[kategori][sub] = [];
        grupperte[kategori][sub].push(b);
      });
    });

    // Søk i guider
    const relevanteGuider = guider.filter(g =>
      matcher(g.title) ||
      matcher(g.description) ||
      (g.tags && g.tags.some(t => matcher(t)))
    );

    // Generer HTML
    const fragment = document.createDocumentFragment();

    Object.entries(grupperte).forEach(([kategori, underMap]) => {
      const catHeading = document.createElement("h5");
      catHeading.textContent = `🗂 ${kategori}`;
      fragment.appendChild(catHeading);

      Object.entries(underMap).forEach(([under, items]) => {
        const subHeading = document.createElement("h6");
        subHeading.textContent = `🔹 ${under}`;
        fragment.appendChild(subHeading);

        items.slice(0, 4).forEach(b => {
          const div = document.createElement("div");
          div.className = "mb-2";
          div.innerHTML = `
            <a href="${b.url}" target="_blank" rel="noopener">🛒 <strong>${b.name}</strong></a>
            <div class="text-muted small">${b.description || ""}</div>
          `;
          fragment.appendChild(div);
        });

        if (items.length > 4) {
          const ekstra = document.createElement("div");
          ekstra.innerHTML = `<div class="text-muted small">… og ${items.length - 4} flere</div>`;
          fragment.appendChild(ekstra);
        }
      });
    });

    // Guider
    if (relevanteGuider.length > 0) {
      const guideHeader = document.createElement("h5");
      guideHeader.textContent = "📘 Guider";
      fragment.appendChild(guideHeader);

      relevanteGuider.slice(0, 5).forEach(g => {
        const gDiv = document.createElement("div");
        gDiv.className = "mb-2";
        gDiv.innerHTML = `
          <a href="${g.url}"><strong>${g.title}</strong></a>
          <div class="text-muted small">${g.description || ""}</div>
        `;
        fragment.appendChild(gDiv);
      });
    }

    if (fragment.children.length === 0) {
      resultContainer.innerHTML = "<p>Ingen treff.</p>";
    } else {
      resultContainer.appendChild(fragment);
    }
  });
});
