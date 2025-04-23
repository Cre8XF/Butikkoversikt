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
        card.className = "col-6 col-md-3 text-center";
        card.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener sponsored" class="text-decoration-none text-dark">
            <div class="card category-card h-100 p-3">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" class="img-fluid mb-2" loading="lazy" />
              <h6>${butikk.name}</h6>
              ${butikk.description ? `<p class="small text-muted">${butikk.description}</p>` : ""}
            </div>
          </a>
        `;
        container.appendChild(card);
      });
    });
});
