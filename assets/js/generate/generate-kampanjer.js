// generate-kampanjer.js
fetch("assets/data/kampanjer.json")
  .then((res) => res.json())
  .then((kampanjer) => {
    const container = document.getElementById("kampanje-seksjon");

    kampanjer.forEach((kampanje) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "promo-card d-flex align-items-center";

      const img = document.createElement("img");
      img.src = kampanje.image;
      img.alt = kampanje.title;
      img.className = "promo-img me-3";

      const details = document.createElement("div");
      details.className = "promo-details";

      const title = document.createElement("h5");
      title.className = "promo-title mb-1";
      title.textContent = kampanje.title;

      const store = document.createElement("p");
      store.className = "promo-store text-muted small mb-1";
      store.textContent = `hos ${kampanje.store}`;

      const expiry = document.createElement("p");
      expiry.className = "promo-expiry text-muted small";
      expiry.textContent = kampanje.expiry;

      const link = document.createElement("a");
      link.href = kampanje.url;
      link.target = "_blank";
      link.className = "btn btn-outline-primary btn-sm mt-2";
      link.textContent = "Se tilbud";

      details.append(title, store, expiry, link);
      card.append(img, details);
      col.appendChild(card);
      container.appendChild(col);
    });
  })
  .catch((err) => console.error("Feil ved lasting av kampanjer:", err));
