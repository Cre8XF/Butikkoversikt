
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
      col.className = "col-md-6 col-lg-4 fade-in";

      col.innerHTML = `
        <div class="promo-card">
          <img src="\${kampanje.image}" alt="\${kampanje.title}" class="promo-image">
          <div class="promo-text">
            <div class="promo-title">\${kampanje.title
    }</div>
            <div class="promo-subtext">\${kampanje.description || ""
    }</div>
            <a href="\${kampanje.url}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-primary mt-2">Se tilbud</a>
          </div>
        </div>
      `;

      kampanjeContainer.appendChild(col);
  });

    // Legg til "Se alle kampanjer"-knapp
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
