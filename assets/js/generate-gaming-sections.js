
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const grupper = {
        "Gaming og elektronikk": document.getElementById("gaming-elektronikk"),
        "Gadgets og gaver": document.getElementById("gadgets-gaver"),
        "Spill og underholdning": document.getElementById("spill-underholdning")
      };

      data.forEach(butikk => {
        const kategori = butikk.category;
        const container = grupper[kategori];
        if (container) {
          const col = document.createElement("div");
          col.className = "col-6 col-md-3 text-center";
          col.innerHTML = `
            <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark d-block store-showcase">
              <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2 card-logo" loading="lazy" />
              <h6>${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ""}</p>
            </a>
          `;
          container.appendChild(col);
        }
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker:", err);
    });
});
