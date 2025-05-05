document.addEventListener("DOMContentLoaded", () => {
  const kategoriContainer = document.getElementById("kategoriContainer");
  const kategoriMeny = document.getElementById("kategoriMeny");
  const sokInput = document.getElementById("butikksok");

  if (!kategoriContainer || !kategoriMeny || !sokInput) return;

  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const grupperte = {};

      // Gruppér butikker etter kategori
      data.forEach(b => {
        if (!b.category) return;
        if (!grupperte[b.category]) grupperte[b.category] = [];
          grupperte[b.category].push(b);
      });

      // Bygg meny og seksjoner
      Object.keys(grupperte).forEach(kategori => {
        const id = kategori.toLowerCase().replace(/ /g, "-");
        const butikker = grupperte[kategori];

        // Menyknapp
        const knapp = document.createElement("a");
        knapp.href = `#${id}`;
        knapp.className = "btn btn-outline-primary btn-sm";
        knapp.textContent = kategori;
        kategoriMeny.appendChild(knapp);

        // Seksjon
        const seksjon = document.createElement("section");
        seksjon.className = "kategori-seksjon fade-in";
        seksjon.dataset.kategori = kategori.toLowerCase();
        seksjon.id = id;

        const overskrift = document.createElement("h2");
        overskrift.textContent = `${kategori} (${butikker.length})`;
        overskrift.className = "mt-5 mb-4 text-center";
        seksjon.appendChild(overskrift);

        const rad = document.createElement("div");
        rad.className = "row g-4 justify-content-center";

        butikker.forEach(b => {
          const col = document.createElement("div");
          col.className = "col-6 col-md-4 col-lg-3";

        col.innerHTML = `
  <div class="card h-100 store-card fade-in">
    <img src="${b.image}" class="card-img-top p-3" alt="${b.name}" style="height: 120px; object-fit: contain;">
    <div class="card-body text-center d-flex flex-column justify-content-between">
      <h6 class="card-title">${b.name}</h6>
      <p class="card-text small text-muted">${b.description || ""}</p>
      <a href="${b.url}" target="_blank" rel="noopener" class="btn btn-primary mt-2">Besøk</a>
    </div>
  </div>
`;


          rad.appendChild(col);
        });

        seksjon.appendChild(rad);
        kategoriContainer.appendChild(seksjon);
      });

      // Søkefilter
      sokInput.addEventListener("input", () => {
        const query = sokInput.value.toLowerCase();
        const seksjoner = document.querySelectorAll(".kategori-seksjon");

        seksjoner.forEach(seksjon => {
          const matcher = Array.from(seksjon.querySelectorAll(".card-title")).some(t =>
            t.textContent.toLowerCase().includes(query)
          );
          seksjon.style.display = matcher || query === "" ? "" : "none";
        });
      });
    })
    .catch(err => console.error("Feil ved lasting av butikker.json:", err));
});