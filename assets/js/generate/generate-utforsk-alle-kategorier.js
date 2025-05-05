document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("kategoriContainer");

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(butikker => {
      const kategorier = {};

      // Sorter butikker i grupper per kategori
      butikker.forEach(butikk => {
        if (!butikk.category) return;
        if (!kategorier[butikk.category]) {
          kategorier[butikk.category] = [];
        }
        kategorier[butikk.category].push(butikk);
      });

      // Lag seksjon per kategori
      Object.keys(kategorier).sort().forEach(kategori => {
        const kategoriDiv = document.createElement("div");
        kategoriDiv.classList.add("mb-5");

        const header = document.createElement("h2");
        header.className = "mb-4";
        header.textContent = kategori;
        kategoriDiv.appendChild(header);

        const row = document.createElement("div");
        row.className = "row g-4";

        kategorier[kategori].forEach(butikk => {
          const col = document.createElement("div");
          col.className = "col-6 col-md-4 col-lg-3";

          const card = document.createElement("div");
          card.className = "card h-100 shadow-sm store-card";

          const img = document.createElement("img");
          img.src = butikk.image || "assets/images/default.png";
          img.alt = butikk.name;
          img.className = "card-img-top";
          card.appendChild(img);

          const cardBody = document.createElement("div");
          cardBody.className = "card-body text-center";

          const name = document.createElement("h5");
          name.className = "card-title";
          name.textContent = butikk.name;
          cardBody.appendChild(name);

          if (butikk.description) {
            const desc = document.createElement("p");
            desc.className = "card-text text-muted small";
            desc.textContent = butikk.description;
            cardBody.appendChild(desc);
          }

          const link = document.createElement("a");
          link.href = butikk.url;
          link.textContent = "Besøk butikk";
          link.className = "btn btn-primary btn-sm mt-2";
          link.target = "_blank";
          link.rel = "noopener";
          cardBody.appendChild(link);

          card.appendChild(cardBody);
          col.appendChild(card);
          row.appendChild(col);
        });

        kategoriDiv.appendChild(row);
        container.appendChild(kategoriDiv);
      });
    })
    .catch(err => {
      console.error("Feil ved lasting av butikker.json:", err);
    });
});