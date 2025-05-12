fetch("assets/data/kampanjer-forside.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Nettverksfeil: " + response.status);
    }
    return response.json();
  })
  .then((kampanjer) => {
    const kampanjeContainer = document.getElementById("kampanje-seksjon");
    if (!kampanjeContainer) {
      console.error("Fant ikke elementet med ID 'kampanje-seksjon'");
      return;
    }

    kampanjer.forEach((kampanje) => {
      if (!kampanje.title || !kampanje.image || !kampanje.url) return;

      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "promo-card fade-in";

      const img = document.createElement("img");
      img.src = kampanje.image;
      img.alt = kampanje.title;
      img.className = "promo-image";

      const textDiv = document.createElement("div");
      textDiv.className = "promo-text";

      const title = document.createElement("div");
      title.className = "promo-title";
      title.textContent = kampanje.title;

      const desc = document.createElement("div");
      desc.className = "promo-subtext";
      desc.textContent = kampanje.description || "";

      const btn = document.createElement("a");
      btn.href = kampanje.url;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.className = "btn btn-sm btn-outline-primary mt-2";
      btn.textContent = "Se tilbud";

      textDiv.appendChild(title);
      textDiv.appendChild(desc);
      textDiv.appendChild(btn);
      card.appendChild(img);
      card.appendChild(textDiv);
      col.appendChild(card);
      kampanjeContainer.appendChild(col);
    });

    // Trigger fade-in with animation
    setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 50);

    // "Se alle kampanjer"-knapp
    const seAlleWrapper = document.createElement("div");
    seAlleWrapper.className = "text-center mt-4";
    seAlleWrapper.innerHTML = `
      <a href="kampanjer.html" class="btn btn-outline-primary">Se alle kampanjer</a>
    `;
    kampanjeContainer.parentElement.appendChild(seAlleWrapper);
  })
  .catch((error) => {
    console.error("Feil ved lasting av kampanjer-forside:", error);
  });