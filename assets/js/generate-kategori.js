document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");
  const tittelEl = document.getElementById("kategori-tittel");
  const container = document.getElementById("kategori-container");

  if (!kategori) {
    tittelEl.innerText = "Ingen kategori valgt.";
    return;
  }

  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const filtrert = data.filter(b => b.category.toLowerCase() === kategori.toLowerCase());

      if (filtrert.length === 0) {
        tittelEl.innerText = `Fant ingen butikker i kategori: ${kategori}`;
        return;
      }

      tittelEl.innerText = kategori.charAt(0).toUpperCase() + kategori.slice(1);

      filtrert.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "/assets/images/logo-mangler.png";

        const card = document.createElement("div");
        card.className = "col-12 col-md-6 col-lg-4";
        card.innerHTML = `
          <div class="store-showcase">
            <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="card-logo" loading="lazy" />
            <h5>${butikk.name}</h5>
            ${butikk.description ? `<p>${butikk.description}</p>` : ""}
            <a href="${butikk.url}" target="_blank" rel="noopener sponsored">Besøk butikk</a>
          </div>
        `;
        container.appendChild(card);
      });
    });
});
