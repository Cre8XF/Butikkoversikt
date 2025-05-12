document.addEventListener("DOMContentLoaded", async () => {
  const kategoriContainer = document.getElementById("butikk-container");
  const kategoriTittel = document.getElementById("kategoriTittel");

  // Hent kategori fra URL
  const params = new URLSearchParams(window.location.search);
  const kategori = params.get("kategori");

  if (!kategoriContainer || !kategori) {
      console.error("Elementer mangler: butikkContainer eller kategori er ikke definert.");
      return;
  }

  kategoriTittel.textContent = kategori;

  try {
      const response = await axios.get("assets/data/butikker.json");
      const butikker = response.data;

      const filtrerteButikker = butikker.filter(butikk => butikk.category.includes(kategori));

      kategoriContainer.innerHTML = "";

      filtrerteButikker.forEach(butikk => {
          const butikkElement = `
              <div class="col-md-4 mb-4">
                  <div class="card shadow-sm h-100">
                      <img src="${butikk.image}" class="card-img-top p-3" alt="${butikk.alt}">
                      <div class="card-body d-flex flex-column">
                          <h5 class="card-title">${butikk.name}</h5>
                          <p class="card-text">${butikk.description}</p>
                          <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary mt-auto">Besøk butikk</a>
                      </div>
                  </div>
              </div>
          `;
          kategoriContainer.insertAdjacentHTML("beforeend", butikkElement);
      });

      if (filtrerteButikker.length === 0) {
          kategoriContainer.innerHTML = `<p class="text-muted">Ingen butikker funnet i denne kategorien.</p>`;
      }
  } catch (error) {
      console.error("Feil ved lasting av butikker: ", error);
  }
});
